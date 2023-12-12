<template>
    <template v-if="getCart.length">
        <div class="container">
            <cart-item v-for="item in getCart" :key="item.id" :item="item" />
        </div>
        <div class="total">{{ $t('messages.total') }}: {{ getTotalCartPrice }} UAH</div>
    </template>

    <div class="empty-container" v-else>{{ $t('messages.empty') }}</div>
    <div class="cart-btn">
        <v-btn variant="outlined" @click="onBackBtnAction">{{ $t('actionTitles.back') }}</v-btn>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import CartItem from './CartItem.vue'
export default {
    name: 'CartView',

    components: {
        CartItem,
    },

    computed: {
        ...mapGetters('cart', ['getCart', 'getTotalCartPrice']),
    },
    
    methods: {
        onBackBtnAction() {
            this.$router.push({
                name: 'products',
            })
        },
    },
}
</script>
<style lang="scss" scoped>
.container {
    padding-top: 10px;
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
}
.empty-container {
    padding-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.cart-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
}
.total {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    font-weight: 700;
}
</style>
