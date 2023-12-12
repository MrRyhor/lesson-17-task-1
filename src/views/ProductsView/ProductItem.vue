<template>
    <div v-if="hasError">...Some Error</div>
    <div v-else-if="isLoading">...is loading</div>
    <template v-else>
        <v-card class="mx-auto" width="344" hover>
            <a :href="data.link" target="_blank">
                <v-img :src="data.imgSrc" height="300px" contain theme="dark" />
                <v-card-title class="title">
                    {{ getDataTitle }}
                </v-card-title>
            </a>
            <v-card-subtitle class="price">
                {{ data.price }}
            </v-card-subtitle>
            <v-card-actions>
                <div class="btns">
                    <v-btn variant="text" @click="onAddBtnAction"> {{ $t('actionTitles.addToCart') }} </v-btn>
                    <div class="edit-btns">
                        <div v-if="userPermissions.update" class="icon-edit">
                            <font-awesome-icon :icon="['fas', 'pen-to-square']" size="2x" @click="onEditAction" />
                        </div>
                        <div v-if="userPermissions.delete" class="icon-delete">
                            <font-awesome-icon :icon="['far', 'trash-can']" size="2x" @click="onDeleteAction" />
                        </div>
                    </div>
                </div>
            </v-card-actions>
        </v-card>
    </template>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'ProductItem',

    props: {
        data: {
            type: Object,
            required: true,
        },
    },

    computed: {
        ...mapGetters('users', ['userPermissions', 'isLoading', 'hasError']),

        getDataTitle() {
            return this.$i18n.locale === 'en' ? this.data.title.en : this.data.title.ua
        },
    },

    methods: {
        ...mapActions('products', ['deleteProduct', 'updateProduct']),
        ...mapActions('cart', ['addToCart']),
        onEditAction() {
            this.$router.push({
                name: 'products-editor',
                params: {
                    id: this.data.id,
                },
            })
        },
        onDeleteAction() {
            console.log('ok')
            this.deleteProduct(this.data.id)
        },
        onAddBtnAction() {
            this.addToCart(this.data)
        },
    },
}
</script>
<style lang="scss" scoped>
.mx-auto {
    & > a {
        text-decoration: none;
    }

    & .title {
        color: rgb(56, 56, 56);
    }
    & .btns {
        display: flex;
        gap: 10px;
        align-items: center;
        gap: 80px;
        justify-content: space-between;

        & .edit-btns {
            display: flex;
            align-items: center;
            gap: 10px;

            & .icon-edit {
                color: green;
            }
            & .icon-edit:hover {
                color: rgb(146, 225, 146);
            }
            & .icon-delete {
                color: red;
            }
            & .icon-delete:hover {
                color: rgb(255, 117, 117);
            }
        }
    }
    & .price {
        color: red;
        font-weight: 700;
        font-size: 24px;
    }
}
</style>
