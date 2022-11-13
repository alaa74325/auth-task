<template>
    <div class="container-m register">
        <div class="row">
            <div class="col-lg-6 col-sm-12">
                <h3>Sign In</h3>
                <form @submit.prevent="onsubmit">
                    <div>
                        <input type="text" placeholder="Enter Phone" v-model="user.phone"/>
                    </div>
                    <div>
                        <input type="password" placeholder="Enter Password" v-model="user.password"/>
                        <i class="lab la-accessible-icon"></i>
                    </div>
                    <p><router-link to="forget">Forget Password?</router-link></p>
                    <input type="submit" value="Sign In"/>
                </form>
                <p>Are you need to <router-link to="register">Sign Up </router-link>?</p>
            </div>
            <div class="col-lg-6 col-sm-12 img-login">
                <img src="../assets/login.jpg"/>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
.register{
    margin: 100px auto 0;
    h3{
        text-align: center;
    }
    form{
        margin: 60px 0 0;
        div{
            width: 100%;
            line-height: 40px;
            border-radius: 8px;
            border:1px solid rgb(221, 219, 219);
            margin: 10px 0;
            padding: 5px;
            input{
                width: 100%;
                border:0;
                outline: 0;
                &::placeholder{
                    color:inherit;
                    font-size: inherit;
                }
            }
        }
        input[type="submit"]{
            width: 98%;
            line-height: 40px;
            color:rgb(255, 230, 0);
            background: rgb(90, 3, 114);
            border: 0;
            margin: 10px 0;
            border-radius: 8px;
            padding: 8px 1%;
        }
    }
    p{
        text-align: center;
        a{
            text-decoration: none;
        }
    }
    .img-login{
        border-radius: 0 20px 20px 0;
        overflow: hidden;
        padding: 0;
        img{
            width: 100%;
        }
    }
}
</style>
<script>
export default {
    layout:'empty',
    data(){
        return{
            user:{
                phone:null,
                password:null
            },
            set:true
        }
    },
    methods:{
        onsubmit(){
             if (!this.user.phone) {
                alert('Enter Your Phone')
            }else if (!this.user.password){
                alert('Enter Your Password ')
            }  else if (this.user.password.length < 6) {
                alert('your Password is too short')
            }  
            else {
                const REQUEST_DATA = new FormData()
                REQUEST_DATA.append('email', this.user.phone)
                REQUEST_DATA.append('password', this.user.password)
                REQUEST_DATA.append('device_type','ios')
                REQUEST_DATA.append('device_token', 'asdasdasdasdasda')
                this.$axios({
                method: 'POST',
                url: 'auth/login',
                headers: {
                    Authorization: `Bearer`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json', 
                    'lang': 'ar'
                },
                data: REQUEST_DATA
                })
                .then((res) =>{ 
                    this.$router.push('/');
                    this.$cookies.set('cookie-token', res.data.data.token, {
                        path: '/',
                        maxAge: 60 * 60 * 24 * 7
                    });
                    const all=[{ name: 'cookie-fullname', value: res.data.data.full_name },
                        { name: 'cookie-token', value: res.data.data.email},
                        { name: 'cookie-phone', value: res.data.data.phone},
                        { name: 'cookie-username', value: res.data.data.user_name},
                        { name: 'cookie-email', value: res.data.data.email}];
                    this.$cookies.setAll(all);
                })
                .catch(() => {
                })
            }
        }
    }
}
</script>






/*import Vue from 'vue'

import AppButton from '@/components/UI/AppButton'
import AppControlInput from '@/components/UI/AppControlInput'
import PostList from '@/components/Posts/PostList'

Vue.component('AppButton', AppButton)
Vue.component('AppControlInput', AppControlInput)
Vue.component('PostList', PostList) */