package com.bootcamp.integrador.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
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

import com.bootcamp.integrador.models.SupplierCategoryCount;
import com.bootcamp.integrador.models.SupplierCategoryModel;
import com.bootcamp.integrador.models.UserModel;
import com.bootcamp.integrador.services.SupplierCategoryService;

@RestController
@RequestMapping("/supplier-categories")
@CrossOrigin(origins = "http://localhost:4200")
public class SupplierCategoryController {
    @Autowired
    SupplierCategoryService supplierCategoryService;

    @GetMapping()
    public Page<SupplierCategoryModel> getSupplierCategories(Pageable pageable, 
											@RequestParam(required = false, defaultValue = "") String category) {
        return supplierCategoryService.getSupplierCategories(pageable, category);
    }
    
    //obtener usuarios activos
    @GetMapping("/active")
	public Page<SupplierCategoryModel> getActiveCategories(Pageable pageable, 
											@RequestParam(required = false, defaultValue = "") String category) {		
		
		return supplierCategoryService.getActiveCategories(pageable, category);
	}
    
    //obtener usuario eliminados
    @GetMapping("/deleted")
	public Page<SupplierCategoryModel> getDeletedCategories(Pageable pageable, 
											@RequestParam(required = false, defaultValue = "") String category) {		
		
		return supplierCategoryService.getDeletedCategories(pageable, category);
	}

    @GetMapping("/{id}")
    public ResponseEntity<Optional<SupplierCategoryModel>> getSupplierCategoryById(@PathVariable int id) {
        Optional<SupplierCategoryModel> foundSupplierCategory = supplierCategoryService.getSupplierCategoryById(id);

        if (foundSupplierCategory.isEmpty()) {
            return new ResponseEntity<>(foundSupplierCategory, HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(foundSupplierCategory, HttpStatus.FOUND);
        }
    }
    
    @GetMapping("/counts")
    public List<SupplierCategoryCount> getSupplierCategoryCounts() {
        return supplierCategoryService.supplierCategoryCounts();
    }

    @PostMapping()
    public ResponseEntity<SupplierCategoryModel> addSupplierCategory(@RequestBody SupplierCategoryModel supplierCategory) {
        SupplierCategoryModel supplierCategoryAdded = supplierCategoryService.addSupplierCategory(supplierCategory);
        if (supplierCategoryAdded == null) {
            return new ResponseEntity<>(supplierCategoryAdded, HttpStatus.CONFLICT);
        } else {
            return new ResponseEntity<>(supplierCategoryAdded, HttpStatus.CREATED);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<SupplierCategoryModel> deleteSupplierCategory(@PathVariable int id) {
    	SupplierCategoryModel deleted = supplierCategoryService.deleteSupplierCategory(id);
        if (deleted != null) {
            return new ResponseEntity<>(deleted, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(deleted, HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping()
    public ResponseEntity<SupplierCategoryModel> updateSupplierCategory(@RequestBody SupplierCategoryModel supplierCategory) {
        SupplierCategoryModel updatedSupplierCategory = supplierCategoryService.updateSupplierCategory(supplierCategory);
        if (updatedSupplierCategory == null) {
            return new ResponseEntity<>(updatedSupplierCategory, HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(updatedSupplierCategory, HttpStatus.OK);
        }
    }

    @DeleteMapping("/{id}/reInsert")
    public ResponseEntity<Boolean> reInsertSupplierCategory(@PathVariable int id) {
    	boolean undeleted = supplierCategoryService.reInsertSupplierCategory(id);
        if (undeleted) {
            return new ResponseEntity<>(undeleted, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(undeleted, HttpStatus.NOT_FOUND);
        }
    }
    
    @GetMapping("/exist/{category}")
    public boolean checkIfSupplierCategoryExists(@PathVariable String category) {
        return supplierCategoryService.checkIfSupplierCategoryExists(category);
    }
}