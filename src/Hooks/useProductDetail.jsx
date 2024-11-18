import { useEffect, useState } from "react"
import { GET, getAuthenticatedHeaders } from "../fetching/http.fetching"

const useProductDetail = (product_id) => { 
    
    const [productDetail, setProductDetail] = useState(null)
    const [product_detail_loading, set_product_detail_loading] = useState(true)
    const [product_detail_error, set_product_detail_error] = useState(null)

    const getProductDetail = async (product_id) => {
        
        const product_detail_response = await GET(`http://localhost:3000/api/products/${product_id}`, {
            headers: getAuthenticatedHeaders()
        })
        set_product_detail_loading(false)
        if(product_detail_response.ok){
            setProductDetail(product_detail_response.payload.products)
        }
        else{
            set_product_detail_error(product_detail_response.message)
        }
    }
    useEffect(
        () => {
            getProductDetail(product_id)
        },
        []
    )
    return {
        productDetail, 
        product_detail_loading,
        product_detail_error
    }
    
}

export default useProductDetail