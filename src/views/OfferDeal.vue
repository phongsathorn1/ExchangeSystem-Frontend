<template>
  <div id="deal-offer">
    <div class="header">
      <b-container>
        <h1>ยื่นข้อเสนอ</h1>
      </b-container>
    </div>
    <div class="wrapper-container" v-if="product">
      <b-container>
        <b-row>
          <b-col md="6">
            <div class="item-wrapper">
              <div class="item-images">
                <img
                  :src="product.product_picture[0].picture_path"
                  v-if="product.product_picture.length > 0"
                >
                <img src="https://via.placeholder.com/350" v-else>
              </div>
              <div class="inner-item-wrapper">
                <div class="item-title">
                  <h2>{{ product.name }}</h2>
                </div>
                <div class="item-detail-container">
                  <ul class="item-detail-list">
                    <li>
                      <b>โดย</b>
                      {{ fullname }}
                    </li>
                    <li>
                      <b>หมวดหมู่</b>
                      {{ product.category.name }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </b-col>
          <b-col md="6" v-if="!previewMode">
            <h2>ของที่คุณมีอยู่</h2>
            <!-- offer-with-block -->
            <div class="offer-with-block">
              <!-- start item-offer-card -->
              <div
                class="item-offer-card"
                v-for="offer_product in avaliable_offer_products"
                :key="offer_product.id"
              >
                <div class="item-offer-checkbox">
                  <b-form-checkbox v-model="selected" name="item-offer" :value="offer_product.id"></b-form-checkbox>
                </div>
                <div class="item-offer-container">
                  <b-row>
                    <b-col sm="12">
                      <div class="item-offer-title">{{ offer_product.name }}</div>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col sm="12">
                      <div class="item-offer-count">
                        <b-row>
                          <b-col cols="2">
                            <div class="item-offer-count-label">จำนวน</div>
                          </b-col>
                          <b-col cols="4">
                            <b-form-input
                              type="number"
                              min="0"
                              value="0"
                              :max="offer_product.quantity"
                              v-model="data[offer_product.id]"
                              :readonly="disableOfferCount(offer_product.id)"
                            ></b-form-input>
                          </b-col>
                        </b-row>
                      </div>
                    </b-col>
                  </b-row>
                </div>
              </div>
              <!-- end item-offer-card -->
            </div>
            <!-- end offer-with-block -->
            <div class="offer-with-control">
              <b-button @click="showPreview">ดำเนินการยื่นคำขอ</b-button>
            </div>
          </b-col>

          <b-col md="6" v-else>
            <div class="offer-preview">
              <div class="info">โปรดตรวจสอบความถูกต้องของข้อมูลด้านล่างนี้...</div>
              <h2>แลกด้วยของดังนี้</h2>

              <div class="offer-with-block">
                <div class="item-offer-card" v-for="select in selected" :key="select">
                  <div class="item-offer-container">
                    <b-row>
                      <b-col sm="7">
                        <div
                          class="item-offer-title"
                        >{{ avaliable_offer_products[offindex(select)].name }}</div>
                      </b-col>
                      <b-col sm="5">
                        <div class="item-offer-count">
                          <div class="item-offer-count-label">จำนวน {{ data[select] }}</div>
                        </div>
                      </b-col>
                    </b-row>
                  </div>
                </div>
              </div>
              <div class="offer-with-control">
                <b-button @click="goBack">ย้อนกลับไปแก้ไข</b-button>
                <b-button @click="submit">ยืนยัน</b-button>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>
    {{ selected }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: null,
      avaliable_offer_products: null,
      selected: [],
      previewMode: false,
      data: []
    };
  },
  mounted() {
    this.loadOfferProduct();
  },
  methods: {
    showPreview() {
      this.selected.forEach(element => {
        if (this.data[element] == 0) {
          let index = this.selected.indexOf(element);
          this.selected.splice(index, 1);
        }
      });

      this.previewMode = true;
    },
    goBack() {
      this.previewMode = false;
    },
    async loadOfferProduct() {
      let response = await this.$axios.get(
        `/product-offer/${this.$route.params.id}/`
      );
      this.product = response.data.product;
      this.avaliable_offer_products = response.data.avaliable_offer_products;

      this.avaliable_offer_products.forEach(element => {
        this.data[element.id] = 0;
      });
    },
    disableOfferCount(id) {
      return this.selected.indexOf(id) < 0;
    },
    async submit() {
      let data = [];
      this.selected.forEach(element => {
        data.push({
          id: element,
          quantity: this.data[element]
        });
      });

      console.log(data);
      let response = await this.$axios.post("/deal/", {
        product_id: this.product.id,
        offer_products: data
      });

      console.log(response);

      this.$router.push({ name: "deal-manager" });
    },
    offindex(select) {
      return this.avaliable_offer_products.findIndex(x => x.id == select);
    }
  },
  computed: {
    fullname() {
      if (this.product.owner) {
        return `${this.product.owner.first_name} ${
          this.product.owner.last_name
        }`;
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/custom.scss";

.offer-with-block {
  margin: 30px 0;
}

.item-offer-card {
  background: #ffffff;
  border-radius: 5px;
  padding: 20px;
  margin: 15px 0px;
  box-shadow: 0px 3px 10px rgba($color: #000000, $alpha: 0.3);
}

.item-offer-checkbox {
  float: left;
  vertical-align: middle;
  padding: 0.3em 0;
  margin-right: 15px;
}

.item-offer-title {
  font-weight: 600;
  color: $primary-light-color;
  font-size: 1.2em;
}

.item-offer-container {
  line-height: 2em;
  vertical-align: middle;
}

.wrapper-container {
  padding: 50px 0px;
}

.item-title {
  margin-top: 10px;
  color: $primary-color;
  font-weight: 600;
}

.item-images {
  text-align: center;
}

.item-images img {
  width: 100%;
}

#deal-offer .info {
  background: $primary-light-color2;
  padding: 10px;
  font-weight: 600;
  margin-bottom: 15px;
}

.offer-with-control {
  text-align: right;
}

.inner-item-wrapper {
  padding: 10px 20px;
}

.item-detail-list {
  list-style: none;
  padding: 10px 0px;
  font-size: 1.1em;
}

.item-detail-list li {
  margin-bottom: 5px;
}
</style>
