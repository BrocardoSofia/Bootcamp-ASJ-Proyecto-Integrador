package com.bootcamp.integrador.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bootcamp.integrador.models.ProductImageModel;
import com.bootcamp.integrador.services.ProductImageService;

@RestController
@RequestMapping("/product-images") //localhost:8080/product-images
@CrossOrigin(origins = "http://localhost:4200")
public class ProductImageController {
	@Autowired
	ProductImageService productImageService;
	
	//cargar imagen
    @PostMapping()
    public ResponseEntity<ProductImageModel> addProductImage(@RequestBody ProductImageModel productImage) {
    	ProductImageModel productImageAdded = productImageService.addProductImage(productImage);
        if(productImageAdded == null) {
        	return new ResponseEntity<>(productImageAdded, HttpStatus.CONFLICT);
        }else {
        	return new ResponseEntity<>(productImageAdded, HttpStatus.CREATED);
        }
    }
    
    //eliminar imagen
    @DeleteMapping("/{id}")
    public ResponseEntity<ProductImageModel> deleteProductImage(@PathVariable int id) {
    	ProductImageModel productImageDeleted = productImageService.deleteProductImage(id);
        if(productImageDeleted == null) {
        	return new ResponseEntity<>(productImageDeleted, HttpStatus.NOT_FOUND);
        }else {
        	return new ResponseEntity<>(productImageDeleted, HttpStatus.OK);
        }
    }
    
    //actualizar imagen
    @PostMapping()
    public ResponseEntity<ProductImageModel> updateProductImage(@RequestBody ProductImageModel productImage) {
    	ProductImageModel productImageAdded = productImageService.updateProductImage(productImage);
        if(productImageAdded == null) {
        	return new ResponseEntity<>(productImageAdded, HttpStatus.NOT_FOUND);
        }else {
        	return new ResponseEntity<>(productImageAdded, HttpStatus.OK);
        }
    }
}
