package com.bootcamp.integrador.repositories;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.integrador.models.PurchaseOrderModel;

public interface PurchaseOrderRepository extends JpaRepository<PurchaseOrderModel, Integer>{
	Page<PurchaseOrderModel> findAll(Pageable pageable);
	Page<PurchaseOrderModel> findAllBySupplierId(Pageable pageable, int supplierId);
	Page<PurchaseOrderModel> findAllByCreatedBy(Pageable pageable, int userId);
	PurchaseOrderModel findFirstBySupplierIdOrderByCreatedAtDesc(int supplierId);
}
