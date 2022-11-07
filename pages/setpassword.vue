<template>
    <div class="container-m register">
        <div class="row">
            <div class="col-lg-6 col-sm-12">
                <h3>Reset Password</h3>
                <form @submit.prevent="onsubmit">
                    <div>
                        <input type="password" placeholder="Enter Password" v-model="user.password"/>
                        <i class="lab la-accessible-icon"></i>
                    </div>
                    <div>
                        <input type="password" placeholder="Enter password confirm" v-model="user.password_confirm"/>
                        <i class="lab la-accessible-icon"></i>
                    </div>
                    <input type="submit" value="Reset"/>
                </form>
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
                password:null,
                password_confirm:null,
            }
        }
    },
    methods:{
        onsubmit(){
            if (!this.user.password){
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
                REQUEST_DATA.append('new_password', this.user.password)
                REQUEST_DATA.append('new_password_confirmation', this.user.password_confirm)
                this.$axios({
                method: 'POST',
                url: 'auth/password/reset',
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
                })
                .catch(() => {
                })
            }
        }
    }
}
</script>
