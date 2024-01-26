package com.bootcamp.integrador.controllers;


import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bootcamp.integrador.models.UserModel;
import com.bootcamp.integrador.services.UserService;

@RestController
@RequestMapping("/users") //localhost:8080/users
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
    @Autowired
    UserService userService;

    //obtener todos los usuarios
    @GetMapping()
	public Page<UserModel> getUsers(Pageable pageable, 
									@RequestParam(required = false, defaultValue = "") String userAlias) {		
		
		return userService.getUsers(pageable, userAlias);
	}
    
    //obtener usuarios eliminados
    @GetMapping("/active")
	public Page<UserModel> getActiveUsers(Pageable pageable, 
											@RequestParam(required = false, defaultValue = "") String userAlias) {		
		
		return userService.getActiveUsers(pageable, userAlias);
	}
    
    //obtener usuario activos
    @GetMapping("/deleted")
	public Page<UserModel> getDeletedUsers(Pageable pageable, 
											@RequestParam(required = false, defaultValue = "") String userAlias) {		
		
		return userService.getDeletedUsers(pageable, userAlias);
	}
    

    //cargar nuevo usuario
    @PostMapping()
    public ResponseEntity<UserModel> addUser(@RequestBody UserModel user) {
        UserModel userAdded = userService.addUser(user);
        return new ResponseEntity<>(userAdded, HttpStatus.CREATED);
    }

    //eliminar usuario
    @DeleteMapping("/{id}")
    public ResponseEntity<UserModel> deleteUser(@PathVariable int id) {
        UserModel deletedUsers = userService.deleteUser(id);
        
        return new ResponseEntity<>(deletedUsers, HttpStatus.OK);
    }

    //modificar usuario
    @PutMapping
    public ResponseEntity<UserModel> updateUser(@RequestBody UserModel user) {
        UserModel updatedUser = userService.updateUser(user);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }
}
