package com.bootcamp.integrador.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.integrador.models.CountryModel;
import com.bootcamp.integrador.models.ProvinceModel;
import com.bootcamp.integrador.repositories.CountryRepository;

import jakarta.transaction.Transactional;

@Service
public class CountryService {
    @Autowired
    CountryRepository countryRepository;

    public List<CountryModel> getCountries() {
        return countryRepository.findAll();
    }

    public Optional<CountryModel> getCountryById(int id) {
        return countryRepository.findById(id);
    }

    @Transactional
    public CountryModel addCountry(CountryModel country) {
        CountryModel findCountry = countryRepository.findByCountry(country.getCountry());

        if (findCountry == null) {
            countryRepository.save(country);
            findCountry = countryRepository.findByCountry(country.getCountry());
        } else {
            findCountry = null;
        }

        return country;
    }
    
    
}
