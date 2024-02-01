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
@Table(name = "PurchaseOrders")
public class PurchaseOrderModel {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
	
	@ManyToOne
    @JoinColumn(name = "purchase_state_id", nullable = false)
	private PurchaseStateModel purchaseState;
	
	@ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
	private UserModel createdBy;
	
	@ManyToOne
    @JoinColumn(name = "supplier_id", nullable = false)
	private SupplierModel supplier;
	
	@NotNull(message = "Purchase Order Number cannot be null")
    @NotBlank(message = "Purchase Order Number Name cannot be empty")
    @Size(min = 0, message = "Purchase Order Number must be greater than 0")
	@Column(unique = true)
    int purchaseOrderNumber;
	
	@Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private LocalDateTime deliveryDate;
	
	@NotNull(message = "reception Info cannot be null")
    @NotBlank(message = "reception Info cannot be empty")
    @Size(min = 3, max = 1250, message = "reception Info must be between 3 and 50 characters")
    private String receptionInfo;
	
	@Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
    
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime updatedAt;
    
    @JsonManagedReference
    @OneToMany(mappedBy = "purchaseOrder", cascade = CascadeType.ALL)
    private List<PurchaseOrderProductModel> purchaseOrdersProducts = new ArrayList<>();
    
    public PurchaseOrderModel() {
    }

	public PurchaseOrderModel(PurchaseStateModel purchaseState, UserModel createdBy, SupplierModel supplier,
			int purchaseOrderNumber, LocalDateTime deliveryDate, String receptionInfo) {
		this.purchaseState = purchaseState;
		this.createdBy = createdBy;
		this.supplier = supplier;
		this.purchaseOrderNumber = purchaseOrderNumber;
		this.deliveryDate = deliveryDate;
		this.receptionInfo = receptionInfo;
		this.createdAt  = LocalDateTime.now();
		this.updatedAt = null;
	}

	public PurchaseStateModel getPurchaseState() {
		return purchaseState;
	}

	public void setPurchaseState(PurchaseStateModel purchaseState) {
		this.purchaseState = purchaseState;
	}

	public LocalDateTime getDeliveryDate() {
		return deliveryDate;
	}

	public void setDeliveryDate(LocalDateTime deliveryDate) {
		this.deliveryDate = deliveryDate;
	}

	public String getReceptionInfo() {
		return receptionInfo;
	}

	public void setReceptionInfo(String receptionInfo) {
		this.receptionInfo = receptionInfo;
	}

	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}

	public int getId() {
		return id;
	}

	public UserModel getCreatedBy() {
		return createdBy;
	}

	public SupplierModel getSupplier() {
		return supplier;
	}

	public int getPurchaseOrderNumber() {
		return purchaseOrderNumber;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}
    
    
}
