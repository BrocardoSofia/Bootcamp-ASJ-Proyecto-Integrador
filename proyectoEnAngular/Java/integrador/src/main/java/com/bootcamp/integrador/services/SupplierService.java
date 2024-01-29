package com.bootcamp.integrador.services;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.bootcamp.integrador.models.SupplierModel;
import com.bootcamp.integrador.models.UserModel;
import com.bootcamp.integrador.repositories.SupplierRepository;

@Service
public class SupplierService {
	@Autowired
	SupplierRepository supplierRepository;
	
	//obtener proveedores
	public Page<SupplierModel> getSuppliers(Pageable pageable, String businessName){
		Page<SupplierModel> page;
		if(businessName == "") {
			page = supplierRepository.findAll(pageable);
		}else {
			page = supplierRepository.findAllByBusinessNameContainingIgnoreCase(businessName, pageable);
		}
		return page;
	}
	
	//obtener proveedores activos
	public Page<SupplierModel> getActiveSuppliers(Pageable pageable, String businessName){
		Page<SupplierModel> page;
		if(businessName == "") {
			page = supplierRepository.findAllByDeletedAtIsNull(pageable);
		}else {
			page = supplierRepository.findAllByDeletedAtIsNullAndBusinessNameContainingIgnoreCase(businessName, pageable);
		}
		return page;
	}
	
	//obtener proveedores eliminados
		public Page<SupplierModel> getDeletedSuppliers(Pageable pageable, String businessName){
			Page<SupplierModel> page;
			if(businessName == "") {
				page = supplierRepository.findAllByDeletedAtIsNotNull(pageable);
			}else {
				page = supplierRepository.findAllByDeletedAtIsNotNullAndBusinessNameContainingIgnoreCase(businessName, pageable);
			}
			return page;
		}
	
	/*
	 *   	
    //obtener un usuario segun su id
    public Optional<UserModel> getUserById(int id) {
        return userRepository.findById(id);
    }

    //insertar usuario
    public UserModel addUser(UserModel user) {
    	UserModel findUser = userRepository.findByUserAlias(user.getUserAlias());
    	
    	if(findUser == null){
    		userRepository.save(user);
    		findUser = userRepository.findByUserAlias(user.getUserAlias());
    	}else{
    		findUser = null;
    	}
    	
        return findUser;
    }

    //eliminar usuario
    public UserModel deleteUser(int id) {
        UserModel user = userRepository.findById(id).get();
        if(user != null) {
            user.setDeletedAt(LocalDateTime.now());
            userRepository.save(user);
        }
        return user;
    }

    //modificar usuario
    public UserModel updateUser(UserModel user) {
        UserModel existingUser = userRepository.findById(user.getId()).orElse(null);
        if(existingUser != null) {
            existingUser.setUserAlias(user.getUserAlias());
            existingUser.setPassword(user.getPassword());
            existingUser.setUpdatedAt(LocalDateTime.now());
            userRepository.save(existingUser);
        }
        return existingUser;
    }
	*/
}
