<template>
  <div class="product-overview">
    <b-row>
      <b-col md="5"></b-col>
      <b-col md="7">
        <h1>{{ title }}</h1>
        <div class="product-meta">
          <b-row>
            <div class="product-status">
                <span class="product-ready product-status-flag">พร้อมให้ยื่นข้อเสนอ</span>
            </div>
          </b-row>
          <b-row>
            <b-col sm="6">
              <b>หมวดหมู่</b>
              ​ {{ category }}
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
  props: ["title", "category", "quantity", "wantItem", "detail"]
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

.product-ready{
    background: #aaf7cc;
}
</style>

<style lang="scss">
.product-detail .product-detail-text p {
  margin-bottom: 0.5rem;
}
</style>