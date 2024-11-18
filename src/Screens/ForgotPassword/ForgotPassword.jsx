import React from 'react'
import { Link } from 'react-router-dom'
import extractFormData from '../../utils/extractFormData'
import { getAuthenticatedHeaders, POST } from '../../fetching/http.fetching'



const ForgotPassword = () => {
    
    const handleSubmitLoginForm = async (e) => {
        try{
            e.preventDefault()
            const valoresFormulario = new FormData(e.target)
            const formShcema = {
                'email': ''
            }
            const form_values_object = extractFormData(formShcema, valoresFormulario)
            const response = await POST('http://localhost:3000/api/auth/forgot-password', {
                headers: getAuthenticatedHeaders(),
                body: JSON.stringify(form_values_object)
            })
            console.log({response})
        }
        catch(error){
            error.message
        } 
    }
    return (
        <div>
            <h1>Olvide mi contraseña</h1>
            <p>Enviaremos un mail a tu email de usuario, para enviarte los pasos de restablecimiento de contraseña</p>
            <form onSubmit={handleSubmitLoginForm}>
                <div>
                    <label htmlFor='email'>Ingresa tu email:</label>
                    <input name='email' id='email' placeholder='pepe@gmail.com' />
                    
                </div>
                <button type='submit'>Enviar Mail</button>
            </form>
            <span>Si aun no tienes cuenta puedes <Link to={"/register"}>registrare</Link></span>
            <br />
            <span>Si tienes cuenta puedes <Link to={"/login"}>iniciar sesion</Link></span>
        </div>  
    )
}

export default ForgotPassword
