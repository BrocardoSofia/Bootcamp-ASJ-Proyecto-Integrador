CREATE TABLE Countries(
	id INT PRIMARY KEY IDENTITY(1,1),
	country VARCHAR(64) NOT NULL
);

CREATE TABLE Provinces(
	id INT PRIMARY KEY IDENTITY(1,1),
	country_id INT,
	province VARCHAR(64) NOT NULL,
	FOREIGN KEY (country_id) REFERENCES Countries(id)
);


CREATE TABLE Iva_conditions(
	id INT PRIMARY KEY IDENTITY(1,1),
	iva_condition VARCHAR(64) NOT NULL
);

CREATE TABLE Purchase_states(
	id INT PRIMARY KEY IDENTITY(1,1),
	purchase_state VARCHAR(64) NOT NULL
);

CREATE TABLE Users(
	id INT PRIMARY KEY IDENTITY(1,1),
	user_name VARCHAR(64) NOT NULL UNIQUE,
	password VARCHAR(12) NOT NULL,
	created_at DATE NOT NULL,
	updated_at DATE,
	deleted_at DATE
);

CREATE TABLE Supplier_categories(
	id INT PRIMARY KEY IDENTITY(1,1),
	category VARCHAR(64) NOT NULL UNIQUE,
	created_at DATE NOT NULL,
	updated_at DATE,
	deleted_at DATE
);

CREATE TABLE Product_categories(
	id INT PRIMARY KEY IDENTITY(1,1),
	supplier_category_id INT,
	category VARCHAR(64) NOT NULL,
	created_at DATE NOT NULL,
	updated_at DATE,
	deleted_at DATE,
	FOREIGN KEY (supplier_category_id) REFERENCES Supplier_categories(id)
);

CREATE TABLE Suppliers(
	id INT PRIMARY KEY IDENTITY(1,1),
	supplier_category_id INT,
	created_by_id INT,
	updated_by_id INT,
	province_id INT, 
	iva_condition_id INT,
	supplier_code VARCHAR(64) UNIQUE,
	business_name VARCHAR(64) NOT NULL,
	image_url VARCHAR(240),
	buisness_webpage VARCHAR(64),
	buisness_email VARCHAR(64) NOT NULL,
	buisness_phone VARCHAR(64) NOT NULL,
	street_name VARCHAR(64) NOT NULL,
	street_number INT NOT NULL,
	cp VARCHAR(64) NOT NULL,
	city VARCHAR(64) NOT NULL,
	cuit VARCHAR(64) NOT NULL,
	created_at DATE NOT NULL,
	updated_at DATE,
	deleted_at DATE,
	FOREIGN KEY (supplier_category_id) REFERENCES Supplier_categories(id),
	FOREIGN KEY (created_by_id) REFERENCES Users(id),
	FOREIGN KEY (updated_by_id) REFERENCES Users(id),
	FOREIGN KEY (province_id) REFERENCES Provinces(id),
	FOREIGN KEY (iva_condition_id) REFERENCES Iva_conditions(id)
);

CREATE TABLE Suppliers_contacts(
	id INT PRIMARY KEY IDENTITY(1,1),
	supplier_id INT,
	contact_name VARCHAR(64) NOT NULL,
	contact_lastname VARCHAR(64) NOT NULL,
	phone VARCHAR(64) NOT NULL,
	email VARCHAR(64) NOT NULL,
	rol VARCHAR(64) NOT NULL,
	created_at DATE NOT NULL,
	updated_at DATE,
	deleted_at DATE
	FOREIGN KEY (supplier_id) REFERENCES Suppliers(id),
);

CREATE TABLE Products(
	id INT PRIMARY KEY IDENTITY(1,1),
	supplier_id INT, 
	product_category_id INT,
	created_by_id INT,
	updated_by_id INT,
	code_SKU VARCHAR(64) NOT NULL UNIQUE,
	product_name VARCHAR(64) NOT NULL,
	product_description VARCHAR(240) NOT NULL,
	price DECIMAL NOT NULL,
	stock INT NOT NULL,
	created_at DATE NOT NULL,
	updated_at DATE,
	deleted_at DATE,
	FOREIGN KEY (supplier_id) REFERENCES Suppliers(id),
	FOREIGN KEY (product_category_id) REFERENCES Product_categories(id),
	FOREIGN KEY (created_by_id) REFERENCES Users(id),
	FOREIGN KEY (updated_by_id) REFERENCES Users(id)
);

CREATE TABLE Products_images(
	id INT PRIMARY KEY IDENTITY(1,1),
	product_id INT,
	image_url VARCHAR(240) NOT NULL,
	created_at DATE NOT NULL,
	deleted_at DATE,
	FOREIGN KEY (product_id) REFERENCES Products(id),
);

CREATE TABLE Purchase_orders(
	id INT PRIMARY KEY IDENTITY(1,1),
	supplier_id INT,
	purchase_state_id INT,
	created_by_id INT,
	updated_by_id INT,
	purchase_order_number INT UNIQUE,
	emission_date DATE NOT NULL,
	deliveryDate DATE NOT NULL,
	reception_info VARCHAR(240) NOT NULL,
	created_at DATE NOT NULL,
	updated_at DATE,
	cancelled_at DATE,
	FOREIGN KEY (supplier_id) REFERENCES Suppliers(id),
	FOREIGN KEY (purchase_state_id) REFERENCES Purchase_states(id),
	FOREIGN KEY (created_by_id) REFERENCES Users(id),
	FOREIGN KEY (updated_by_id) REFERENCES Users(id)
);

CREATE TABLE Purchase_orders_products(
	id INT PRIMARY KEY IDENTITY(1,1),
	product_category_id INT,
	purchase_order_id INT,
	product_id INT,
	price DECIMAL NOT NULL,
	amount INT NOT NULL,
	created_at DATE NOT NULL,
	updated_at DATE,
	cancelled_at DATE,
	FOREIGN KEY (product_category_id) REFERENCES Product_categories(id),
	FOREIGN KEY (purchase_order_id) REFERENCES Purchase_orders(id),
	FOREIGN KEY (product_id) REFERENCES Products(id)
);
