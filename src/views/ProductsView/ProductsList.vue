<template>
    <div v-if="hasError">...Some Error</div>
    <div v-else-if="isLoading">...is loading</div>
    <div v-else class="products-list-container">
        <v-btn v-if="userPermissions.write" @click="onAddAction">{{ $t('actionTitles.addItem') }}</v-btn>
        <div class="products-container">
            <product-item v-for="product in getFilteredProductsList" :key="product.id" :data="product" />
        </div>        
    </div>
    
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import ProductItem from './ProductItem.vue'
export default {
    name: 'ProductsList',

    components: { ProductItem },

    computed: {
        ...mapGetters('products', ['getProductsList', 'hasError', 'isLoading','getFilteredProductsList']),
        ...mapGetters('users', ['userPermissions'])
    },

    created() {
        this.loadProductsList()
    },

    methods: {
        ...mapActions('products', ['loadProductsList', 'addProduct']),
        onAddAction(){
            this.$router.push({
                name: 'products-editor'
            })
        }
    },
}
</script>
<style lang="scss" scoped>
.products-list-container {
    display: flex;
    align-items: center;    
    flex-direction: column;
    

    & .products-container {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: auto;
        row-gap: 20px;
        column-gap: 20px;
        padding: 50px;
    }
}
</style>
