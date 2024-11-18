import React, { useState } from 'react'
import { getAuthenticatedHeaders, POST } from '../../fetching/http.fetching'
import extractFormData from '../../utils/extractFormData'

const CreateProductScreen = () => {
    const [image, setImage] = useState('')
    const handleSubmitNewProduct = async (e) => {
        
        try {
            e.preventDefault()
            const valoresFormulario = new FormData(e.target)
            const formShcema = {
                'title': '',
                'price': '',
                'stock': '',
                'description': '',
                'category': ''
            }
            const form_values_object = extractFormData(formShcema, valoresFormulario)
            //agregamos la image al objeto con los valores de mi form
            form_values_object.image = image
            const response = await POST('http://localhost:3000/api/products', {
                headers: getAuthenticatedHeaders(),
                body: JSON.stringify(form_values_object)
            })
            console.log({ response })
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
        //le decimos al lector de archivos que cuando termine de cargar nos ejecute x callback
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
                    <label htmlFor='title'>Ingrese el titulo:</label>
                    <input name='title' id='title' />

                </div>
                <div>
                    <label htmlFor='price'>Ingrese el precio:</label>
                    <input name='price' id='price' />
                </div>
                <div>
                    <label htmlFor='stock'>Ingrese el stock:</label>
                    <input name='stock' id='stock' />

                </div>
                <div>
                    <label htmlFor='description'>Ingrese la descripcion:</label>
                    <input name='description' id='description' />

                </div>
                <div>
                    <label htmlFor='category'>Ingrese la categoria:</label>
                    <input name='category' id='category' />

                </div>
                <div>
                    {
                        image && <img src={image} />
                    }
                    <label htmlFor='image'>Ingrese la categoria:</label>
                    <input name='image' id='image' type='file' onChange={handleChangeFile} accept='image/*' />

                </div>
                <button type='submit'>Crear Producto</button>
            </form>
        </div>
    )
}

export default CreateProductScreen
