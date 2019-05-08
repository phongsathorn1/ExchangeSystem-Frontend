<template>
  <div id="feedback">
    <div class="header">
      <b-container>
        <h1>แจ้งปัญหาการใช้งาน</h1>
      </b-container>
    </div>
    <div class="wrapper-container">
      <b-container>
        <form class="feedback-form" @submit.prevent="onSubmit">
          <b-row>
            <b-col md="12">
              <b-form-group>
                <b-form-input v-model="form.title" placeholder="หัวข้อปัญหา" class="product-title" :state="isValidate('title')"></b-form-input>
                <b-form-invalid-feedback v-for="error in errors.title" :key="error" :state="isValidate('title')">
                  {{ error }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col md="12">
              <b-form-group id="input-group-1" label="รายละเอียดของปัญหา:" label-for="detail" :state="isValidate('detail')">
                <b-form-textarea
                  id="detail"
                  v-model="form.detail"
                  placeholder="รายละเอียดของปัญหา"
                  rows="3"
                  max-rows="6"
                ></b-form-textarea>
                <b-form-invalid-feedback v-for="error in errors.detail" :key="error" :state="isValidate('detail')">
                  {{ error }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="6" offset="6" class="text-right">
              <b-button type="submit" variant="primary">ยืนยัน</b-button>
            </b-col>
          </b-row>
        </form>
      </b-container>
    </div>
    <div class="alert-modal" :class="{'show-modal': modalShow}">
      <div class="inner-alert-modal">
        <i class="icofont-info-circle"></i>
        {{ modalMsg }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        title: "",
        detail: ""
      },
      modalShow: false,
      modalMsg: "",
      errors: {}
    };
  },
  methods: {
    async onSubmit() {
      try{
        let response = await this.$axios.post("/feedback/", {
          title: this.form.title,
          detail: this.form.detail
        });
        this.showModal("ส่งข้อมูลเรียบร้อยแล้ว ขอบคุณที่แจ้งปัญหาในการใช้งานระบบ");
      } catch(error) {
        this.errors = error.response.data
      }
    },
    showModal(message) {
      this.modalShow = true;
      this.modalMsg = message;

      let self = this

      setTimeout(function() {
        self.modalShow = false;
        self.modalMsg = "";
      }, 3000);
    },
    isValidate(field){
      if(Object.keys(this.errors).length !== 0){
        if(this.errors[field]){
          return false
        }else{
          return true
        }
      }
      return null
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/custom.scss";

.feedback-form {
  border: 2px dashed $primary-color;
  padding: 20px;
}
.feedback-form .product-title {
  font-size: 2em;
  color: $primary-color;
  font-weight: 500;
}

.feedback-form .product-title::placeholder {
  color: $primary-light-color;
}
</style>
