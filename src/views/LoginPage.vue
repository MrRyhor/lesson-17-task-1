<template>
    <div class="login">
        <div>
            <h2>{{ $t('messages.enterMessage') }}</h2>
        </div>
        <v-btn prepend-icon="mdi-account-circle" @click="onLogin">{{ $t('actionTitles.login') }}</v-btn>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    name: 'LoginPage',

    methods: {
        ...mapActions('auth', ['loginWithGoogle']),
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
    },
}
</script>
<style lang="scss" scoped>
    .login{        
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 20px;
    }
</style>
