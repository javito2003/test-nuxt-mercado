<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-1">
        <div class="mt-5 text-center"></div>
      </div>
      <div class="col-sm-10">
        <div class="text-center">
          <h1>Products = {{ products.length }}</h1>
          <p>
            Yout want create a product
            <a href="/adminpanel/createproduct">Click here</a>
          </p>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">Title</th>
                <th scope="col">Price</th>
                <th scope="col">Options</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in products" :key="index">
                <th scope="row">{{ item._id }}</th>
                <td>{{ item.title }}</td>
                <td>{{ item.price }}</td>
                <td>
                  <b-button
                    class="btn-sm mx-2"
                    variant="warning"
                    :to="`/adminpanel/${item._id}`"
                  >
                    Edit
                  </b-button>
                  <b-button
                    class="btn-sm mx-2"
                    variant="danger"
                    @click="deleteProduct(item._id)"
                  >
                    Delete
                  </b-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-sm-1"></div>
    </div>
  </div>
</template>

<script>
import swal from "sweetalert";
export default {
  middleware: "authenticated",
  data() {
    return {
      products: [],
    };
  },
  created() {
    this.getProducts();
  },

  methods: {
    getProducts() {
      let config = {
        headers: {
          token: this.$store.state.auth.token,
        },
      };
      this.$axios
        .post("/products", null, config)
        .then((res) => {
          this.products = res.data.products;
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    deleteProduct(id) {
      swal({
        title: "Are you sure?",
        text:
          "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
            let config = {
              headers: {
                token: this.$store.state.auth.token,
              },
            };
            this.$axios
              .post(`/delete-product/${id}`, null, config)
              .then((res) => {
                const index = this.products.findIndex(
                  (item) => item._id === res.data._id
                );
                this.products.splice(index, 1);
                this.getProducts();
              })
              .catch((error) => {
                error.response;
              });
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your product is safe");
        }
      });
    },
  },
};
</script>