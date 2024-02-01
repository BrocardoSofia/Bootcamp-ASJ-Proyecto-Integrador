package com.bootcamp.integrador.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.integrador.models.PurchaseOrderProductModel;

public interface PurchaseOrderProductRepository extends JpaRepository<PurchaseOrderProductModel, Integer>{

}
