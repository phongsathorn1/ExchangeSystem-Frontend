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
                  <img
                    :src="data.product.product_picture[0].picture_path"
                    v-if="data.product.product_picture.length > 0"
                  >
                  <img src="https://via.placeholder.com/200" v-else>
                </div>
              </b-col>
              <b-col cols="8">
                <router-link :to="{name: 'product', params: {id: data.product.id}}">
                  <h3>{{ data.product.name }}</h3>
                </router-link>
                <ul class="product-detail-list">
                  <li>
                    <b>หมวดหมู่</b>
                    {{ data.product.category.name }}
                  </li>
                  <li>
                    <b>จำนวน</b>
                    {{ data.product.quantity }}
                  </li>
                  <li>
                    <b>สิ่งที่อยากได้</b>
                    {{ data.product.want_product }}
                  </li>
                </ul>
              </b-col>
            </b-row>
          </div>
          <div class="get-offer-container">
            <h2>ข้อเสนอที่ได้รับ</h2>
            <div class="item-container">
              <div v-if="data.receive_deals.length <= 0" class="no-item">ไม่มีข้อเสนอที่ได้รับ</div>
              <div
                class="deal-item"
                v-else
                v-for="receive_deal in data.receive_deals"
                :key="receive_deal.id"
              >
                <b-row>
                  <b-col cols="8">
                    <ul class="deal-item-list">
                      <li
                        class="deal-item-name"
                        v-for="deal_off in receive_deal.deal_offer"
                        :key="deal_off.id"
                      >
                        <router-link
                          :to="{name: 'product', params: {id: deal_off.offer_product.id}}"
                        >
                          <span>{{ deal_off.offer_product.name }}</span>
                        </router-link>
                        <span class="sub-item-name">(จำนวน {{ deal_off.quantity }})</span>
                      </li>
                    </ul>
                  </b-col>
                  <b-col cols="4">
                    <div class="deal-item-control">
                      <b-button
                        variant="success"
                        @click="ownerAccept(receive_deal)"
                        v-if="receive_deal.owner_accept == null"
                      >รับข้อเสนอ</b-button>

                      <waiting-status
                        v-if="receive_deal.owner_accept && receive_deal.offerer_accept == null"
                      >กำลังรอให้ผู้ยื่นข้อเสนอทำการตอบรับ</waiting-status>

                      <template v-if="receive_deal.owner_accept && receive_deal.offerer_accept">
                        <b-button
                          @click="setScoreForm(receive_deal.id)"
                          v-b-modal.score-box
                        >ให้คะแนนการแลกเปลี่ยนครั้งนี้</b-button>

                        <!-- receive-modal -->
                        <!-- <b-modal
                          id="score-box"
                          v-model="modalShow"
                          title="ให้คะแนนสำหรับการแลกเปลี่ยนในครั้งนี้"
                          @ok="handleOk(receive_deal.id)"
                        >
                          <template slot="default">
                            <p class="my-4">คะแนนที่คุณอยากจะให้ (เต็ม 5 คะแนน)</p>
                            <star-rating
                              :max-rating="5"
                              :increment="1"
                              :show-rating="false"
                              v-model="scoreForm.score"
                            ></star-rating>
                          </template>

                          <template slot="modal-footer" slot-scope="{ ok, cancel }">
                            <b-button size="sm" @click="cancel()">ยกเลิก</b-button>
                            <b-button size="sm" variant="primary" :disabled="!scoreForm.score" @click="ok()">ให้คะแนน</b-button>
                          </template>
                        </b-modal>-->
                        <!-- end receive-modal -->
                      </template>
                    </div>
                  </b-col>
                </b-row>
              </div>
            </div>
          </div>

          <div class="get-offer-container">
            <h2>ข้อเสนอที่ยื่นไว้</h2>
            <div class="item-container">
              <div v-if="data.offer_deals.length <= 0" class="no-item">ไม่มีข้อเสนอที่ได้ยื่นไว้</div>
              <div
                class="deal-item"
                v-else
                v-for="offer_deal in data.offer_deals"
                :key="offer_deal.id"
              >
                <b-row>
                  <b-col cols="8">
                    <ul class="deal-item-list">
                      <li class="deal-item-name">
                        <router-link :to="{name: 'product', params: {id: offer_deal.product.id}}">
                          <span>{{ offer_deal.product.name }}</span>
                        </router-link>
                      </li>
                    </ul>
                  </b-col>
                  <b-col cols="4">
                    <div class="deal-item-control">
                      <waiting-status
                        v-if="offer_deal.owner_accept == null"
                      >กำลังรอให้ผู้สร้างข้อเสนอตอบรับข้อเสนอ</waiting-status>

                      <div
                        class="submiting-status"
                        v-if="offer_deal.owner_accept && offer_deal.offerer_accept == null"
                      >
                        <span>ผู้สร้างข้อเสนอตอบรับข้อเสนอนี้แล้ว</span>
                        <b-button
                          variant="success"
                          @click="ownerAccept(offer_deal)"
                        >ยืนยันรับข้อเสนอ</b-button>
                      </div>

                      <template v-if="offer_deal.owner_accept && offer_deal.offerer_accept">
                        <b-button @click="setScoreForm(offer_deal.id)" v-b-modal.score-box>ให้คะแนนการแลกเปลี่ยนครั้งนี้</b-button>
                      </template>
                    </div>
                  </b-col>
                </b-row>
              </div>
            </div>
          </div>
        </div>
        <!-- receive-modal -->
        <score-modal v-model="scoreForm" @ok="handleOk"></score-modal>
        <!-- end receive-modal -->
      </b-container>
    </div>
  </div>
