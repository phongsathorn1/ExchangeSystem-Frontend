<template>
  <div id="home">
    <div class="header">
      <b-container>
        <search></search>
      </b-container>
    </div>
    <div class="wrapper-container">
      <b-container>
        <b-row>
          <product-item v-for="product in products.lists" :product="product" :key="product.id"></product-item>
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
      }
    }
  },
  mounted () {
    this.getProducts()
  },
  methods: {
    async getProducts () {
      let response
      if (Object.keys(this.$route.query).length !== 0) {
        response = await this.$axios.get('/product/', {
          params: {
            q: this.$route.query.q,
            category: this.$route.query.category
          }
        })
      } else {
        response = await this.$axios.get('/product/')
      }
      this.products.lists = response.data.results
      this.products.next = response.data.next
      this.products.previous = response.data.previous

      console.log(response.data)
    }
  },
  computed: {
    isHasQuery () {
      if (Object.keys(this.$route.query).length !== 0) {
        return true
      }
      return false
    }
  },
  watch: {
    isHasQuery () {
      console.log('change')
      this.getProducts()
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/custom.scss";
</style>
