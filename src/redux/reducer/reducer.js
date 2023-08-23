import { GET_CARDS, GET_BY_NAME, GET_DETAILS, SORT_GAMES, GET_GENRES, FILTER_BY_GENRE, FILTER_BY_ORIGIN, POST_GAME } from "../actions/types"


const initialState = {
    juegos: [],
    aux : [],
    byName : [],
    details: '',
    genres: [],
    filteredByOrigin: {filtered: false, by: ''}
}

const reducer = (state=initialState, {type,payload}) => {
    switch(type){
        case GET_CARDS:
            return{...state, juegos:payload, aux: payload}
        case GET_BY_NAME:
            return{...state, byName:payload}
        case GET_DETAILS:
            return{...state, details:payload}
        case SORT_GAMES:
            let orderedlist = [...state.juegos]
            if(payload === 'TD'){
                return {...state, juegos : state.aux, filteredByOrigin: {filtered:false, by: ''}}
            }
            else if(payload === 'A') {
                return {...state, juegos: orderedlist.sort((a, b) => a.name.localeCompare(b.name))}
            }
            else if(payload === 'D'){
                return {...state, juegos: orderedlist.sort((a, b) => b.name.localeCompare(a.name))}
            }
            else if(payload === 'RA')
                return {...state, juegos: orderedlist.sort((a,b) => b.rating - a.rating)}

            else if(payload === 'RD')
                return {...state, juegos: orderedlist.sort((a,b) => a.rating - b.rating)}

        case GET_GENRES:
            return{...state,genres:payload}
        case FILTER_BY_GENRE:
                if(payload === 'todos'){
                    return{...state, juegos:state.aux}
                }
                else {
                    const filtered = state.juegos.filter((juego) => {
                        if(juego.hasOwnProperty('genres')){
                        return juego.genres.map(genero => genero.name).includes(payload)
                        }
                        else {
                            return juego.Genres.map(genero => genero.name).includes(payload)
                        }
                    });
                    return{...state, juegos:filtered}
                }
        case FILTER_BY_ORIGIN:
                let db = []
                let api = []
                state.juegos.map(juego => {
                    if(juego.hasOwnProperty('updatedAt')) db.push(juego)
                    else api.push(juego)
                })
                if(payload === 'DB') return {...state, juegos: db, filteredByByOrigin: {filtered:true, by: 'db'}}
                if(payload === 'API') return {...state, juegos: api, filteredByOrigin: {filtered:true, by: 'api'}}
                if(payload === 'todos') return {...state, juegos: state.aux, orderByOrigin: {filtered:false, by: ''}}
        
        case POST_GAME:
                return {...state, orderByOrigin: false}

        default:
            return {...state}
    }
}

export default reducer