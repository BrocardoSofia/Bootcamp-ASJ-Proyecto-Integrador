package com.bootcamp.integrador.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.integrador.models.PurchaseStateModel;
import com.bootcamp.integrador.models.UserModel;

public interface PurchaseStateRepository extends JpaRepository<PurchaseStateModel, Integer>{

}
