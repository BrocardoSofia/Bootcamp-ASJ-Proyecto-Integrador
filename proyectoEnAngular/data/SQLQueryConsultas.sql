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
		OR p.id IN ( SELECT TOP 3 s.province_id
								FROM Suppliers AS s
								GROUP BY s.province_id
								ORDER BY COUNT(s.id) DESC
								);

/*
5. Traer un listado de todos los proveedores que no hayan sido eliminados , y ordenados por razon social, codigo proveedor y 
	fecha en que se dió de alta ASC. De este listado mostrar los datos que correspondan con su tabla del front.
*/
--primero elimino un proveedor
SELECT s.business_name
FROM Suppliers AS s 