</template>

<script>
import WaitingStatus from "@/components/WaitingStatus.vue";
import StarRating from "vue-star-rating";
import ScoreModal from "@/components/ScoreModal.vue";

export default {
  components: {
    WaitingStatus,
    StarRating,
    ScoreModal
  },
  data() {
    return {
      datas: null,
      polling: null,
      scoreForm: {
        dealId: null,
        score: null
      },
      modalShow: false
    };
  },
  mounted() {
    this.loadProduct();
  },
  created() {
    this.polling = setInterval(this.loadProduct, 10000);
  },
  beforeDestroy() {
    clearInterval(this.polling);
  },
  methods: {
    async loadProduct() {
      let response = await this.$axios.get("/deal/");
      this.datas = response.data;
    },
    async ownerAccept(deal) {
      let response = await this.$axios.post(`deal/accept/${deal.id}`);

      if (this.findDealIndexInOffersDeal(deal) != null) {
        let index = this.findDealIndexInOffersDeal(deal);
        console.log(index);
        this.datas[index[0]].offer_deals[index[1]].offerer_accept =
          response.data.offerer_accept;
        this.datas[index[0]].offer_deals[index[1]].owner_accept =
          response.data.owner_accept;
      } else if (this.findDealIndexInRecievesDeal(deal) != null) {
        let index = this.findDealIndexInRecievesDeal(deal);
        console.log(index);
        this.datas[index[0]].receive_deals[index[1]].offerer_accept =
          response.data.offerer_accept;
        this.datas[index[0]].receive_deals[index[1]].owner_accept =
          response.data.owner_accept;
      } else {
        console.log("not find");
      }
    },

    findDealIndexInOffersDeal(deal) {
      for (let i = 0; i < this.datas.length; i++) {
        console.log(this.datas[i]);
        for (let j = 0; j < this.datas[i].offer_deals.length; j++) {
          console.log(this.datas[i].offer_deals[j].id);
          if (this.datas[i].offer_deals[j].id == deal.id) {
            return [i, j];
          }
        }
      }
      return null;
    },
    findDealIndexInRecievesDeal(deal) {
      for (let i = 0; i < this.datas.length; i++) {
        console.log(this.datas[i]);
        for (let j = 0; j < this.datas[i].receive_deals.length; j++) {
          console.log(this.datas[i].receive_deals[j].id);
          if (this.datas[i].receive_deals[j].id == deal.id) {
            return [i, j];
          }
        }
      }
      return null;
    },

    setScoreForm(dealId) {
      this.scoreForm.dealId = dealId;
    },

    async handleOk(deal) {
      let response = await this.$axios.post(`deal/${deal.dealId}/score/`, {
        score: this.scoreForm.score
      });
      console.log(response);
    }
  },
  watch: {
    modalShow() {
      if (!this.modalShow) {
        this.scoreForm.dealId = null;
        this.scoreForm.score = null;
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/custom.scss";

.deal-item-container {
  margin: 30px 0px;
  padding: 30px;
  box-shadow: 0px 1px 5px rgba($color: #000000, $alpha: 0.3);
  border-radius: 3px;
}

.deal-item-container .your-item-card {
  background: #ffffff;
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
}

.your-item-card-image {
  text-align: center;
}

.your-item-card-image img {
  max-width: 100%;
  max-height: 100%;
}

.your-item-card h3 {
  font-size: 1.9em;
  color: $primary-color;
}

.get-offer-container {
  margin: 30px 0px;
}

.deal-item-list .deal-item-name {
  font-size: 1.2em;
  vertical-align: middle;
  font-weight: 500;
}

.deal-item-list .deal-item-name a {
  color: #000000;
}

.item-container .deal-item {
  border: 1px solid #e0e0e0;
  padding: 20px 15px;
  border-radius: 5px;
  margin-bottom: 10px;
}

.deal-item-container h2 {
  color: $primary-color;
  font-size: 1.5em;
}

.deal-item-list {
  margin: 0px;
  list-style: none;
  padding-left: 25px;
}

.deal-item-list li::before {
  content: "\2022";
  color: $primary-light-color;
  font-weight: bold;
  display: inline-block;
  width: 1em;
  margin-left: -1em;
}

.deal-item-control {
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: flex-end;
}

.no-item {
  text-align: center;
  color: #696969;
  padding: 10px 0;
}

.sub-item-name {
  font-size: 0.9em;
  font-weight: 500;
  color: #824671;
  margin-left: 15px;
}

.your-item-card .product-detail-list {
  padding-left: 25px;
  font-size: 1.1em;
}

.waiting-status {
  display: flex;
  align-items: center;
}

.waiting-status .waiting-msg {
  margin-left: 15px;
}
</style>
