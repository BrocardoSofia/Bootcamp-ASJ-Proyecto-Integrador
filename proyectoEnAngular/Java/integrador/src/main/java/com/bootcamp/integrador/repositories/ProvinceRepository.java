package com.bootcamp.integrador.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.integrador.models.ProvinceModel;

public interface ProvinceRepository extends JpaRepository<ProvinceModel, Integer> {
    ProvinceModel findByProvince(String province);
}