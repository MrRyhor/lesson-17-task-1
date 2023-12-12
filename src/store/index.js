import { createStore } from 'vuex'
import auth from './modules/auth'
import products from './modules/products'
import users from './modules/users'
import cart from './modules/cart'

export default createStore({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        auth,
        products,
        users,
        cart
    },
})
