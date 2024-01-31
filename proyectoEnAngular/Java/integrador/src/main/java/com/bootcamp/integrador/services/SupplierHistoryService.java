package com.bootcamp.integrador.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.bootcamp.integrador.models.SupplierHistoryModel;
import com.bootcamp.integrador.models.SupplierModel;
import com.bootcamp.integrador.models.UserModel;
import com.bootcamp.integrador.repositories.SupplierHistoryRepository;
import com.bootcamp.integrador.repositories.SupplierRepository;
import com.bootcamp.integrador.repositories.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class SupplierHistoryService {
	@Autowired
	SupplierHistoryRepository supplierHistoryRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	SupplierRepository supplierRepository;
	
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
	public void addSupplierHistory(int userId, int supplierId, String action, String changes, String oldSupplier) {
		UserModel user = userRepository.findById(userId).get();
		SupplierModel supplier = supplierRepository.findById(supplierId).get();
		
		SupplierHistoryModel newHistory = new SupplierHistoryModel(action, changes, oldSupplier);
		newHistory.setSupplier(supplier);
		newHistory.setUser(user);
		supplierHistoryRepository.save(newHistory);
	}
	
	
}
