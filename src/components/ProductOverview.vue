<template>
  <div class="product-overview">
    <b-row>
      <b-col md="5">
        <div class="product-images-wrapper">
          <template v-if="hasImages()">
            <div class="image-slider-container">
              <slick ref="slick" :options="slickOptions">
                <img :src="image.picture_path" v-for="image in images" :key="image.picture_path">
              </slick>
            </div>
          </template>
        </div>
      </b-col>
      <b-col md="7">
        <h1>{{ title }}</h1>
        <div class="product-meta">
          <b-row>
            <b-col cols="12" class="product-owner">
              <b>สร้างโดย</b>
              <router-link
                :to="{name: 'profile-user', params:{id: owner.id}}"
                v-if="owner"
              > {{ fullName }}</router-link>
              <router-link
                :to="{name: 'profile-user', params:{id: getUser.id}}"
                v-if="!owner && getUser"
              > {{ getUser.first_name }} {{ getUser.last_name }}</router-link>
            </b-col>
          </b-row>
          <b-row v-if="id">
            <div class="product-status" v-if="getUser && owner.id != getUser.id">
              <span class="product-ready product-status-flag" v-if="is_avaliable">พร้อมให้ยื่นข้อเสนอ</span>
              <span class="product-notready product-status-flag" v-else>ไม่พร้อมให้ยื่นข้อเสนอ</span>
            </div>
          </b-row>
          <b-row>
            <b-col sm="6">
              <b>หมวดหมู่</b>{{ category.name }}
            </b-col>
            <b-col sm="6">
              <b>จำนวนที่มี</b>{{ quantity }}
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b>สิ่งที่อยากได้</b>
              {{ wantItem }}
            </b-col>
          </b-row>
          <div class="product-control" v-if="id" >
            <b-button variant="danger" v-if="getUser && getUser.is_staff" @click="deleteProduct(id)">ลบสินค้า</b-button>
            <b-button :to="`/create-offer/${id}`" variant="success" v-if="getUser && owner.id != getUser.id">ยื่นข้อเสนอ</b-button>
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
import Slick from 'vue-slick'
import '@/../node_modules/slick-carousel/slick/slick.css'
import '@/../node_modules/slick-carousel/slick/slick-theme.css'
import { mapGetters } from 'vuex'

export default {
  name: 'product-overview',
  components: {
    Slick
  },
  data () {
    return {
      slickOptions: {
        arrows: true,
        dots: true,
        draggable: true,
        infinite: false
      }
    }
  },
  props: [
    'id',
    'title',
    'category',
    'quantity',
    'wantItem',
    'detail',
    'images',
    'owner',
    'is_avaliable'
  ],
  computed: {
    ...mapGetters(['getUser']),
    fullName () {
      if (this.owner) {
        return this.owner.first_name + ' ' + this.owner.last_name
      }
      return ''
    }
  },
  methods: {
    hasImages () {
      console.log(this.images)
      if (this.images == null) {
        return false
      } else {
        if (this.images.length > 0) {
          return true
        }
      }
      return false
    },
    async deleteProduct (id) {
      if (window.confirm('คุณต้องการลบสินค้าชิ้นนี้หรือไม่')) {
        try {
          await this.$axios.delete(`/product/${id}/`)
          this.$router.push('/')
        } catch (error) {
          console.log(error)
        }
      }
    }
  }
}
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

.product-notready {
  background: #D36A6A;
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

.product-control .btn {
  margin: 0px 10px;
}

.product-owner b {
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

.slick-prev:before,
.slick-next:before {
  color: #ffffff !important;
  font-size: 30px;
}

.slick-next {
  right: 20px;
}

.slick-prev {
  left: 10px;
  z-index: 60;
}
</style>
