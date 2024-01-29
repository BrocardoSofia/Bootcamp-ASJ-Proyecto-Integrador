package com.bootcamp.integrador.models;

import java.util.Date;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "suppliers")
public class SupplierModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "supplier_category_id", nullable = false)
    private SupplierCategoryModel supplierCategory;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by", nullable = false)
    private UserModel createdBy;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "updated_by", nullable = false)
    private UserModel updatedBy;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "province_id", nullable = false)
    private ProvinceModel province;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "iva_condition_id", nullable = false)
    private IvaConditionModel ivaCondition;

    @NotNull(message = "supplierCode cannot be null")
    @NotBlank(message = "supplierCode cannot be empty")
    @Size(min = 2, max = 50, message = "supplierCode must be between 2 and 50 characters")
    @Column(unique = true)
    private String supplierCode;

    @NotNull(message = "businessName cannot be null")
    @NotBlank(message = "businessName cannot be empty")
    @Size(min = 2, max = 50, message = "businessName must be between 2 and 50 characters")
    @Column(unique = true)
    private String businessName;

    private String imageUrl;

    private String buisnessWebpage;

    @NotNull(message = "buisnessEmail cannot be null")
    @NotBlank(message = "buisnessEmail cannot be empty")
    @Size(min = 2, max = 50, message = "buisnessEmail must be between 2 and 50 characters")
    @Column(unique = true)
    private String buisnessEmail;

    @NotNull(message = "buisnessPhone cannot be null")
    @NotBlank(message = "buisnessPhone cannot be empty")
    @Size(min = 2, max = 50, message = "buisnessPhone must be between 2 and 50 characters")
    @Column(unique = true)
    private String buisnessPhone;

    @NotNull(message = "streetName cannot be null")
    @NotBlank(message = "streetName cannot be empty")
    @Size(min = 2, max = 50, message = "streetName must be between 2 and 50 characters")
    private String streetName;

    @NotNull(message = "streetNumber cannot be null")
    @Column(nullable = false)
    private int streetNumber;

    @NotNull(message = "city cannot be null")
    @NotBlank(message = "city cannot be empty")
    @Size(min = 2, max = 50, message = "city must be between 2 and 50 characters")
    private String city;

    @NotNull(message = "cp cannot be null")
    @NotBlank(message = "cp cannot be empty")
    @Size(min = 2, max = 50, message = "cp must be between 2 and 50 characters")
    private String cp;

    @NotNull(message = "cuit cannot be null")
    @NotBlank(message = "cuit cannot be empty")
    @Size(min = 2, max = 50, message = "cuit must be between 2 and 50 characters")
    private String cuit;

    @CreationTimestamp
    private Date createdAt;

    @UpdateTimestamp
    private Date updatedAt;

    private Date deletedAt;

    public SupplierModel(int id, SupplierCategoryModel supplierCategory, 
    					UserModel createdBy, UserModel updatedBy, ProvinceModel province, 
    					IvaConditionModel ivaCondition, String supplierCode, String businessName, 
    					String imageUrl, String buisnessWebpage, String buisnessEmail, String buisnessPhone, 
    					String streetName, int streetNumber, String city, String cp, String cuit) {
        this.id = id;
        this.supplierCategory = supplierCategory;
        this.createdBy = createdBy;
        this.updatedBy = null;
        this.deletedAt = null;
        this.province = province;
        this.ivaCondition = ivaCondition;
        this.supplierCode = supplierCode;
        this.businessName = businessName;
        this.imageUrl = imageUrl;
        this.buisnessWebpage = buisnessWebpage;
        this.buisnessEmail = buisnessEmail;
        this.buisnessPhone = buisnessPhone;
        this.streetName = streetName;
        this.streetNumber = streetNumber;
        this.city = city;
        this.cp = cp;
        this.cuit = cuit;
    }

    public SupplierModel() {
    }

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public UserModel getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(UserModel updatedBy) {
		this.updatedBy = updatedBy;
	}

	public ProvinceModel getProvince() {
		return province;
	}

	public void setProvince(ProvinceModel province) {
		this.province = province;
	}

	public IvaConditionModel getIvaCondition() {
		return ivaCondition;
	}

	public void setIvaCondition(IvaConditionModel ivaCondition) {
		this.ivaCondition = ivaCondition;
	}

	public String getBusinessName() {
		return businessName;
	}

	public void setBusinessName(String businessName) {
		this.businessName = businessName;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public String getBuisnessWebpage() {
		return buisnessWebpage;
	}

	public void setBuisnessWebpage(String buisnessWebpage) {
		this.buisnessWebpage = buisnessWebpage;
	}

	public String getBuisnessEmail() {
		return buisnessEmail;
	}

	public void setBuisnessEmail(String buisnessEmail) {
		this.buisnessEmail = buisnessEmail;
	}

	public String getBuisnessPhone() {
		return buisnessPhone;
	}

	public void setBuisnessPhone(String buisnessPhone) {
		this.buisnessPhone = buisnessPhone;
	}

	public String getStreetName() {
		return streetName;
	}

	public void setStreetName(String streetName) {
		this.streetName = streetName;
	}

	public int getStreetNumber() {
		return streetNumber;
	}

	public void setStreetNumber(int streetNumber) {
		this.streetNumber = streetNumber;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getCp() {
		return cp;
	}

	public void setCp(String cp) {
		this.cp = cp;
	}

	public String getCuit() {
		return cuit;
	}

	public void setCuit(String cuit) {
		this.cuit = cuit;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

	public Date getDeletedAt() {
		return deletedAt;
	}

	public void setDeletedAt(Date deletedAt) {
		this.deletedAt = deletedAt;
	}

	public SupplierCategoryModel getSupplierCategory() {
		return supplierCategory;
	}

	public UserModel getCreatedBy() {
		return createdBy;
	}

	public String getSupplierCode() {
		return supplierCode;
	}

	public Date getCreatedAt() {
		return createdAt;
	}
    
    
}