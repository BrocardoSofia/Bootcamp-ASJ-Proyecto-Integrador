package com.bootcamp.integrador.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bootcamp.integrador.models.CountryModel;
import com.bootcamp.integrador.models.ProvinceModel;
import com.bootcamp.integrador.services.CountryService;

@RestController
@RequestMapping("/countries")
@CrossOrigin(origins = "http://localhost:4200")
public class CountryController {
    @Autowired
    CountryService countryService;

    @GetMapping()
    public List<CountryModel> getCountries() {
        return countryService.getCountries();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<CountryModel>> getCountryById(@PathVariable int id) {
        Optional<CountryModel> foundCountry = countryService.getCountryById(id);

        if (foundCountry.isEmpty()) {
            return new ResponseEntity<>(foundCountry, HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(foundCountry, HttpStatus.FOUND);
        }
    }
    
    @GetMapping("/{id}/provinces")
    public ResponseEntity<List<ProvinceModel>> getCountryProvincesById(@PathVariable int id) {
    	List<ProvinceModel> provinces = countryService.getProvinces(id);

        if (provinces == null) {
            return new ResponseEntity<>(provinces, HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(provinces, HttpStatus.FOUND);
        }
    }

    @PostMapping()
    public ResponseEntity<CountryModel> addCountry(@RequestBody CountryModel country) {
        CountryModel countryAdded = countryService.addCountry(country);
        if (countryAdded == null) {
            return new ResponseEntity<>(countryAdded, HttpStatus.CONFLICT);
        } else {
            return new ResponseEntity<>(countryAdded, HttpStatus.CREATED);
        }
    }
    
    @PutMapping()
    public ResponseEntity<CountryModel> updateCountry(@RequestBody CountryModel country) {
        CountryModel countryUpdated = countryService.addCountry(country);
        
        if (countryUpdated == null) {
            return new ResponseEntity<>(countryUpdated, HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(countryUpdated, HttpStatus.OK);
        }
    }
}