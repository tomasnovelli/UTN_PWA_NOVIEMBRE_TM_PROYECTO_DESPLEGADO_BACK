import React from 'react'
import extractFormData from '../../utils/extractFormData'
import { Link, useParams } from 'react-router-dom'

const ResetPassword = () => {
    
    const {reset_token} = useParams()
    const handleSubmitResetPassword = (e) => {
        e.preventDefault()
        const valoresFormulario = new FormData(e.target)
        const formShcema = {
            'password': ''
        }
        const form_values_object = extractFormData(formShcema, valoresFormulario)
        fetch('http://localhost:3000/api/auth/reset-password/' + reset_token, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form_values_object)
        })
        .then(
            (responseHTTP)=>{ 
                console.log({responseHTTP}) 
                return responseHTTP.json()
            }
        )
        .then(
            (body) => {
                console.log(body)
            }
        )
        .catch(
            (error)=>{ console.error(error) }
        )
        
    }
    return (
        <div>
            <h1>Nueva Contraseña</h1>
            <form onSubmit={handleSubmitResetPassword}>
                <div>
                    <label htmlFor='password'>Ingresa tu contraseña</label>
                    <input name='password' id='password' placeholder='pepe123'/>
                </div>
                <button type='submit'>Restablecer contraseña</button>
            </form>
            <span>si recuerdas contraseña <Link to={"/login"}>registrare</Link></span>
            <br />
        </div>  
    )
}

export default ResetPassword
