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

import com.bootcamp.integrador.models.ProductCategoryModel;
import com.bootcamp.integrador.services.ProductCategoryService;

@RestController
@RequestMapping("/product-categories")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductCategoryController {
    @Autowired
    ProductCategoryService productCategoryService;

    @GetMapping()
    public List<ProductCategoryModel> getProductCategories() {
        return productCategoryService.getProductCategories();
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
    public ResponseEntity<Boolean> deleteProductCategory(@PathVariable int id) {
        boolean deleted = productCategoryService.deleteProductCategory(id);
        if (deleted) {
            return new ResponseEntity<>(true, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductCategoryModel> updateProductCategory(@PathVariable int id, 
    																	@RequestBody ProductCategoryModel productCategory) {
        ProductCategoryModel updatedProductCategory = productCategoryService.updateProductCategory(id, productCategory);
        if (updatedProductCategory == null) {
            return new ResponseEntity<>(updatedProductCategory, HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(updatedProductCategory, HttpStatus.OK);
        }
    }

    @PostMapping("/{id}/undelete")
    public ResponseEntity<Boolean> undeleteProductCategory(@PathVariable int id) {
        boolean undeleted = productCategoryService.undeleteProductCategory(id);
        if (undeleted) {
            return new ResponseEntity<>(true, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
        }
    }
}
