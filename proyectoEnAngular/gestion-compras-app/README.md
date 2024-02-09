# GestionComprasApp

Desarrollo de un *Sistema de Gestión Compras* para manejar información de Proveedores, Productos y Órdenes de compra.

## Ejecutar localmente

Pasos necesarios para correr el proyecto localmente

- Crear una base de datos llamada
```sql
  CREATE DATABASE IntegratorDatabasePurchasingManagementSystem;
```

- Insertar **Iva_conditions**
```sql
  INSERT INTO Iva_conditions(iva_condition, created_at) 
	VALUES  ('IVA Responsable Inscripto', GETDATE()),
			('IVA Responsable no Inscripto', GETDATE()),
			('IVA no Responsable', GETDATE()),
			('IVA Sujeto Exento', GETDATE()),
			('Responsable Monotributo', GETDATE()),
			('Sujeto no Categorizado', GETDATE()),
			('Proveedor del Exterior', GETDATE()),
			('IVA Liberado – Ley Nº 19.640', GETDATE()),
			('IVA Responsable Inscripto – Agente de Percepción', GETDATE()),
			('Pequeño Contribuyente Eventual', GETDATE()),
			('Monotributista Social', GETDATE()),
			('Pequeño Contribuyente Eventual Social', GETDATE());
```

- Insertar **Purchase_states**
```sql
  INSERT INTO Purchase_states(purchase_state, created_at)
	VALUES  ('En proceso', GETDATE()),
			('Aceptada', GETDATE()),
			('Rechazada', GETDATE()),
			('Recepción Conforme', GETDATE()),
			('Cancelada', GETDATE());
```

- Insertar **Countries**
```sql
  INSERT INTO Countries(country, created_at)
	VALUES  ('Argentina', GETDATE()),
			('Bolivia', GETDATE()),
			('Brasil', GETDATE()),
			('Chile', GETDATE()),
			('Uruguay', GETDATE()),
			('Paraguay', GETDATE());
```

- Insertar **Provinces**
```sql
  INSERT INTO Provinces(country_id, province, created_at)
	VALUES  (1,'Buenos Aires', GETDATE()),
			(1,'Catamarca', GETDATE()),
			(1,'Chaco', GETDATE()),
			(1,'Chubut', GETDATE()),
			(1,'Córdoba', GETDATE()),
			(1,'Corrientes', GETDATE()),
			(1,'Entre Ríos', GETDATE()),
			(1,'Formosa', GETDATE()),
			(1,'Jujuy', GETDATE()),
			(1,'La Pampa', GETDATE()),
			(1,'La Rioja', GETDATE()),
			(1,'Mendoza', GETDATE()),
			(1,'Misiones', GETDATE()),
			(1,'Neuquén', GETDATE()),
			(1,'Río Negro', GETDATE()),
			(1,'Salta', GETDATE()),
			(1,'San Juan', GETDATE()),
			(1,'San Luis', GETDATE()),
			(1,'Santa Cruz', GETDATE()),
			(1,'Santa Fe', GETDATE()),
			(1,'Santiago del Estero', GETDATE()),
			(1,'Tierra del Fuego', GETDATE()),
			(1,'Tucumán', GETDATE()),
			(2,'Beni', GETDATE()),
			(2,'Chuquisaca', GETDATE()),
			(2,'Cochabamba', GETDATE()),
			(2,'La Paz', GETDATE()),
			(2,'Oruro', GETDATE()),
			(2,'Pando', GETDATE()),
			(2,'Potosí', GETDATE()),
			(2,'Santa Cruz', GETDATE()),
			(2,'Tarija', GETDATE()),
			(3,'Acre', GETDATE()),
			(3,'Alagoas', GETDATE()),
			(3,'Amapá', GETDATE()),
			(3,'Amazonas', GETDATE()),
			(3,'Bahia', GETDATE()),
			(3,'Ceará', GETDATE()),
			(3,'Distrito Federal', GETDATE()),
			(3,'Espírito Santo', GETDATE()),
			(3,'Goiás', GETDATE()),
			(3,'Maranhão', GETDATE()),
			(3,'Mato Grosso', GETDATE()),
			(3,'Mato Grosso do Sul', GETDATE()),
			(3,'Minas Gerais', GETDATE()),
			(3,'Pará', GETDATE()),
			(3,'Paraíba', GETDATE()),
			(3,'Paraná', GETDATE()),
			(3,'Pernambuco', GETDATE()),
			(3,'Piauí', GETDATE()),
			(3,'Rio de Janeiro', GETDATE()),
			(3,'Rio Grande do Norte', GETDATE()),
			(3,'Rio Grande do Sul', GETDATE()),
			(3,'Rondônia', GETDATE()),
			(3,'Roraima', GETDATE()),
			(3,'Santa Catarina', GETDATE()),
			(3,'São Paulo', GETDATE()),
			(3,'Sergipe', GETDATE()),
			(3,'Tocantins', GETDATE()),
			(4,'Arica y Parinacota', GETDATE()),
			(4,'Tarapacá', GETDATE()),
			(4,'Antofagasta', GETDATE()),
			(4,'Atacama', GETDATE()),
			(4,'Coquimbo', GETDATE()),
			(4,'Valparaíso', GETDATE()),
			(4,'Metropolitana de Santiago', GETDATE()),
			(4,'Libertador General Bernardo O’Higgins', GETDATE()),
			(4,'Maule', GETDATE()),
			(4,'Ñuble', GETDATE()),
			(4,'Biobío', GETDATE()),
			(4,'La Araucanía', GETDATE()),
			(4,'Los Ríos', GETDATE()),
			(4,'Los Lagos', GETDATE()),
			(4,'Aysén', GETDATE()),
			(4,'Magallanes y de la Antártica Chilena', GETDATE()),
			(5,'Artigas', GETDATE()),
			(5,'Canelones', GETDATE()),
			(5,'Cerro Largo', GETDATE()),
			(5,'Colonia', GETDATE()),
			(5,'Durazno', GETDATE()),
			(5,'Flores', GETDATE()),
			(5,'Florida', GETDATE()),
			(5,'Lavalleja', GETDATE()),
			(5,'Maldonado', GETDATE()),
			(5,'Montevideo', GETDATE()),
			(5,'Paysandú', GETDATE()),
			(5,'Río Negro', GETDATE()),
			(5,'Rivera', GETDATE()),
			(5,'Rocha', GETDATE()),
			(5,'Salto', GETDATE()),
			(5,'San José', GETDATE()),
			(5,'Soriano', GETDATE()),
			(5,'Tacuarembó', GETDATE()),
			(5,'Treinta y Tres', GETDATE()),
			(6,'Alto Paraguay', GETDATE()),
			(6,'Alto Paraná', GETDATE()),
			(6,'Amambay', GETDATE()),
			(6,'Boquerón', GETDATE()),
			(6,'Caaguazú', GETDATE()),
			(6,'Caazapá', GETDATE()),
			(6,'Canindeyú', GETDATE()),
			(6,'Central', GETDATE()),
			(6,'Concepción', GETDATE()),
			(6,'Cordillera', GETDATE()),
			(6,'Guairá', GETDATE()),
			(6,'Itapúa', GETDATE()),
			(6,'Misiones', GETDATE()),
			(6,'Ñeembucú', GETDATE()),
			(6,'Paraguarí', GETDATE()),
			(6,'Presidente Hayes', GETDATE()),
			(6,'San Pedro', GETDATE());
```

