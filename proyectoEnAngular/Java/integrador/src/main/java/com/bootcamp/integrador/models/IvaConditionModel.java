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
@Table(name = "IvaConditions")
public class IvaConditionModel {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
	
	@NotNull(message = "purchase state cannot be null")
    @NotBlank(message = "purchase state cannot be empty")
    @Size(min = 2, max = 50, message = "purchase state must be between 2 and 50 characters")
	@Column(unique = true)
	private String ivaCondition;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

	public IvaConditionModel(String ivaCondition) {
		this.ivaCondition = ivaCondition;
	}
	
	public IvaConditionModel() {
	}

	public String getIvaCondition() {
		return ivaCondition;
	}

	public void setIvaCondition(String ivaCondition) {
		this.ivaCondition = ivaCondition;
	}

	public int getId() {
		return id;
	}

	@Override
	public String toString() {
		return "IvaConditionModel [id=" + id + ", ivaCondition=" + ivaCondition + "]";
	}
	
	
}
