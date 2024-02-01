package com.bootcamp.integrador.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.integrador.models.ProductImageModel;
import com.bootcamp.integrador.repositories.ProductImageRepository;

import jakarta.transaction.Transactional;

@Service
public class ProductImageService {
	@Autowired
	ProductImageRepository productImageRepository;
	
	public List<ProductImageModel> getProductImages() {
        return productImageRepository.findAll();
    }
	
	@Transactional
    public ProductImageModel addProductImage(ProductImageModel productImage) {
		ProductImageModel productImageSaved = productImageRepository.save(productImage);
		
        return productImageSaved;
    }
}
