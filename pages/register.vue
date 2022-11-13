<template>
    <div class="container-m register">
        <div class="row">
            <div class="col-lg-6 col-sm-12">
                <h3>Sign Up</h3>
                <form @submit.prevent="onsubmit">
                    <div>
                        <input type="text" placeholder="Enter Full Name" v-model="user.fullname"/>
                    </div>
                    <div>
                        <input type="text" placeholder="Enter User Name" v-model="user.username"/>
                    </div>
                    <div>
                        <input type="text" placeholder="Enter E-mail" v-model="user.email"/>
                    </div>
                    <div>
                        <input type="text" placeholder="Enter Phone" v-model="user.phone"/>
                    </div>
                    <div>
                        <input type="password" placeholder="Enter Password" v-model="user.password"/>
                        <i class="lab la-accessible-icon"></i>
                    </div>
                    <div>
                        <input type="password" placeholder="Enter password confirm" v-model="user.password_confirm"/>
                        <i class="lab la-accessible-icon"></i>
                    </div>
                    <input type="submit" value="Sign Up"/>
                </form>
                <p>Are your Have an Account,already?<router-link to="login">Sign In</router-link></p>
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
                fullname:'',
                username:'',
                phone:null,
                password:null,
                password_confirm:null,
                email:null,
            }
        }
    },
    methods:{
        onsubmit(){
            if (!this.user.fullname) {
                alert('Enter Your Full Name')
            } else if (!this.user.username) {
                alert('Enter Your User Name')
            }else if (!this.user.email) {
                alert('Enter Your E-Mail')
            }  else if (!this.user.phone) {
                alert('Enter Your Phone')
            }else if (!this.user.password){
                alert('Enter Your Password ')
            } else if(!this.user.password_confirm) {
                alert('Enter your Confirm password')
            } else if (this.user.password.length < 6) {
                alert('your Password is too short')
            } else if (this.user.password_confirm !== this.user.password) {
                alert("Your Confirm Password isn't correct")
            } 
            else {
                const REQUEST_DATA = new FormData()
                REQUEST_DATA.append('full_name', this.user.fullname)
                REQUEST_DATA.append('user_name', this.user.username)
                REQUEST_DATA.append('phone', this.user.phone)
                REQUEST_DATA.append('email', this.user.email)
                REQUEST_DATA.append('password', this.user.password)
                REQUEST_DATA.append('password_confirmation', this.user.password_confirm)
                REQUEST_DATA.append('device_type','ios')
                REQUEST_DATA.append('device_token', 'asdasdasdasdasda')
                this.$axios({
                method: 'POST',
                url: 'auth/register',
                headers: {
                    Authorization: `Bearer`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json', 
                    'lang': 'ar'
                },
                data: REQUEST_DATA
                })
                .then((res) =>{ 
                    this.$router.push(`/verfiy/verify_create_account`);
                    const options = {
                        path: '/',
                        maxAge: 60 * 60 * 24 * 7
                    }
                    const cookieList = [
                        { name: 'cookie-phone', value: res.data.data.phone, opts: options },
                        { name: 'cookie-code', value: res.data.data.code, opts: options },
                    ]
                    this.$cookies.setAll(cookieList);
                    console.log(res.data.data.code);
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