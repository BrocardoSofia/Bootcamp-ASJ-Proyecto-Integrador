package com.bootcamp.integrador.services;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.integrador.models.ProductCategoryModel;
import com.bootcamp.integrador.models.UserModel;
import com.bootcamp.integrador.repositories.UserRepositoriy;

@Service
public class UserService {
    @Autowired
    UserRepositoriy userRepository;
    
    
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
    public UserModel deleteUser(UserModel user) {
        UserModel userDeleted = userRepository.findById(user.getId()).get();
        if(userDeleted != null) {
            userDeleted.setDeletedAt(LocalDateTime.now());
            userRepository.save(userDeleted);
        }
        return userDeleted;
    }
    
    //reinsertar usuario
    public boolean reInserUser(UserModel user) {
    	Optional<UserModel> foundUser = userRepository.findById(user.getId());

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
        String oldUserAlias = existingUser.getUserAlias();
        UserModel validUserAlias = userRepository.findByUserAlias(user.getUserAlias());
        
        if((existingUser != null) && ((validUserAlias == null)||(oldUserAlias == user.getUserAlias()))) {
            existingUser.setUserAlias(user.getUserAlias());
            existingUser.setPassword(user.getPassword());
            existingUser.setUpdatedAt(LocalDateTime.now());
            userRepository.save(existingUser);
        }else {
        	existingUser = null;
        }
        
        return existingUser;
    }

    
}
