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
@Table(name = "provinces")
public class ProvinceModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotNull(message = "province cannot be null")
    @NotBlank(message = "province cannot be empty")
    @Size(min = 2, max = 50, message = "province must be between 2 and 50 characters")
    private String province;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "country_id", nullable = false)
    private CountryModel country;
    
    @Temporal(TemporalType.TIMESTAMP)
	@Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public ProvinceModel(String province, CountryModel country) {
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

	@Override
	public String toString() {
		return "ProvinceModel [id=" + id + ", province=" + province + ", country=" + country + "]";
	}
    
    
}