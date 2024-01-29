package com.bootcamp.integrador.models;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "Users")
public class UserModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotNull(message = "user alias cannot be null")
    @NotBlank(message = "user alias cannot be empty")
    @Size(min = 5, max = 50, message = "user alias must be between 1 and 50 characters")
    @Column(unique = true)
    private String userAlias;

    @NotNull(message = "password cannot be null")
    @NotBlank(message = "password cannot be empty")
    @Size(min = 9, max = 20, message = "password must be between 8 and 20 characters")
    private String password;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
    
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime updatedAt;
    
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime deletedAt;
    
    @OneToMany(mappedBy = "createdBy", fetch = FetchType.LAZY)
    private List<SupplierModel> createdSuppliers;

    @OneToMany(mappedBy = "updatedBy", fetch = FetchType.LAZY)
    private List<SupplierModel> updatedSuppliers;

    public UserModel() {

    }

    public UserModel(int id, String userAlias, String password) {
        super();
        this.id = id;
        this.userAlias = userAlias;
        this.password = password;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = null;
        this.deletedAt = null;
    }

    public String getUserAlias() {
        return userAlias;
    }

    public void setUserAlias(String user_name) {
        this.userAlias = user_name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updated_at) {
        this.updatedAt = updated_at;
    }

    public LocalDateTime getDeletedAt() {
        return deletedAt;
    }

    public void setDeletedAt(LocalDateTime deleted_at) {
        this.deletedAt = deleted_at;
    }

    public int getId() {
        return id;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

	public List<SupplierModel> getCreatedSuppliers() {
		return createdSuppliers;
	}

	public void setCreatedSuppliers(List<SupplierModel> createdSuppliers) {
		this.createdSuppliers = createdSuppliers;
	}

	public List<SupplierModel> getUpdatedSuppliers() {
		return updatedSuppliers;
	}

	public void setUpdatedSuppliers(List<SupplierModel> updatedSuppliers) {
		this.updatedSuppliers = updatedSuppliers;
	}
}