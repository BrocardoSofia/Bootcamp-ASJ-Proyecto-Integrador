package com.bootcamp.integrador.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.integrador.models.CountryModel;

public interface CountryRepository extends JpaRepository<CountryModel, Integer> {
    CountryModel findByCountry(String country);
}
