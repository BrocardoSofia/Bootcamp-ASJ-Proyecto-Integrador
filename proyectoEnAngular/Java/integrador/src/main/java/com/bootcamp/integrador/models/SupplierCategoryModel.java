package com.bootcamp.integrador.models;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "supplier_categories")
public class SupplierCategoryModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotNull(message = "category cannot be null")
    @NotBlank(message = "category cannot be empty")
    @Size(min = 2, max = 50, message = "category must be between 2 and 50 characters")
    @Column(unique = true)
    private String category;

    @CreationTimestamp
    private Date createdAt;

    @UpdateTimestamp
    private Date updatedAt;

    private Date deletedAt;

    @OneToMany(mappedBy = "supplierCategory", fetch = FetchType.LAZY)
    private List<ProductCategoryModel> productCategories = new ArrayList<>();
    
    @OneToMany(mappedBy = "supplierCategory", fetch = FetchType.LAZY)
    private List<SupplierModel> suppliers;

    public SupplierCategoryModel(int id, String category) {
        this.id = id;
        this.category = category;
    }

    public SupplierCategoryModel() {
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public int getId() {
        return id;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Date getDeletedAt() {
        return deletedAt;
    }

    public void setDeletedAt(Date deletedAt) {
        this.deletedAt = deletedAt;
    }

    public List<ProductCategoryModel> getProductCategories() {
        return productCategories;
    }

    public void setProductCategories(List<ProductCategoryModel> productCategories) {
        this.productCategories = productCategories;
    }

	public List<SupplierModel> getSuppliers() {
		return suppliers;
	}

	public void setSuppliers(List<SupplierModel> suppliers) {
		this.suppliers = suppliers;
	}
    
    
}