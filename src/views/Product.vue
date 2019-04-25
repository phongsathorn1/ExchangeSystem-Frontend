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
        <product-overview
          :title="product.title"
          :category="product.category"
          :quantity="product.quantity"
          :detail="product.detail"
          :wantItem="product.wantItem"
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
  name: "product",
  components: {
    ProductItem,
    Search,
    ProductOverview
  },
  data: () => {
    return {
      product: {
        id: 1,
        title: "ชื่อสินค้า",
        wantItem: "อยากได้..",
        quantity: "2",
        category: "รูปภาพ",
        detail:
          "เยนโปรดิวเซอร์ ไฟลต์มินท์ เซอร์ไพรส์อีสเตอร์อีสเตอร์ ม็อบ เที่ยงวันซินโดรมหล่อฮังก้วยติวเพทนาการ เมคอัพพาสเจอร์ไรส์เดอะวีเจไฮไลต์ เซาท์ความหมาย พฤหัสสตรอว์เบอร์รีถูกต้องไฮกุโซลาร์ เพียวแพ็คแซวมอยส์เจอไรเซอร์ไฮเอนด์ กีวีเคลมมาร์จินแม่ค้าเต๊ะ ฮอตพ่อค้า โดนัทสเตริโอวิภัชภาคนอร์ท ทัวร์นาเมนท์อิ่มแปร้ไดเอ็ตวิดีโอ วอล์กอัลบั้ม วาซาบิ ไคลแมกซ์",
        images: [
          "https://images-na.ssl-images-amazon.com/images/G/01/amazonglobal/images/Fuji/Dash/2019/January/mShoes_2X._CB455678051_SY520_.jpg"
        ]
      }
    };
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
