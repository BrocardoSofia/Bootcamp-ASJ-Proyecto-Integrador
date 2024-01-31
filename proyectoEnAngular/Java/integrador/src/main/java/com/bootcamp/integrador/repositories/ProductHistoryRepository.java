package com.bootcamp.integrador.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.integrador.models.ProductHistoryModel;

public interface ProductHistoryRepository extends JpaRepository<ProductHistoryModel, Integer>{
	Page<ProductHistoryModel> findAllByProductId(int productId, Pageable pageable);
	Page<ProductHistoryModel> findAllByUserId(int userId, Pageable pageable);
}
