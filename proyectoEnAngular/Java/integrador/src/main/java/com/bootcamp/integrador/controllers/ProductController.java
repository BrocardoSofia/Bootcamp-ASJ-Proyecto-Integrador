package com.bootcamp.integrador.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

import com.bootcamp.integrador.models.ProductModel;
import com.bootcamp.integrador.models.SupplierModel;
import com.bootcamp.integrador.services.ProductService;

@RestController
@RequestMapping("/products") //localhost:8080/products
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {
	@Autowired
	ProductService productService;
	
	//obtener todos los productos
	@GetMapping()
	public Page<ProductModel> getProducts(Pageable pageable, 
									@RequestParam(required = false, defaultValue = "") String productDescription,
									@RequestParam(required = false, defaultValue = "") String productName,
									@RequestParam(required = false, defaultValue = "") String codeSKU,
									@RequestParam(required = false, defaultValue = "-1") int supplierId){
		return productService.getProducts(pageable, supplierId, codeSKU, productName, productDescription);
	}
	
	//obtener productos activos
	@GetMapping("/active")
	public Page<ProductModel> getActiveProducts(Pageable pageable, 
									@RequestParam(required = false, defaultValue = "") String productDescription,
									@RequestParam(required = false, defaultValue = "") String productName,
									@RequestParam(required = false, defaultValue = "") String codeSKU,
									@RequestParam(required = false, defaultValue = "-1") int supplierId){
		return productService.getActiveProducts(pageable, supplierId, codeSKU, productName, productDescription);
	}
	
	//obtener productos eliminados
	@GetMapping("/deleted")
	public Page<ProductModel> getDeletedProducts(Pageable pageable, 
									@RequestParam(required = false, defaultValue = "") String productDescription,
									@RequestParam(required = false, defaultValue = "") String productName,
									@RequestParam(required = false, defaultValue = "") String codeSKU,
									@RequestParam(required = false, defaultValue = "-1") int supplierId){
		return productService.getDeletedProducts(pageable, supplierId, codeSKU, productName, productDescription);
	}
	
	//get por Id
	@GetMapping("/{id}")
	public ResponseEntity<Optional<ProductModel>> getProductById(@PathVariable int id){
		Optional<ProductModel> foundProduct = productService.getProductById(id);
		
		if(foundProduct.isEmpty()) {
			return new ResponseEntity<>(foundProduct, HttpStatus.NOT_FOUND);
		}else {
			return new ResponseEntity<>(foundProduct, HttpStatus.FOUND);
		}
	}
	
	//cargar nuevo producto
	@PostMapping()
	public ResponseEntity<ProductModel> addProduct(@RequestBody ProductModel product){
		ProductModel productAdded = productService.addProduct(product);
		
		if(productAdded == null) {
			return new ResponseEntity<>(productAdded, HttpStatus.CONFLICT);
		}else {
			return new ResponseEntity<>(productAdded, HttpStatus.CREATED);
		}
	}
	
	//eliminar producto
	@DeleteMapping("/{productId}/{userId}")
	public ResponseEntity<ProductModel> deleteProduct(@PathVariable int productId, @PathVariable int userId){
		ProductModel productDeleted = productService.deleteProduct(productId, userId);
		
		return new ResponseEntity<>(productDeleted, HttpStatus.OK);
	}
	
	//reinsertar producto
	@DeleteMapping("/{productId}/reInsert/{userId}")
	public ResponseEntity<Boolean> reInsertProduct(@PathVariable int productId, @PathVariable int userId){
		boolean reInsert = productService.reInsertProduct(productId, userId);
		
		if (reInsert) {
            return new ResponseEntity<>(true, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
        }
	}
	
	//modificar producto
	@PutMapping("/{userId}")
	public ResponseEntity<ProductModel> updateProduct(@RequestBody ProductModel product, @PathVariable int userId){
		ProductModel updatedDeleted = productService.updateProduct(product, userId);
		
		if(updatedDeleted == null) {
    		return new ResponseEntity<>(updatedDeleted, HttpStatus.CONFLICT);
    	}else {
    		return new ResponseEntity<>(updatedDeleted, HttpStatus.OK);
    	}
	}
	
	//businessNameExists
    @GetMapping("/codeSkuExists/{codeSKU}")
	public boolean getSupplierByBusinessName(@PathVariable String codeSKU) {	
    	if(productService.getSupplierByCodeSKU(codeSKU) != null) {
    		return true;
    	}else{
    		return false;
    	}
	}

}
