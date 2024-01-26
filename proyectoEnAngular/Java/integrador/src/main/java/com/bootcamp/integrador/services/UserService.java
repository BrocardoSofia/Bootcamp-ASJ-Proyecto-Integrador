package com.bootcamp.integrador.services;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.integrador.models.UserModel;
import com.bootcamp.integrador.repositories.UserRepositoriy;

@Service
public class UserService {
    @Autowired
    UserRepositoriy userRepository;
    
    
    //obtener usuarios
  	public Page<UserModel> getUsers(Pageable pageable){
  		return userRepository.findAll(pageable);
  	}

    //obtener un usuario segun su id
    public Optional<UserModel> getUserById(int id) {
        return userRepository.findById(id);
    }

    //insertar usuario
    public UserModel addUser(UserModel user) {
        userRepository.save(user);
        return user;
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

    
}