- Insertar **Supplier_categories**
```sql
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
```

- Insertar **Product_categories**
```sql
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
```

- Insertar **Users**
```sql
  INSERT INTO Users(user_alias, password, created_at)
	VALUES  ('admin_asjcompras_01','admin123456789', '2020-01-01'),
			('maria_perez1368', 'af20G69', '2020-01-05'),
			('pedro_lopez1684', 'ah51F69', '2020-02-01'),
			('sol_garcia1847', 'as95E14', '2021-03-01'),
			('lucrecia_mendoza5941', 'fe59w12', '2021-10-02'),
			('juan_martinez7596', 'ef59R15', '2022-08-15'),
			('Mariana_García_01', 'fd84W15', '2023-12-08'),
			('Juan_Rodríguez_02', 'fd84W15', '2023-12-08'),
			('Andrés_Sánchez_03', 'fd84W15', '2023-12-08'),
			('Luis_López_04', 'fd84W15', '2023-12-08'),
			('María_Martínez_05', 'fd84W15', '2023-12-08'),
			('Carlos_Hernández_06', 'fd84W15', '2023-12-08'),
			('Ana_González_07', 'd84W15', '2023-12-08'),
			('Pedro_Pérez_08', 'fd84W15', '2023-12-08'),
			('Sofía_Romero_09', 'fd84W15', '2023-12-08'),
			('Diego_Díaz_10', 'fd84W15', '2023-12-08'),
			('Laura_Torres_11', 'fd84W15', '2023-12-08'),
			('Javier_Fernández_12', 'fd84W15', '2023-12-08'),
			('Isabel_Suárez_13', 'fd84W15', '2023-12-08'),
			('Martín_Castro_14', 'fd84W15', '2023-12-08'),
			('Valentina_Ruiz_15', 'fd84W15', '2023-12-08'),
			('Gabriel_Mendoza_16', 'fd84W15', '2023-12-08'),
			('Camila_Vargas_17', 'fd84W15', '2023-12-08'),
			('Pablo_Morales_18', 'fd84W15', '2023-12-08'),
			('Lucía_Ortega_19', 'fd84W15', '2023-12-08'),
			('Fernando_Navarro_20', 'fd84W15', '2023-12-08'),
			('Carolina_Giménez_21', 'fd84W15', '2023-12-08'),
			('Ricardo_Méndez_22', 'fd84W15', '2023-12-08'),
			('Elena_Aguilar_23', 'fd84W15', '2023-12-08'),
			('José_Palacios_24', 'fd84W15', '2023-12-08'),
			('Daniela_Silva_25', 'fd84W15', '2023-12-08'); 
```

