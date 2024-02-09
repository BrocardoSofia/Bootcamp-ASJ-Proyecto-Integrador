package com.bootcamp.integrador.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bootcamp.integrador.models.PurchaseOrderModel;
import com.bootcamp.integrador.services.PurchaseOrderService;

@RestController
@RequestMapping("/purchase-orders")
@CrossOrigin(origins = "http://localhost:4200")
public class PurchaseOrderController {
	@Autowired
	PurchaseOrderService purchaseOrderService;
	
	//obtener todas las ordenes de compra
	@GetMapping()
    public Page<PurchaseOrderModel> getPurchaseOrders(Pageable pageable) {
        return purchaseOrderService.getPurchaseOrders(pageable);
    }
	
	//obtener ordenes de compra por proveedor
	@GetMapping("/bySupplier/{supplierId}")
    public Page<PurchaseOrderModel> getPurchaseOrdersBySupplierId(Pageable pageable,
    																@PathVariable int supplierId) {
        return purchaseOrderService.getPurchaseOrdersBySupplierId(pageable, supplierId);
    }
	
	//obtener ordenes de compra por usuario
	@GetMapping("/byUser/{userId}")
    public Page<PurchaseOrderModel> getPurchaseOrdersByUserId(Pageable pageable,
    																@PathVariable int userId) {
        return purchaseOrderService.getPurchaseOrdersByUserId(pageable, userId);
    }
	
	//modificar orden de compra
	@PostMapping()
    public ResponseEntity<PurchaseOrderModel> addPurchaseOrder(@RequestBody PurchaseOrderModel purchaseOrder){
		PurchaseOrderModel purchaseOrderAdded = purchaseOrderService.addPurchaseOrder(purchaseOrder);
    	
    	if(purchaseOrderAdded == null) {
    		return new ResponseEntity<>(purchaseOrderAdded, HttpStatus.CONFLICT);
    	}else {
    		return new ResponseEntity<>(purchaseOrderAdded, HttpStatus.CREATED);
    	}
    }
	
	//agregar orden de compra
    @PutMapping()
    public ResponseEntity<PurchaseOrderModel> updatePurchaseOrder(@RequestBody PurchaseOrderModel purchaseOrder) {
    	PurchaseOrderModel updatedPurchaseOrder = purchaseOrderService.updatePurchaseOrder(purchaseOrder);

    	if(updatedPurchaseOrder == null) {
    		return new ResponseEntity<>(updatedPurchaseOrder, HttpStatus.CONFLICT);
    	}else {
    		return new ResponseEntity<>(updatedPurchaseOrder, HttpStatus.OK);
    	}
    }
    
    //encontrar la ultima orden de compra de un proveedor
    @GetMapping("/last-purchaseOrderNumber")
    public int getLastPurchaseOrderNumber() {
        return purchaseOrderService.getLastPurchaseOrderNumber();
    }
}
