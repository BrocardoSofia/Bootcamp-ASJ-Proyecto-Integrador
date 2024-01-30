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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bootcamp.integrador.models.ProvinceModel;
import com.bootcamp.integrador.services.ProvinceService;

@RestController
@RequestMapping("/provinces")
@CrossOrigin(origins = "http://localhost:4200")
public class ProvinceController {
    @Autowired
    ProvinceService provinceService;

    @GetMapping()
    public List<ProvinceModel> getProvinces() {
        return provinceService.getProvinces();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<ProvinceModel>> getProvinceById(@PathVariable int id) {
        Optional<ProvinceModel> foundProvince = provinceService.getProvinceById(id);

        if (foundProvince.isEmpty()) {
            return new ResponseEntity<>(foundProvince, HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(foundProvince, HttpStatus.FOUND);
        }
    }

    @PostMapping()
    public ResponseEntity<ProvinceModel> addProvince(@RequestBody ProvinceModel province) {
        ProvinceModel provinceAdded = provinceService.addProvince(province);
        if (provinceAdded == null) {
            return new ResponseEntity<>(provinceAdded, HttpStatus.CONFLICT);
        } else {
            return new ResponseEntity<>(provinceAdded, HttpStatus.CREATED);
        }
    }
}
