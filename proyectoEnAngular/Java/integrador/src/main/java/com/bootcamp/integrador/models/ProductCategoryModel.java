package com.bootcamp.integrador.models;

import java.time.LocalDateTime;
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
@Table(name = "product_categories")
public class ProductCategoryModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotNull(message = "category cannot be null")
    @NotBlank(message = "category cannot be empty")
    @Size(min = 2, max = 50, message = "category must be between 2 and 50 characters")
    @Column(unique = true)
    private String category;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createdAt;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime updatedAt;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime deletedAt;

    @ManyToOne
    @JoinColumn(name = "supplier_category_id", nullable = false)
    private SupplierCategoryModel supplierCategory;

    public ProductCategoryModel(int id, String category, SupplierCategoryModel supplierCategory) {
        this.id = id;
        this.category = category;
        this.supplierCategory = supplierCategory;
        this.createdAt = LocalDateTime.now();
    }

    public ProductCategoryModel() {
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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
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

    public SupplierCategoryModel getSupplierCategory() {
        return supplierCategory;
    }

    public void setSupplierCategory(SupplierCategoryModel supplierCategory) {
        this.supplierCategory = supplierCategory;
    }
    
    
}