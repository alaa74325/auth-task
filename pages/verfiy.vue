<template>
    <div class="container-m">
        <div class="row">
            <div class="col-lg-6 col-sm-6">
                <div class="">
                    <v-otp-input
                    v-model="otp"
                    :disabled="loading"
                    length="4"
                    @finish="onFinish"
                    ></v-otp-input>
                    <v-overlay absolute :value="loading">
                    <v-progress-circular
                        indeterminate
                        color="primary"
                    ></v-progress-circular>
                    </v-overlay>
                </div>
                <button class="resend" @click="resend">Resend</button>
                <button class="resend" @click="onFinish">Send</button>
            </div>
            <div class="col-lg-6 col-sm-6 img-login">
                <img src="../assets/login.jpg"/>
            </div>
        </div>
    </div>
  </template>
  <style scoped>
  .container-m {
    width: 90%;
    margin: 100px auto;
  }

 </style>
<script>
  export default {
    data: () => ({
      loading: false,
      otp: '',
    }),
    methods: {
        onFinish () {
        this.loading = true
        setTimeout(() => {
          this.loading = false
        }, 3500)
        if (!this.otp) {
            alert('Enter code')
        } 
        else {
            const cookiephone = this.$cookies.get('cookie-phone');
            const REQUEST_DATA = new FormData()
            REQUEST_DATA.append('verification_code', this.otp)
            REQUEST_DATA.append('phone', cookiephone)
            REQUEST_DATA.append('device_type','ios')
            REQUEST_DATA.append('device_token', 'asdasdasdasdasda')
            this.$axios({
            method: 'POST',
            url: 'auth/email/verify',
            headers: {
                Authorization: `Bearer`,
                Accept: 'application/json',
                'Content-Type': 'application/json', 
                'lang': 'ar'
            },
            data: REQUEST_DATA
            })
            .then((res) =>{ 
                this.$cookie.set('cookie-token', res.data.data.token, {
                    path: '/',
                    maxAge: 60 * 60 * 24 * 7
                });
                this.$router.push('/');
                console.log(res.data.data);
            })
            .catch(() => {
            })
      }
        },
        resend(){
                const cookiephone = this.$cookies.get('cookie-phone');
                const REQUEST_DATA = new FormData()
                REQUEST_DATA.append('phone',cookiephone)
                REQUEST_DATA.append('type', "reset_code")
                this.$axios({
                    method: 'POST',
                    url: 'auth/resend-code',
                    headers: {
                        Authorization: `Bearer`,
                        Accept: 'application/json',
                        'Content-Type': 'application/json', 
                        'lang': 'ar'
                    },
                    data: REQUEST_DATA
                })
                .then((res) =>{ 
                    console.log(res.data.data.code);
                    this.$cookie.set('cookie-1', res.data.data.code, {
                        path: '/',
                        maxAge: 60 * 60 * 24 * 7
                    });
                })
                .catch(() => {
                })
        }
    }
} 
</script>