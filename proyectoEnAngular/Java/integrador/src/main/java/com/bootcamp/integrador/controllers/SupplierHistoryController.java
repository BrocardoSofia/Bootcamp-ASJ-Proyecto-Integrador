package com.bootcamp.integrador.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bootcamp.integrador.models.SupplierHistoryModel;
import com.bootcamp.integrador.services.SupplierHistoryService;

@RestController
@RequestMapping("/supplier-history") //localhost:8080/users
@CrossOrigin(origins = "http://localhost:4200")
public class SupplierHistoryController {
	@Autowired
	SupplierHistoryService supplierHistoryService;
	
	//obtener historial de un proveedor
	@GetMapping("/supplier/{id}")
	public Page<SupplierHistoryModel> getsupplierHistory(Pageable pageable, @PathVariable int id){
		return supplierHistoryService.getSupplierHistoryBySupplierId(pageable, id);
	}
	
	//obtener historial de un usuario
	@GetMapping("/user/{id}")
	public Page<SupplierHistoryModel> getsupplierHistoryByUserId(Pageable pageable, @PathVariable int id){
		return supplierHistoryService.getSupplierHistoryByUserId(pageable, id);
	}
}
