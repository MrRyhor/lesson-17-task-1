<template>
    <h1>{{ $t('messages.products') }}</h1>
    <div class="products-view">
        <products-filter />
        <products-list />
    </div>
</template>
<script>
import ProductsList from './ProductsList.vue'
import ProductsFilter from './ProductsFilter.vue'

export default {
    name: 'ProductsView',

    components: {
        ProductsList,
        ProductsFilter,
    },
}
</script>
<style lang="scss" scoped>
h1 {
   margin-bottom: 20px;
   padding-left: 50px;
}
.products-view {
    display: flex;    
    justify-content: space-between;
    padding: 0px 50px;
}
</style>
