package com.bootcamp.integrador.models;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
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
@Table(name = "SuppliersHistory")
public class SupplierHistoryModel {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
	
	@ManyToOne
    @JoinColumn(name = "supplier_id", nullable = false)
	private SupplierModel supplier;
	
	@ManyToOne
    @JoinColumn(name = "updated_by_id", nullable = false)
    private UserModel updatedBy;
	
	@Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createdAt;
	
	@NotNull(message = "action cannot be null")
    @NotBlank(message = "action cannot be empty")
    @Size(min = 2, max = 50, message = "action must be between 2 and 50 characters")
    private String action;
	
	@NotNull(message = "changes cannot be null")
    @NotBlank(message = "changes cannot be empty")
    @Size(min = 2, message = "changes must be greater than 2 characters")
    private String changes;
	
	@NotNull(message = "Old Supplier cannot be null")
    @NotBlank(message = "Old Supplier cannot be empty")
    @Size(min = 2, message = "Old Supplier must be greater than 2 characters")
    private String oldSupplier;
	
	public SupplierHistoryModel() {
	}

	public SupplierHistoryModel(SupplierModel supplier, UserModel updatedBy,String action,
								String changes, String oldSupplier) {
		this.supplier = supplier;
		this.updatedBy = updatedBy;
		this.createdAt = LocalDateTime.now();
		this.action = action;
		this.changes = changes;
		this.oldSupplier = oldSupplier;
	}

	public int getId() {
		return id;
	}

	public SupplierModel getSupplier() {
		return supplier;
	}

	public UserModel getUpdatedBy() {
		return updatedBy;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public String getAction() {
		return action;
	}

	public String getChanges() {
		return changes;
	}

	public String getOldSupplier() {
		return oldSupplier;
	}
	
}
