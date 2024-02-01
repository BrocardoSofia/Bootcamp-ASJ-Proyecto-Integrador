package com.bootcamp.integrador.services;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.integrador.models.SupplierContactModel;
import com.bootcamp.integrador.repositories.SupplierContactRepository;

import jakarta.transaction.Transactional;


@Service
public class SupplierContactService {
	@Autowired
	SupplierContactRepository supplierContactRepository;
	
	@Transactional
	public SupplierContactModel addSupplierContact(SupplierContactModel supplierContact) {
		SupplierContactModel supplierContactSaved = supplierContactRepository.save(supplierContact);
		
		return supplierContactSaved;
	}
	
	public SupplierContactModel deleteSupplierContact(int id) {
		SupplierContactModel supplierContactDeleted = supplierContactRepository.findById(id).get();
		
		if(supplierContactDeleted != null) {
			supplierContactDeleted.setDeletedAt(LocalDateTime.now());
			supplierContactDeleted = supplierContactRepository.save(supplierContactDeleted);
		}
		
		return supplierContactDeleted;
	}
	
	public SupplierContactModel updateSupplierContact(SupplierContactModel supplierContact) {
		SupplierContactModel supplierContactUpdated = supplierContactRepository.findById(supplierContact.getId()).get();
		
		if(supplierContactUpdated != null) {
			supplierContactUpdated.setContactLastname(supplierContact.getContactLastname());
			supplierContactUpdated.setContactName(supplierContact.getContactName());
			supplierContactUpdated.setEmail(supplierContact.getEmail());
			supplierContactUpdated.setPhone(supplierContact.getPhone());
			supplierContactUpdated.setRol(supplierContact.getRol());
			supplierContactUpdated.setUpdatedAt(LocalDateTime.now());
			supplierContactUpdated = supplierContactRepository.save(supplierContactUpdated);
		}
		
		return supplierContactUpdated;
	}
	
	/*	
	
	*/
}
