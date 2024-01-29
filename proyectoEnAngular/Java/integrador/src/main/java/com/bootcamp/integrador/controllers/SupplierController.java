package com.bootcamp.integrador.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bootcamp.integrador.services.SupplierService;

@RestController
@RequestMapping("/suppliers") //localhost:8080/suppliers
@CrossOrigin(origins = "http://localhost:4200")
public class SupplierController {
	@Autowired
	SupplierService supplierService;
	
	
}
