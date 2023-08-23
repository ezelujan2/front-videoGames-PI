import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducer/reducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';  // Importa la función adecuada

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))  // Usa composeWithDevTools directamente
);

export default store;
