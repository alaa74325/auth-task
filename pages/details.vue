<template>
    <div>
        <h1>Hi {{fullname}}</h1>
        <p>UserName: {{username}}</p>
        <p>Phone: {{phone}}</p>
        <p>Email: {{email}}</p>
    </div>
</template>
<script>
export default {
    data(){
        return{
            fullname:this.$cookies.get("cookie-fullname"),
            username:this.$cookies.get("cookie-username"),
            phone:this.$cookies.get("cookie-phone"),
            email:this.$cookies.get("cookie-email")
        }
    }
}
</script>