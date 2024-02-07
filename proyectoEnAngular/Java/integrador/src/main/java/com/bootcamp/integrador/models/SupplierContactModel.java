package com.bootcamp.integrador.models;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;

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
@Table(name = "SuppliersContacts")
public class SupplierContactModel {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
	
	@JsonBackReference
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "supplier_id", nullable = false)
    private SupplierModel supplier;
	
	@NotNull(message = "Contact Name cannot be null")
    @NotBlank(message = "Contact Name cannot be empty")
    @Size(min = 2, max = 50, message = "Contact Name must be greater than 2 characters")
    private String contactName;
	
	@NotNull(message = "Contact Lastname cannot be null")
    @NotBlank(message = "Contact Lastname cannot be empty")
    @Size(min = 2, max = 50, message = "Contact Lastname must be greater than 2 characters")
    private String contactLastname;
	
	@NotNull(message = "Phone cannot be null")
    @NotBlank(message = "Phone cannot be empty")
    @Size(min = 2, max = 50, message = "Phone must be between 2 and 50 characters")
    private String phone;
	
	@NotNull(message = "Email cannot be null")
    @NotBlank(message = "Email cannot be empty")
    @Size(min = 2, max = 50, message = "Email must be between 2 and 50 characters")
    private String email;
	
	@NotNull(message = "Rol cannot be null")
    @NotBlank(message = "Rol cannot be empty")
    @Size(min = 2, max = 50, message = "Rol must be between 2 and 50 characters")
    private String rol;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime updatedAt;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime deletedAt;
    
    public SupplierContactModel() {
    }
    
    public SupplierContactModel(SupplierModel supplier, String contactName, String contactLastname, 
    							String phone, String email, String rol) {
    	this.supplier = supplier;
    	this.contactName = contactName;
    	this.contactLastname = contactLastname;
    	this.phone = phone;
    	this.email = email;
    	this.rol = rol;
    	this.deletedAt = null;
		this.updatedAt = null;
		this.createdAt = LocalDateTime.now();
    }

	public SupplierModel getSupplier() {
		return supplier;
	}

	public void setSupplier(SupplierModel supplier) {
		this.supplier = supplier;
	}

	public String getContactName() {
		return contactName;
	}

	public void setContactName(String contactName) {
		this.contactName = contactName;
	}

	public String getContactLastname() {
		return contactLastname;
	}

	public void setContactLastname(String contactLastname) {
		this.contactLastname = contactLastname;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getRol() {
		return rol;
	}

	public void setRol(String rol) {
		this.rol = rol;
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
}
