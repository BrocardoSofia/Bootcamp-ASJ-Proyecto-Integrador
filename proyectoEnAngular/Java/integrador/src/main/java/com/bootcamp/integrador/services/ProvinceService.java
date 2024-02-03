package com.bootcamp.integrador.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.integrador.models.CountryModel;
import com.bootcamp.integrador.models.ProvinceModel;
import com.bootcamp.integrador.repositories.CountryRepository;
import com.bootcamp.integrador.repositories.ProvinceRepository;

import jakarta.transaction.Transactional;

@Service
public class ProvinceService {
    @Autowired
    ProvinceRepository provinceRepository;
    
    @Autowired
    CountryRepository countryRepository;

    public List<ProvinceModel> getProvinces() {
        return provinceRepository.findAll();
    }

    public Optional<ProvinceModel> getProvinceById(int id) {
        return provinceRepository.findById(id);
    }

    @Transactional
    public ProvinceModel addProvince(ProvinceModel province) {
        ProvinceModel savedProvince = provinceRepository.save(province);

        return savedProvince;
    }
    
    
}
