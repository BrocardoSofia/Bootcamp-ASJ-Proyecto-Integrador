package com.bootcamp.integrador.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.integrador.models.ProductImageModel;

public interface ProductImageRepository extends JpaRepository<ProductImageModel, Integer>{

}
