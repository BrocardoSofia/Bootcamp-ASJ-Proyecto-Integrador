package com.bootcamp.integrador.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.integrador.models.ProvinceModel;
import com.bootcamp.integrador.repositories.ProvinceRepository;

@Service
public class ProvinceService {
    @Autowired
    ProvinceRepository provinceRepository;

    public List<ProvinceModel> getProvinces() {
        return provinceRepository.findAll();
    }

    public Optional<ProvinceModel> getProvinceById(int id) {
        return provinceRepository.findById(id);
    }

    public ProvinceModel addProvince(ProvinceModel province) {
        ProvinceModel findProvince = provinceRepository.findByProvince(province.getProvince());

        if (findProvince == null) {
            provinceRepository.save(province);
            findProvince = provinceRepository.findByProvince(province.getProvince());
        } else {
            findProvince = null;
        }

        return province;
    }
    
    public ProvinceModel updateProvince(ProvinceModel province) {
        ProvinceModel findProvince = provinceRepository.findByProvince(province.getProvince());

        if (findProvince == null) {
            findProvince.setProvince(province.getProvince());
            provinceRepository.save(province);
        } else {
            findProvince = null;
        }

        return province;
    }
}
