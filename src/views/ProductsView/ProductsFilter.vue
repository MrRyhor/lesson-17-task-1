<template>
    <div class="filters-container">
        <h2>{{ $t('messages.filters') }}</h2>
        <div class="seller-container">
            <h4>
                {{ $t('filters.seller') }} <span>{{ getProductsSellers.size }}</span>
            </h4>
            <label v-for="seller in getProductsSellers" :key="seller" class="seller"
                >{{ seller }}
                <input v-model="filterObj.seller" type="checkbox" :value="seller" />
            </label>
        </div>
        <div class="search">
            <v-text-field
                v-model="filterObj.search"
                :label="$t('filters.brand')"
                variant="underlined"
                :placeholder="$t('filters.search')"                
            />
        </div>
        <div class="brand-container">
            <h4>
                {{ $t('filters.alphabet') }} <span>{{ getProductsBrands.length }}</span>
            </h4>
            <label v-for="brand in getProductsBrands" :key="brand" class="brand"
                >{{ brand }}
                <input v-model="filterObj.brand" type="checkbox" :value="brand" />
            </label>
        </div>
        <v-btn variant="outlined" class="clear-btn" @click="clearFilters">{{ $t('filters.clear') }}</v-btn>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'ProductsFilter',

    data() {
        return {
            filterObj: {
                seller: [],
                search: null,
                brand: [],
            },
        }
    },

    watch: {
        filterObj: {
            handler(newValue) {
                this.setFilterObj(newValue)
            },
            deep: true,
        },
    },

    computed: {
        ...mapGetters('products', ['getProductsBrands', 'getProductsSellers', 'getFilterObj']),
    },

    methods: {
        ...mapActions('products', ['setFilterObj']),
        clearFilters() {
            this.filterObj = {
                seller: [],
                search: null,
                brand: [],
            }
        },
    },
}
</script>
<style lang="scss" scoped>
.filters-container {
    display: flex;
    flex-direction: column;
    min-width: 300px;

    & .seller-container,
    .brand-container,
    .search {
        margin-top: 30px;
    }

    & .seller,
    .brand {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    h4 {
        color: rgb(65, 65, 65);
    }
    span {
        color: #fff;
        border-radius: 50%;
        background-color: gray;
        padding: 3px 7px;
    }

    & .clear-btn {
        margin-top: 20px;
    }
}
</style>
