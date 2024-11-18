import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import useProductDetail from '../../Hooks/useProductDetail'
import EditProduct from '../EditProduct/EditProduct'

const DetailProductScreen = () => {

    const { product_id } = useParams()
    
    const user_info = JSON.parse(sessionStorage.getItem('user_info'))
    const [editProductState, setEditProductState] = useState(false)
    const { productDetail, product_detail_loading, product_detail_error } = useProductDetail(product_id)

    return (
        <div>
            {
                !editProductState
                    ? <div>
                        <h2>detalle de producto:</h2>
                        {
                            product_detail_loading
                            ? <h2>Cargando...</h2>
                            :( product_detail_error
                                ? <h2>{product_detail_error}</h2>
                                : <Product {...productDetail} />
                            )
                        }
                        {
                            user_info.role === 'admin' || user_info.role === 'seller'
                            && <button onClick={setEditProductState}>Editar Producto</button>
                        }
                    </div>
                    : <EditProduct product_id={product_id} {...productDetail} />
            }
        </div>
    )
}

const Product = ({title, price, stock, description, image_base_64, product_id}) => {
    return(
        <div>
            <h2>{title}</h2>
            <img 
                src={image_base_64}
                alt={title}
                width={200}
            />
            <br/>
            <span>${price}</span>
            <br/>
            <span>{stock}</span>
            <p>{description}</p>
        </div>
    )
}

export default DetailProductScreen
