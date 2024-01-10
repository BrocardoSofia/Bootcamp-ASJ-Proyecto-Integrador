/*
1. Obtener todos los productos, mostrando nombre del producto, categoría, proveedor (razón social y codigo proveedor), precio.
*/

SELECT  p.product_name AS 'Nombre del producto', 
		c.category AS 'Categoria',
		s.business_name AS 'Proveedor',
		s.cuit AS 'CUIT del proveedor',
		p.price AS 'Precio'
FROM Products AS p
	INNER JOIN Product_categories AS c
		ON p.product_category_id = c.id
	INNER JOIN Suppliers AS s
		ON p.supplier_id = s.id;

/*
2. En el listado anterior, además de los datos mostrados, traer el campo imagen aunque el producto NO tenga una. Sino tiene imagen, mostrar "-".
*/
SELECT  p.product_name AS 'Nombre del producto', 
		c.category AS 'Categoria',
		s.business_name AS 'Proveedor',
		s.cuit AS 'CUIT del proveedor',
		p.price AS 'Precio',
		CASE 
			WHEN pimg.id IS NULL THEN '-'
			ELSE pimg.image_url
		END AS 'Imagen'
FROM Products AS p
	INNER JOIN Product_categories AS c
		ON p.product_category_id = c.id
	INNER JOIN Suppliers AS s
		ON p.supplier_id = s.id
	LEFT JOIN Products_images AS pimg
		ON p.id = pimg.product_id;

/*
3. Mostrar los datos que se pueden modificar (en el front) del producto con ID = 2.
*/
SELECT p.product_name AS 'Nombre del producto', 
	   p.product_description AS 'Descripcion', 
	   p.price AS 'Precio',
	   p.stock AS 'Stock'
FROM Products AS p
WHERE p.id = 2;

/*
4. Listar todo los proveedores cuyo teléfono tenga la característica de Córdoba o que la provincia sea igual a alguna de las 3 con más proveedores.
*/
SELECT s.business_name AS 'Proveedor', s.buisness_phone AS 'Telefono', p.province AS 'Provincia'
FROM Suppliers AS s
	INNER JOIN Provinces as p
		ON s.province_id = p.id
	WHERE (s.buisness_phone LIKE '351%')
		OR (p.id IN ( SELECT TOP 3 s.province_id
								FROM Suppliers AS s
								GROUP BY s.province_id
								ORDER BY COUNT(s.id) DESC
								));

/*
5. Traer un listado de todos los proveedores que no hayan sido eliminados , y ordenados por razon social, codigo proveedor y 
	fecha en que se dió de alta ASC. De este listado mostrar los datos que correspondan con su tabla del front.
*/
--primero elimino un proveedor
UPDATE Suppliers
SET deleted_at = '2024-01-09'
WHERE id = 3;

SELECT s.business_name AS 'Razon social', 
		s.id AS 'Codigo', 
		s.created_at AS 'Fecha', 
		sc.category AS 'Rubro',
		s.buisness_webpage AS 'Web',
		s.buisness_email AS 'Email',
		s.buisness_phone AS 'Telefono'
FROM Suppliers AS s 
	INNER JOIN Supplier_categories AS sc
		ON s.supplier_category_id = sc.id
WHERE s.deleted_at IS NULL
ORDER BY s.business_name ASC, s.id ASC, s.created_at ASC;

/*
6. Obtener razon social, codigo proveedor, imagen, web, email, teléfono y los datos del contacto del proveedor con más ordenes de compra cargadas.
*/
SELECT s.business_name AS 'Razon social', 
		s.id AS 'Codigo', 
		s.created_at AS 'Fecha', 
		s.image_url AS 'Imagen',
		s.buisness_webpage AS 'Web',
		s.buisness_email AS 'Email',
		s.buisness_phone AS 'Telefono',
		sc.contact_name AS 'Nombre de contacto',
		sc.contact_lastname AS 'Apellido de contacto'
FROM Suppliers AS s
	LEFT JOIN Suppliers_contacts as sc
		ON s.id = sc.supplier_id
WHERE s.id = (SELECT TOP 1 po.supplier_id
				FROM Purchase_orders as po
				GROUP BY po.supplier_id
				ORDER BY COUNT(po.id)DESC)