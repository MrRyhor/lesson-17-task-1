<template>
    <div class="container">
        <div>{{ item.title.en }}</div>
        <div>{{ item.count }} pcs.</div>
        <div>{{ item.price * item.count }} UAH</div>
        <v-btn variant="outlined" @click="removeItemFromCart">{{ $t('actionTitles.delete') }}</v-btn>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    name: 'CartItem',

    props: {
        item: {
            type: Object,
            default: () => ({}),
        },
    },
 
    methods: {
        ...mapActions('cart', ['removeFromCart']),
        removeItemFromCart() {
            this.removeFromCart(this.item.id)
        },
    },
}
</script>
<style lang="scss" scoped>
.container {    
    display: flex;
    align-items: center;
    justify-content: space-between;    
    border: 2px solid rgb(63, 63, 63);
    border-radius: 10px;
    padding: 20px;    
}
</style>
