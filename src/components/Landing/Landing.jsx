import estilos from './Landing.module.css'
import { NavLink } from "react-router-dom"


export default function About(){
    return(
        <div className={estilos.hola}>
            <NavLink to="/home" className={estilos.boton}>HOME</NavLink>
        </div>
    )
}