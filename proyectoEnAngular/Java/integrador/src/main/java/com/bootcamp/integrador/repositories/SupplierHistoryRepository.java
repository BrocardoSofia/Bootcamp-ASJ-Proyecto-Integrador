package com.bootcamp.integrador.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.bootcamp.integrador.models.SupplierHistoryModel;

public interface SupplierHistoryRepository extends JpaRepository<SupplierHistoryModel, Integer>{
	Page<SupplierHistoryModel> findBySupplierId(int supplierId, Pageable pageable);
	Page<SupplierHistoryModel> findByUserId(int userId, Pageable pageable);
}
