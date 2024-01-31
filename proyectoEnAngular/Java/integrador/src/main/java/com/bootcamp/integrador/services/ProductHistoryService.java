package com.bootcamp.integrador.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.bootcamp.integrador.models.ProductHistoryModel;
import com.bootcamp.integrador.models.ProductModel;
import com.bootcamp.integrador.models.UserModel;
import com.bootcamp.integrador.repositories.ProductHistoryRepository;
import com.bootcamp.integrador.repositories.ProductRepository;
import com.bootcamp.integrador.repositories.UserRepository;

@Service
public class ProductHistoryService {
	@Autowired
	ProductHistoryRepository productHistoryRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	ProductRepository productRepository;
	
	//obtener historial por proveedor
	public Page<ProductHistoryModel> getProductHistoryByProductId(Pageable pageable, int productId) {
		return productHistoryRepository.findAllByProductId(productId, pageable);
	}
	
	//obtener historial por usuario
	public Page<ProductHistoryModel> getProductHistoryByUserId(Pageable pageable, int userId) {
		return productHistoryRepository.findAllByUserId(userId, pageable);
	}
	
	//obtener por id
	public Optional<ProductHistoryModel> getProductHistoryByUserId(int id) {
		return productHistoryRepository.findById(id);
	}
	
	//agregar historial
	public void addProductHistory(int userId, int productId, String action, String changes, String oldProduct) {
		UserModel user = userRepository.findById(userId).get();
		ProductModel product = productRepository.findById(productId).get();
		
		ProductHistoryModel newHistory = new ProductHistoryModel(action, changes, oldProduct);
		newHistory.setProduct(product);
		newHistory.setUser(user);
		productHistoryRepository.save(newHistory);
	}
}
