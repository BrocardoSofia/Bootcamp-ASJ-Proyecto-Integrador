package com.bootcamp.integrador.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "PurchaseStates")
public class PurchaseStateModel {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
	
	@NotNull(message = "purchase state cannot be null")
    @NotBlank(message = "purchase state cannot be empty")
    @Size(min = 2, max = 50, message = "purchase state must be between 2 and 50 characters")
	private String purchaseState;

	public PurchaseStateModel(int id, String purchaseState) {
		this.id = id;
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
