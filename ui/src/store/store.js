import {thunk} from "easy-peasy";
import ky from "ky";

const {action} = require("easy-peasy");
const {createStore} = require("easy-peasy");

export const store = createStore({
    token: sessionStorage.getItem('token') || null,
    isManager: sessionStorage.getItem('isManager') === 'true',
    employeeData: JSON.parse(sessionStorage.getItem('employeeData')) || null,
    products: [],
    cart: JSON.parse(sessionStorage.getItem('cart')) || [],
    //actions
    updateToken: action((state, payload) => {
        state.token = payload;
        sessionStorage.setItem('token', payload)
    }),
    setEmployeeData: action((state, payload) => {
        state.employeeData = payload;
        state.isManager = payload.isManager;
        sessionStorage.setItem('isManager', payload.isManager)
        sessionStorage.setItem('employeeData', JSON.stringify(payload))

    }),
    logOut: action((state, payload) => {
        state.token = null;
        state.isManager = false;
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('isManager');
        sessionStorage.removeItem('employeeData');
    }),
    setProducts: action((state, payload) => {
        state.products = payload;
    }),

    addProductToCart: action((state, payload) => {
        let found = false;
        state.cart.forEach(p => {
            if(p.productId === payload.productId){
                found = true;
                p.quantity = parseInt(p.quantity) + parseInt(payload.quantity)
            }
        })

        if(!found){
            state.cart.push(payload)
        }

        sessionStorage.setItem('cart', JSON.stringify(state.cart))

    }),

    //thunks
    getProducts: thunk(async (actions, token) => {
        let data = await ky.get('http://localhost:3001/inventory/allProducts', {headers: {token: token}}).json();
        actions.setProducts(data)
    })
});