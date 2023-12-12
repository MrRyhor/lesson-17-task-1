import DbOperations from '../helpers/DbOperations'
const collectionDB = new DbOperations('products')
export default {
    namespaced: true,
    state: () => ({
        productsList: [],
        filterObj: {
            seller: [],
            search: null,
            brand: [],
        },
        loading: false,
        error: null,
    }),
    getters: {
        isLoading: (state) => state.loading,
        hasError: (state) => state.error,
        getFilterObj: ({ filterObj }) => filterObj,

        getProductsList: (state) => state.productsList,
        getFilteredProductsList: ({ productsList, filterObj }) =>
            productsList.filter((product) => {
                if (filterObj.search && !product.brand.toLowerCase().includes(filterObj.search.toLowerCase()))
                    return false
                if (filterObj.brand.length && !filterObj.brand.includes(product.brand)) return false
                if (filterObj.seller.length && !filterObj.seller.includes(product.seller)) return false
                return true
            }),
        getProductById: (state) => (productId) => state.productsList.find((product) => product.id == productId),
        getProductsBrands: ({ productsList }) => [...new Set(productsList.map((product) => product.brand))].sort(),
        getProductsSellers: ({ productsList }) => new Set(productsList.map((product) => product.seller)),
    },
    mutations: {
        setItemsList(state, itemsList) {
            state.productsList = itemsList
        },

        setLoading(state, value) {
            state.loading = value
        },
        setError(state, error) {
            state.error = error
        },
        deleteProduct(state, productId) {
            state.productsList = state.productsList.filter((product) => product.id !== productId)
        },
        setFilterObj(state, filterDataObj) {
            state.filterObj = filterDataObj
        },
    },
    actions: {
        loadProductsList({ commit }) {
            commit('setError', null)
            commit('setLoading', true)
            collectionDB
                .loadItemsList()
                .then((list) => {
                    commit('setItemsList', list)
                })
                .catch((error) => {
                    commit('setError', error)
                })
                .finally(() => {
                    commit('setLoading', false)
                })
        },
        addProduct({ commit, dispatch }, item) {
            commit('setError', null)
            commit('setLoading', true)
            collectionDB
                .addItem(item)
                .then(() => {
                    dispatch('loadProductsList')
                })
                .catch((error) => {
                    commit('setError', error)
                })
                .finally(() => {
                    commit('setLoading', false)
                })
        },
        deleteProduct({ commit }, itemId) {
            commit('setError', null)
            commit('setLoading', true)

            collectionDB
                .deleteItem(itemId)
                .then(() => {
                    commit('deleteProduct', itemId)
                    // dispatch('loadProductsList')
                })
                .catch((error) => {
                    commit('setError', error)
                })
                .finally(() => {
                    commit('setLoading', false)
                })
        },
        updateProduct({ commit, dispatch }, { itemId, data }) {
            commit('setError', null)
            commit('setLoading', true)

            collectionDB
                .updateItem(itemId, data)
                .then(() => {
                    dispatch('loadProductsList')
                })
                .catch((error) => {
                    commit('setError', error)
                })
                .finally(() => {
                    commit('setLoading', false)
                })
        },

        setFilterObj({ commit }, filterDataObj) {
            commit('setFilterObj', filterDataObj)
        },
    },
}
