import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from  'redux';

import App from "./components/app";
import reducer from './reducer';
import {Provider} from "react-redux";

// инициализация State;
//const initialState = 0;

const store = createStore(reducer);

// const { dispatch } = store;

// Пример функции обертки bindActionCreator
// const bindActionCreator = (creator, dispatch) => (...args) => {
//     dispatch(creator(...args));
// }
// const incDispatch = () => dispatch(inc());

// const { inc, dec, rnd } =
//     bindActionCreators( actions, dispatch);

// функциональные кнопки до реализии на REACT
// document
//     .getElementById('inc')
//     .addEventListener('click', inc);
//
// document
//     .getElementById('dec')
//     .addEventListener('click', dec);
//
// document
//     .getElementById('rnd')
//     .addEventListener('click', () => {
//         const payload = Math.floor(Math.random()*10);
//         rnd(payload);
//     });

// const update = () => {
    // document
    //     .getElementById('counter')
    //     .innerHTML = store.getState();
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider> ,
        document.getElementById("root"));
// };
// update();
// store.subscribe(update);

// для того чтобы получать обнолвения, мы вызываем store.subscribe()
//store.subscribe(() => {
// для того чтобы получить текущее состояние, мы вызываем store.getState()
//    console.log(store.getState());
//})
// для того чтобы обработать кокое-либо действие, мы вызываем store.dispatch()
//store.dispatch({type: 'INC'});
//store.dispatch({type: 'INC'});

// let state = reducer(undefined, {});
// state = reducer(state, { type: 'INC'});
// state = reducer(state, { type: 'INC'});
// console.log(state);