import { GET_CARDS, GET_BY_NAME, GET_DETAILS, SORT_GAMES, GET_GENRES, FILTER_BY_GENRE, FILTER_BY_ORIGIN, POST_GAME } from "./types";
import axios from 'axios'

export const post_game = (data) => {
    const endpoint = 'http://localhost:3001/videogames'
    return async (dispatch) => {
        try {
            await axios.post(endpoint,data)
            return dispatch({
                type: POST_GAME,
                payload: data
            })
        } catch (error) {
            console.log(error.message)
        }
    }
}

export const get_cards = () => {
    const endpoint = 'http://localhost:3001/videogames'
    return async (dispatch) => {
        try {
            const {data} = await axios(endpoint)
            return dispatch({
                type: GET_CARDS,
                payload: data
            })
        } catch (error) {
            console.log(error.message)
        }
    }
}

export const get_by_name = (name) => {
    const endpoint = 'http://localhost:3001/videogames?name='
    return async (dispatch) => {
        try {
            const {data} = await axios(endpoint + name)
            return dispatch({
                type: GET_BY_NAME,
                payload: data
            })
        } catch (error) {
            console.log(error.message)
        }
    }
}

export const get_details = (id) => {
    const endpoint = 'http://localhost:3001/videogames/'
    return async (dispatch) => {
        try {
            const {data} = await axios(endpoint + id)
            return dispatch({
                type: GET_DETAILS,
                payload: data
            })
        } catch (error) {
            
        }
    }
} 
export const get_genres = () => {
    const endpoint = 'http://localhost:3001/genres'
    return async (dispatch)=> {
        try {
            const {data} = await axios(endpoint)
            return dispatch({
                type: GET_GENRES,
                payload: data
            })
        } catch (error) {
            
        }
    }
}
export const filter_origin = (origin) => {
    return {type: FILTER_BY_ORIGIN, payload: origin}
}

export const sort_games = (order) => {
    return {type: SORT_GAMES, payload:order}
}
export const filter_gender = (genre) => {
    return {type: FILTER_BY_GENRE, payload:genre}
}

