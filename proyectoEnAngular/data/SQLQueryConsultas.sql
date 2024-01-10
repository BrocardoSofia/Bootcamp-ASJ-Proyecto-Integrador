/*
1. Obtener todos los productos, mostrando nombre del producto, categor�a, proveedor (raz�n social y codigo proveedor), precio.
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
2. En el listado anterior, adem�s de los datos mostrados, traer el campo imagen aunque el producto NO tenga una. Sino tiene imagen, mostrar "-".
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