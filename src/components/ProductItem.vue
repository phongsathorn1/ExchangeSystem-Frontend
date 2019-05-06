<template>
  <router-link
    :to="{name: 'product', params: {id: product.id}}"
    class="col-md-4 col-lg-3 wrapper-product-item"
  >
    <div class="product-item">
      <div class="product-image">
        <!-- <img :src=product.images[0]> -->
        <img :src="product.product_picture[0].picture_path" v-if="product.product_picture[0]">
        <img src="https://via.placeholder.com/300" v-else>
      </div>
      <div class="product-detail">
        <a href="javascript:void(0)" class="product-title">
          <h3>{{product.name}}</h3>
        </a>
        <span>สิ่งที่ต้องการ</span>
        {{product.want_product}}
        <br>
        <span>จำนวนที่มี</span>
        {{product.quantity}}
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "product-item",
  props: ["product"]
};
</script>

<style lang="scss" scoped>
.product-item {
  padding: 30px;
}

.product-item .product-image {
  margin-bottom: 20px;
  height: 200px;
  text-align: center;
  vertical-align: middle;
  display: table-cell;
}

.product-item .product-image img {
  max-height: 100%;
  max-width: auto;
}

a.wrapper-product-item {
  text-decoration: none;
  color: #000000;
}

.product-item img {
  width: 100%;
}

.product-item .product-title h3 {
  font-size: 1.2em;
  font-weight: 600;
}

.wrapper-product-item {
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  background: #ffffff;
  position: relative;
}

.wrapper-product-item:hover {
  box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.27);
  transform: scale(1.02, 1.02);
  z-index: 99;
}
</style>
