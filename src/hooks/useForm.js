import { useState } from "react"

// le pasamos un objecto vacio en caso de no nos mande nada no marque un error. alli recibimos emal, nombre y password
export const useForm = (initialState={}) => {
    
    const [values, setValues] = useState(initialState);

    // esto es solo para resetear el formulario y quede limpio
    const reset = () => {
        setValues(initialState);
    }


    const handleInputChnage = ({target}) => {
        // console.log(e.target.name)
        // console.log(e.target.value)
        setValues({
            ...values,
            // el nombre se esta propiedad sera lo que viene en el objecto
            [target.name]: target.value
        })
    }
    // vamos a retornar un arreglo, pero tambien podria retornar lo que quiera
    // el primer valor es el estado del formulario
    // el segundo es una funcion para poner los valores al formulario
    return [ values, handleInputChnage, reset]
}
