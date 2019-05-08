<template>
  <div class="card-a">
    <h1 class="text-center">เพิ่มรูปภาพประจำตัวของคุณ</h1>
    <div class="change-profile-container">
      <div class="profile-picture" @click="launchFilePicker()">
        <div class="profile-picture-overlay">
          คลิกเพื่อเลือกรูป
        </div>
        <template v-if="getUser != null">
          <img :src="getUser.picture" class="card-img avatar" />
        </template>
      </div>
      <b-button id="pick-avatar" ref="filebtn">เลือกรูปภาพ</b-button>
      <!-- <input
        type="file"
        ref="file"
        name="picture"
        style="display:none"
        @change="onFileChange(
          $event.target.name, $event.target.files)"
      >-->
    </div>
    <avatar-cropper
      @uploaded="handleUploaded"
      trigger="#pick-avatar"
      upload-form-name="picture"
      :upload-headers="{'Authorization': `Bearer ${this.getUserToken}`}"
      :upload-url="uploadUrl"
      :labels="{submit: 'ตกลง', cancel: 'ยกเลิก'}"
    />

    <div class="button-control">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import AvatarCropper from "vue-avatar-cropper";
import { mapGetters } from "vuex";

export default {
  components: { AvatarCropper },
  name: "profile-picture-upload",
  data() {
    return {
      uploadUrl: "http://127.0.0.1:8000/user/me/upload-picture"
    };
  },
  methods: {
    launchFilePicker() {
      this.$refs.filebtn.click()
    },
    handleUploaded(response) {
      if (response.status == "success") {
        this.$store.dispatch("setUserAvatar", response.user.picture)
        this.$emit('uploaded')
      }
    }
  },
  computed: {
    ...mapGetters(["getUserToken", "getUser"])
  }
};
</script>


<style lang="scss" scoped>
@import "@/assets/custom.scss";

.profile-picture {
  width: 300px;
  height: 300px;
  background: #e0e0e0;
  border-radius: 50%;
  margin: auto;
  overflow: hidden;
  position: relative;
}

.change-profile-container {
  padding: 30px 0;
  text-align: center;
}

.change-profile-container #pick-avatar{
  margin: 10px 0;
}

.profile-picture-overlay {
  position: absolute;
  background-color: rgba($color: #000000, $alpha: 0);
  color: rgba($color: #ffffff, $alpha: 0);
  transition: all .1s;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  cursor: pointer;
}

.profile-picture:hover .profile-picture-overlay{
  color: #ffffff;
  background-color: rgba($color: #000000, $alpha: 0.5);
}

.button-control {
  text-align: center;
}

</style>
