package com.bootcamp.integrador.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.bootcamp.integrador.models.ProductCategoryModel;

public interface ProductCategoryRepository extends JpaRepository<ProductCategoryModel, Integer> {
    ProductCategoryModel findByCategory(String category);

    Page<ProductCategoryModel> findAllByCategoryContainingIgnoreCase(String category, Pageable pageable);
    Page<ProductCategoryModel> findAllByDeletedAtIsNullAndCategoryContainingIgnoreCase(String category, Pageable pageable);
    Page<ProductCategoryModel> findAllByDeletedAtIsNotNullAndCategoryContainingIgnoreCase(String category, Pageable pageable);
    Page<ProductCategoryModel> findAllByDeletedAtIsNull(Pageable pageable);
    Page<ProductCategoryModel> findAllByDeletedAtIsNotNull(Pageable pageable);
    
    boolean existsByCategory(String category);
    
    boolean existsByCategoryIgnoreCaseAndSupplierCategoryId(String category, int supplierCategoryId);
    
    @Query("SELECT pc FROM ProductCategoryModel pc JOIN FETCH pc.supplierCategory WHERE pc.category = :category")
    Page<ProductCategoryModel> findAllByCategoryWithSupplierCategory(String category, Pageable pageable);
}