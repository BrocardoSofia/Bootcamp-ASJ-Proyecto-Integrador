package com.bootcamp.integrador.services;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.integrador.models.ProductCategoryModel;
import com.bootcamp.integrador.models.UserModel;
import com.bootcamp.integrador.repositories.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;
    
    
    //obtener usuarios
  	public Page<UserModel> getUsers(Pageable pageable, String userAlias){
  		Page<UserModel> page;
  		if(userAlias == "") {
  			//no envio userAlias
  			page = userRepository.findAll(pageable);
  		}else {
  			page = userRepository.findAllByUserAliasContainingIgnoreCase(userAlias, pageable);	
  		}
  		return page;
  	}
  	
  	//obtener usuarios activos
  	public Page<UserModel> getActiveUsers(Pageable pageable, String userAlias){
  		Page<UserModel> page;
  		if(userAlias == "") {
  			//no envio userAlias
  			page = userRepository.findAllByDeletedAtIsNull(pageable);
  		}else {
  			page = userRepository.findAllByDeletedAtIsNullAndUserAliasContainingIgnoreCase(userAlias, pageable);	
  		}
  		return page;
  	}
  	
  	//obtener usuarios eliminados
  	public Page<UserModel> getDeletedUsers(Pageable pageable, String userAlias){
  		Page<UserModel> page;
  		if(userAlias == "") {
  			//no envio userAlias
  			page = userRepository.findAllByDeletedAtIsNotNull(pageable);
  		}else {
  			page = userRepository.findAllByDeletedAtIsNotNullAndUserAliasContainingIgnoreCase(userAlias, pageable);	
  		}
  		return page;
  	}

    //obtener un usuario segun su id
    public Optional<UserModel> getUserById(int id) {
        return userRepository.findById(id);
    }
    
    //obtener un usuario segun alias
    public UserModel getUserByAlias(String userAlias) {
        return userRepository.findByUserAlias(userAlias);
    }
    
    //obtener login user
    public UserModel loginUser(String userAlias, String password) {
        UserModel user =  userRepository.findByUserAlias(userAlias);
        
        if(user != null && user.getDeletedAt() == null) {
        	if(user.getPassword().equals(password)) {
        		return user;
        	}
        }
        
        return null;
    }

    //insertar usuario
    @Transactional
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
        UserModel userDeleted = userRepository.findById(id).get();
        if(userDeleted != null) {
            userDeleted.setDeletedAt(LocalDateTime.now());
            userRepository.save(userDeleted);
        }
        return userDeleted;
    }
    
    //reinsertar usuario
    public boolean reInserUser(int id) {
    	Optional<UserModel> foundUser = userRepository.findById(id);

        if (foundUser.isPresent()) {
        	UserModel undeletedUser = foundUser.get();
        	undeletedUser.setDeletedAt(null);
            userRepository.save(undeletedUser);
            return true;
        } else {
            return false;
        }
    }

    //modificar usuario
    public UserModel updateUser(UserModel user) {
        UserModel existingUser = userRepository.findById(user.getId()).orElse(null);
        
        if((existingUser != null)) {
            existingUser.setUserAlias(user.getUserAlias());
            existingUser.setPassword(user.getPassword());
            existingUser.setUpdatedAt(LocalDateTime.now());
            userRepository.save(existingUser);
        }
        
        return existingUser;
    }

    
}
