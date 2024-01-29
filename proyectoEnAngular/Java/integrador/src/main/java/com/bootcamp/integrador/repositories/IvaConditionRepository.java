package com.bootcamp.integrador.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.integrador.models.IvaConditionModel;
import com.bootcamp.integrador.models.UserModel;

public interface IvaConditionRepository extends JpaRepository<IvaConditionModel, Integer>{
	IvaConditionModel findByIvaCondition(String IvaCondition);
}
