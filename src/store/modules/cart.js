import { getTotalPrice } from './helpers/getTotalPrice'
import {getCartFromLS} from './helpers/getCartFromLS'

const { items, totalPrice } = getCartFromLS()

export default {
    namespaced: true,
    state: {
        cart: items,
        totalPrice
    },
    getters: {
        getCart: ({ cart }) => cart,
        getTotalCartPrice: ({ totalPrice }) => totalPrice,
    },
    mutations: {
        addToCart(state, product) {
            const findObj = state.cart.find((obj) => obj.id === product.id)
            if (findObj) findObj.count++
            else state.cart.push({ ...product, count: 1 })
            state.totalPrice = getTotalPrice(state.cart)
        },
        removeFromCart(state, id) {
            state.cart = state.cart.filter((item) => item.id !== id)
            state.totalPrice = getTotalPrice(state.cart)
        },
    },
    actions: {
        addToCart({ commit }, product) {
            commit('addToCart', product)
        },
        removeFromCart({ commit }, id) {
            commit('removeFromCart', id)
        },
    },
    modules: {},
}
