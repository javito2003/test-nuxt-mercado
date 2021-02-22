<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-3"></div>
      <div class="col-sm-6">
        <div class="text-center">
          <h1>Edit the product</h1>
          <form @submit.prevent="editProduct(productEdit)">
            <label>Title of product</label>
            <input
              type="text"
              class="form-control my-2"
              v-model="productEdit.title"
            />
            <label>Price of product</label>
            <input
              type="text"
              class="form-control my-2"
              v-model="productEdit.price"
            />
            <label>Description of product</label>
            <input
              type="text"
              class="form-control my-2"
              v-model="productEdit.description"
            />
            <b-button type="submit" variant="success" class="btn-block my-3"
              >Edit Product</b-button
            >
          </form>
          <p>If you want back and cancel the edit <a href="/adminpanel">Click here!</a></p>
        </div>
      </div>
      <div class="col-sm-3"></div>
    </div>
  </div>
</template>


<script>
import swal from 'sweetalert'
export default {
    middleware: "authenticated",
    data(){
        return{
            id: this.$route.params.id,
            productEdit: {}
        }
    },
    methods:{
        editProduct(item){
            let config = {
                headers: {
                    token: this.$store.state.auth.token
                }
            }
            this.$axios.post(`/edit-product/${this.id}`,item,config)
            .then(res => {
                console.log(res);
                this.productEdit.title = ''
                this.productEdit.price = null
                this.productEdit.description = ''
                swal("Good job!", "You edited the product", "success");
            })
            .catch(error => {
                console.log(error.response)
            })
        }
    }
}
</script>

