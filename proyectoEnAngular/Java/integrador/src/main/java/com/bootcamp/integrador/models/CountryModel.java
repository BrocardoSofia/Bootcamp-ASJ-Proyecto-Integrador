package com.bootcamp.integrador.models;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Table(name = "countries")
public class CountryModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotNull(message = "country cannot be null")
    @NotBlank(message = "country cannot be empty")
    @Size(min = 2, max = 50, message = "country must be between 2 and 50 characters")
    @Column(unique = true)
    private String country;
    
    @Temporal(TemporalType.TIMESTAMP)
	@Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
 
    @JsonManagedReference
    @OneToMany(mappedBy = "country", cascade = CascadeType.ALL)
    private List<ProvinceModel> provinces = new ArrayList<>();

    public CountryModel(String country) {
        this.country = country;
    }

    public CountryModel() {
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public int getId() {
        return id;
    }
}
