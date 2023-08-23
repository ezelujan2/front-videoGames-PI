import estilos from './Homepage.module.css'
import Juegos from '../Juegos/Juegos'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { get_cards, get_by_name,sort_games,get_genres, filter_gender, filter_origin} from '../../redux/actions/actions';
import { Link } from 'react-router-dom';

const PER_PAGE = 15;


export default function Homepage() {

    const dispatch = useDispatch()
    const [page, setPage] = useState(1)
    const genres = useSelector(state => state.genres)
    

    const game = useSelector(state => state.juegos)
    const gameQuantity = game.length;
    const lastInPage = PER_PAGE * page;
    const firstInPage = lastInPage - PER_PAGE;
    const currentGames = game.slice(firstInPage, lastInPage);

    const pageArray = []
    for (let i = 1; i <= Math.ceil(gameQuantity/PER_PAGE); i++) {
        pageArray.push(i)
    }


    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        dispatch(get_cards());
        dispatch(get_genres())
            .then(() => {
                setTimeout(() => {
                    setIsLoading(false);
                }, 3000);
            });
    }, []);

    const[name,setName] = useState({
        game  : '',
    })

    const handleChange = (event) => {
        setName({...name, [event.target.name] : event.target.value})
    }

    const gamesByName = useSelector((state) => state.byName);
    

    useEffect(() => {
        if (name.game !== '') {
          dispatch(get_by_name(name.game));
        }
      }, [name.game]);

    const [selected, setSelected] = useState(null)
    
    const handleSort = (event) => {
        setSelected(event.target.name)
        dispatch(sort_games(event.target.name))
    }

    const [selectedGenre, setSelectedGenre] = useState('todos');
    const [selectedOrigin, setSelectedOrigin] = useState('todos');

    const handleGenreChange = event => {
        setPage(1)
        setSelectedGenre(event.target.value)
        const selectedGenre = event.target.value;
        dispatch(filter_gender(selectedGenre));
    };

    const handleOrigin = (event) => {
        setPage(1)
        setSelectedOrigin(event.target.value)
        const selectedOrigin = event.target.value
        dispatch(filter_origin(selectedOrigin))
    }



    const handleReset = (event) => {
        setSelectedGenre('todos')
        setSelectedOrigin('todos')

        setSelected(event.target.name)
        dispatch(sort_games(event.target.name))
    }
    

    return (
        <>
            {isLoading ? (
            <div className={estilos.loading}>
                <div className={estilos.spinner}></div>
            </div> ): 
            <div className={estilos.todo}>
            { name.game === '' ?  <div className={estilos.juegos}>
                        { currentGames?.map(juego => {
                            
                            let juegoCambiado = {...juego}
                            if(juego.hasOwnProperty('Genres')){
                                juegoCambiado = {...juego, genres: juego.Genres}
                            }
                         return (
                             <Juegos key={juegoCambiado.id} id={juegoCambiado.id} name={juegoCambiado.name} genres={juegoCambiado.genres} imagen={juegoCambiado.background_image} rating={juegoCambiado.rating}/>
                            )
                        })}
                    <div className={estilos.btnContainer}> 
                        <button className={`${estilos.btnPaginas} ${ page === 1 ? estilos.disabledBtn : ''}`} disabled={page===1} onClick={() => setPage(page-1)}>ANTERIOR</button>
                        {pageArray.map(p => {
                            return (
                                <button key={p} className={`${estilos.btnPaginado} ${p === page ? estilos.elegido : ''}`} onClick={()=> setPage(p)}>{p}</button>
                            )
                        })}
                        <button className={`${estilos.btnPaginas} ${ page === Math.ceil(gameQuantity/PER_PAGE) ? estilos.disabledBtn : ''}`} disabled={page === Math.ceil(gameQuantity/PER_PAGE)} onClick={() => setPage(page+1)}>POSTERIOR</button>
                    </div>
                    
                </div> : <div className={estilos.juegos}> 
                { gamesByName?.map( juego=> {
                    let juegoCambiado = {...juego}
                    if(juego.hasOwnProperty('Genres')){
                        juegoCambiado = {...juego, genres: juego.Genres}
                    }
                    return (
                    <Juegos key={juego.id} id={juego.id} name={juego.name} genres={juegoCambiado.genres} imagen={juego.background_image} rating={juego.rating}/>)
                })}
                </div>
            }
                <div className={estilos.filtrado}> 
                    <input type='text' name='game' value={name.game} onChange={handleChange} className={estilos.input} placeholder='Ingresar busqueda'></input>
                    <p className={estilos.subtitulo}>Ordenar: </p> 
                    <button onClick={handleSort} name="A" className={`${estilos.boton} ${selected  === 'A' ? estilos.selectedButton: ''}`}> Ascendente </button>
                    <button onClick={handleSort} name="D" className={`${estilos.boton} ${selected  === 'D' ? estilos.selectedButton: ''}`}> Descendente </button>
                    <button onClick={handleSort} name="RA" className={`${estilos.boton} ${selected  === 'RA' ? estilos.selectedButton: ''}`}> Mayor rating </button>
                    <button onClick={handleSort} name="RD" className={`${estilos.boton} ${selected  === 'RD' ? estilos.selectedButton: ''}`}> Menor rating </button>
                    <button onClick={handleReset} name="TD" className={`${estilos.boton}`}>RESET VALUES</button>

                    <p className={estilos.subtitulo}>Filtrados: </p> 
                        <select onChange={handleGenreChange}className={estilos.boton} value={selectedGenre}>
                        <option key="todos" value="todos"> All genres </option>

                            {genres?.map((genero) => (
                            <option key={genero.id} value={genero.name}>
                                {genero.name}
                            </option>
                            ))}
                        </select>
                    
                        <select onChange={(handleOrigin)} className={estilos.boton} value={selectedOrigin}>
                        
                        <option value="todos"> All origins</option>
                        <option value="DB"> BDD</option>
                        <option value="API" > API</option>
                        </select>
                        <button className={estilos.boton}><Link to="/form">Agregar juego</Link></button>
                </div>
            </div>
}
        </>
    )
}