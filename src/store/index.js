import { createStore, applyMiddleware, compose } from 'redux';

import reducer from 'src/reducers';
import auth from 'src/middleware/auth';
import exploration from 'src/middleware/exploration';
import webSocket from 'src/middleware/webSocket';

// Redux Devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Warning declare here middleware !!!
const enhancers = composeEnhancers(applyMiddleware(auth, exploration, webSocket));

const store = createStore(reducer, enhancers);

export default store;
