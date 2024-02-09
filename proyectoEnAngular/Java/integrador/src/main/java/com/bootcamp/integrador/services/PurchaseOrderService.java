package com.bootcamp.integrador.services;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.bootcamp.integrador.models.PurchaseOrderModel;
import com.bootcamp.integrador.models.SupplierModel;
import com.bootcamp.integrador.repositories.PurchaseOrderRepository;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;

@Service
public class PurchaseOrderService {
	@Autowired
	PurchaseOrderRepository purchaseOrderRepository;
	
	//obtener todas las ordenes de compra
	public Page<PurchaseOrderModel> getPurchaseOrders(Pageable pageable){
		return purchaseOrderRepository.findAll(pageable);
	}
	
	//obtener ordenes de compra por proveedor
	public Page<PurchaseOrderModel> getPurchaseOrdersBySupplierId(Pageable pageable, int supplierId){
		return purchaseOrderRepository.findAllBySupplierId(pageable, supplierId);
	}
	
	//obtener ordenes de compra por usuario
	public Page<PurchaseOrderModel> getPurchaseOrdersByUserId(Pageable pageable, int userId){
		return purchaseOrderRepository.findAllByCreatedBy(pageable, userId);
	}
	
	//modificar orden de compra
	public PurchaseOrderModel updatePurchaseOrder(PurchaseOrderModel purchaseOrder){
		PurchaseOrderModel purchaseOrderFound = purchaseOrderRepository.findById(purchaseOrder.getId()).get();
		
		if(purchaseOrderFound != null) {
			purchaseOrderFound.setPurchaseState(purchaseOrder.getPurchaseState());
			purchaseOrderFound.setDeliveryDate(purchaseOrder.getDeliveryDate());
			purchaseOrderFound.setReceptionInfo(purchaseOrder.getReceptionInfo());
			purchaseOrderFound.setUpdatedAt(LocalDateTime.now());
			
			purchaseOrderFound = purchaseOrderRepository.save(purchaseOrderFound);
			
			return purchaseOrderFound;
		}
		
		return null;
	}
	
	//agregar orden de compra
	public PurchaseOrderModel addPurchaseOrder(PurchaseOrderModel purchaseOrder){
		return purchaseOrderRepository.save(purchaseOrder);
	}
	
	//encontrar la ultima orden de compra de un proveedor
	public int getLastPurchaseOrderNumber() {
	    return (int) purchaseOrderRepository.count() + 1;
	}
	
	//obtener un proveedor segun su id
	public Optional<PurchaseOrderModel> getPurchaseOrderById(int id){
		return purchaseOrderRepository.findById(id);
	}
}
