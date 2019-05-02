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
        <b-row>
          <product-item
          v-for="product in products.lists"
          :product=product
          :key="product.id">
          </product-item>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import ProductItem from '@/components/ProductItem.vue'
import Search from '@/components/Search.vue'

export default {
  name: 'home',
  components: {
    ProductItem,
    Search
  },
  data: () => {
    return {
      products: {
        next: null,
        previous: null,
        lists: []
      },
      
    }
  },
  created(){
    this.getProducts()
  },
  methods: {
    async getProducts(){
      let response = await this.$axios.get('/product/')
      this.products.lists = response.data.results
      this.products.next = response.data.next
      this.products.previous = response.data.previous

      console.log(response.data)
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/custom.scss";
</style>