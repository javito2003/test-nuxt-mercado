<template>
    <div class="container">
        <div class="text-center">
            <br>
            <h1 class="title">{{user.name}} {{user.username}}</h1>
            <hr>
            <img src="../../static/Untitled.jpeg" width="200" height="200">
            <br>
        </div>
    </div>
</template>


<script>
export default {
    middleware: "authenticated",
    data() {
        return {
            user: {}
        }
    },
    created(){
        this.getUser()
    },

    methods: {
        getUser() {
            this.user = this.$store.state.auth.userData
        }
    }
}
</script>