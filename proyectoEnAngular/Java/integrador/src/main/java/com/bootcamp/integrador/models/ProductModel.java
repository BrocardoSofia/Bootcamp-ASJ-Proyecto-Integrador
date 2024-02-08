package com.bootcamp.integrador.models;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
	
	@ManyToOne
    @JoinColumn(name = "supplier_id", nullable = false)
    private SupplierModel supplier;
	
	@ManyToOne
    @JoinColumn(name = "product_category_id", nullable = false)
    private ProductCategoryModel productCategory;
	
	@ManyToOne
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
    
    private String productDescription = "";
    
    @NotNull(message = "Price cannot be null")
    @NotBlank(message = "Price Name cannot be empty")
    @Size(min = 0, message = "Price must be greater than 0")
    double price;
    
    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
    
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime updatedAt;
    
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime deletedAt;
    
    @JsonManagedReference
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<ProductImageModel> productImages = new ArrayList<>();
    
    public ProductModel() {
    }

	public ProductModel(SupplierModel supplier, ProductCategoryModel productCategory, UserModel createdBy,
						String codeSKU, String productName, String productDescription, double price) {
		this.supplier = supplier;
		this.productCategory = productCategory;
		this.createdBy = createdBy;
		this.codeSKU = codeSKU;
		this.productName = productName;
		this.productDescription = productDescription;
		this.price = price;
		this.createdAt = LocalDateTime.now();
		this.updatedAt = null;
		this.deletedAt = null; 
	}

	public SupplierModel getSupplier() {
		return supplier;
	}

	public void setSupplier(SupplierModel supplier) {
		this.supplier = supplier;
	}

	public ProductCategoryModel getProductCategory() {
		return productCategory;
	}

	public void setProductCategory(ProductCategoryModel productCategory) {
		this.productCategory = productCategory;
	}

	public UserModel getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(UserModel createdBy) {
		this.createdBy = createdBy;
	}

	public String getCodeSKU() {
		return codeSKU;
	}

	public void setCodeSKU(String codeSKU) {
		this.codeSKU = codeSKU;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public String getProductDescription() {
		return productDescription;
	}

	public void setProductDescription(String productDescription) {
		this.productDescription = productDescription;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}

	public LocalDateTime getDeletedAt() {
		return deletedAt;
	}

	public void setDeletedAt(LocalDateTime deletedAt) {
		this.deletedAt = deletedAt;
	}

	public int getId() {
		return id;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	@Override
	public String toString() {
		return "ProductModel [id=" + id + ", supplier=" + supplier.toString() + ", productCategory=" + productCategory.toString()
				+ ", createdBy=" + createdBy.toString() + ", codeSKU=" + codeSKU + ", productName=" + productName
				+ ", productDescription=" + productDescription + ", price=" + price 
				+ ", createdAt=" + createdAt + ", updatedAt=" + updatedAt + ", deletedAt=" + deletedAt + "]";
	}
    
    
    
}
