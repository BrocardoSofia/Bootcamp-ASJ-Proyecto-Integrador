package com.bootcamp.integrador.models;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "PurchaseOrdersProducts")
public class PurchaseOrderProductModel {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
	
	@JsonBackReference
    @ManyToOne
    @JoinColumn(name = "purchase_order_id", nullable = false)
    private PurchaseOrderModel purchaseOrder;
	
	@ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private ProductModel product;
	
	@ManyToOne
    @JoinColumn(name = "product_category_id", nullable = false)
    private ProductCategoryModel productCategory;
	
	@Min(value = 0, message = "Price must be greater than 0")
    double price;
	
	@Min(value = 0, message = "Amount must be greater than 0")
    int amount;
	
	@Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
	
	public PurchaseOrderProductModel(PurchaseOrderModel purchaseOrder, ProductModel product, ProductCategoryModel productCategory,
										double price, int amount) {
		this.purchaseOrder = purchaseOrder;
		this.product = product;
		this.productCategory = productCategory;
		this.price = price;
		this.amount = amount;
	}
	
	public PurchaseOrderProductModel() {
	}

	public int getId() {
		return id;
	}

	public PurchaseOrderModel getPurchaseOrder() {
		return purchaseOrder;
	}

	public ProductModel getProduct() {
		return product;
	}

	public ProductCategoryModel getProductCategory() {
		return productCategory;
	}

	public double getPrice() {
		return price;
	}

	public int getAmount() {
		return amount;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}
}
