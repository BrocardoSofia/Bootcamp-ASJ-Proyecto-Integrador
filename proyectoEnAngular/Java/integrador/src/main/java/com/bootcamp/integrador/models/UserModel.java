package com.bootcamp.integrador.models;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "Users")
public class UserModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@NotNull
	@NotBlank 
	private String user_name;
	
	@NotNull
	@NotBlank 
	private String password;
	
	@NotNull
	@NotBlank 
	private Date created_at;
	
	private Date updated_at;
	private Date deleted_at;
	
	public UserModel() {
		
	}
	
	public UserModel(int id, String user_name, String password, Date created_at, Date updated_at, Date deleted_at) {
		super();
		this.id = id;
		this.user_name = user_name;
		this.password = password;
		this.created_at = created_at;
		this.updated_at = updated_at;
		this.deleted_at = deleted_at;
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
	public Date getUpdated_at() {
		return updated_at;
	}
	public void setUpdated_at(Date updated_at) {
		this.updated_at = updated_at;
	}
	public Date getDeleted_at() {
		return deleted_at;
	}
	public void setDeleted_at(Date deleted_at) {
		this.deleted_at = deleted_at;
	}
	public int getId() {
		return id;
	}
	public Date getCreated_at() {
		return created_at;
	}
	
	
}
