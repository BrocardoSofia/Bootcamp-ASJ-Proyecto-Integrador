package com.bootcamp.integrador.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.integrador.models.PurchaseOrderProductModel;
import com.bootcamp.integrador.repositories.PurchaseOrderProductRepository;

import jakarta.transaction.Transactional;

@Service
public class PurchaseOrderProductService {
	@Autowired
	PurchaseOrderProductRepository purchaseOrderProductRepository;
	
	@Transactional
    public PurchaseOrderProductModel addPurchaseOrderProduct(PurchaseOrderProductModel purchaseOrderProduct) {
		PurchaseOrderProductModel purchaseOrderProductAdded = purchaseOrderProductRepository.save(purchaseOrderProduct);

        return purchaseOrderProductAdded;
    }
	
}
