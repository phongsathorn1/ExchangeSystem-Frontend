<template>
  <b-container id="home">
    <b-row>
      <search></search>
    </b-row>
    <b-row>
      <product-item
      v-for="product in products"
      :product=product
      :key="product.id">
      </product-item>
    </b-row>
  </b-container>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
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
      products: [
        {
          'id': 1,
          'title': 'ชื่อสินค้า',
          'wantItem': 'อยากได้..',
          'quatity': '2',
          'images': [
            'https://www.q7s.co.uk/wp-content/uploads/2016/12/61ZVE9AXWpL._SL1000_.jpg'
          ]
        },
        {
          'id': 1,
          'title': 'ชื่อสินค้า',
          'wantItem': 'อยากได้..',
          'quatity': '2',
          'images': [
            'https://www.q7s.co.uk/wp-content/uploads/2016/12/61ZVE9AXWpL._SL1000_.jpg'
          ]
        },
        {
          'id': 1,
          'title': 'ชื่อสินค้า',
          'wantItem': 'อยากได้..',
          'quatity': '2',
          'images': [
            'https://www.q7s.co.uk/wp-content/uploads/2016/12/61ZVE9AXWpL._SL1000_.jpg'
          ]
        },
        {
          'id': 1,
          'title': 'ชื่อสินค้า',
          'wantItem': 'อยากได้..',
          'quatity': '2',
          'images': [
            'https://www.q7s.co.uk/wp-content/uploads/2016/12/61ZVE9AXWpL._SL1000_.jpg'
          ]
        }
      ]
    }
  }
}
</script>

<style lang="scss">
#home{
  margin-top: 30px;
}
</style>