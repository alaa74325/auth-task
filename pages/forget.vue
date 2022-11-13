<template>
    <div class="container-m register">
        <div class="row">
            <div class="col-lg-6 col-sm-12">
                <h3>Reset</h3>
                <form @submit.prevent="onsubmit">
                    <div>
                        <input type="text" placeholder="Enter Phone" v-model="user.phone"/>
                    </div>
                    <input type="submit" value="Send"/>
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
                phone:null,
                password:null
            }
        }
    },
    methods:{
        onsubmit(){
             if (!this.user.phone) {
                alert('Enter Your Phone')
            } 
            else {
                const REQUEST_DATA = new FormData()
                REQUEST_DATA.append('phone', this.user.phone)
                this.$cookies.set('cookie-phone', this.user.phone)
                REQUEST_DATA.append('device_type','ios')
                REQUEST_DATA.append('device_token', 'asdasdasdasdasda')
                this.$axios({
                method: 'POST',
                url: 'auth/password/forget',
                headers: {
                    Authorization: `Bearer`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json', 
                    'lang': 'ar'
                },
                data: REQUEST_DATA
                })
                .then((res) =>{ 
                    this.$router.push(`verfiy/verify_contact_data`);
                    this.$cookies.set('cookie-code', res.data.code);
                })
                .catch(() => {
                })
            }
        },
    },
    mounted(){
    }
}
</script>