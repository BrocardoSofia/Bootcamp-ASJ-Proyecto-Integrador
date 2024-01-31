package com.bootcamp.integrador.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bootcamp.integrador.models.ProductModel;
import com.bootcamp.integrador.models.SupplierModel;
import com.bootcamp.integrador.services.ProductService;

@RestController
@RequestMapping("/products") //localhost:8080/products
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {
	@Autowired
	ProductService productService;
	
	//obtener todos los productos
	@GetMapping()
	public Page<ProductModel> getProducts(Pageable pageable, 
									@RequestParam(required = false, defaultValue = "") String productName,
									@RequestParam(required = false, defaultValue = "") String codeSKU,
									@RequestParam(required = false, defaultValue = "-1") int supplierId){
		return productService.getProducts(pageable, supplierId, codeSKU, productName);
	}
	
	//obtener productos activos
	@GetMapping("/active")
	public Page<ProductModel> getActiveProducts(Pageable pageable, 
									@RequestParam(required = false, defaultValue = "") String productName,
									@RequestParam(required = false, defaultValue = "") String codeSKU,
									@RequestParam(required = false, defaultValue = "-1") int supplierId){
		return productService.getActiveProducts(pageable, supplierId, codeSKU, productName);
	}
	
	//obtener productos eliminados
	@GetMapping("/deleted")
	public Page<ProductModel> getDeletedProducts(Pageable pageable, 
									@RequestParam(required = false, defaultValue = "") String productName,
									@RequestParam(required = false, defaultValue = "") String codeSKU,
									@RequestParam(required = false, defaultValue = "-1") int supplierId){
		return productService.getDeletedProducts(pageable, supplierId, codeSKU, productName);
	}
	
	//get por Id
	@GetMapping("/{id}")
	public ResponseEntity<Optional<ProductModel>> getProductById(@PathVariable int id){
		Optional<ProductModel> foundProduct = productService.getProductById(id);
		
		if(foundProduct.isEmpty()) {
			return new ResponseEntity<>(foundProduct, HttpStatus.NOT_FOUND);
		}else {
			return new ResponseEntity<>(foundProduct, HttpStatus.FOUND);
		}
	}
	
	//cargar nuevo producto
	
	//eliminar producto
	
	//reinsertar producto
	
	//modificar producto

}
