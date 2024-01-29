package com.bootcamp.integrador.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.integrador.models.SupplierCategoryModel;

public interface SupplierCategoryRepository extends JpaRepository<SupplierCategoryModel, Integer> {
    SupplierCategoryModel findByCategory(String category);
}
