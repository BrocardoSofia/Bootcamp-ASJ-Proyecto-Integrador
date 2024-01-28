package com.bootcamp.integrador.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.integrador.models.IvaConditionModel;
import com.bootcamp.integrador.repositories.IvaConditionRepository;

@Service
public class IvaConditionService {
	@Autowired
	IvaConditionRepository ivaConditionRepository;
	
	//obtener estados de compra
	public List<IvaConditionModel> getIvaConditions() {
		return ivaConditionRepository.findAll();
	}
	
	//obtener estado de compra por Id
	public Optional<IvaConditionModel> getIvaConditionById(int id){
		return ivaConditionRepository.findById(id);
	}
	
	//cargar estado de compra
	public IvaConditionModel addIvaCondition(IvaConditionModel IvaCondition){
		ivaConditionRepository.save(IvaCondition);
		return IvaCondition;
	}
}
