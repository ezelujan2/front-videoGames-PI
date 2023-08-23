import estilos from './Form.module.css'
import { useState } from 'react'
import validate from './validation'
import { useNavigate } from 'react-router-dom'
import { get_cards, get_genres, post_game } from '../../redux/actions/actions'
import { useDispatch } from 'react-redux'
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector'


export default function Form(){
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const[game,setGame]= useState({
        name: '',
        imagen: '',
        description: '',
        platform: [],
        released: '',
        genres: [],
        rating: null,
    })

    const todook = () => {
        // Son obligatorios el nombre, fecha, description y plataforma.
        if(game.name != '' && game.description != "" && game.platform.length !== 0 && game.released != "" && !genero && !platform && error.rating == '' && error.released == '' ) return false;
        else return true
    }

    const[error,setError] = useState({
        name: '',
        rating: '',
        genre: '',
        platform: '',
        released: '',
        description: '',
    })

    const[genero,setGenero] = useState("")
    const[platform,setPlatforms] = useState("")

 
    
    const handleChange = (event) => {
        setGame({...game, [event.target.name] : event.target.value});
        setError({...error, [event.target.name] : validate(event.target.name, event.target.value)})
    }

    let genres = useSelector(state => state.genres)
    if(genres.length === 0 ){
        dispatch(get_genres())
    }

    const addGenre = () => {
        let exist = null
        genres.map((gen)=> {
            if(gen.name.toLowerCase().includes(genero.toLowerCase())){
                exist = gen.name
            }
        })
        if(exist){
            if(game.genres.includes(exist)) {
                setError({...error, genre: `"${genero}" already added`})
                setGenero("")
            }
            else {
            setError({...error, genre: '',})
            setGame({...game, genres: [...game.genres, exist]})
            setGenero("") }
        }
        else{
            setError({...error, genre: `"${genero}" is not a valid Genre`})
            setGenero("")
        }
        
        
        
    }
    const addPlatform = () => {
        let exist = null;
        game.platform.map(plat => {
            if(plat.name.toLowerCase().includes(platform.toLowerCase())) exist = plat
        })
        if(exist){
            setError({...error, platform: `"${exist.name}" already added`})
            setPlatforms("")
        }
        else{
        setError({...error, platform: ''})
        setGame({...game,platform: [...game.platform, {name: platform}]})
        setPlatforms("")
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setGame({...game, rating: parseFloat(game.rating)})
        dispatch(post_game(game))
        alert('Su juego fue agregado de manera exitosa!')
        navigate('/home')
    }

    const handleDelete = (event) => {
        // event.preventDefault();
        const deletedGenre = game.genres.filter(gen => gen != event.target.id)
        setGame({...game, genres: deletedGenre})
    }

    return (
        <div className={estilos.container}> 
            <form onSubmit={handleSubmit} className={estilos.formulario}>
                {/* <label htmlFor="Name">Name: </label> */}
                <input type="text" onChange={handleChange} value={game.name} name="name" placeholder='Name'/>
                
                {/* <label htmlFor="imagen">Imagen: </label> */}
                <input type="text" onChange={handleChange} value={game.imagen} name="imagen" placeholder="Imagen URL"/>
                {/* <label htmlFor="description">Description: </label> */}
                {/* <label htmlFor="platform">Platform: </label> */}
                <div className={estilos.inputContainer}>
                <input className={estilos.inputConAdd} type="text" onChange={(e) => setPlatforms(e.target.value)} value={platform} name="platform" placeholder="Platform" />
                <button disabled={!platform} type="reset" onClick={addPlatform} className={estilos.add}>ADD</button>
                
                </div>
                <input type="text" onChange={handleChange} value={game.rating} name="rating" placeholder='Rating' />
                {/* <label htmlFor="Genres">Genres: </label> */}
                <input type="date" onChange={handleChange} value={game.released} name='released' placeholder='Released' />

                <div className={estilos.inputContainer}> 
                <input className={estilos.inputConAdd} type="text" onChange={(e) => setGenero(e.target.value)} value={genero} name='genres' placeholder='Genres' />
                <button disabled={!genero} type="reset" className={estilos.add} onClick={addGenre}>ADD</button>
                </div>
                <textarea onChange={handleChange} value={game.description} name="description" placeholder='Description' />
                {error.rating ? <p className={estilos.warning}>{error.rating}</p> : ''}
                {error.name ? <p className={estilos.warning}>{error.name}</p> : ''}
                {error.genre ? <p className={estilos.warning}>{error.genre}</p> : ""}
                {error.platform ? <p className={estilos.warning}>{error.platform}</p> : ""}
                {error.released ? <p className={estilos.warning}>{error.released}</p> : ""}
                {error.description ? <p className={estilos.warning}>{error.description}</p> : ""}


                {genero  ? <p className={estilos.warning}> Press to Add genre</p> : ''} 
                {platform  ? <p className={estilos.warning}> Press to Add platform </p> : ''}

                {game.genres.length !== 0 ? <p className={estilos.warning}>GENRES: </p> : '' }
                {game.genres ? game.genres.map(gen => <p className={estilos.warning}>{`- ${gen}`} <button id={gen} onClick={handleDelete}>X</button></p>) : ''}


                {game.platform.length !== 0 ? <p className={estilos.warning}>PLATFORMS: </p> : '' }
                {game.platform ? game.platform.map(plat => <p className={estilos.warning}>{`- ${plat.name}`}</p>) : ''}


                <button disabled={error.name || todook()} type="submit">SUBMIT</button>
            </form>
        </div>
    )
}