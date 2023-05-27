import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
    ordered: [],
    confirmId : null,
    customerInfo : {}
};
//console.log(initialState)


const shoppingCartSlice = createSlice({
    initialState,
    name : 'shoppingCart',
    reducers : {
        addToShoppingCart(state, action) {
            const {id} = action.payload;
            const product = state.cart.find(product => product.id === id);
            if(!product) {
                action.payload = {
                    ...action.payload,
                    count : 1
                }
                action.payload.onhand--;
                state.cart.push(action.payload);
            }
        },
        incrementInCart(state, action) {
            const {id} = action.payload;
            const product = state.cart.find(product => product.id === id);
            if(product.onhand !== 0) {
                product.count++;
                product.onhand--;
            }
        },
        decrementInCart(state, action) {
            const id = action.payload;
            const product = state.cart.find(product => product.id === id);
            if(product.count === 1) {
                state.cart = state.cart.filter(product => product.id !== id);
                return state;
            }
            product.count--;
            product.onhand++;
        },
        clearShoppingCart(state, action) {
            state.cart = [];
            return state;
        },
        productsOrdered(state, action) {
            state.ordered = [...state.ordered,...state.cart];
            state.customerInfo = action.payload;
            state.cart = [];
        },
        removeOrder(state, action) {
            const id = action.payload;
            state.ordered = state.ordered.filter(product => product.id !== id);
        },
        decrementInOrdered(state, action) {
            const id = action.payload;
            const product = state.ordered.find(product => product.id === id);
            if(product.count === 1) {
                state.ordered = state.ordered.filter(product => product.id !== id);
                return state;
            }
            product.count--;
        },
        setOrderId(state, action) {
            state.confirmId = nanoid();
        }
        }
    }
)

export default shoppingCartSlice.reducer;
export const {addToShoppingCart, incrementInCart, decrementInCart, clearShoppingCart, productsOrdered, decrementInOrdered, removeOrder, setOrderId} = shoppingCartSlice.actions;
export const selectAllInCart = state => state.shoppingCart.cart;
export const getTotalCost = state => state.shoppingCart.cart.reduce((acc, val) => acc + val.price * val.count,0)
export const checkAdded = (state, id) => state.shoppingCart.cart.find(product => product.id === id) === undefined ? false : true;
export const selectAllOrdered = state => state.shoppingCart.ordered;
export const getTotalCostOrdered = state => state.shoppingCart.ordered.reduce((acc, val) => acc + val.price * val.count,0);
