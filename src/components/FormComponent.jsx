import React from 'react'
import Swal from 'sweetalert2'
import   useApi from '../hooks/useFetch'
import { useForm } from '../hooks/useForm'



export const FormComponent = () => {

  const { response, error, isLoading } = useApi('https://api-client-country-and-users-production.up.railway.app/api/pais');
 
  console.log({ response, error, isLoading });

  const [formValues, handleInputChnage, reset] = useForm({
    nombre: '',
    pais: '',
})
  
const { nombre, pais } = formValues;
  


const handleSubmit = async (e) => {
    e.preventDefault()
    reset()
  
    if ( nombre === '' || pais === ''  ) {
     
        Swal.fire({
            title: 'Error!',
            text: 'full all fields please! ',
            icon: 'error',
            confirmButtonText: 'Ok'
          })

        
        
    }else {
        const body =  {...formValues}  
        await fetch( process.env.REACT_URI , {
            method: "POST",
            body: JSON.stringify(body),
            headers: { "Content-type": "application/json" },
        })

        Swal.fire({
            title: 'Success!',
            text: 'Successful registration',
            icon: 'success',
            confirmButtonText: 'Ok'
        })
       
    }
}

if ( isLoading ) {
 return <h1 className='text-center text-white' >Cargando...</h1>
}

  return (

<div class="container text-dark">
  <div class="row justify-content-center align-items-center">
    <h1 className='text-white text-center mt-4'>Select your name and Country</h1>    
  </div>
  <hr/>
  <div className="row justify-content-center align-items-center h-100">
    <div className="col col-sm-6 col-md-6 col-lg-4 col-xl-3">
      <form onSubmit={ handleSubmit } className="form" >
        <div className="form-group">
        <select name='pais'
         className='form-control'
            required
            onChange={ handleInputChnage }
         >
           <option disabled selected>Select your Country </option>
           {error && (
                <>
                    <p>{error}</p>
                </>
            )}
            { 
                response.pais.map( ({pais, _id}) => (
                <option value={ pais } key={_id}>{ pais }</option> ))
             }
         </select>
        </div>
        <div className="form-group text-center">
            <input 
           type="text"
            name='nombre'
           placeholder='Write your name'
            onChange={ handleInputChnage }
            value={ nombre }
            className="form-control"
             />
        </div>
        <div className="form-group text-center">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
              <button className='btn btn-success mt-4 btn-lg' onSubmit={ handleSubmit } >Send</button>
                </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>

   
  )
}
