package com.bootcamp.integrador.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.integrador.models.ProvinceModel;

public interface ProvinceRepository extends JpaRepository<ProvinceModel, Integer> {
    ProvinceModel findByProvince(String province);
    List<ProvinceModel> findByCountryId(int countryId);
}