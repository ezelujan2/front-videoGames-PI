import estilos from './Juegos.module.css'
import { Link } from "react-router-dom";
import imagenDe from './sinimagen.png'

export default function Juegos({name,genres,imagen,id, rating}) {

    return (
        <div className={estilos.juegos} key={id} name={name}> 
            <h3><Link to={`/detail/${id}`}>{name}</Link></h3>
            <h4>{genres.length === 0 ? "Sin genero" : genres.map(genero => genero.name + ' ')}</h4>
            <h4>Rating: {rating}</h4>
            <Link className={estilos.nose}to={`/detail/${id}`}> 
            <img src={imagen ? imagen : imagenDe} alt={name}></img>
            </Link>
        </div>
        )
}
