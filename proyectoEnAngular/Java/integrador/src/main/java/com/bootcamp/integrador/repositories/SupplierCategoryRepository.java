package com.bootcamp.integrador.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.bootcamp.integrador.models.SupplierCategoryCount;
import com.bootcamp.integrador.models.SupplierCategoryModel;

public interface SupplierCategoryRepository extends JpaRepository<SupplierCategoryModel, Integer> {
    SupplierCategoryModel findByCategory(String category);
    
    @Query(value = "SELECT sc.name AS category_name, COUNT(*) AS count FROM supplier s JOIN supplier_category sc "
    				+ "ON s.supplier_category_id = sc.id GROUP BY sc.name", nativeQuery = true)
    List<SupplierCategoryCount> findSupplierCategoryCounts();
}
