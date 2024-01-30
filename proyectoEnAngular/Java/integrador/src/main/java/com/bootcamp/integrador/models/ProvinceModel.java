package com.bootcamp.integrador.models;

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
@Table(name = "provinces")
public class ProvinceModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotNull(message = "province cannot be null")
    @NotBlank(message = "province cannot be empty")
    @Size(min = 2, max = 50, message = "province must be between 2 and 50 characters")
    @Column(unique = true)
    private String province;

    @ManyToOne
    @JoinColumn(name = "country_id", nullable = false)
    private CountryModel country;

    public ProvinceModel(int id, String province, CountryModel country) {
        this.id = id;
        this.province = province;
        this.country = country;
    }

    public ProvinceModel() {
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public int getId() {
        return id;
    }

    public CountryModel getCountry() {
        return country;
    }

    public void setCountry(CountryModel country) {
        this.country = country;
    }

//	public List<SupplierModel> getSuppliers() {
//		return suppliers;
//	}
    
}