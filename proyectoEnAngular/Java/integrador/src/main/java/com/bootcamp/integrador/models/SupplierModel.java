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
@Table(name = "suppliers")
public class SupplierModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "supplier_category_id", nullable = false)
    private SupplierCategoryModel supplierCategory;

    @ManyToOne
    @JoinColumn(name = "created_by_id", nullable = false)
    private UserModel createdBy;

    @ManyToOne
    @JoinColumn(name = "province_id", nullable = false)
    private ProvinceModel province;

    @ManyToOne
    @JoinColumn(name = "iva_condition_id", nullable = false)
    private IvaConditionModel ivaCondition;

    @NotNull(message = "supplierCode cannot be null")
    @NotBlank(message = "supplierCode cannot be empty")
    @Size(min = 4, max = 50, message = "supplierCode must be between 4 and 50 characters")
    @Column(unique = true)
    private String supplierCode;

    @NotNull(message = "businessName cannot be null")
    @NotBlank(message = "businessName cannot be empty")
    @Size(min = 2, max = 50, message = "businessName must be between 2 and 50 characters")
    @Column(unique = true)
    private String businessName;

    @Size(min = 2, max = 1500, message = "Image Url must be between 2 and 50 characters")
    @Column(nullable = true)
    private String imageUrl;

    @Size(min = 2, max = 1500, message = "Business Webpage must be between 2 and 50 characters")
    @Column(nullable = true)
    private String businessWebpage;

    @NotNull(message = "buisnessEmail cannot be null")
    @NotBlank(message = "buisnessEmail cannot be empty")
    @Size(min = 2, max = 50, message = "buisnessEmail must be between 2 and 50 characters")
    @Column(unique = true)
    private String businessEmail;

    @NotNull(message = "buisnessPhone cannot be null")
    @NotBlank(message = "buisnessPhone cannot be empty")
    @Size(min = 2, max = 50, message = "buisnessPhone must be between 2 and 50 characters")
    @Column(unique = true)
    private String businessPhone;

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
    @Size(min = 11, max = 11, message = "cuit must have 11 characters")
    private String cuit;
    
    @JsonManagedReference
    @OneToMany(mappedBy = "supplier", cascade = CascadeType.ALL)
    private List<SupplierContactModel> supplierContacts = new ArrayList<>();

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime updatedAt;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime deletedAt;

    public SupplierModel(SupplierCategoryModel supplierCategory, 
    					UserModel createdBy, UserModel updatedBy, ProvinceModel province, 
    					IvaConditionModel ivaCondition, String supplierCode, String businessName, 
    					String imageUrl, String buisnessWebpage, String buisnessEmail, String buisnessPhone, 
    					String streetName, int streetNumber, String city, String cp, String cuit) 
    {
    	this.createdAt = LocalDateTime.now();
        this.supplierCategory = supplierCategory;
        this.createdBy = createdBy;
        this.updatedAt = null;
        this.deletedAt = null;
        this.province = province;
        this.ivaCondition = ivaCondition;
        this.supplierCode = supplierCode;
        this.businessName = businessName;
        this.imageUrl = imageUrl;
        this.businessWebpage = buisnessWebpage;
        this.businessEmail = buisnessEmail;
        this.businessPhone = buisnessPhone;
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

	public String getBusinessWebpage() {
		return businessWebpage;
	}

	public void setBusinessWebpage(String buisnessWebpage) {
		this.businessWebpage = buisnessWebpage;
	}

	public String getBusinessEmail() {
		return businessEmail;
	}

	public void setBusinessEmail(String buisnessEmail) {
		this.businessEmail = buisnessEmail;
	}

	public String getBusinessPhone() {
		return businessPhone;
	}

	public void setBusinessPhone(String buisnessPhone) {
		this.businessPhone = buisnessPhone;
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

	public SupplierCategoryModel getSupplierCategory() {
		return supplierCategory;
	}
	
	public void setSupplierCategory(SupplierCategoryModel supplierCategory) {
		this.supplierCategory = supplierCategory;
	}

	public UserModel getCreatedBy() {
		return createdBy;
	}

	public String getSupplierCode() {
		return supplierCode;
	}
	
	public void setSupplierCode(String supplierCode) {
		this.supplierCode = supplierCode;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	@Override
	public String toString() {
		return "SupplierModel [id=" + id + ", supplierCategory=" + supplierCategory.toString() + ", createdBy=" + createdBy.toString()
				+ ", province=" + province.toString() + ", ivaCondition=" + ivaCondition.toString() + ", supplierCode=" + supplierCode
				+ ", businessName=" + businessName + ", imageUrl=" + imageUrl + ", businessWebpage=" + businessWebpage
				+ ", businessEmail=" + businessEmail + ", businessPhone=" + businessPhone + ", streetName=" + streetName
				+ ", streetNumber=" + streetNumber + ", city=" + city + ", cp=" + cp + ", cuit=" + cuit + ", createdAt="
				+ createdAt + ", updatedAt=" + updatedAt + ", deletedAt=" + deletedAt + "]";
	}
	
	
}