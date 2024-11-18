import React, { useEffect, useState } from 'react'
import useProducts from '../../Hooks/useProducts'
import { Link } from 'react-router-dom'



const Products = () => {
	const user_info = JSON.parse(sessionStorage.getItem('user_info'))
	const {products, isLoadingProducts} = useProducts()
	console.log(products)

		return (
			<div>
				<h1>bienvenido {user_info.name}</h1>
				<Link to={'/product/new'}>Crear producto</Link>
				<h2>Productos</h2>
				{
					isLoadingProducts
					? <h2>Cargando...</h2>
					: <ProductsList products={products} />
				}
			</div>
		)
	}
	const ProductsList = ({products}) =>{
		return(
			products.map(product => {
				return <Product 
					key={product.product_id}
					{...product} 
				/>
				
			})
		)
	}


	const Product = ({title, price, stock, description, image_base_64, product_id}) => {
		return (
			<div>
				<h2>{title}</h2>
				<img 
					src={image_base_64}
					alt={title}
					width={200}
				/>
				<span>${price}</span>
				<br/>
				<span>{stock}</span>
				<p>{description}</p>
				<Link to={'/products/' + product_id}>Ver Detalle</Link>
				<hr/>
			</div>
		)
	}
	export default Products
