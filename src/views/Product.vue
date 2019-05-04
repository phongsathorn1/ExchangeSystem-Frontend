<template>
  <div id="home">
    <div class="header">
      <b-container>
        <b-row>
          <search></search>
        </b-row>
      </b-container>
    </div>
    <div class="wrapper-container">
      <b-container>
        <!-- {{ route.params.id }} -->
        <product-overview
          :title="product.name"
          :category="product.category"
          :quantity="product.quantity"
          :detail="product.detail"
          :wantItem="product.want_product"
          :images="product.product_picture"
          :owner="product.owner"
        ></product-overview>
      </b-container>
    </div>
  </div>
</template>

<script>
import ProductItem from "@/components/ProductItem.vue";
import Search from "@/components/Search.vue";
import ProductOverview from "@/components/ProductOverview.vue";

export default {
  props: ['id'],
  name: "product",
  components: {
    ProductItem,
    Search,
    ProductOverview
  },
  data: () => {
    return {
      product: {
        category: {
          id: '',
          name: ''
        },
        detail: '',
        id: '',
        name: '',
        owner: null,
        quantity: '',
        url: '',
        wantItem: '',
        product_picture: []
      }
    };
  },
  mounted(){
    this.getProduct()
  },
  methods: {
    async getProduct() {
      try {
        let response = await this.$axios.get(`/product/${this.$route.params.id}/`)
        this.product = response.data
        console.log(response.data)
      } catch(error) {
        console.log(error)
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/custom.scss";

.product-detail {
  padding: 20px 0;
}

.product-detail h1 {
  color: $primary-color !important;
  font-size: 2em;
}

.product-detail .product-image img {
  width: 100%;
}
</style>
