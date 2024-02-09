package com.bootcamp.integrador.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.bootcamp.integrador.models.SupplierCategoryCount;
import com.bootcamp.integrador.models.SupplierCategoryModel;
import com.bootcamp.integrador.models.UserModel;
import com.bootcamp.integrador.repositories.SupplierCategoryRepository;

import jakarta.transaction.Transactional;

@Service
public class SupplierCategoryService {
    @Autowired
    SupplierCategoryRepository supplierCategoryRepository;

    public List<SupplierCategoryModel> getSupplierCategories() {
        
  		return supplierCategoryRepository.findAll();
    }
    
    //obtener rubros activos
  	public Page<SupplierCategoryModel> getAllCategories(Pageable pageable, String category){
  		Page<SupplierCategoryModel> page;
  		if(category == "") {
  			//no envio category
  			page = supplierCategoryRepository.findAll(pageable);
  		}else {
  			page = supplierCategoryRepository.findAllByCategoryContainingIgnoreCase(category, pageable);	
  		}
  		return page;
  	}
    
    //obtener rubros activos
  	public Page<SupplierCategoryModel> getActiveCategories(Pageable pageable, String category){
  		Page<SupplierCategoryModel> page;
  		if(category == "") {
  			//no envio category
  			page = supplierCategoryRepository.findAllByDeletedAtIsNull(pageable);
  		}else {
  			page = supplierCategoryRepository.findAllByDeletedAtIsNullAndCategoryContainingIgnoreCase(category, pageable);	
  		}
  		return page;
  	}
  	
    //obtener rubros eliminados
  	public Page<SupplierCategoryModel> getDeletedCategories(Pageable pageable, String category){
  		Page<SupplierCategoryModel> page;
  		if(category == "") {
  			//no envio category
  			page = supplierCategoryRepository.findAllByDeletedAtIsNotNull(pageable);
  		}else {
  			page = supplierCategoryRepository.findAllByDeletedAtIsNotNullAndCategoryContainingIgnoreCase(category, pageable);	
  		}
  		return page;
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

    public SupplierCategoryModel deleteSupplierCategory(int id) {
        Optional<SupplierCategoryModel> foundSupplierCategory = supplierCategoryRepository.findById(id);

        if (foundSupplierCategory.isPresent()) {
            SupplierCategoryModel deletedSupplierCategory = foundSupplierCategory.get();
            
            deletedSupplierCategory.setDeletedAt(LocalDateTime.now());
            supplierCategoryRepository.save(deletedSupplierCategory);
            
            return deletedSupplierCategory;
        } else {
            return null;
        }
    }
    
    //reinsertar rubro
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
    
    public List<SupplierCategoryCount> supplierCategoryCounts(){
    	return supplierCategoryRepository.findSupplierCategoryCounts();
    }
    
    public boolean checkIfSupplierCategoryExists(String category) {
        return supplierCategoryRepository.existsByCategory(category);
    }
}
