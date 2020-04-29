<template>
  <div id="profile" v-if="data">
    <div class="header">
      <b-container>
        <div class="profile">
          <b-row>
            <b-col md="3">
              <div class="profile-image">
                <div class="inner-profile-image">
                  <img :src="data.profile.picture" class="profile-image-raw">
                </div>
              </div>
              <div class="profile-button" v-if="getUser && getUser.id == data.profile.id">
                <b-button :to="{name: 'profile-change-picture'}">แก้รูปโปรไฟล์</b-button>
              </div>
            </b-col>
            <b-col md="9">
              <div class="profile-meta">
                <b-row>
                  <b-col md="8">
                    <h3>{{ fullname }}</h3>
                  </b-col>
                  <!-- <b-col md="4">
                    <div>
                      <b-button>แก้ไขโปรไฟล์</b-button>
                    </div>
                  </b-col> -->
                </b-row>
                <b-row>
                  <b-col sm="4">
                    <div class="profile-meta-block">
                      <div class="profile-meta-block-title">คะแนนความพึงพอใจ</div>
                      <div class="profile-meta-block-detail">{{ scorePercent }}</div>
                    </div>
                  </b-col>
                  <b-col sm="4">
                    <div class="profile-meta-block">
                      <div class="profile-meta-block-title">จำนวนของที่พร้อมให้ส่งข้อเสนอ</div>
                      <div class="profile-meta-block-detail">{{ productCount }}</div>
                    </div>
                  </b-col>
                </b-row>
              </div>
            </b-col>
          </b-row>
        </div>
      </b-container>
    </div>
    <div class="wrapper-container">
      <b-container>
        <div class="profile-avaliable-products">
          <h1>สินค้าของที่พร้อมให้ส่งข้อเสนอ</h1>
          <b-row>
            <product-item
            v-for="product in data.avaliable_products"
            :product=product
            :key="product.id">
            </product-item>
          </b-row>
        </div>
      </b-container>
    </div>
  </div>
</template>

<script>
import ProductItem from '@/components/ProductItem.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    ProductItem
  },
  data () {
    return {
      profileImage: require('@/assets/images/profile.jpg'),
      profileProp: {
        height: 300,
        width: 300
      },
      data: null
    }
  },
  created () {
    this.loadProfile()
  },
  methods: {
    async loadProfile () {
      let response = null
      if (Object.keys(this.$route.params).length !== 0) {
        console.log('0')
        response = await this.$axios.get(`/user/profile/${this.$route.params.id}/`)
        this.data = response.data
      } else {
        if (this.getUser) {
          response = await this.$axios.get(`/user/profile/${this.getUser.id}/`)
          this.data = response.data
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'getUser'
    ]),
    fullname: function () {
      return `${this.data.profile.first_name} ${this.data.profile.last_name}`
    },
    productCount: function () {
      return this.data.avaliable_products.length
    },
    scorePercent: function () {
      if (this.data.score) {
        return `${this.data.score * 100}%`
      }
      return 'ไม่สามารถคำนวณคะแนนได้'
    }
  },
  watch: {
    async getUser () {
      if (Object.keys(this.$route.params).length === 0) {
        console.log('1')
        let response = await this.$axios.get(`/user/profile/${this.getUser.id}/`)
        this.data = response.data
      }
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/custom.scss";

.profile {
  padding: 2em 0;
}

.profile-image {
  border-radius: 50%;
  overflow: hidden;
  width: 250px;
  height: 250px;
}

.profile-image .profile-image-raw {
  position: relative;
  bottom: 50%;
  width: 100%;
  margin: auto;
}

.profile-meta {
  color: #ffffff;
  padding: 30px 50px;
}

.profile-meta-block {
  background: $primary-light-color;
  padding: 10px 30px;
  margin: 20px 0px;
  height: 100%;
}

.profile-meta-block .profile-meta-block-title {
  font-size: 1.2em;
  font-weight: 600;
  text-align: center;
  border-bottom: 1px solid #e0e0e0;
}

.profile-meta-block .profile-meta-block-detail {
  font-size: 1.5em;
  text-align: center;
}

.profile-avaliable-products {
  padding: 20px 0;
}

.profile-avaliable-products h1{
  color: $primary-color;
  font-size: 1.9em;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.profile-button{
  text-align: center;
  margin: 25px 0;
}
</style>