- Insertar **Suppliers**

```sql
  INSERT INTO Suppliers(supplier_category_id,created_by_id,province_id,
						iva_condition_id,business_name,image_url,business_webpage, business_email,
						business_phone,street_name,street_number,city,cp,cuit,created_at, supplier_code)
	VALUES  (3,2,1,1,'47 street','https://pbs.twimg.com/profile_images/1050391324690698241/kEw0plll_400x400.jpg',
			'https://www.47street.com.ar/','ventas@47-street.com.ar','0800-555-9174','Sarmiento',2153,'Buenos Aires',
			'B1200','30707528458','2020-08-10', '47s_026'),
			(3,2,1,1,'Levi’s','https://static.vecteezy.com/system/resources/previews/023/871/601/original/levis-brand-logo-symbol-white-design-clothes-fashion-illustration-with-red-background-free-vector.jpg',
			'www.levi.com.ar','ventas@levi.com.ar','11 70780855','Guemes',1823,'Mar del Plata',
			'B7600','30-68310835-5','2020-10-10','levis_6736'),
			(8,3,1,1,'Infinit','https://quieroynecesito.files.wordpress.com/2013/07/infinit-logo.jpg',
			'https://infinit.la/','ventas@infinit.com','0800-596-9174','Hidalgo',1743,'Buenos Aires',
			'B1230','30708857722','2020-12-10','infinit_0147'),
			(5,1,1,1,'Samsung ','https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/2560px-Samsung_Logo.svg.png',
			'https://www.samsung.com/ar/','ventas@samsung.com.ar','0800-695-7864','Sarmiento',2056,'Mar del Plata',
			'B7600','30-68412579-2','2021-05-07','samsung_9635'),
			(7,1,1,1,'Libreria Palito','https://libreriapalito.com.ar/media/mageworx/locations//l/o/logo-palito_1.png',
			'https://www.47street.com.ar/','libreriapalito@gmail.com.ar','2266-451684','Av. Luro',3454,'Mar del Plata',
			'B7600','33715559299','2022-11-04','palito_2019'),
			(4,1,6,1,'farmalife','https://farmalife.vteximg.com.br/arquivos/logo-farmalife-checkout.png',
			'https://www.farmalife.com.ar/','farmalife@gmail.com.ar','379-451684','Pellegrini',645,'Corrientes',
			'W3400','30714896047','2023-11-04','farmalife_9674');
```

- Insertar **Suppliers_contacts**

```sql
  INSERT INTO Suppliers_contacts(supplier_id,contact_name,contact_lastname,phone,
								email,rol,created_at)
	VALUES	(1,'Juan','Lopes','011-415869','juanLopez@gmail.com','Gerente','2020-08-10'),
			(2,'Marta','Perez','0223-425865','martaPerez@gmail.com','Administrador','2020-10-10'),
			(3,'Lucia','Garcia','011-412536','luciaGarcia@gmail.com','Director de operaciones','2020-12-10'),
			(4,'Maria','Martinez','0223-402536','mariaMartinez@gmail.com','Director de operaciones','2021-05-07'),
			(5,'Carlos','Gavilan','0223-432568','carlosGavilan@gmail.com','Gerente','2022-11-04'),
			(6,'Pepe','Arce','0379-425869','pepeArce@gmail.com','Administrador','2023-11-04');
```

- Insertar **Products**

```sql
  INSERT INTO Products(supplier_id,
						product_category_id,
						created_by_id,
						codesku,
						product_name,
						product_description,
						price,
						created_at)
	VALUES  (1,18,2,'47SR23','The child','',20899,'2020-08-10'),
			(1,18,2,'47SR65','Buzz lightyear','',23299,'2020-08-10'),
			(1,18,3,'47SR63','Hello kitty','',19399,'2020-08-10'),
			(4,32,4,'SC67','Galaxy A014','',249999,'2023-12-10'),
			(4,32,2,'SC57','Galaxy A04 Sm','',267649,'2023-12-10'),
			(4,32,6,'SC12','Galaxy A13','',185000,'2023-12-10'),
			(4,32,3,'SC1203','Galaxy Z Flip4','',755999,'2024-01-05'),
			(5,53,5,'LPF21','Los juegos del hambre','',31000,'2022-11-04'),
			(5,53,4,'LPF458','2001. UNA ODISEA ESPACIAL','',18000,'2022-11-04'),
			(5,53,7,'LPF7841','La Naranja Mecanica','',11500,'2022-11-04'),
			(1,18,2,'47SR698','STARWARS RESISTANCE','',15560,'2023-12-10'); 
```