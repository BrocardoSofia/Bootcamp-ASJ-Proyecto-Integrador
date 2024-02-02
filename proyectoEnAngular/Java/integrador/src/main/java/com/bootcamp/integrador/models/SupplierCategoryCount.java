package com.bootcamp.integrador.models;

public class SupplierCategoryCount {
	private String categoryName;
    private int count;
    
	public SupplierCategoryCount(String categoryName, int count) {
		this.categoryName = categoryName;
		this.count = count;
	}
	
	public SupplierCategoryCount() {
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}
    
	
    
}
