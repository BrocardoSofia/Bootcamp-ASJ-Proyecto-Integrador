package com.bootcamp.integrador.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.bootcamp.integrador.models.SupplierHistoryModel;
import com.bootcamp.integrador.repositories.SupplierHistoryRepository;

@Service
public class SupplierHistoryService {
	@Autowired
	SupplierHistoryRepository supplierHistoryRepository;
	
	//obtener historial por proveedor
	public Page<SupplierHistoryModel> getSupplierHistoryBySupplierId(Pageable pageable, int supplierId) {
		return supplierHistoryRepository.findAllBySupplierId(supplierId, pageable);
	}
	
	//obtener historial por usuario
	public Page<SupplierHistoryModel> getSupplierHistoryByUserId(Pageable pageable, int userId) {
		return supplierHistoryRepository.findAllByUserId(userId, pageable);
	}
	
	//obtener por id
	public Optional<SupplierHistoryModel> getSupplierHistoryByUserId(int id) {
		return supplierHistoryRepository.findById(id);
	}
	
	//agregar historial
	
}
