package com.bootcamp.integrador.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.bootcamp.integrador.models.ProductModel;

public interface ProductRepository extends JpaRepository<ProductModel, Integer>{
	Page<ProductModel> findAll(Pageable pageable);
	Page<ProductModel> findAllByCodeSKUContainingIgnoreCaseAndProductNameContainingIgnoreCase(String codeSKU,
																								String productName, 
																								Pageable pageable);
	Page<ProductModel> findAllBySupplierIdAndCodeSKUContainingIgnoreCaseAndProductNameContainingIgnoreCase(
																								int supplierId,
																								String codeSKU,
																								String productName, 
																								Pageable pageable);
	Page<ProductModel> findAllByDeletedAtIsNullAndCodeSKUContainingIgnoreCaseAndProductNameContainingIgnoreCase(
																								String codeSKU,
																								String productName, 
																								Pageable pageable);
	Page<ProductModel> findAllByDeletedAtIsNullAndSupplierIdAndCodeSKUContainingIgnoreCaseAndProductNameContainingIgnoreCase(
																								int supplierId,
																								String codeSKU,
																								String productName, 
																								Pageable pageable);
	Page<ProductModel> findAllByDeletedAtIsNotNullAndCodeSKUContainingIgnoreCaseAndProductNameContainingIgnoreCase(
																								String codeSKU,
																								String productName, 
																								Pageable pageable);
	Page<ProductModel> findAllByDeletedAtIsNotNullAndSupplierIdAndCodeSKUContainingIgnoreCaseAndProductNameContainingIgnoreCase(
																								int supplierId,
																								String codeSKU,
																								String productName, 
																								Pageable pageable);
	ProductModel findAllByCodeSKU(String codeSKU);
	ProductModel findAllByProductName(String productName);
	
}
