package com.bootcamp.integrador.models;

import java.time.LocalDateTime;

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
@Table(name = "Products")
public class ProductModel {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "supplier_id", nullable = false)
    private SupplierModel supplier;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_category_id", nullable = false)
    private ProductCategoryModel productCategory;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by_id", nullable = false)
    private UserModel createdBy;
    
    @NotNull(message = "Code SKU cannot be null")
    @NotBlank(message = "Code SKU cannot be empty")
    @Size(min = 5, max = 50, message = "Code SKU must be between 5 and 50 characters")
    @Column(unique = true)
    private String codeSKU;
    
    @NotNull(message = "Product Name cannot be null")
    @NotBlank(message = "Product Name cannot be empty")
    @Size(min = 3, max = 50, message = "Product Name must be between 3 and 50 characters")
    private String productName;
    
    private String productDescription;
    
    @NotNull(message = "Price cannot be null")
    @NotBlank(message = "Price Name cannot be empty")
    @Size(min = 0, message = "Price must be greater than 0")
    double price;
    
    @NotNull(message = "Stock cannot be null")
    @NotBlank(message = "Stock Name cannot be empty")
    @Size(min = 0, message = "Stock must be greater than 0")
    int stock;
    
    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
    
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime updatedAt;
    
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime deletedAt;
    
    public ProductModel() {
    }

	public ProductModel(int id, SupplierModel supplier, ProductCategoryModel productCategory, UserModel createdBy,
						String codeSKU, String productName, String productDescription, double price, int stock) {
		this.id = id;
		this.supplier = supplier;
		this.productCategory = productCategory;
		this.createdBy = createdBy;
		this.codeSKU = codeSKU;
		this.productName = productName;
		this.productDescription = productDescription;
		this.price = price;
		this.stock = stock;
		this.createdAt = LocalDateTime.now();
		this.updatedAt = null;
		this.deletedAt = null; 
	}
    
    
    
}
