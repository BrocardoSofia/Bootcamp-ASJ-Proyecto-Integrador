package com.bootcamp.integrador.services;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.bootcamp.integrador.models.PurchaseOrderModel;
import com.bootcamp.integrador.repositories.PurchaseOrderRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;

@Service
public class PurchaseOrderService {
	@Autowired
	PurchaseOrderRepository purchaseOrderRepository;
	
	//obtener todas las ordenes de compra
	Page<PurchaseOrderModel> getPurchaseOrders(Pageable pageable){
		return purchaseOrderRepository.findAll(pageable);
	}
	
	//obtener ordenes de compra por proveedor
	Page<PurchaseOrderModel> getPurchaseOrdersBySupplierId(Pageable pageable, int supplierId){
		return purchaseOrderRepository.findAllBySupplierId(pageable, supplierId);
	}
	
	//obtener ordenes de compra por usuario
	Page<PurchaseOrderModel> getPurchaseOrdersByUserId(Pageable pageable, int userId){
		return purchaseOrderRepository.findAllByCreatedBy(pageable, userId);
	}
	
	//modificar orden de compra
	
	//agregar orden de compra
}
