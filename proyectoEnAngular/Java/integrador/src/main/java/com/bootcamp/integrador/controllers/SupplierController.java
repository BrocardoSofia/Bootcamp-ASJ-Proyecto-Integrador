package com.bootcamp.integrador.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bootcamp.integrador.models.SupplierModel;
import com.bootcamp.integrador.services.SupplierService;

@RestController
@RequestMapping("/suppliers") //localhost:8080/suppliers
@CrossOrigin(origins = "http://localhost:4200")
public class SupplierController {
	@Autowired
	SupplierService supplierService;
	
	//obtener todos los proveedores
    @GetMapping()
    public Page<SupplierModel> getSuppliers(Pageable pageable, 
									@RequestParam(required = false, defaultValue = "") String businessName,
									@RequestParam(required = false, defaultValue = "") String supplierCode,
									@RequestParam(required = false, defaultValue = "-1") int supplierCategoryId){
    	return supplierService.getSuppliers(pageable, businessName, supplierCode, supplierCategoryId);
    }
    
    //obtener proveedores activos
    @GetMapping("/active")
    public Page<SupplierModel> getActiveSuppliers(Pageable pageable, 
									@RequestParam(required = false, defaultValue = "") String businessName){
    	return supplierService.getActiveSuppliers(pageable, businessName);
    }
    
    //obtener proveedores eliminados
    @GetMapping("/deleted")
    public Page<SupplierModel> getDeletedSuppliers(Pageable pageable, 
									@RequestParam(required = false, defaultValue = "") String businessName){
    	return supplierService.getDeletedSuppliers(pageable, businessName);
    }
    
    //get por Id
    @GetMapping("/{id}")
    public ResponseEntity<Optional<SupplierModel>> getSupplierById(@PathVariable int id){
    	Optional<SupplierModel> foundSupplier = supplierService.getSupplierById(id);
    	
    	if(foundSupplier.isEmpty()) {
    		return new ResponseEntity<>(foundSupplier, HttpStatus.NOT_FOUND);
    	}else {
    		return new ResponseEntity<>(foundSupplier, HttpStatus.FOUND);
    	}
    }
    
    //cargar nuevo proveedor
    @PostMapping()
    public ResponseEntity<SupplierModel> addSupplier(@RequestBody SupplierModel supplier){
    	SupplierModel supplierAdded = supplierService.addSupplier(supplier);
    	
    	if(supplierAdded == null) {
    		return new ResponseEntity<>(supplierAdded, HttpStatus.CONFLICT);
    	}else {
    		return new ResponseEntity<>(supplierAdded, HttpStatus.CREATED);
    	}
    }
    
    //eliminar proveedor
    @DeleteMapping()
    public ResponseEntity<SupplierModel> deleteSupplier(@RequestBody SupplierModel supplier) {
    	SupplierModel deletedSupplier = supplierService.deleteSupplier(supplier);
        
        return new ResponseEntity<>(deletedSupplier, HttpStatus.OK);
    }
    
    //reinsertar proveedor
    @PutMapping("/reInsert")
    public ResponseEntity<Boolean> reInsertSupplier(@RequestBody SupplierModel supplier) {
    	boolean reInsert = supplierService.reInsertSupplier(supplier);
        if (reInsert) {
            return new ResponseEntity<>(true, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
        }
    }
    
    //modificar proveedor
    @PutMapping()
    public ResponseEntity<SupplierModel> updateSupplier(@RequestBody SupplierModel supplier) {
    	SupplierModel updatedSupplier = supplierService.updateSupplier(supplier);

    	if(updatedSupplier == null) {
    		return new ResponseEntity<>(updatedSupplier, HttpStatus.CONFLICT);
    	}else {
    		return new ResponseEntity<>(updatedSupplier, HttpStatus.CREATED);
    	}
    }
}
