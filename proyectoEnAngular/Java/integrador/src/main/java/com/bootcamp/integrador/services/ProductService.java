package com.bootcamp.integrador.services;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.bootcamp.integrador.models.ProductModel;
import com.bootcamp.integrador.models.SupplierModel;
import com.bootcamp.integrador.repositories.ProductRepository;

import jakarta.transaction.Transactional;

@Service
public class ProductService {
	@Autowired
	ProductRepository productRepository;
	
	//obtener productos
	public Page<ProductModel> getProducts(Pageable pageable, int supplierId, String codeSKU, String productName){
		Page<ProductModel> page;
		
		if(supplierId <= 0) {
			page = productRepository.findAllByCodeSKUContainingIgnoreCaseAndProductNameContainingIgnoreCase(codeSKU,
					 																						productName, 
					 																						pageable);
		}else {
			page = productRepository.findAllBySupplierIdAndCodeSKUContainingIgnoreCaseAndProductNameContainingIgnoreCase(
					 																						supplierId,
					 																						codeSKU,
					 																						productName, 
					 																						pageable);
		}
		
		return page;
	}
	
	//obtener productos activos
	public Page<ProductModel> getActiveProducts(Pageable pageable, int supplierId, String codeSKU, String productName){
		Page<ProductModel> page;
		
		if(supplierId <= 0) {
			page = productRepository.findAllByDeletedAtIsNullAndCodeSKUContainingIgnoreCaseAndProductNameContainingIgnoreCase(codeSKU,
					 																						productName, 
					 																						pageable);
		}else {
			page = productRepository.findAllByDeletedAtIsNullAndSupplierIdAndCodeSKUContainingIgnoreCaseAndProductNameContainingIgnoreCase(
					 																						supplierId,
					 																						codeSKU,
					 																						productName, 
					 																						pageable);
		}
		
		return page;
	}
	
	//obtener productos eliminados
	public Page<ProductModel> getDeletedProducts(Pageable pageable, int supplierId, String codeSKU, String productName){
		Page<ProductModel> page;
		
		if(supplierId <= 0) {
			page = productRepository.findAllByDeletedAtIsNotNullAndCodeSKUContainingIgnoreCaseAndProductNameContainingIgnoreCase(codeSKU,
					 																						productName, 
					 																						pageable);
		}else {
			page = productRepository.findAllByDeletedAtIsNotNullAndSupplierIdAndCodeSKUContainingIgnoreCaseAndProductNameContainingIgnoreCase(
					 																						supplierId,
					 																						codeSKU,
					 																						productName, 
					 																						pageable);
		}
		
		return page;
	}
	
	//obtener un producto segun su id
	public Optional<ProductModel> getProductById(int id){
		return productRepository.findById(id);
	}
	
	//insertar producto
	@Transactional
	public ProductModel addProduct(ProductModel product) {
		ProductModel findProductBySKU = productRepository.findAllByCodeSKU(product.getCodeSKU());
		ProductModel findProductByName = productRepository.findAllByProductName(product.getProductName());
		ProductModel productAdded = null;
		
		if((findProductBySKU == null) && (findProductByName == null)) {
			productAdded = productRepository.save(product);
		}
		
		return productAdded;
	}
	
	//eliminar producto
	public ProductModel deleteProduct(ProductModel product) {
		ProductModel productDeleted = productRepository.findById(product.getId()).get();
		
		if(productDeleted != null) {
			productDeleted.setDeletedAt(LocalDateTime.now());
			
			productRepository.save(productDeleted);
		}
		
		return productDeleted;
	}
	
	//reingresar producto
	public ProductModel reInsertProduct(ProductModel product) {
		ProductModel productUndeleted = productRepository.findById(product.getId()).get();
		
		if(productUndeleted != null) {
			productUndeleted.setDeletedAt(null);
			
			productRepository.save(productUndeleted);
		}
		
		return productUndeleted;
	}
	
	//modificar producto
	public ProductModel updateProduct(ProductModel product) {
		ProductModel existingProduct = productRepository.findById(product.getId()).get();
		
		if(existingProduct != null) {
			existingProduct.setSupplier(product.getSupplier());
			existingProduct.setProductCategory(product.getProductCategory());
			existingProduct.setCodeSKU(product.getCodeSKU());
			existingProduct.setProductName(product.getProductName());
			existingProduct.setProductDescription(product.getProductDescription());
			existingProduct.setPrice(product.getPrice());
			existingProduct.setStock(product.getStock());
			existingProduct.setUpdatedAt(LocalDateTime.now());
			
			productRepository.save(existingProduct);
		}
		
		return existingProduct;
	}
}
