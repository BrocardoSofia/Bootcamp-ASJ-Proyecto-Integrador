package com.bootcamp.integrador.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bootcamp.integrador.services.ProductService;

@RestController
@RequestMapping("/products") //localhost:8080/products
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {
	@Autowired
	ProductService productService;
	
	//obtener todos los productos
	
	//obtener productos activos
	
	//obtener productos eliminados
	
	//get por Id
	
	//cargar nuevo producto
	
	//eliminar producto
	
	//reinsertar producto
	
	//modificar producto

}
