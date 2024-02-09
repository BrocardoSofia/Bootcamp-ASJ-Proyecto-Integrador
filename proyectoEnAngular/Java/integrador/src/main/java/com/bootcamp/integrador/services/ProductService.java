package com.bootcamp.integrador.services;

import java.time.LocalDateTime;
import java.util.List;
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
	
	@Autowired
	ProductHistoryService productHistoryService;
	
	//obtener productos
	public Page<ProductModel> getProducts(Pageable pageable, int productCategoryId, String codeSKU, String productName, String productDescription){
		Page<ProductModel> page;
		
		if(productCategoryId <= 0) {
			page = productRepository.findAllByCodeSKUContainingIgnoreCaseAndProductNameContainingIgnoreCaseAndProductDescriptionContainingIgnoreCase(
																											codeSKU,
					 																						productName,
					 																						productDescription,
					 																						pageable);
		}else {
			page = productRepository.findAllByProductCategoryIdAndCodeSKUContainingIgnoreCaseAndProductNameContainingIgnoreCaseAndProductDescriptionContainingIgnoreCase(
																											productCategoryId,
					 																						codeSKU,
					 																						productName, 
					 																						productDescription,
					 																						pageable);
		}
		
		return page;
	}
	
	//obtener productos activos
	public Page<ProductModel> getActiveProducts(Pageable pageable, int productCategoryId, String codeSKU, String productName, String productDescription){
		Page<ProductModel> page;
		
		if(productCategoryId <= 0) {
			page = productRepository.findAllByDeletedAtIsNullAndCodeSKUContainingIgnoreCaseAndProductNameContainingIgnoreCaseAndProductDescriptionContainingIgnoreCase(
																											codeSKU,
					 																						productName, 
					 																						productDescription,
					 																						pageable);
		}else {
			page = productRepository.findAllByDeletedAtIsNullAndProductCategoryIdAndCodeSKUContainingIgnoreCaseAndProductNameContainingIgnoreCaseAndProductDescriptionContainingIgnoreCase(
																											productCategoryId,
					 																						codeSKU,
					 																						productName, 
					 																						productDescription,
					 																						pageable);
		}
		
		return page;
	}
	
	//obtener productos eliminados
	public Page<ProductModel> getDeletedProducts(Pageable pageable, int productCategoryId, String codeSKU, String productName, String productDescription){
		Page<ProductModel> page;
		
		if(productCategoryId <= 0) {
			page = productRepository.findAllByDeletedAtIsNotNullAndCodeSKUContainingIgnoreCaseAndProductNameContainingIgnoreCaseAndProductDescriptionContainingIgnoreCase(
																											codeSKU,
					 																						productName, 
					 																						productDescription,
					 																						pageable);
		}else {
			page = productRepository.findAllByDeletedAtIsNotNullAndProductCategoryIdAndCodeSKUContainingIgnoreCaseAndProductNameContainingIgnoreCaseAndProductDescriptionContainingIgnoreCase(
																											productCategoryId,
					 																						codeSKU,
					 																						productName, 
					 																						productDescription,
					 																						pageable);
		}
		
		return page;
	}
	
	//obtener un producto segun su id
	public Optional<ProductModel> getProductById(int id){
		return productRepository.findById(id);
	}
	
	public List<ProductModel> getAllProductsBySupplierId(int supplierId){
		return productRepository.findAllBySupplierId(supplierId);
	}
	
	//insertar producto
	@Transactional
	public ProductModel addProduct(ProductModel product) {
		ProductModel findProductBySKU = productRepository.findAllByCodeSKU(product.getCodeSKU());
		ProductModel findProductByName = productRepository.findAllByProductName(product.getProductName());
		ProductModel productAdded = null;
		
		if((findProductBySKU == null) && (findProductByName == null)) {
			productAdded = productRepository.save(product);
			//registro el cambio en el historial
			productHistoryService.addProductHistory((productAdded.getCreatedBy()).getId(), productAdded.getId(), "created", "product created", "---");
		}
		
		return productAdded;
	}
	
	//eliminar producto
	public ProductModel deleteProduct(int productId, int userId) {
		ProductModel productDeleted = productRepository.findById(productId).get();
		
		if(productDeleted != null) {
			productHistoryService.addProductHistory(userId, productId, "deleted", "product deleted" , productDeleted.toString());
			productDeleted.setDeletedAt(LocalDateTime.now());
			
			productRepository.save(productDeleted);
		}
		
		return productDeleted;
	}
	
	//reingresar producto
	public boolean reInsertProduct(int productId, int userId) {
		ProductModel productUndeleted = productRepository.findById(productId).get();
		
		if(productUndeleted != null) {
			productHistoryService.addProductHistory(userId, productId, "re inserted", "supplier re inserted" , productUndeleted.toString());
			productUndeleted.setDeletedAt(null);
			
			productRepository.save(productUndeleted);
			return true;
		}else {
            return false;
        }
		
	}
	
	//modificar producto
	public ProductModel updateProduct(ProductModel product, int userId) {
		ProductModel existingProduct = productRepository.findById(product.getId()).get();
		
		if(existingProduct != null) {
			productHistoryService.addProductHistory(userId, product.getId(), "updated", getChanges(existingProduct, product) , existingProduct.toString());
			existingProduct.setSupplier(product.getSupplier());
			existingProduct.setProductCategory(product.getProductCategory());
			existingProduct.setCodeSKU(product.getCodeSKU());
			existingProduct.setProductName(product.getProductName());
			existingProduct.setProductDescription(product.getProductDescription());
			existingProduct.setPrice(product.getPrice());
			existingProduct.setUpdatedAt(LocalDateTime.now());
			
			productRepository.save(existingProduct);
		}
		
		return existingProduct;
	}
	
	private String getChanges(ProductModel oldProduct, ProductModel newProduct) {
		String changes = "";
		
		if(oldProduct.getSupplier().getId() != newProduct.getSupplier().getId()) {
			changes += "Supplier: " + newProduct.getSupplier().getBusinessName()+"|";
		}
		
		if(oldProduct.getProductCategory().getId() != newProduct.getProductCategory().getId()) {
			changes += "Supplier category: " + newProduct.getProductCategory().getCategory()+"|";
		}
		
		if(!oldProduct.getCodeSKU().equals(newProduct.getCodeSKU())) {
			changes += "SKU: " + newProduct.getCodeSKU()+"|";
		}
		
		if(!oldProduct.getProductName().equals(newProduct.getProductName())) {
			changes += "Product Name: " + newProduct.getProductName()+"|";
		}
		
		if(oldProduct.getProductDescription() != null) {
			if(!oldProduct.getProductDescription().equals(newProduct.getProductDescription())) {
				changes += "Product Description: " + newProduct.getProductDescription()+"|";
			}
		}else if(newProduct.getProductDescription() != null) {
			changes += "Product Description: " + newProduct.getProductDescription()+"|";
		}
		
		if(oldProduct.getPrice() != newProduct.getPrice()) {
			changes += "Price: " + newProduct.getPrice()+"|";
		}
		
		
		return changes;
	}
	
	public ProductModel getSupplierByCodeSKU(String codeSKU) {
		return productRepository.findAllByCodeSKU(codeSKU);
	}
}
