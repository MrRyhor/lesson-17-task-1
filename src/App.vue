<template>
    <div class="container">
        <nav>
            <router-link to="/">{{ $t('nav.main') }}</router-link> |
            <router-link to="/products">{{ $t('nav.products') }}</router-link>
        </nav>
        <div v-if="hasError">...Some Error</div>
        <div v-else-if="isLoading">...is loading</div>
        <div v-else class="app-wrapper">
            <div class="header">
                <div class="lang-container" @click="changeLocale">
                    <img :src="getLangFlag" />
                    <span>{{ currentLanguage }}</span>
                </div>
                <div class="user-info">
                    <div v-if="getUser" class="user-container">
                        <div class="get-user">
                            <div class="img-container">
                                <img v-if="getUser.photoURL" :src="getUser.photoURL" />
                                <font-awesome-icon v-else :icon="['fas', 'user-tie']" />
                            </div>
                            <span>{{ getUser.email }}</span>
                        </div>
                        <v-btn prepend-icon="mdi-logout" @click="onLogout">{{ $t('actionTitles.logout') }}</v-btn>
                    </div>
                    <v-btn v-else prepend-icon="mdi-account-circle" @click="onLogin">{{
                        $t('actionTitles.login')
                    }}</v-btn>
                </div>
                <div v-if="getUser" class="cart-container">
                    <font-awesome-icon
                        :icon="['fas', 'cart-shopping']"
                        size="3x"
                        class="cart"
                        @click="onCartIconAction"
                    />
                    <span class="cart-counter">{{ getCartCount }}</span>
                </div>
            </div>
        </div>
    </div>
    <hr />
    <div class="router-view">
        <router-view />
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'App',

    computed: {
        ...mapGetters('auth', ['getUser', 'isLoading', 'hasError']),
        ...mapGetters('cart', ['getCart']),
        currentLanguage() {
            return this.$i18n.locale === 'ua' ? 'Українська' : 'English'
        },
        getLangFlag() {
            return this.$i18n.locale === 'ua'
                ? 'https://www.freepnglogos.com/uploads/ukraine-flag-png/circle-flag-of-ukraine-png-download-0.png'
                : 'https://banner2.cleanpng.com/20180330/zwe/kisspng-england-flag-of-the-united-kingdom-flag-of-great-b-france-5abde290a65fd8.2730033515223937446815.jpg'
        },
        getCartCount() {
            return this.getCart.reduce((prev, el) => prev + el.count, 0)
        },
    },
    created() {
               this.$i18n.locale = JSON.parse(localStorage.getItem('lastLocale')) ?? process.env.VUE_APP_I18N_LOCALE

        const self = this
        window.addEventListener('storage', function () {
            if (self.$i18n.locale !== localStorage.getItem('lastLocale')) {
                self.$i18n.locale = localStorage.getItem('lastLocale')
                self.$router.go()
            }
        })
    },

    updated() {
         if (this.getCart.length) {
            const cartItems = JSON.stringify(this.getCart)
            localStorage.setItem('cart', cartItems)
        } else localStorage.removeItem('cart')
    },

    methods: {
        ...mapActions('auth', ['loginWithGoogle', 'logout']),
        changeLocale() {
            this.$i18n.locale === 'en' ? (this.$i18n.locale = 'ua') : (this.$i18n.locale = 'en')
            localStorage.setItem('lastLocale', JSON.stringify(this.$i18n.locale))
        },
        async onLogin() {
            try {
                await this.loginWithGoogle()
                this.$router.push({
                    name: 'products',
                })
            } catch (error) {
                alert(error.message)
            }
        },
        onCartIconAction() {
            this.$router.push({
                name: 'cart',
            })
        },
        onLogout() {
            this.logout()
            this.$router.push({
                name: 'login',
            })
        },
    },
}
</script>

<style lang="scss">
.container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 100px;

    & > nav {
        padding: 30px;
        display: flex;
        align-items: center;
        gap: 20px;

        a {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }
    & .app-wrapper {
        width: 1400px;
        margin: 0 auto;

        & .header {
            display: flex;
            align-items: center;
            justify-content: right;
            gap: 20px;
            & .lang-container {
                display: flex;
                align-items: center;
                gap: 10px;
                cursor: pointer;
                & > img {
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                }
            }
            & .user-info {
                & .user-container {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                & .get-user {
                    display: flex;
                    align-items: center;
                    flex-direction: column;

                    & .img-container {
                        & > img {
                            width: 40px;
                            height: 40px;
                            border-radius: 50%;
                        }
                    }
                    & > span {
                        font-size: 14px;
                        font-weight: 600;
                    }
                }
            }

            & .cart-container {
                margin-left: 20px;
                position: relative;
                & .cart {
                    cursor: pointer;
                }

                & .cart-counter {
                    position: absolute;
                    top: 0;
                    left: 40px;
                    z-index: 3;
                    background-color: orange;
                    color: #fff;
                    border-radius: 50%;
                    padding: 0px 6px;
                }
            }
        }
    }
}

.router-view {
    margin-top: 20px;
}

button:hover {
    background-color: #2c3e50;
    color: #fff;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* text-align: center; */
    color: #2c3e50;
}
</style>
