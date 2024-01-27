package com.bootcamp.integrador.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.integrador.models.PurchaseStateModel;
import com.bootcamp.integrador.repositories.PurchaseStateRepository;

@Service
public class PurchaseStateService {
	@Autowired
    PurchaseStateRepository purchaseStateRepository;
	
	//obtener estados de compra
	public List<PurchaseStateModel> getPurchaseStates() {
		return purchaseStateRepository.findAll();
	}
	
	//obtener estado de compra por Id
	public Optional<PurchaseStateModel> getPurchaseStateById(int id){
		return purchaseStateRepository.findById(id);
	}
	
	//cargar estado de compra
	public PurchaseStateModel addPurchaseState(PurchaseStateModel purchaseState){
		purchaseStateRepository.save(purchaseState);
		return purchaseState;
	}
}
