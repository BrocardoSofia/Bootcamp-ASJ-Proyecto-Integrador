package com.bootcamp.integrador.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.bootcamp.integrador.models.SupplierHistoryModel;

public interface SupplierHistoryRepository extends JpaRepository<SupplierHistoryModel, Integer>{
	Page<SupplierHistoryModel> findAllBySupplierId(int supplierId, Pageable pageable);
	Page<SupplierHistoryModel> findAllByUserId(int userId, Pageable pageable);
	List<SupplierHistoryModel> findAllBySupplierId(int supplierId);
	List<SupplierHistoryModel> findAllByUserId(int userId);
}
