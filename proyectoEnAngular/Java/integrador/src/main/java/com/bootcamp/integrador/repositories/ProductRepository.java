package com.bootcamp.integrador.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
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
	Page<ProductModel> findAllBySupplierIdAndCodeSKUContainingIgnoreCaseAndProductNameContainingIgnoreCaseAndProductDescriptionContainingIgnoreCase(
																								int supplierId,
																								String codeSKU,
																								String productName, 
																								String productDescription, 
																								Pageable pageable);
	Page<ProductModel> findAllByDeletedAtIsNullAndCodeSKUContainingIgnoreCaseAndProductNameContainingIgnoreCaseAndProductDescriptionContainingIgnoreCase(
																								String codeSKU,
																								String productName, 
																								String productDescription, 
																								Pageable pageable);
	Page<ProductModel> findAllByDeletedAtIsNullAndSupplierIdAndCodeSKUContainingIgnoreCaseAndProductNameContainingIgnoreCaseAndProductDescriptionContainingIgnoreCase(
																								int supplierId,
																								String codeSKU,
																								String productName, 
																								String productDescription, 
																								Pageable pageable);
	Page<ProductModel> findAllByDeletedAtIsNotNullAndCodeSKUContainingIgnoreCaseAndProductNameContainingIgnoreCaseAndProductDescriptionContainingIgnoreCase(
																								String codeSKU,
																								String productName, 
																								String productDescription, 
																								Pageable pageable);
	Page<ProductModel> findAllByDeletedAtIsNotNullAndSupplierIdAndCodeSKUContainingIgnoreCaseAndProductNameContainingIgnoreCaseAndProductDescriptionContainingIgnoreCase(
																								int supplierId,
																								String codeSKU,
																								String productName, 
																								String productDescription, 
																								Pageable pageable);
	ProductModel findAllByCodeSKU(String codeSKU);
	ProductModel findAllByProductName(String productName);
	
}
