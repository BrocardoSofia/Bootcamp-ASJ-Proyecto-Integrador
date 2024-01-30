package com.bootcamp.integrador.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.integrador.models.CountryModel;
import com.bootcamp.integrador.models.ProvinceModel;
import com.bootcamp.integrador.repositories.CountryRepository;

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
    
    public CountryModel updateCountry(CountryModel country) {
        Optional<CountryModel> findCountry = countryRepository.findById(country.getId());

        if (findCountry.isPresent()) {
        	findCountry.get().setCountry(country.getCountry());
            countryRepository.save(country);
        } else {
            findCountry = null;
        }

        return country;
    }
    
    public List<ProvinceModel> getProvinces(int id){
    	 Optional<CountryModel> findCountry = countryRepository.findById(id);
    	 
    	 if (findCountry.isPresent()) {
         	return findCountry.get().getProvinces();
         } else {
             return null;
         }
    }
}
