package com.bootcamp.integrador.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
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
import org.springframework.web.bind.annotation.RestController;

import com.bootcamp.integrador.models.SupplierCategoryModel;
import com.bootcamp.integrador.services.SupplierCategoryService;

@RestController
@RequestMapping("/supplier-categories")
@CrossOrigin(origins = "http://localhost:4200")
public class SupplierCategoryController {
    @Autowired
    SupplierCategoryService supplierCategoryService;

    @GetMapping()
    public List<SupplierCategoryModel> getSupplierCategories() {
        return supplierCategoryService.getSupplierCategories();
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
    public ResponseEntity<Boolean> deleteSupplierCategory(@PathVariable int id) {
        boolean deleted = supplierCategoryService.deleteSupplierCategory(id);
        if (deleted) {
            return new ResponseEntity<>(true, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<SupplierCategoryModel> updateSupplierCategory(@PathVariable int id, 
    																	@RequestBody SupplierCategoryModel supplierCategory) {
        SupplierCategoryModel updatedSupplierCategory = supplierCategoryService.updateSupplierCategory(id, supplierCategory);
        if (updatedSupplierCategory == null) {
            return new ResponseEntity<>(updatedSupplierCategory, HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(updatedSupplierCategory, HttpStatus.OK);
        }
    }

    @PostMapping("/{id}/undelete")
    public ResponseEntity<Boolean> undeleteSupplierCategory(@PathVariable int id) {
        boolean undeleted = supplierCategoryService.undeleteSupplierCategory(id);
        if (undeleted) {
            return new ResponseEntity<>(true, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
        }
    }
}