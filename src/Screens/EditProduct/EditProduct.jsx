import React, { useState } from 'react'
import { getAuthenticatedHeaders, PUT } from '../../fetching/http.fetching'
import { useNavigate, useParams } from 'react-router-dom'
import extractFormData from '../../utils/extractFormData'

const EditProduct = ({product_id, title, price, stock, description, image_base_64}) => {
    const [image, setImage] = useState('')
    const navigate = useNavigate()
    const handleSubmitNewProduct = async (e) => {
        
        try {
            e.preventDefault()
            const valoresFormulario = new FormData(e.target)
            const formShcema = {
                'title': '',
                'price': '',
                'stock': '',
                'description': '',
                'category': '',
                'image_base_64': ''
            }
            
            const form_values_object = extractFormData(formShcema, valoresFormulario)
            //agregamos la image al objeto con los valores de mi form
            form_values_object.image = image
            const response = await PUT('http://localhost:3000/api/products/' + product_id, {
                headers: getAuthenticatedHeaders(),
                body: JSON.stringify(form_values_object)
            })
            console.log({ response })
            navigate('/products')
        }
        catch (error) {
            console.error(error)
        }
    }
    const handleChangeFile = (e) => {
        //buscar el archivo que fue subido por ese input
        const file_found = e.target.files[0]
        const FILE_MB_LIMIT = 5
        if(file_found && file_found.size > FILE_MB_LIMIT * 1024 * 1024){
            alert(`Error el archivo es muy grande (limite ${FILE_MB_LIMIT}mb)`)
            return 
        }
        const lector_archivos = new FileReader()
        //le decimo al lector de archivos que cuando termine de cargar nos ejecute x callback
        lector_archivos.onloadend = () => {
            console.log('carga finalizada')
            /* console.log(lector_archivos.result) */
            setImage(lector_archivos.result)
        }

        //si hay archivo leelo
        if (file_found) {
            lector_archivos.readAsDataURL(file_found)
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmitNewProduct}>
                <div>
                    <label htmlFor='title'>Modificar titulo:</label>
                    <input name='title' id='title' defaultValue={ title }/>
                </div>
                <div>
                    <label htmlFor='price'>Modificar precio:</label>
                    <input name='price' id='price' defaultValue={ price }/>
                </div>
                <div>
                    <label htmlFor='stock'>Modificar stock:</label>
                    <input name='stock' id='stock' defaultValue={ stock }/>

                </div>
                <div>
                    <label htmlFor='description'>Modificar la descripcion:</label>
                    <input name='description' id='description' defaultValue={ description }/>

                </div>
                <div>
                    <label htmlFor='category'>Modificar categoria:</label>
                    <input name='category' id='category' />

                </div>
                <div>
                    {
                        image && <img src={image} />
                    }
                    <label htmlFor='image'>modifica la imagen:</label>
                    <input name='image' id='image' type='file' onChange={handleChangeFile} accept='image/*' />

                </div>
                <button type='submit'>Modificar Producto</button>
            </form>
        </div>
    )
}

export default EditProduct
