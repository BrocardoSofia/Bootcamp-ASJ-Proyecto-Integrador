package com.bootcamp.integrador.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bootcamp.integrador.models.ProductHistoryModel;
import com.bootcamp.integrador.services.ProductHistoryService;

@RestController
@RequestMapping("/product-history") //localhost:8080/product-history
@CrossOrigin(origins = "http://localhost:4200")
public class ProductHistoryController {
	@Autowired
	ProductHistoryService productHistoryService;
	
	//obtener historial de un producto
	@GetMapping("/product/{id}")
	public Page<ProductHistoryModel> getProductHistoryByProductId(Pageable pageable, @PathVariable int id){
		return productHistoryService.getProductHistoryByProductId(pageable, id);
	}
	
	//obtener historial de un usuario
	@GetMapping("/user/{id}")
	public Page<ProductHistoryModel> getProductHistoryByUserId(Pageable pageable, @PathVariable int id){
		return productHistoryService.getProductHistoryByUserId(pageable, id);
	}

}
