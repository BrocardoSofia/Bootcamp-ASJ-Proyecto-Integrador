package com.bootcamp.integrador.controllers;

import java.util.List;
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

import com.bootcamp.integrador.models.ProductCategoryModel;
import com.bootcamp.integrador.services.ProductCategoryService;

@RestController
@RequestMapping("/product-categories")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductCategoryController {
    @Autowired
    ProductCategoryService productCategoryService;

    @GetMapping()
    public Page<ProductCategoryModel> getProductCategories(Pageable pageable, 
											@RequestParam(required = false, defaultValue = "") String category) {
        return productCategoryService.getProductCategories(pageable, category);
    }
    
    //obtener categorias activas
    @GetMapping("/active")
	public Page<ProductCategoryModel> getActiveCategories(Pageable pageable, 
											@RequestParam(required = false, defaultValue = "") String category) {		
		
		return productCategoryService.getActiveCategories(pageable, category);
	}
    
    //obtener categorias eliminadas
    @GetMapping("/deleted")
	public Page<ProductCategoryModel> getDeletedCategories(Pageable pageable, 
											@RequestParam(required = false, defaultValue = "") String category) {		
		
		return productCategoryService.getDeletedCategories(pageable, category);
	}

    @GetMapping("/{id}")
    public ResponseEntity<Optional<ProductCategoryModel>> getProductCategoryById(@PathVariable int id) {
        Optional<ProductCategoryModel> foundProductCategory = productCategoryService.getProductCategoryById(id);

        if (foundProductCategory.isEmpty()) {
            return new ResponseEntity<>(foundProductCategory, HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(foundProductCategory, HttpStatus.FOUND);
        }
    }
    
    @GetMapping("/exists/{supplierCategoryId}/{category}")
    public ResponseEntity<Boolean> categoryExists( @PathVariable int supplierCategoryId,
            										@PathVariable String category) {
        boolean exists = productCategoryService.categoryExistsForSupplier(supplierCategoryId, category);
        return ResponseEntity.ok(exists);
    }

    @PostMapping()
    public ResponseEntity<ProductCategoryModel> addProductCategory(@RequestBody ProductCategoryModel productCategory) {
        ProductCategoryModel productCategoryAdded = productCategoryService.addProductCategory(productCategory);
        if (productCategoryAdded == null) {
            return new ResponseEntity<>(productCategoryAdded, HttpStatus.CONFLICT);
        } else {
            return new ResponseEntity<>(productCategoryAdded, HttpStatus.CREATED);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ProductCategoryModel> deleteProductCategory(@PathVariable int id) {
    	ProductCategoryModel deleted = productCategoryService.deleteProductCategory(id);
        if (deleted != null) {
            return new ResponseEntity<>(deleted, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(deleted, HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping()
    public ResponseEntity<ProductCategoryModel> updateProductCategory(@RequestBody ProductCategoryModel productCategory) {
        ProductCategoryModel updatedProductCategory = productCategoryService.updateProductCategory(productCategory);
        if (updatedProductCategory == null) {
            return new ResponseEntity<>(updatedProductCategory, HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(updatedProductCategory, HttpStatus.OK);
        }
    }

    @DeleteMapping("/{id}/reInsert")
    public ResponseEntity<Boolean> reInsertProductCategory(@PathVariable int id) {
        boolean reInsert = productCategoryService.reInsertProductCategory(id);
        if (reInsert) {
            return new ResponseEntity<>(true, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
        }
    }
}
