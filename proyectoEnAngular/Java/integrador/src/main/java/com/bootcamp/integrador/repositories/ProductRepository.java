package com.bootcamp.integrador.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.bootcamp.integrador.models.ProductModel;

public interface ProductRepository extends JpaRepository<ProductModel, Integer>{
	Page<ProductModel> findAll(Pageable pageable);
	Page<ProductModel> findAllByCodeSKUContainingIgnoreCaseAndProductNameContainingIgnoreCaseAndProductDescriptionContainingIgnoreCase(
																								String codeSKU,
																								String productName, 
																								String productDescription, 
																								Pageable pageable);
	Page<ProductModel> findAllByProductCategoryIdAndCodeSKUContainingIgnoreCaseAndProductNameContainingIgnoreCaseAndProductDescriptionContainingIgnoreCase(
																								int productCategoryId,
																								String codeSKU,
																								String productName, 
																								String productDescription, 
																								Pageable pageable);
	Page<ProductModel> findAllByDeletedAtIsNullAndCodeSKUContainingIgnoreCaseAndProductNameContainingIgnoreCaseAndProductDescriptionContainingIgnoreCase(
																								String codeSKU,
																								String productName, 
																								String productDescription, 
																								Pageable pageable);
	Page<ProductModel> findAllByDeletedAtIsNullAndProductCategoryIdAndCodeSKUContainingIgnoreCaseAndProductNameContainingIgnoreCaseAndProductDescriptionContainingIgnoreCase(
																								int productCategoryId,
																								String codeSKU,
																								String productName, 
																								String productDescription, 
																								Pageable pageable);
	Page<ProductModel> findAllByDeletedAtIsNotNullAndCodeSKUContainingIgnoreCaseAndProductNameContainingIgnoreCaseAndProductDescriptionContainingIgnoreCase(
																								String codeSKU,
																								String productName, 
																								String productDescription, 
																								Pageable pageable);
	Page<ProductModel> findAllByDeletedAtIsNotNullAndProductCategoryIdAndCodeSKUContainingIgnoreCaseAndProductNameContainingIgnoreCaseAndProductDescriptionContainingIgnoreCase(
																								int productCategoryId,
																								String codeSKU,
																								String productName, 
																								String productDescription, 
																								Pageable pageable);
	ProductModel findAllByCodeSKU(String codeSKU);
	ProductModel findAllByProductName(String productName);
	List<ProductModel> findAllBySupplierId(int supplierId);
	
}
