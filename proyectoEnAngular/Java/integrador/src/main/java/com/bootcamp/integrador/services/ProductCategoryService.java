package com.bootcamp.integrador.services;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.bootcamp.integrador.models.ProductCategoryModel;
import com.bootcamp.integrador.models.SupplierCategoryModel;
import com.bootcamp.integrador.repositories.ProductCategoryRepository;

import jakarta.transaction.Transactional;

@Service
public class ProductCategoryService {
    @Autowired
    ProductCategoryRepository productCategoryRepository;

    public Page<ProductCategoryModel> getProductCategories(Pageable pageable, String category) {
        Page<ProductCategoryModel> page;
  		if(category == "") {
  			//no envio userAlias
  			page = productCategoryRepository.findAll(pageable);
  		}else {
  			page = productCategoryRepository.findAllByCategoryContainingIgnoreCase(category, pageable);	
  		}
  		return page;
    }
    
    //obtener categorias activos
  	public Page<ProductCategoryModel> getActiveCategories(Pageable pageable, String category){
  		Page<ProductCategoryModel> page;
  		if(category == "") {
  			//no envio category
  			page = productCategoryRepository.findAllByDeletedAtIsNull(pageable);
  		}else {
  			page = productCategoryRepository.findAllByDeletedAtIsNullAndCategoryContainingIgnoreCase(category, pageable);	
  		}
  		return page;
  	}
  	
    //obtener rubros eliminados
  	public Page<ProductCategoryModel> getDeletedCategories(Pageable pageable, String category){
  		Page<ProductCategoryModel> page;
  		if(category == "") {
  			//no envio category
  			page = productCategoryRepository.findAllByDeletedAtIsNotNull(pageable);
  		}else {
  			page = productCategoryRepository.findAllByDeletedAtIsNotNullAndCategoryContainingIgnoreCase(category, pageable);	
  		}
  		return page;
  	}

    public Optional<ProductCategoryModel> getProductCategoryById(int id) {
        return productCategoryRepository.findById(id);
    }

    @Transactional
    public ProductCategoryModel addProductCategory(ProductCategoryModel productCategory) {
        ProductCategoryModel findProductCategory = productCategoryRepository.findByCategory(productCategory.getCategory());

        if (findProductCategory == null) {
            productCategoryRepository.save(productCategory);
            findProductCategory = productCategoryRepository.findByCategory(productCategory.getCategory());
        } else {
            findProductCategory = null;
        }

        return productCategory;
    }

    public ProductCategoryModel updateProductCategory(ProductCategoryModel productCategory) {
        Optional<ProductCategoryModel> foundProductCategory = productCategoryRepository.findById(productCategory.getId());
        ProductCategoryModel foundByCategory = productCategoryRepository.findByCategory(productCategory.getCategory());

        if (foundProductCategory.isPresent() && (foundByCategory == null)) {
            ProductCategoryModel updatedProductCategory = foundProductCategory.get();
            updatedProductCategory.setCategory(productCategory.getCategory());
            updatedProductCategory.setSupplierCategory(productCategory.getSupplierCategory());
            updatedProductCategory.setUpdatedAt(LocalDateTime.now());
            return productCategoryRepository.save(updatedProductCategory);
        } else {
            return null;
        }
    }

    public ProductCategoryModel deleteProductCategory(int id) {
        Optional<ProductCategoryModel> foundProductCategory = productCategoryRepository.findById(id);

        if (foundProductCategory.isPresent()) {
            ProductCategoryModel deletedProductCategory = foundProductCategory.get();
            deletedProductCategory.setDeletedAt(LocalDateTime.now());
            productCategoryRepository.save(deletedProductCategory);
            return deletedProductCategory;
        } else {
            return null;
        }
    }

    public boolean reInsertProductCategory(int id) {
        Optional<ProductCategoryModel> foundProductCategory = productCategoryRepository.findById(id);

        if (foundProductCategory.isPresent()) {
            ProductCategoryModel undeletedProductCategory = foundProductCategory.get();
            undeletedProductCategory.setDeletedAt(null);
            productCategoryRepository.save(undeletedProductCategory);
            return true;
        } else {
            return false;
        }
    }
}