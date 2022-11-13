<template>
  <div>
    Home
    <div>
      <router-link to="details">My Profile</router-link>
      <button @click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  methods:{
    logout(){
      const options={
                        path: '/',
                        maxAge: 60 * 60 * 24 * 7
                    };
      const cookiet = this.$cookies.get('cookie-token',options);
      this.$axios({
        method:"POST",
        url:'auth/logout',
        headers: {
                    Authorization: `Bearer${cookiet}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json', 
                    'lang': 'ar'
        },
      })
      .then(()=>{
        this.$cookies.removeAll();
        this.$router.push('/login');
        console.log("you are logout")
      })
    }
  }
}
</script>
