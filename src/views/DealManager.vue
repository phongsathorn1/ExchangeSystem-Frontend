<template>
  <div id="deal-manager">
    <div class="header">
      <b-container>
        <h1>จัดการข้อเสนอ</h1>
      </b-container>
    </div>
    <div class="wrapper-container">
      <b-container>
        <div class="deal-item-container" v-for="data in datas" :key="data.product.id">
          <div class="your-item-card">
            <b-row>
              <b-col cols="4">
                <div class="your-item-card-image">
                  <img src="https://via.placeholder.com/200">
                </div>
              </b-col>
              <b-col cols="8">
                <h3>{{ data.product.name }}</h3>
                <ul>
                  <li>หมวดหมู่: {{ data.product.category.name }}</li>
                  <li>จำนวน: {{ data.product.quantity }}</li>
                  <li>สิ่งที่อยากได้: {{ data.product.want_product }}</li>
                </ul>
              </b-col>
            </b-row>
          </div>
          <div class="get-offer-container">
            <h2>ข้อเสนอที่ได้รับ</h2>
            <div class="item-container">
              <div v-if="data.receive_deals.length <= 0">ไม่มีข้อเสนอที่ได้รับ</div>
              <div
                class="deal-item"
                v-else
                v-for="receive_deal in data.receive_deals"
                :key="receive_deal.id"
              >
                <b-row>
                  <b-col cols="9">
                    <div
                      class="deal-item-name"
                      v-for="deal_off in receive_deal.deal_offer"
                      :key="deal_off.id"
                    >{{ deal_off.offer_product.name }}</div>
                  </b-col>
                  <b-col cols="3">
                    <div class="deal-item-control">
                      <b-button>รับข้อเสนอ</b-button>
                    </div>
                  </b-col>
                </b-row>
              </div>
            </div>
          </div>

          <div class="get-offer-container">
            <h2>ข้อเสนอที่ยื่นไว้</h2>
            <div class="item-container">
              <div v-if="data.offer_deals.length <= 0">ไม่มีข้อเสนอที่ได้รับ</div>
              <div
                class="deal-item"
                v-else
                v-for="offer_deal in data.offer_deals"
                :key="offer_deal.id"
              >
                <b-row>
                  <b-col cols="9">
                    <div
                      class="deal-item-name"
                      v-for="deal_off in offer_deal.deal_offer"
                      :key="deal_off.id"
                    >{{ deal_off.offer_product.name }}</div>
                  </b-col>
                  <b-col cols="3">
                    <div class="deal-item-control">
                      <b-button>รับข้อเสนอ</b-button>
                    </div>
                  </b-col>
                </b-row>
              </div>
            </div>
          </div>
        </div>
      </b-container>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      datas: null
    };
  },
  mounted() {
    this.loadProduct();
  },
  created() {},
  methods: {
    async loadProduct() {
      let response = await this.$axios.get("/deal/");
      this.datas = response.data;
    }
  }
};
</script>

<style lang="scss">
.deal-item-container .your-item-card {
  background: #e0e0e0;
  padding: 20px;
}

.your-item-card-image {
  text-align: center;
}

.get-offer-container {
  margin: 30px 0px;
}

.item-container {
  background: #f5f5f5;
  padding: 10px 20px;
}

.deal-item-name {
  font-size: 1.2em;
  vertical-align: middle;
}
</style>
