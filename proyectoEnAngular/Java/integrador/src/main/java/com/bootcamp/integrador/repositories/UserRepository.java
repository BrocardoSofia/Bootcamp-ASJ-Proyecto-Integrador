package com.bootcamp.integrador.repositories;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.integrador.models.UserModel;

public interface UserRepository extends JpaRepository<UserModel, Integer>
{
	Page<UserModel> findAll(Pageable pageable);
	Page<UserModel> findAllByDeletedAtIsNull(Pageable pageable);
	Page<UserModel> findAllByDeletedAtIsNullAndUserAliasContainingIgnoreCase(String userAlias, Pageable pageable);
	Page<UserModel> findAllByDeletedAtIsNotNull(Pageable pageable);
    Page<UserModel> findAllByDeletedAtIsNotNullAndUserAliasContainingIgnoreCase(String userAlias, Pageable pageable);
    Page<UserModel> findAllByUserAliasContainingIgnoreCase(String userAlias, Pageable pageable);
    UserModel findByUserAlias(String userAlias);
}
