package com.bootcamp.integrador.services;

import java.time.LocalDateTime;
import java.util.Optional;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.bootcamp.integrador.models.SupplierModel;
import com.bootcamp.integrador.repositories.SupplierRepository;

import jakarta.transaction.Transactional;

@Service
public class SupplierService {
	@Autowired
	SupplierRepository supplierRepository;
	
	@Autowired
	SupplierHistoryService supplierHistoryService;
	
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
	public Page<SupplierModel> getActiveSuppliers(Pageable pageable, String businessName, String supplierCode,
			    									int supplierCategoryId){
		Page<SupplierModel> page;
		
		if(supplierCategoryId <= 0) {
			page = supplierRepository.findAllByDeletedAtIsNullAndBusinessNameContainingIgnoreCaseAndSupplierCodeContainingIgnoreCase(
																								businessName, supplierCode, pageable);
		}else {
			page = supplierRepository.findAllBySupplierCategoryIdAndDeletedAtIsNullAndBusinessNameContainingIgnoreCaseAndSupplierCodeContainingIgnoreCase(
					supplierCategoryId, 
					 businessName, 
					 supplierCode,
					 pageable);
		}
		return page;
	}
	
	//obtener proveedores eliminados
	public Page<SupplierModel> getDeletedSuppliers(Pageable pageable, String businessName, String supplierCode,
													int supplierCategoryId){
		Page<SupplierModel> page;
		
		if(supplierCategoryId <= 0) {
			page = supplierRepository.findAllByDeletedAtIsNotNullAndBusinessNameContainingIgnoreCaseAndSupplierCodeContainingIgnoreCase(
					businessName, supplierCode, pageable);
		}else {
			page = supplierRepository.findAllBySupplierCategoryIdAndDeletedAtIsNotNullAndBusinessNameContainingIgnoreCaseAndSupplierCodeContainingIgnoreCase(
					supplierCategoryId, 
					 businessName, 
					 supplierCode,
					 pageable);
		}
		return page;
	}
	
	//obtener un proveedor segun su id
	public Optional<SupplierModel> getSupplierById(int id){
		return supplierRepository.findById(id);
	}
	
	//insertar proveedor
	@Transactional
	public SupplierModel addSupplier(SupplierModel supplier) {
		SupplierModel findSupplierByName = supplierRepository.findAllByBusinessName(supplier.getBusinessName());
		SupplierModel findSupplierByCode = supplierRepository.findAllBySupplierCode(supplier.getSupplierCode());
		SupplierModel supplierAdded = null;
		
		if((findSupplierByName == null) && (findSupplierByCode == null)) {
	        //guardo al proveedor
	        supplierAdded = supplierRepository.save(supplier);
	        //registro el cambio en el historial
	        supplierHistoryService.addSupplierHistory((supplierAdded.getCreatedBy()).getId(), supplierAdded.getId(), "created", "supplier created", "---");
	    }
		
		return supplierAdded;
	}
	
	//eliminar proveedor
	public SupplierModel deleteSupplier(int supplierId) {
		SupplierModel supplierDeleted = supplierRepository.findById(supplierId).get();
		if(supplierDeleted != null) {			
			supplierHistoryService.addSupplierHistory((supplierDeleted.getCreatedBy()).getId(), supplierId, "deleted", "supplier deleted" , supplierDeleted.toString());
			
			supplierDeleted.setDeletedAt(LocalDateTime.now());
			System.out.println(supplierDeleted.toString());
			
			supplierDeleted = supplierRepository.save(supplierDeleted);
		}
		return supplierDeleted;
	}
	
	//reingresar proveedor
	public boolean reInsertSupplier(int supplierId) {
		Optional<SupplierModel> foundSupplier = supplierRepository.findById(supplierId);

        if (foundSupplier.isPresent()) {
        	SupplierModel undeletedSupplier = foundSupplier.get();
        	supplierHistoryService.addSupplierHistory((undeletedSupplier.getCreatedBy()).getId(), supplierId, "re inserted", "supplier re inserted" , undeletedSupplier.toString());
        	
        	undeletedSupplier.setDeletedAt(null);
        	
        	supplierRepository.save(undeletedSupplier);
            return true;
        } else {
            return false;
        }
	}
	
