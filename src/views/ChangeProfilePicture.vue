<template>
  <div id="change-profile">
    <b-container>
      <div class="inner-register-container">
        <b-row class="justify-content-md-center">
          <b-col md="10">
            <add-profile-pic>
              <b-button variant="primary" to="/profile">ตกลง</b-button>
            </add-profile-pic>
          </b-col>
        </b-row>
      </div>
    </b-container>
  </div>
</template>

<script>
import RegisterBox from "@/components/RegisterBox.vue";
import AddProfilePic from "@/components/AddProfilePic.vue";

export default {
  components: {
    RegisterBox,
    AddProfilePic
  }
};
</script>

<style lang="scss">
  #change-profile{
    background: #8d3f75;
  }
</style>
