package com.bootcamp.integrador.services;

import java.time.LocalDateTime;
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
	
	public ProductImageModel deleteProductImage(int id) {
		ProductImageModel productImageDeleted = productImageRepository.findById(id).get();
		
		if(productImageDeleted != null) {
			productImageRepository.delete(productImageDeleted);
		}
		
		return productImageDeleted;
	}
	
	public ProductImageModel updateProductImage(ProductImageModel productImage) {
		ProductImageModel productImageUpdated = productImageRepository.findById(productImage.getId()).get();
		
		if(productImageUpdated != null) {
			productImageUpdated.setImageURL(productImage.getImageURL());
			productImageUpdated = productImageRepository.save(productImageUpdated);
		}
		
		return productImageUpdated;
	}
}
