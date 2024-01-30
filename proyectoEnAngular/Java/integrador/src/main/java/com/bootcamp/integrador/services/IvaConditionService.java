package com.bootcamp.integrador.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.integrador.models.IvaConditionModel;
import com.bootcamp.integrador.repositories.IvaConditionRepository;

import jakarta.transaction.Transactional;

@Service
public class IvaConditionService {
	@Autowired
	IvaConditionRepository ivaConditionRepository;
	
	//obtener estados de compra
	public List<IvaConditionModel> getIvaConditions() {
		return ivaConditionRepository.findAll();
	}
	
	//obtener condicion de iva por Id
	public Optional<IvaConditionModel> getIvaConditionById(int id){
		return ivaConditionRepository.findById(id);
	}
	
	//cargar condicion de iva
	@Transactional
	public IvaConditionModel addIvaCondition(IvaConditionModel ivaCondition){
		IvaConditionModel findIvaCondition = ivaConditionRepository.findByIvaCondition(ivaCondition.getIvaCondition());
		
		if(findIvaCondition == null) {
			ivaConditionRepository.save(ivaCondition);
			findIvaCondition = ivaConditionRepository.findByIvaCondition(ivaCondition.getIvaCondition());
		}else {
			findIvaCondition = null;
		}
		
		return ivaCondition;
	}
	
}
