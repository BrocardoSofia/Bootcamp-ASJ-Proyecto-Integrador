package com.bootcamp.integrador.services;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.bootcamp.integrador.models.IvaConditionModel;
import com.bootcamp.integrador.models.ProvinceModel;
import com.bootcamp.integrador.models.SupplierCategoryModel;
import com.bootcamp.integrador.models.SupplierModel;
import com.bootcamp.integrador.models.UserModel;
import com.bootcamp.integrador.repositories.SupplierRepository;

@Service
public class SupplierService {
	@Autowired
	SupplierRepository supplierRepository;
	
	//obtener proveedores
	public Page<SupplierModel> getSuppliers(Pageable pageable, String businessName){
		Page<SupplierModel> page;
		if(businessName == "") {
			page = supplierRepository.findAll(pageable);
		}else {
			page = supplierRepository.findAllByBusinessNameContainingIgnoreCase(businessName, pageable);
		}
		return page;
	}
	
	//obtener proveedores activos
	public Page<SupplierModel> getActiveSuppliers(Pageable pageable, String businessName){
		Page<SupplierModel> page;
		if(businessName == "") {
			page = supplierRepository.findAllByDeletedAtIsNull(pageable);
		}else {
			page = supplierRepository.findAllByDeletedAtIsNullAndBusinessNameContainingIgnoreCase(businessName, pageable);
		}
		return page;
	}
	
	//obtener proveedores eliminados
	public Page<SupplierModel> getDeletedSuppliers(Pageable pageable, String businessName){
		Page<SupplierModel> page;
		if(businessName == "") {
			page = supplierRepository.findAllByDeletedAtIsNotNull(pageable);
		}else {
			page = supplierRepository.findAllByDeletedAtIsNotNullAndBusinessNameContainingIgnoreCase(businessName, pageable);
		}
		return page;
	}
	
	//obtener un proveedor segun su id
	public Optional<SupplierModel> getSupplierById(int id){
		return supplierRepository.findById(id);
	}
	
	//insertar proveedor
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
	public SupplierModel deleteSupplier(int id) {
		SupplierModel supplier = supplierRepository.findById(id).get();
		if(supplier != null) {
			supplier.setDeletedAt(LocalDateTime.now());
			supplierRepository.save(supplier);
		}
		return supplier;
	}
	
	//reingresar proveedor
	public SupplierModel reInsertSupplier(int id) {
		SupplierModel supplier = supplierRepository.findById(id).get();
		if(supplier != null) {
			supplier.setDeletedAt(null);
			supplierRepository.save(supplier);
		}
		return supplier;
	}
	
	//modificar proveedor
	public SupplierModel updateSupplier(SupplierModel supplier) {
		SupplierModel existingSupplier = supplierRepository.findById(supplier.getId()).orElse(null);
		if(existingSupplier != null) {
			existingSupplier.setUpdatedBy(supplier.getUpdatedBy());
			existingSupplier.setUpdatedAt(LocalDateTime.now());
			existingSupplier.setProvince(supplier.getProvince());
			existingSupplier.setIvaCondition(supplier.getIvaCondition());
			existingSupplier.setBusinessName(supplier.getBusinessName());
			existingSupplier.setImageUrl(supplier.getImageUrl());
			existingSupplier.setBuisnessWebpage(supplier.getBuisnessWebpage());
			existingSupplier.setBuisnessEmail(supplier.getBuisnessEmail());
			existingSupplier.setBuisnessPhone(supplier.getBuisnessPhone());
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