	//modificar proveedor
	public SupplierModel updateSupplier(SupplierModel supplier, int userId) {
		SupplierModel existingSupplier = supplierRepository.findById(supplier.getId()).orElse(null);
		String oldBusinessName = existingSupplier.getBusinessName();
		SupplierModel existBusinessName	= supplierRepository.findAllByBusinessName(supplier.getBusinessName());
		
		if(existingSupplier != null && ((existBusinessName == null)||(oldBusinessName.equals(supplier.getBusinessName())))) {
			supplierHistoryService.addSupplierHistory((existingSupplier.getCreatedBy()).getId(), supplier.getId(), "updated", getChanges(existingSupplier, supplier) , existingSupplier.toString());
			existingSupplier.setSupplierCode(supplier.getSupplierCode());
			existingSupplier.setSupplierCategory(supplier.getSupplierCategory());
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
	
	private String getChanges(SupplierModel oldSupplier, SupplierModel newSupplier) {
		String changes = "";
		
		if(!oldSupplier.getSupplierCode().equals(newSupplier.getSupplierCode())) {
			changes += "Supplier code: " + newSupplier.getSupplierCode()+"|";
		}
		
		if(oldSupplier.getProvince().getId() != newSupplier.getProvince().getId()) {
			changes += "Province: " + newSupplier.getProvince().getProvince()+"|";
		}
		
		if(oldSupplier.getSupplierCategory().getId() != newSupplier.getSupplierCategory().getId()) {
			changes += "Supplier category: " + newSupplier.getSupplierCategory().getCategory()+"|";
		}
		
		if(oldSupplier.getIvaCondition().getId() != newSupplier.getIvaCondition().getId()) {
			changes += "Iva Condition: " + newSupplier.getIvaCondition().getIvaCondition()+"|";
		}
		
		if(!oldSupplier.getBusinessName().equals(newSupplier.getBusinessName())) {
			changes += "Business Name: " + newSupplier.getBusinessName()+"|";
		}
		
		if(oldSupplier.getImageUrl() != null) {
			if(!oldSupplier.getImageUrl().equals(newSupplier.getImageUrl())) {
				changes += "Image Url: " + newSupplier.getImageUrl()+"|";
			}
		}else if(newSupplier.getImageUrl() != null) {
			changes += "Image Url: " + newSupplier.getImageUrl()+"|";
		}
		
		if(oldSupplier.getBusinessWebpage() != null) {
			if(!oldSupplier.getBusinessWebpage().equals(newSupplier.getBusinessWebpage())) {
				changes += "Business Web page: " + newSupplier.getBusinessWebpage()+"|";
			}
		}else if(newSupplier.getBusinessWebpage() != null){
			changes += "Business Web page: " + newSupplier.getBusinessWebpage()+"|";
		}
		
		if(!oldSupplier.getBusinessEmail().equals(newSupplier.getBusinessEmail())) {
			changes += "Business Email: " + newSupplier.getBusinessEmail()+"|";
		}
		
		if(!oldSupplier.getBusinessPhone().equals(newSupplier.getBusinessPhone())) {
			changes += "Business Phone: " + newSupplier.getBusinessPhone()+"|";
		}
		
		if(!oldSupplier.getStreetName().equals(newSupplier.getStreetName())) {
			changes += "Street Name: " + newSupplier.getStreetName()+"|";
		}
		
		if(oldSupplier.getStreetNumber() != newSupplier.getStreetNumber()) {
			changes += "Street Number: " + newSupplier.getStreetNumber()+"|";
		}
		
		if(!oldSupplier.getCity().equals(newSupplier.getCity())) {
			changes += "City: " + newSupplier.getCity()+"|";
		}
		
		if(!oldSupplier.getCp().equals(newSupplier.getCp())) {
			changes += "Cp: " + newSupplier.getCp()+"|";
		}
		
		if(!oldSupplier.getCuit().equals(newSupplier.getCuit())) {
			changes += "Cuit: " + newSupplier.getCuit()+"|";
		}
		
		return changes;
	}
}
