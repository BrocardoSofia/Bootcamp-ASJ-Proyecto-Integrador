package com.bootcamp.integrador.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.integrador.models.ProductCategoryModel;

public interface ProductCategoryRepository extends JpaRepository<ProductCategoryModel, Integer> {
    ProductCategoryModel findByCategory(String category);
}