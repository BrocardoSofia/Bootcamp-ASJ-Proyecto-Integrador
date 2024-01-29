package com.bootcamp.integrador.services;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.integrador.models.ProductCategoryModel;
import com.bootcamp.integrador.repositories.ProductCategoryRepository;

@Service
public class ProductCategoryService {
    @Autowired
    ProductCategoryRepository productCategoryRepository;

    public List<ProductCategoryModel> getProductCategories() {
        return productCategoryRepository.findAll();
    }

    public Optional<ProductCategoryModel> getProductCategoryById(int id) {
        return productCategoryRepository.findById(id);
    }

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

    public ProductCategoryModel updateProductCategory(int id, ProductCategoryModel productCategory) {
        Optional<ProductCategoryModel> foundProductCategory = productCategoryRepository.findById(id);

        if (foundProductCategory.isPresent()) {
            ProductCategoryModel updatedProductCategory = foundProductCategory.get();
            updatedProductCategory.setCategory(productCategory.getCategory());
            updatedProductCategory.setSupplierCategory(productCategory.getSupplierCategory());
            updatedProductCategory.setUpdatedAt(LocalDateTime.now());
            return productCategoryRepository.save(updatedProductCategory);
        } else {
            return null;
        }
    }

    public boolean deleteProductCategory(int id) {
        Optional<ProductCategoryModel> foundProductCategory = productCategoryRepository.findById(id);

        if (foundProductCategory.isPresent()) {
            ProductCategoryModel deletedProductCategory = foundProductCategory.get();
            deletedProductCategory.setDeletedAt(LocalDateTime.now());
            productCategoryRepository.save(deletedProductCategory);
            return true;
        } else {
            return false;
        }
    }

    public boolean undeleteProductCategory(int id) {
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