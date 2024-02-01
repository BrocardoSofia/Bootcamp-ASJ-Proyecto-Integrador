package com.bootcamp.integrador.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bootcamp.integrador.models.PurchaseOrderProductModel;
import com.bootcamp.integrador.services.PurchaseOrderProductService;

@RestController
@RequestMapping("/purchase-order-product")
@CrossOrigin(origins = "http://localhost:4200")
public class PurchaseOrderProductController {
	@Autowired
	PurchaseOrderProductService purchaseOrderProductService;
	
	@PostMapping()
    public ResponseEntity<PurchaseOrderProductModel> addPurchaseOrderProduct(@RequestBody PurchaseOrderProductModel purchaseOrderProduct) {
		PurchaseOrderProductModel purchaseOrderProductAdded = purchaseOrderProductService.addPurchaseOrderProduct(purchaseOrderProduct);
        if (purchaseOrderProductAdded == null) {
            return new ResponseEntity<>(purchaseOrderProductAdded, HttpStatus.CONFLICT);
        } else {
            return new ResponseEntity<>(purchaseOrderProductAdded, HttpStatus.CREATED);
        }
    }
}
