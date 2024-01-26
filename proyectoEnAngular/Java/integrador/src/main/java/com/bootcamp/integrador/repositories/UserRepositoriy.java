package com.bootcamp.integrador.repositories;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.integrador.models.UserModel;

public interface UserRepositoriy extends JpaRepository<UserModel, Integer>
{
	Page<UserModel> findAll(Pageable pageable);
}
