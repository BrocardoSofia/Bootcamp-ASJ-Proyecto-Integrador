package com.bootcamp.integrador.models;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "ProductsImages")
public class ProductImageModel {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
	
	@NotNull(message = "imageURL cannot be null")
    @NotBlank(message = "imageURL cannot be empty")
    @Size(min = 2, message = "imageURL must be greater than 2 characters")
    private String imageURL;
	
	@JsonBackReference
    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private ProductModel product;
    
    public ProductImageModel() {
    }

	public ProductImageModel(String imageURL) {
		this.imageURL = imageURL;
	}

	public String getImageURL() {
		return imageURL;
	}

	public void setImageURL(String imageURL) {
		this.imageURL = imageURL;
	}

	public ProductModel getProduct() {
		return product;
	}

	public void setProduct(ProductModel product) {
		this.product = product;
	}


	public int getId() {
		return id;
	}    
    
}
