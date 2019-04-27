<template>
  <div id="profile">
    <div class="header">
      <b-container>
        <div class="profile">
          <b-row>
            <b-col md="3">
              <div class="profile-image">
                <div class="inner-profile-image">
                  <img src="@/assets/images/profile.jpg" class="profile-image-raw">
                </div>
              </div>
            </b-col>
            <b-col md="9">
              <div class="profile-meta">
                <h3>พงศธร กิตติวรปัญญา</h3>
                <b-row>
                  <b-col sm="4">
                    <div class="profile-meta-block">
                      <div class="profile-meta-block-title">คะแนนความพึงพอใจ</div>
                      <div class="profile-meta-block-detail">95%</div>
                    </div>
                  </b-col>
                  <b-col sm="4">
                    <div class="profile-meta-block">
                      <div class="profile-meta-block-title">จำนวนของทั้งหมด</div>
                      <div class="profile-meta-block-detail">5 ชิ้น</div>
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
          <h1>สินค้าของ พงศธร</h1>
      </b-container>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      profileImage: require("@/assets/images/profile.jpg"),
      profileProp: {
        height: 300,
        width: 300
      }
    };
  }
};
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
}

.profile-meta-block .profile-meta-block-title {
  font-size: 1.2em;
  font-weight: 600;
  text-align: center;
}

.profile-meta-block .profile-meta-block-detail {
  font-size: 1.5em;
  text-align: center;
}
</style>
