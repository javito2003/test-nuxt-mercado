<template>
    <div>
        <div class="container">
            <h1>Market</h1>
            <div class="row">
                <div class="card m-5" v-for="(item,index) in products" :key="index">
                    <img src="" alt="" style="100px" height="150px">
                    <h1>{{item.title}}</h1>
                    <p> ${{numberformat(item.price)}}</p>
                    <b-button :to="`/market/${item._id}`">See more...</b-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    middleware: "authenticated",
    data() {
        return {
            products: []
        }
    },
    created(){
        this.getProducts()
    },

    methods: {
        getProducts() {
            let config = {
                headers: {
                    token: this.$store.state.auth.token
                }
            }
            this.$axios.post('/products',null,config)
            .then(res => {
                this.products = res.data.products
            })
            .catch(err => {
                console.log(err.response);
            })
        },
        numberformat(num){
            return new Intl.NumberFormat("de-DE").format(num)
        }
    }
}
</script>


<style>
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 300px;
  margin: auto;
  text-align: center;
  font-family: arial;
}

.price {
  color: grey;
  font-size: 22px;
}

#btn-see {
  border: none;
  outline: 0;
  padding: 12px;
  color: white;
  background-color: #000;
  text-align: center;
  cursor: pointer;
  width: 100%;
  font-size: 18px;
}

#bnt-see:hover {
  opacity: 0.7;
  background-color: white;
  color: black;
  border: 1px solid;
}
</style>
