package com.bootcamp.integrador.services;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.integrador.models.SupplierCategoryModel;
import com.bootcamp.integrador.repositories.SupplierCategoryRepository;

@Service
public class SupplierCategoryService {
    @Autowired
    SupplierCategoryRepository supplierCategoryRepository;

    public List<SupplierCategoryModel> getSupplierCategories() {
        return supplierCategoryRepository.findAll();
    }

    public Optional<SupplierCategoryModel> getSupplierCategoryById(int id) {
        return supplierCategoryRepository.findById(id);
    }

    public SupplierCategoryModel addSupplierCategory(SupplierCategoryModel supplierCategory) {
        SupplierCategoryModel findSupplierCategory = supplierCategoryRepository.findByCategory(supplierCategory.getCategory());

        if (findSupplierCategory == null) {
            supplierCategoryRepository.save(supplierCategory);
            findSupplierCategory = supplierCategoryRepository.findByCategory(supplierCategory.getCategory());
        } else {
            findSupplierCategory = null;
        }

        return supplierCategory;
    }

    public SupplierCategoryModel updateSupplierCategory(int id, SupplierCategoryModel supplierCategory) {
        Optional<SupplierCategoryModel> foundSupplierCategory = supplierCategoryRepository.findById(id);

        if (foundSupplierCategory.isPresent()) {
            SupplierCategoryModel updatedSupplierCategory = foundSupplierCategory.get();
            updatedSupplierCategory.setCategory(supplierCategory.getCategory());
            updatedSupplierCategory.setUpdatedAt(new Date());
            return supplierCategoryRepository.save(updatedSupplierCategory);
        } else {
            return null;
        }
    }

    public boolean deleteSupplierCategory(int id) {
        Optional<SupplierCategoryModel> foundSupplierCategory = supplierCategoryRepository.findById(id);

        if (foundSupplierCategory.isPresent()) {
            SupplierCategoryModel deletedSupplierCategory = foundSupplierCategory.get();
            deletedSupplierCategory.setDeletedAt(new Date());
            supplierCategoryRepository.save(deletedSupplierCategory);
            return true;
        } else {
            return false;
        }
    }

    public boolean undeleteSupplierCategory(int id) {
        Optional<SupplierCategoryModel> foundSupplierCategory = supplierCategoryRepository.findById(id);

        if (foundSupplierCategory.isPresent()) {
            SupplierCategoryModel undeletedSupplierCategory = foundSupplierCategory.get();
            undeletedSupplierCategory.setDeletedAt(null);
            supplierCategoryRepository.save(undeletedSupplierCategory);
            return true;
        } else {
            return false;
        }
    }
}