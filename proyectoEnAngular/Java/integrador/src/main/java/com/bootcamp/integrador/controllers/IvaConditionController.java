package com.bootcamp.integrador.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bootcamp.integrador.models.IvaConditionModel;
import com.bootcamp.integrador.services.IvaConditionService;

@RestController
@RequestMapping("/iva-conditions") //localhost:8080/iva-conditions
@CrossOrigin(origins = "http://localhost:4200")
public class IvaConditionController {
	@Autowired
	IvaConditionService ivaConditionService;
	
	//obtener estados de compra
	@GetMapping()
	public List<IvaConditionModel> getIvaConditions() {
		return ivaConditionService.getIvaConditions();
	}
	
	//obtener estado de compra por Id
    @GetMapping("/{id}")
    public ResponseEntity<Optional<IvaConditionModel>> getIvaConditionById(@PathVariable int id){
    	Optional<IvaConditionModel> foundIvaCondition = ivaConditionService.getIvaConditionById(id);
    	
    	if(foundIvaCondition.isEmpty()) {
    		return new ResponseEntity<>(foundIvaCondition, HttpStatus.NOT_FOUND);
    	}else {
    		return new ResponseEntity<>(foundIvaCondition, HttpStatus.FOUND);
    	}    	
    }
	
	//cargar estado de compra
    @PostMapping()
    public ResponseEntity<IvaConditionModel> addIvaCondition(@RequestBody IvaConditionModel ivaCondition) {
    	IvaConditionModel ivaConditionAdded = ivaConditionService.addIvaCondition(ivaCondition);
        return new ResponseEntity<>(ivaConditionAdded, HttpStatus.CREATED);
    }
}
