package com.bootcamp.integrador.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bootcamp.integrador.models.PurchaseStateModel;
import com.bootcamp.integrador.services.PurchaseStateService;

@RestController
@RequestMapping("/purchase-state") //localhost:8080/purchase-state
@CrossOrigin(origins = "http://localhost:4200")
public class PurchaseStateController {
	@Autowired
	PurchaseStateService purchaseStateService;
	
	//obtener estados de compra
	@GetMapping()
	public List<PurchaseStateModel> getPurchaseStates() {
		return purchaseStateService.getPurchaseStates();
	}
	
	//obtener estado de compra por Id
    @GetMapping("/{id}")
    public ResponseEntity<Optional<PurchaseStateModel>> getPurchaseStateById(@PathVariable int id){
    	Optional<PurchaseStateModel> foundPurchaseState = purchaseStateService.getPurchaseStateById(id);
    	
    	if(foundPurchaseState.isEmpty()) {
    		return new ResponseEntity<>(foundPurchaseState, HttpStatus.NOT_FOUND);
    	}else {
    		return new ResponseEntity<>(foundPurchaseState, HttpStatus.FOUND);
    	}    	
    }
	
	//cargar estado de compra
    @PostMapping()
    public ResponseEntity<PurchaseStateModel> addPurchaseState(@RequestBody PurchaseStateModel purchaseState) {
    	PurchaseStateModel purchaseStateAdded = purchaseStateService.addPurchaseState(purchaseState);
        return new ResponseEntity<>(purchaseStateAdded, HttpStatus.CREATED);
    }
}
