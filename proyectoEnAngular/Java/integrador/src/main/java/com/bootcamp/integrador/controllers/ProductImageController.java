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
    	ProductImageModel ProductImageAdded = productImageService.addProductImage(productImage);
        if(ProductImageAdded == null) {
        	return new ResponseEntity<>(ProductImageAdded, HttpStatus.CONFLICT);
        }else {
        	return new ResponseEntity<>(ProductImageAdded, HttpStatus.CREATED);
        }
    }
    
    //eliminar imagen
    @DeleteMapping("/{id}")
    public ResponseEntity<ProductImageModel> deleteProductImage(@PathVariable int id) {
    	ProductImageModel ProductImageDeleted = productImageService.deleteProductImage(id);
        if(ProductImageDeleted == null) {
        	return new ResponseEntity<>(ProductImageDeleted, HttpStatus.NOT_FOUND);
        }else {
        	return new ResponseEntity<>(ProductImageDeleted, HttpStatus.OK);
        }
    }
    
    //actualizar imagen
    @PostMapping()
    public ResponseEntity<ProductImageModel> updateProductImage(@RequestBody ProductImageModel productImage) {
    	ProductImageModel ProductImageAdded = productImageService.updateProductImage(productImage);
        if(ProductImageAdded == null) {
        	return new ResponseEntity<>(ProductImageAdded, HttpStatus.NOT_FOUND);
        }else {
        	return new ResponseEntity<>(ProductImageAdded, HttpStatus.OK);
        }
    }
}
