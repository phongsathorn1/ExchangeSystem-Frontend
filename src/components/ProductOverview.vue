<template>
  <div class="product-overview">
    <b-row>
      <b-col md="5">
        <div class="product-images-wrapper">
          <template v-if="images.length > 0">
            <img :src="images[0].picture_path">
          </template>
        </div>
      </b-col>
      <b-col md="7">
        <h1>{{ title }}</h1>
        <div class="product-meta">
          <b-row>
            <b-col cols="12" class="product-owner">
              <b>สร้างโดย</b> {{ fullName }}
            </b-col>
          </b-row>
          <b-row>
            <div class="product-status">
              <span class="product-ready product-status-flag">พร้อมให้ยื่นข้อเสนอ</span>
            </div>
          </b-row>
          <b-row>
            <b-col sm="6">
              <b>หมวดหมู่</b>
              ​ {{ category.name }}
            </b-col>
            <b-col sm="6">
              <b>จำนวนที่มี</b>
              ​ {{ quantity }}
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b>สิ่งที่อยากได้</b>
              {{ wantItem }}
            </b-col>
          </b-row>
          <div class="product-control">
            <b-button :to="`/create-offer/${id}`" variant="success">ยื่นข้อเสนอ</b-button>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="12">
        <div class="product-detail">
          <h3>คำอธิบายของสินค้า</h3>
          <div class="product-detail-text" v-html="detail"></div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "product-overview",
  props: [
    "id",
    "title",
    "category",
    "quantity",
    "wantItem",
    "detail",
    "images",
    "owner"
  ],
  computed: {
    fullName() {
      if (this.owner) {
        return this.owner.first_name + " " + this.owner.last_name;
      }
      return "";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/custom.scss";

.product-overview {
  margin: 20px 0;
}

.product-overview .product-meta {
  font-size: 1.2em;
}

.product-overview .product-detail {
  border: 1px solid #e0e0e0;
  padding: 30px;
  margin: 30px 0;
}

.product-overview .product-detail h3 {
  color: $primary-color;
}

.product-status-flag {
  padding: 5px 15px;
  background: #e0e0e0;
  display: block;
  border-radius: 10px;
  margin: 5px 10px;
  margin-bottom: 10px;
  font-weight: 600;
}

.product-ready {
  background: #aaf7cc;
}

.product-detail-text {
  font-family: Helvetica, Arial, sans-serif;
}

.product-images-wrapper img {
  max-width: 100%;
  max-height: 100%;
}

.product-control {
  padding: 20px 0;
}

.product-control .btn{
  margin: 0;
}

.product-owner b{
  font-weight: 600;
}

.product-owner {
  margin-bottom: 15px;
}
</style>

<style lang="scss">
.product-detail .product-detail-text p {
  margin-bottom: 0.5rem;
}
</style>