package com.bootcamp.integrador.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.bootcamp.integrador.models.SupplierModel;

public interface SupplierRepository extends JpaRepository<SupplierModel, Integer> {
    Page<SupplierModel> findAll(Pageable pageable);
    Page<SupplierModel> findAllByDeletedAtIsNull(Pageable pageable);
    Page<SupplierModel> findAllByBusinessNameContainingIgnoreCaseAndSupplierCodeContainingIgnoreCase(String businessName, 
    		 																							String supplierCode,
    																									Pageable pageable);
    Page<SupplierModel> findAllByDeletedAtIsNullAndBusinessNameContainingIgnoreCase(String businessName, Pageable pageable);
    Page<SupplierModel> findAllByDeletedAtIsNotNull(Pageable pageable);
    Page<SupplierModel> findAllByDeletedAtIsNotNullAndBusinessNameContainingIgnoreCase(String businessName, Pageable pageable);
    Page<SupplierModel> findAllByBusinessNameContainingIgnoreCase(String businessName, Pageable pageable);
    SupplierModel findAllBybusinessName(String businessName);
    SupplierModel findAllBySupplierCode(String supplierCode);
}
