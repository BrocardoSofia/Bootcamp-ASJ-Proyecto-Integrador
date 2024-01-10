CREATE DATABASE PURCHADING_MANAGEMENT;

USE PURCHADING_MANAGEMENT;

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
	user_name VARCHAR(64) NOT NULL,
	password VARCHAR(12) NOT NULL,
	created_at DATE NOT NULL,
	updated_at DATE,
	deleted_at DATE
);

CREATE TABLE Supplier_categories(
	id INT PRIMARY KEY IDENTITY(1,1),
	category VARCHAR(64) NOT NULL,
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
	FOREIGN KEY (supplier_category_id) REFERENCES Supplier_categories(id),
	FOREIGN KEY (created_by_id) REFERENCES Users(id),
	FOREIGN KEY (updated_by_id) REFERENCES Users(id),
	FOREIGN KEY (province_id) REFERENCES Provinces(id),
	FOREIGN KEY (iva_condition_id) REFERENCES Iva_conditions(id),
	created_at DATE NOT NULL,
	updated_at DATE,
	deleted_at DATE
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
	code VARCHAR(64) NOT NULL,
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


/*

  INSERTS

*/
INSERT INTO Iva_conditions(iva_condition) 
	VALUES  ('IVA Responsable Inscripto'),
			('IVA Responsable no Inscripto'),
			('IVA no Responsable'),
			('IVA Sujeto Exento'),
			('Consumidor Final'),
			('Responsable Monotributo'),
			('Sujeto no Categorizado'),
			('Proveedor del Exterior'),
			('Cliente del Exterior'),
			('IVA Liberado – Ley Nº 19.640'),
			('IVA Responsable Inscripto – Agente de Percepción'),
			('Pequeño Contribuyente Eventual'),
			('Monotributista Social'),
			('Pequeño Contribuyente Eventual Social');

INSERT INTO Purchase_states(purchase_state)
	VALUES  ('En proceso'),
			('Aceptada'),
			('Rechazada'),
			('Recepción Conforme'),
			('Cancelada');

INSERT INTO Countries(country)
	VALUES  ('Argentina'),
			('Bolivia'),
			('Brasil'),
			('Chile'),
			('Uruguay'),
			('Paraguay');

INSERT INTO Provinces(country_id, province)
	VALUES  (1,'Buenos Aires'),
			(1,'Catamarca'),
			(1,'Chaco'),
			(1,'Chubut'),
			(1,'Córdoba'),
			(1,'Corrientes'),
			(1,'Entre Ríos'),
			(1,'Formosa'),
			(1,'Jujuy'),
			(1,'La Pampa'),
			(1,'La Rioja'),
			(1,'Mendoza'),
			(1,'Misiones'),
			(1,'Neuquén'),
			(1,'Río Negro'),
			(1,'Salta'),
			(1,'San Juan'),
			(1,'San Luis'),
			(1,'Santa Cruz'),
			(1,'Santa Fe'),
			(1,'Santiago del Estero'),
			(1,'Tierra del Fuego, Antártida e Islas del Atlántico Sur'),
			(1,'Tucumán'),
			(2,'Beni'),
			(2,'Chuquisaca'),
			(2,'Cochabamba'),
			(2,'La Paz'),
			(2,'Oruro'),
			(2,'Pando'),
			(2,'Potosí'),
			(2,'Santa Cruz'),
			(2,'Tarija'),
			(3,'Acre'),
			(3,'Alagoas'),
			(3,'Amapá'),
			(3,'Amazonas'),
			(3,'Bahia'),
			(3,'Ceará'),
			(3,'Distrito Federal'),
			(3,'Espírito Santo'),
			(3,'Goiás'),
			(3,'Maranhão'),
			(3,'Mato Grosso'),
			(3,'Mato Grosso do Sul'),
			(3,'Minas Gerais'),
			(3,'Pará'),
			(3,'Paraíba'),
			(3,'Paraná'),
			(3,'Pernambuco'),
			(3,'Piauí'),
			(3,'Rio de Janeiro'),
			(3,'Rio Grande do Norte'),
			(3,'Rio Grande do Sul'),
			(3,'Rondônia'),
			(3,'Roraima'),
			(3,'Santa Catarina'),
			(3,'São Paulo'),
			(3,'Sergipe'),
			(3,'Tocantins'),
			(4,'Arica y Parinacota'),
			(4,'Tarapacá'),
			(4,'Antofagasta'),
			(4,'Atacama'),
			(4,'Coquimbo'),
			(4,'Valparaíso'),
			(4,'Metropolitana de Santiago'),
			(4,'Libertador General Bernardo O’Higgins'),
			(4,'Maule'),
			(4,'Ñuble'),
			(4,'Biobío'),
			(4,'La Araucanía'),
			(4,'Los Ríos'),
			(4,'Los Lagos'),
			(4,'Aysén'),
			(4,'Magallanes y de la Antártica Chilena'),
			(5,'Artigas'),
			(5,'Canelones'),
			(5,'Cerro Largo'),
			(5,'Colonia'),
			(5,'Durazno'),
			(5,'Flores'),
			(5,'Florida'),
			(5,'Lavalleja'),
			(5,'Maldonado'),
			(5,'Montevideo'),
			(5,'Paysandú'),
			(5,'Río Negro'),
			(5,'Rivera'),
			(5,'Rocha'),
			(5,'Salto'),
			(5,'San José'),
			(5,'Soriano'),
			(5,'Tacuarembó'),
			(5,'Treinta y Tres'),
			(6,'Alto Paraguay'),
			(6,'Alto Paraná'),
			(6,'Amambay'),
			(6,'Boquerón'),
			(6,'Caaguazú'),
			(6,'Caazapá'),
			(6,'Canindeyú'),
			(6,'Central'),
			(6,'Concepción'),
			(6,'Cordillera'),
			(6,'Guairá'),
			(6,'Itapúa'),
			(6,'Misiones'),
			(6,'Ñeembucú'),
			(6,'Paraguarí'),
			(6,'Presidente Hayes'),
			(6,'San Pedro');

INSERT INTO Supplier_categories(category, created_at)
	VALUES  ('Minimercados y almacenes','2020-03-12'),
			('Librería','2020-04-05'),
			('Indumentaria','2020-08-01'),
			('Perfumería','2020-10-25'),
			('Electrónica','2020-12-14'),
			('Juguetería','2021-05-09'),
			('Libros','2021-08-16'),
			('Óptica','2021-11-11'),
			('Mueblería','2022-01-07'),
			('Merceria','2022-07-06'),
			('Bazar','2022-10-14'),
			('Disqueria','2023-05-04'),
			('Supermercado','2023-07-13'),
			('Calzado','2023-11-21');
			
INSERT INTO Product_categories(supplier_category_id,category,created_at)
	VALUES  (1,'Alimentos no perecederos','2020-03-20'),
			(1,'Bebidas','2020-05-25'),
			(1,'Productos de limpieza','2020-08-13'),
			(1,'Productos de higiene personal','2020-10-01'),
			(1,'Carnes y embutidos','2021-06-15'),
			(1,'Frutas y verduras','2021-12-04'),
			(1,'Panadería','2022-05-11'),
			(1,'Productos para mascotas','2022-12-04'),
			(1,'Artículos de papelería','2023-07-01'),
			(2,'Papeles','2020-06-11'),
			(2,'Lapiceras y lápices','2021-06-21'),
			(2,'Cuadernos y agendas','2021-10-10'),
			(2,'Artículos de escritorio','2021-12-13'),
			(2,'Pinturas y dibujo','2022-06-14'),
			(2,'Adhesivos y pegamentos','2023-10-17'),
			(3,'Camisas','2021-05-14'),
			(3,'Pantalones','2021-08-18'),
			(3,'Remeras','2021-11-12'),
			(3,'Camperas','2022-04-25'),
			(3,'Vestidos','2022-12-06'),
			(3,'Ropa de baño','2023-02-11'),
			(3,'Ropa Interior','2023-03-07'),
			(4,'Fragancias','2021-04-12'),
			(4,'Cuidado de la piel','2021-07-18'),
			(4,'Maquillaje','2021-11-19'),
			(4,'Cuidado del cabello','2021-12-06'),
			(4,'Productos de baño','2021-12-06'),
			(4,'Productos para las uñas','2022-01-23'),
			(5,'Computadoras','2021-02-15'),
			(5,'Monitores','2021-02-15'),
			(5,'Accesorios para computadora','2021-02-15'),
			(5,'Teléfonos','2021-02-15'),
			(5,'Audio y video','2021-02-15'),
			(5,'Cámaras','2021-09-22'),
			(5,'Consolas de videojuegos','2021-09-22'),
			(5,'Dispositivos de almacenamiento','2021-09-22'),
			(5,'Componentes','2021-09-22'),
			(5,'Impresoras y escáneres','2021-09-22'),
			(5,'Televisores','2021-09-22'),
			(6,'Peluches','2021-11-15'),
			(6,'Juegos de mesa','2021-11-15'),
			(6,'Juguetes para bebés','2021-11-15'),
			(6,'Juguetes de arte y manualidades','2021-11-15'),
			(6,'Juguetes educativos','2022-04-20'),
			(6,'Juguetes de acción','2022-04-20'),
			(7,'Infantil y juvenil','2021-09-12'),
			(7,'Arte y fotografía','2021-09-12'),
			(7,'Cocina','2021-09-12'),
			(7,'Negocios y finanzas','2021-09-12'),
			(7,'Autoayuda','2021-12-06'),
			(7,'Viajes','2021-12-06'),
			(7,'Religión y espiritualidad','2021-12-06'),
			(7,'Ficción','2021-12-06'),
			(8,'Lentes de contacto','2021-12-10'),
			(8,'Cristales oftálmicos','2022-12-12'),
			(8,'Marcos de lentes','2023-02-15'),
			(8,'Lentes de sol','2023-05-10'),
			(8,'Estuches y accesorios','2023-07-11'),
			(9,'Muebles para el hogar','2022-02-11'),
			(9,'Muebles de oficina','2022-02-11'),
			(9,'Muebles de jardín','2022-03-21'),
			(10,'Hilos y lanas','2022-07-10'),
			(10,'Botones y cierres','2022-10-28'),
			(10,'Cintas y encajes','2023-05-10'),
			(10,'Accesorios para costura','2023-05-15'),
			(10,'Ropa Interior','2023-06-15'),
			(11,'Cocina','2022-11-01'),
			(11,'Baño','2022-11-01'),
			(11,'Organización','2022-12-08'),
			(11,'Textil','2023-05-11'),
			(11,'Deco','2023-12-01'),
			(12,'Vinilos','2023-06-21'),
			(12,'CDs','2023-06-21'),
			(12,'DVDs','2023-10-01'),
			(12,'Accesorios','2023-12-21'),
			(13,'Frutas y verduras','2023-10-03'),
			(13,'Carnes y pescados','2023-10-03'),
			(13,'Productos lácteos','2023-12-01'),
			(13,'Bebidas','2023-12-10'),
			(13,'Productos de limpieza','2024-01-02'),
			(13,'Congelados','2024-01-02'),
			(13,'Higiene','2024-01-02'),
			(14,'Zapatillas','2023-11-23'),
			(14,'Zapatos de vestir','2023-12-01'),
			(14,'Botas','2023-12-23'),
			(14,'Sandalias','2023-12-23');
	
INSERT INTO Users(user_name, password, created_at)
	VALUES  ('admin','A259fsa1E25', '2020-01-01'),
			('maria_perez1368', 'af20G69', '2020-01-05'),
			('pedro_lopez1684', 'ah51F69', '2020-02-01'),
			('sol_garcia1847', 'as95E14', '2021-03-01'),
			('lucrecia_mendoza5941', 'fe59w12', '2021-10-02'),
			('juan_martinez7596', 'ef59R15', '2022-08-15'),
			('mariana_peretti', 'fd84W15', '2023-12-08'); 

INSERT INTO Suppliers(supplier_category_id,created_by_id,updated_by_id,province_id,
						iva_condition_id,business_name,image_url,buisness_webpage,buisness_email,
						buisness_phone,street_name,street_number,city,cp,cuit,created_at)
	VALUES  (3,2,2,1,1,'47 street','https://pbs.twimg.com/profile_images/1050391324690698241/kEw0plll_400x400.jpg',
			'https://www.47street.com.ar/','ventas@47-street.com.ar','0800-555-9174','Sarmiento',2153,'Buenos Aires',
			'B1200','30707528458','2020-08-10'),
			(3,2,2,1,1,'Levi’s','https://static.vecteezy.com/system/resources/previews/023/871/601/original/levis-brand-logo-symbol-white-design-clothes-fashion-illustration-with-red-background-free-vector.jpg',
			'www.levi.com.ar','ventas@levi.com.ar','+54 11 70780855','Guemes',1823,'Mar del Plata',
			'B7600','30-68310835-5','2020-10-10'),
			(8,3,3,1,1,'Infinit','https://quieroynecesito.files.wordpress.com/2013/07/infinit-logo.jpg',
			'https://infinit.la/','ventas@infinit.com','0800-555-9174','Hidalgo',1743,'Buenos Aires',
			'B1230','30708857722','2020-12-10'),
			(5,1,1,1,1,'Samsung ','https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/2560px-Samsung_Logo.svg.png',
			'https://www.samsung.com/ar/','ventas@samsung.com.ar','0800 555 7864','Sarmiento',2056,'Mar del Plata',
			'B7600','30-68412579-2','2021-05-07'),
			(7,1,1,1,1,'Libreria Palito','https://libreriapalito.com.ar/media/mageworx/locations//l/o/logo-palito_1.png',
			'https://www.47street.com.ar/','libreriapalito@gmail.com.ar','2266-451684','Av. Luro',3454,'Mar del Plata',
			'B7600','33715559299','2022-11-04'),
			(4,1,1,6,1,'farmalife','https://farmalife.vteximg.com.br/arquivos/logo-farmalife-checkout.png',
			'https://www.farmalife.com.ar/','farmalife@gmail.com.ar','0379-451684','Pellegrini',645,'Corrientes',
			'W3400','30714896047','2023-11-04');

INSERT INTO Suppliers(supplier_category_id,created_by_id,updated_by_id,province_id,
						iva_condition_id,business_name,buisness_email,
						buisness_phone,street_name,street_number,city,cp,cuit,created_at)
	VALUES  (4,1,1,6,1,'Soho','soho@gmail.com.ar','0379-452685','Av. Raúl Alfonsín',3402,'Corrientes',
			'W3400','30768596047','2023-11-04'),
			(4,1,1,10,1,'Musas','musas@gmail.com.ar','299-453685','Rivadavia',418,'Santa Rosa',
			'W3400','30768595647','2023-11-04'),
			(4,1,1,10,1,'OLMAK (L.P.)','olmal@gmail.com.ar','299-453560','Quintana',47,'Santa Rosa',
			'W3400','30768595207','2023-11-04'),
			(4,1,1,12,1,'Gato Negro','gato_negro@gmail.com.ar','261-456820','Coronel Manuel de Olascoaga',99,'San Rafael',
			'W3400','30768258407','2023-11-04'),
			(4,1,1,12,1,'PRETHA','pretha@gmail.com.ar','351-456541','Blvd. San Juan',102,'Córdoba',
			'W3400','30769658407','2023-11-04');

INSERT INTO Suppliers_contacts(supplier_id,contact_name,contact_lastname,phone,
								email,rol,created_at)
	VALUES	(1,'Juan','Lopes','011-415869','juanLopez@gmail.com','Gerente','2020-08-10'),
			(2,'Marta','Perez','0223-425865','martaPerez@gmail.com','Administrador','2020-10-10'),
			(3,'Lucia','Garcia','011-412536','luciaGarcia@gmail.com','Director de operaciones','2020-12-10'),
			(4,'Maria','Martinez','0223-402536','mariaMartinez@gmail.com','Director de operaciones','2021-05-07'),
			(5,'Carlos','Gavilan','0223-432568','carlosGavilan@gmail.com','Gerente','2022-11-04'),
			(6,'Pepe','Arce','0379-425869','pepeArce@gmail.com','Administrador','2023-11-04');

INSERT INTO Products(supplier_id,
						product_category_id,
						created_by_id,
						updated_by_id,
						code,
						product_name,
						product_description,
						price,
						stock,
						created_at)
	VALUES  (1,18,2,2,'47SR23','The child','',20899,200,'2020-08-10'),
			(1,18,2,2,'47SR65','Buzz lightyear','',23299,300,'2020-08-10'),
			(1,18,3,3,'47SR63','Hello kitty','',19399,1000,'2020-08-10'),
			(4,32,4,4,'SC67','Galaxy A014','',249999,9000,'2023-12-10'),
			(4,32,2,2,'SC57','Galaxy A04 Sm','',267649,900,'2023-12-10'),
			(4,32,6,6,'SC12','Galaxy A13','',185000,400,'2023-12-10'),
			(4,32,3,3,'SC1203','Galaxy Z Flip4','',755999,200,'2024-01-05'),
			(5,53,5,5,'LPF21','Los juegos del hambre','',31000,250,'2022-11-04'),
			(5,53,4,4,'LPF458','2001. UNA ODISEA ESPACIAL','',18000,300,'2022-11-04'),
			(5,53,7,7,'LPF7841','La Naranja Mecanica','',11500,100,'2022-11-04'),
			(1,18,2,2,'47SR698','STARWARS RESISTANCE','',15560,200,'2023-12-10');


INSERT INTO Products_images(product_id,
							image_url,created_at)
	VALUES  (1,'https://acdn.mitiendanube.com/stores/001/245/791/products/cbd5231b-441b-4bf3-9efe-3f427b2e45f1-be476dc50481749c0e16978679420956-1024-1024.jpg','2020-08-10'),
			(2,'https://acdn.mitiendanube.com/stores/001/245/791/products/e38de252-1d7e-427e-b483-5519115c945f-d807bc487ce283aec516978435939073-1024-1024.jpg','2020-08-10'),
			(3,'https://acdn.mitiendanube.com/stores/001/245/791/products/0ee1b83b-b50c-4e14-9697-421321742944-ce6c43fe97f9d91da816978435450800-1024-1024.jpg','2020-08-10'),
			(4,'https://www.sistemasjunin.com.ar/pub/media/catalog/product/cache/37541c0bbf24e7dc2db63933a4a3a5a2/c/e/celular_samsung_galaxy_a014_a145mzsearo_128gb.jpg','2023-12-10'),
			(5,'https://static.hendel.com/media/catalog/product/cache/0c3e9ac8430b5a3e77d1544ae1698a10/4/8/48229-min.jpg','2023-12-10'),
			(6,'https://www.sevenelectronics.com.ar/images/000880609415204383084D-NQ-NP-647009-MLA50801736027-072022-V.jpg','2023-12-10'),
			(7,'https://images.samsung.com/ar/smartphones/galaxy-z-flip4/images/galaxy-z-flip4_highlights_kv.jpg','2024-01-05'),
			(8,'https://www.penguinlibros.com/ar/1604980/los-juegos-del-hambre-1-los-juegos-del-hambre.jpg','2022-11-04'),
			(9,'https://quelibroleo.com/images/libros/libro_1365433263.jpg','2022-11-04'),
			(10,'https://images.cdn1.buscalibre.com/fit-in/360x360/ae/3a/ae3ab1e4a532f06d1849f736835f514f.jpg','2022-11-04');

INSERT INTO Purchase_orders(supplier_id,
							purchase_state_id,
							created_by_id,
							updated_by_id,
							emission_date,
							deliveryDate,
							reception_info,
							created_at)
	VALUES	(1,2,2,2,'2023-10-05','2023-12-05','Brown 2356','2023-10-05'),
			(1,1,3,3,'2023-11-20','2023-11-20','Sarmiento 4587','2023-11-20'),
			(4,2,4,4,'2023-12-05','2023-12-12','Bolivar 5869','2023-12-05'),
			(4,2,5,5,'2023-12-10','2023-12-10','Las heras 5148','2023-12-10'),
			(5,1,5,5,'2023-12-12','2024-01-02','La pampa 512','2023-12-12'); 

INSERT INTO Purchase_orders_products(product_category_id,
										purchase_order_id,
										product_id,
										price,
										amount,
										created_at)
	VALUES  (18,1,2,23299, 10, '2023-10-05'),--1 47S
			(18,2,3,19399, 20, '2023-11-20'),--1 47S
			(32,3,4,249999,10,'2023-12-05'),--4 Samsung 
			(32,4,5,267649,5,'2023-12-10'),--4 Samsung 
			(32,4,6,185000,6,'2023-12-10'),--4 Samsung 
			(53,5,9,18000,10,'2023-12-12'),--5 Libreria Palito
			(53,5,10,11500,20,'2023-12-12');--5 Libreria Palito 
			