<template>
    <div class="container-m">
        <div class="row">
            <div class="col-lg-6 col-sm-6">
                <div class="">
                    <v-otp-input
                    v-model="otp"
                    :disabled="loading"
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
      snackbar: false,
      snackbarColor: 'default',
      otp: '',
      text: '',
      expectedOtp: '133707',
    }),
    methods: {
        onFinish (rsp) {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.snackbarColor = (rsp === this.expectedOtp) ? 'success' : 'warning'
          this.text = `Processed OTP with "${rsp}" (${this.snackbarColor})`
          this.snackbar = true
        }, 3500)
        if (!this.opt) {
                alert('Enter code')
            } 
            else {
                const REQUEST_DATA = new FormData()
                REQUEST_DATA.append('verification_code', this.opt)
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
                    console.log(res.data.data)
                    this.$router.push('/');
                    this.$cookie.set('cookie-1', res.data.data.code, {
                        path: '/',
                        maxAge: 60 * 60 * 24 * 7
                    });
                })
                .catch(() => {
                })
      }
        },
        resend(){
                const REQUEST_DATA = new FormData()
                REQUEST_DATA.append('phone', this.user.phone)
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
                    this.$router.push('/home');
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