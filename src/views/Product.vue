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
          <div class="product-detail">
            <b-row>
                <b-col md="5">
                    <div class="product-image">
                        <img :src="products.images[0]">
                    </div>
                </b-col>
                <b-col md="7">
                    <h1>{{ products.title }}</h1>
                    <div class="product-meta">
                        
                    </div>
                </b-col>
            </b-row>
          </div>
      </b-container>
    </div>
  </div>
</template>

<script>
import ProductItem from '@/components/ProductItem.vue'
import Search from '@/components/Search.vue'

export default {
  name: 'product',
  components: {
    ProductItem,
    Search
  },
  data: () => {
    return {
      products: {
          'id': 1,
          'title': 'ชื่อสินค้า',
          'wantItem': 'อยากได้..',
          'quatity': '2',
          'images': [
            'https://images-na.ssl-images-amazon.com/images/G/01/amazonglobal/images/Fuji/Dash/2019/January/mShoes_2X._CB455678051_SY520_.jpg'
          ]
        }
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/custom.scss";

.product-detail{
    padding: 20px 0;
}

.product-detail h1{
    color: $primary-color !important;
    font-size: 2em;
}

.product-detail .product-image img{
    width: 100%;
}

</style>
