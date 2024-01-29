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

    public List<PurchaseStateModel> getPurchaseStates() {
        return purchaseStateRepository.findAll();
    }

    public Optional<PurchaseStateModel> getPurchaseStateById(int id) {
        return purchaseStateRepository.findById(id);
    }

    public PurchaseStateModel addPurchaseState(PurchaseStateModel purchaseState) {
        PurchaseStateModel findPurchaseState = purchaseStateRepository.findByPurchaseState(purchaseState.getPurchaseState());

        if (findPurchaseState == null) {
            purchaseStateRepository.save(purchaseState);
            findPurchaseState = purchaseStateRepository.findByPurchaseState(purchaseState.getPurchaseState());
        } else {
            findPurchaseState = null;
        }

        return purchaseState;
    }
}
