package com.bootcamp.integrador.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bootcamp.integrador.models.SupplierContactModel;
import com.bootcamp.integrador.services.SupplierContactService;

@RestController
@RequestMapping("/suppliers-contacts") //localhost:8080/suppliers-contacts
@CrossOrigin(origins = "http://localhost:4200")
public class SupplierContactController {
	@Autowired
	SupplierContactService supplierContactService;
	
	//cargar contacto
    @PostMapping()
    public ResponseEntity<SupplierContactModel> addSupplierContact(@RequestBody SupplierContactModel supplierContact){
    	SupplierContactModel supplierContactAdded = supplierContactService.addSupplierContact(supplierContact);
    	
    	if(supplierContactAdded == null) {
        	return new ResponseEntity<>(supplierContactAdded, HttpStatus.CONFLICT);
        }else {
        	return new ResponseEntity<>(supplierContactAdded, HttpStatus.CREATED);
        }
    }
    
    //eliminar contacto
    @DeleteMapping("/{id}")
    public ResponseEntity<SupplierContactModel> deleteSupplierContact(@PathVariable int id) {
    	SupplierContactModel supplierContactDeleted = supplierContactService.deleteSupplierContact(id);
    	
    	if(supplierContactDeleted == null) {
        	return new ResponseEntity<>(supplierContactDeleted, HttpStatus.NOT_FOUND);
        }else {
        	return new ResponseEntity<>(supplierContactDeleted, HttpStatus.OK);
        }
    }
    
    //actualizar contacto
    @PutMapping()
    public ResponseEntity<SupplierContactModel> deleteSupplierContact(@RequestBody SupplierContactModel supplierContact) {
    	SupplierContactModel supplierContactUpdated = supplierContactService.updateSupplierContact(supplierContact);
    	
    	if(supplierContactUpdated == null) {
        	return new ResponseEntity<>(supplierContactUpdated, HttpStatus.NOT_FOUND);
        }else {
        	return new ResponseEntity<>(supplierContactUpdated, HttpStatus.OK);
        }
    }

}
