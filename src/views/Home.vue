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
          v-for="product in products"
          :product=product
          :key="product.id">
          </product-item>
        </b-row>
      </b-container>
    </div>
  </div>
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
            'https://images-na.ssl-images-amazon.com/images/G/01/amazonglobal/images/Fuji/Dash/2019/January/mShoes_2X._CB455678051_SY520_.jpg'
          ]
        },
        {
          'id': 1,
          'title': 'ชื่อสินค้า',
          'wantItem': 'อยากได้..',
          'quatity': '2',
          'images': [
            'https://images-na.ssl-images-amazon.com/images/G/01/amazonglobal/images/Fuji/Dash/2019/January/W_Dresses_2X._CB455677607_SY520_.jpg'
          ]
        },
        {
          'id': 1,
          'title': 'ชื่อสินค้า',
          'wantItem': 'อยากได้..',
          'quatity': '2',
          'images': [
            'https://images-na.ssl-images-amazon.com/images/I/51I%2BteGzpCL._AC_SY400_.jpg'
          ]
        },
        {
          'id': 1,
          'title': 'ชื่อสินค้า',
          'wantItem': 'อยากได้..',
          'quatity': '2',
          'images': [
            'https://images-na.ssl-images-amazon.com/images/I/51Ox7m6-OIL._AC_SY400_.jpg'
          ]
        }
      ]
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/custom.scss";
// #home{
//   margin-top: 30px;
// }

.header{
  padding-bottom: 2em;
  background: $primary-color;
  margin-bottom: 30px;
  font-family: 'Athiti', sans-serif;
}

.wrapper-container{
  background: #ffffff;
  border-radius: 20px 20px 0px 0px;
  position: relative;
  bottom: 60px;
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>