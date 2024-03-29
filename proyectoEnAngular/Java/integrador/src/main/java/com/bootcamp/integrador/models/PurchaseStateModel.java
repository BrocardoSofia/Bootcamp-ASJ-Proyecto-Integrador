package com.bootcamp.integrador.models;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "purchase_states")
public class PurchaseStateModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotNull(message = "purchase state cannot be null")
    @NotBlank(message = "purchase state cannot be empty")
    @Size(min = 2, max = 50, message = "purchase state must be between 2 and 50 characters")
    @Column(unique = true)
    private String purchaseState;
    
    @Temporal(TemporalType.TIMESTAMP)
	@Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public PurchaseStateModel(String purchaseState) {
        this.purchaseState = purchaseState;
    }

    public PurchaseStateModel() {
    }

    public String getPurchaseState() {
        return purchaseState;
    }

    public void setPurchaseState(String purchaseState) {
        this.purchaseState = purchaseState;
    }

    public int getId() {
        return id;
    }
}
