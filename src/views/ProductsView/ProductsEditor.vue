<template>
    <div class="editor-container">
        <v-text-field v-model="productData.imgSrc" :label="$t('actionTitles.imgSrc')" variant="outlined" />
        <v-text-field v-model="productData.title.en" :label="$t('actionTitles.titleEn')" variant="outlined" />
        <v-text-field v-model="productData.title.ua" :label="$t('actionTitles.titleUa')" variant="outlined" />
        <v-text-field v-model="productData.brand" :label="$t('actionTitles.brand')" variant="outlined" />
        <v-text-field v-model="productData.price" :label="$t('actionTitles.price')" variant="outlined" />
        <v-text-field v-model="productData.seller" :label="$t('actionTitles.seller')" variant="outlined" />
        <v-text-field v-model="productData.link" :label="$t('actionTitles.link')" variant="outlined" />
        <div class="btns-container">
            <v-btn variant="outlined" @click="onBtnAction">{{ btnText }}</v-btn>
            <v-btn variant="outlined" @click="onCancelAction">{{ $t('actionTitles.cancel') }}</v-btn>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'ProductsEditor',

    data() {
        return {
            productData: {
                imgSrc: null,
                title: {
                    en: null,
                    ua: null,
                },
                brand: null,
                price: null,
                seller: null,
                link: null,
            },
        }
    },

    computed: {
        ...mapGetters('products', ['getProductById']),
        getParams() {
            return this.$route.params.id
        },
        getLocale() {
            return this.$i18n.locale
        },

        btnText() {
            if (this.getParams && this.$i18n.locale === 'en') return 'Save'
            else if (this.getParams && this.$i18n.locale === 'ua') return 'Зберегти'
            else if (!this.getParams && this.$i18n.locale === 'en') return 'Create'
            else return 'Створити'
        },
    },

    created() {
        if (this.getParams) this.productData = { ...this.getProductById(this.$route.params.id) }
    },

    methods: {
        ...mapActions('products', ['addProduct', 'updateProduct']),
        onCancelAction() {
            this.$router.push({
                name: 'products',
            })
        },
        onBtnAction() {
            if (!this.getParams) this.addProduct(this.productData)
            else this.updateProduct({ itemId: this.productData.id, data: this.productData })
            this.$router.push({
                name: 'products',
            })
        },
    },
}
</script>
<style lang="scss" scoped>
.editor-container {
    max-width: 500px;
    margin: 0 auto;

    & .btns-container {
        display: flex;
        align-items: center;
        gap: 20px;
    }
}
</style>
