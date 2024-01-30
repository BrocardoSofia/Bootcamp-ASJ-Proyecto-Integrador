package com.bootcamp.integrador.services;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import com.bootcamp.integrador.models.SupplierModel;
import com.bootcamp.integrador.repositories.SupplierRepository;

import jakarta.transaction.Transactional;

@Service
public class SupplierService {
	@Autowired
	SupplierRepository supplierRepository;
	
	//obtener proveedores
	public Page<SupplierModel> getSuppliers(Pageable pageable, String businessName, 
											String supplierCode, int supplierCategoryId){
		Page<SupplierModel> page;
		
		if(supplierCategoryId <= 0) {
			page = supplierRepository.findAllByBusinessNameContainingIgnoreCaseAndSupplierCodeContainingIgnoreCase(businessName,
					supplierCode, pageable);
		}else {
			page = supplierRepository.findAllBySupplierCategoryIdAndBusinessNameContainingIgnoreCaseAndSupplierCodeContainingIgnoreCase(
					 supplierCategoryId, 
					 businessName, 
					 supplierCode,
					 pageable);
		}
		
		return page;
	}
	
	//obtener proveedores activos
	public Page<SupplierModel> getActiveSuppliers(Pageable pageable, String businessName){
		Page<SupplierModel> page = supplierRepository.findAllByDeletedAtIsNullAndBusinessNameContainingIgnoreCase(businessName, pageable);
		
		return page;
	}
	
	//obtener proveedores eliminados
	public Page<SupplierModel> getDeletedSuppliers(Pageable pageable, String businessName){
		Page<SupplierModel> page = supplierRepository.findAllByDeletedAtIsNotNullAndBusinessNameContainingIgnoreCase(businessName, pageable);
		return page;
	}
	
	//obtener un proveedor segun su id
	public Optional<SupplierModel> getSupplierById(int id){
		return supplierRepository.findById(id);
	}
	
	//insertar proveedor
	@Transactional
	public SupplierModel addSupplier(SupplierModel supplier) {
		SupplierModel findSupplierByName = supplierRepository.findAllBybusinessName(supplier.getBusinessName());
		SupplierModel findSupplierByCode = supplierRepository.findAllBySupplierCode(supplier.getSupplierCode());
		SupplierModel supplierAdded = null;
		
		if((findSupplierByName == null) && (findSupplierByCode == null)) {
			supplierRepository.save(supplier);
			supplierAdded = supplierRepository.findAllBybusinessName(supplier.getBusinessName()); 
		}
		
		return supplierAdded;
	}
	
	//eliminar proveedor
	public SupplierModel deleteSupplier(SupplierModel supplier) {
		SupplierModel supplierDeleted = supplierRepository.findById(supplier.getId()).get();
		if(supplierDeleted != null) {
			supplierDeleted.setDeletedAt(LocalDateTime.now());
			
			supplierRepository.save(supplierDeleted);
		}
		return supplier;
	}
	
	//reingresar proveedor
	public boolean reInsertSupplier(SupplierModel supplier) {
		Optional<SupplierModel> foundSupplier = supplierRepository.findById(supplier.getId());

        if (foundSupplier.isPresent()) {
        	SupplierModel undeletedSupplier = foundSupplier.get();
        	undeletedSupplier.setDeletedAt(null);
        	
        	supplierRepository.save(undeletedSupplier);
            return true;
        } else {
            return false;
        }
	}
	
	//modificar proveedor
	public SupplierModel updateSupplier(SupplierModel supplier) {
		SupplierModel existingSupplier = supplierRepository.findById(supplier.getId()).orElse(null);
		String oldBusinessName = existingSupplier.getBusinessEmail();
		SupplierModel existBusinessName	= supplierRepository.findAllBybusinessName(supplier.getBusinessName());
		
		if(existingSupplier != null && ((existBusinessName == null)||(oldBusinessName == supplier.getBusinessName()))) {
			existingSupplier.setSupplierCode(supplier.getSupplierCode());
			existingSupplier.setUpdatedAt(LocalDateTime.now());
			existingSupplier.setProvince(supplier.getProvince());
			existingSupplier.setIvaCondition(supplier.getIvaCondition());
			existingSupplier.setBusinessName(supplier.getBusinessName());
			existingSupplier.setImageUrl(supplier.getImageUrl());
			existingSupplier.setBusinessWebpage(supplier.getBusinessWebpage());
			existingSupplier.setBusinessEmail(supplier.getBusinessEmail());
			existingSupplier.setBusinessPhone(supplier.getBusinessPhone());
			existingSupplier.setStreetName(supplier.getStreetName());
			existingSupplier.setStreetNumber(supplier.getStreetNumber());
			existingSupplier.setCity(supplier.getCity());
			existingSupplier.setCp(supplier.getCp());
			existingSupplier.setCuit(supplier.getCuit());
			
			supplierRepository.save(existingSupplier);
		}
		
		return existingSupplier;
	}
}
