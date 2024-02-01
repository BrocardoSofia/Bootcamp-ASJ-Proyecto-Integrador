package com.bootcamp.integrador.services;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.integrador.models.SupplierCategoryModel;
import com.bootcamp.integrador.repositories.SupplierCategoryRepository;
import com.bootcamp.integrador.repositories.SupplierRepository;

import jakarta.transaction.Transactional;

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

    @Transactional
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

    public SupplierCategoryModel updateSupplierCategory(SupplierCategoryModel supplierCategory) {
        Optional<SupplierCategoryModel> foundSupplierCategory = supplierCategoryRepository.findById(supplierCategory.getId());
        SupplierCategoryModel foundByCategory = supplierCategoryRepository.findByCategory(supplierCategory.getCategory());

        if (foundSupplierCategory.isPresent() && (foundByCategory == null)) {
            SupplierCategoryModel updatedSupplierCategory = foundSupplierCategory.get();
            updatedSupplierCategory.setCategory(supplierCategory.getCategory());
            updatedSupplierCategory.setUpdatedAt(LocalDateTime.now());
            return supplierCategoryRepository.save(updatedSupplierCategory);
        } else {
            return null;
        }
    }

    public boolean deleteSupplierCategory(int id) {
        Optional<SupplierCategoryModel> foundSupplierCategory = supplierCategoryRepository.findById(id);

        if (foundSupplierCategory.isPresent()) {
            SupplierCategoryModel deletedSupplierCategory = foundSupplierCategory.get();
            deletedSupplierCategory.setDeletedAt(LocalDateTime.now());
            supplierCategoryRepository.save(deletedSupplierCategory);
            return true;
        } else {
            return false;
        }
    }

    public boolean reInsertSupplierCategory(int id) {
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
