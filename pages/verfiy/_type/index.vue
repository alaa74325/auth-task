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
                <img src="@/assets/login.jpg"/>
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
import { Console } from 'console';

  export default {
    data: () => ({
      loading: false,
      otp: '',
    }),
    methods: {
        onFinish () {
            const verification_type = this.$route.params.type;    

            this.loading = true
            setTimeout(() => {
            this.loading = false
            }, 3500)
            if (!this.otp) {
                alert('Enter code')
            } 
            else if(verification_type == "verify_contact_data"){
                const cookiephone = this.$cookies.get('cookie-phone');
                const REQUEST_DATA = new FormData()
                REQUEST_DATA.append('reset_code', this.otp)
                REQUEST_DATA.append('phone', cookiephone)
                REQUEST_DATA.append('email',cookiephone)
                this.$axios({
                    method: 'POST',
                    url: 'auth/check/code',
                    headers: {
                        Authorization: `Bearer`,
                        Accept: 'application/json',
                        'Content-Type': 'application/json', 
                        'lang': 'ar'
                    },
                    data: REQUEST_DATA,
                })
                .then(() =>{ 
                    this.$router.push('/setpassword');
                    console.log("hi");
                })
                .catch(() => {
                    console.log("hihihi");
                })
            }
            else if (verification_type == "verify_create_account"){
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
                        this.$cookies.set('cookie-token', res.data.data.token);
                        this.$router.push('/');
                    })
                    .catch(() => {
                        console.log("hihihi2222222")
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
                    this.$cookie.set('cookie-code', res.data.data.code, {
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