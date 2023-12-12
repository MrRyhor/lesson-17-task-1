import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import ProductsView from '../views/ProductsView'
import LoginPage from '../views/LoginPage.vue'
import store from '../store'

const routes = [
    {
        path: '/',
        name: 'main',
        component: MainView,
        meta: {
            requiredAuth: false,
        },
    },
    {
        path: '/products',
        name: 'products',
        component: ProductsView,
        meta: {
            requiredAuth: true,
        },
    },
    {
        path: '/products/config/:id?',
        name: 'products-editor',
        component: () => import('../views/ProductsView/ProductsEditor.vue'),
        meta: {
            requiredAuth: true,
        },
    },
    {
        path: '/cart',
        name: 'cart',
        component: () => import('../views/CartView'),
        meta: {
            requiredAuth: true,
        },
    },
    {
        path: '/login',
        name: 'login',
        component: LoginPage,
        meta: {
            requiredAuth: false,
        },
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

router.beforeEach(async (to) => {
    if (to.meta?.requiredAuth) {
        let isAuthenticated = store.state.auth.user

        if (!isAuthenticated) isAuthenticated = await store.dispatch('auth/loginWithCredential')

        if (!isAuthenticated)
            return {
                name: 'login',
            }
    }
})


export default router
