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
@Table(name = "Users")
public class UserModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotNull(message = "user name cannot be null")
    @NotBlank(message = "user name cannot be empty")
    @Size(min = 5, max = 50, message = "user name must be between 1 and 50 characters")
    private String user_name;

    @NotNull(message = "password cannot be null")
    @NotBlank(message = "password cannot be empty")
    @Size(min = 9, max = 20, message = "password must be between 8 and 20 characters")
    private String password;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private LocalDateTime created_at = LocalDateTime.now();
    
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime updated_at;
    
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime deleted_at;

    public UserModel() {

    }

    public UserModel(int id, String user_name, String password) {
        super();
        this.id = id;
        this.user_name = user_name;
        this.password = password;
        this.created_at = LocalDateTime.now();
        this.updated_at = null;
        this.deleted_at = null;
    }

    public String getUser_name() {
        return user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public LocalDateTime getUpdated_at() {
        return updated_at;
    }

    public void setUpdated_at(LocalDateTime updated_at) {
        this.updated_at = updated_at;
    }

    public LocalDateTime getDeleted_at() {
        return deleted_at;
    }

    public void setDeleted_at(LocalDateTime deleted_at) {
        this.deleted_at = deleted_at;
    }

    public int getId() {
        return id;
    }

    public LocalDateTime getCreated_at() {
        return created_at;
    }
}