<template>
  <b-navbar toggleable="lg" type="dark" class="main-navbar">
    <b-container>
      <b-navbar-brand tag="h1" class="mb-0" to="/">Trading</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/">หน้าแรก</b-nav-item>
          <b-nav-item to="/deal-manager" v-if='user != null'>จัดการข้อเสนอ</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto right-nav">
          <template v-if='user != null'>
            <b-nav-item to="/product/add">เพิ่มสินค้า</b-nav-item>
            <b-nav-item @click="openNotificationPane">
                <div class="notification-btn">
                  <i class="icofont-notification"></i>
                  <span class="notification-count">{{ notiCount }}</span>
                </div>
            </b-nav-item>
          </template>

          <b-nav-item-dropdown v-if='user != null' :text="user.first_name" class="nav-profile-btn" right>
            <b-dropdown-item :to="'/profile'">โปรไฟล์</b-dropdown-item>
            <b-dropdown-item href="#" @click='signOut'>ออกจากระบบ</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown v-else text="เข้าสู่ระบบ" class="nav-profile-btn" right>
            <b-dropdown-item :to="'/sign-in'">เข้าสู่ระบบ</b-dropdown-item>
            <b-dropdown-item :to="'/register'">สมัครสมาชิก</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {

  props: ['notiCount'],
  computed: {
    ...mapGetters({
      user: 'getUser'
    })
  },
  methods: {
    ...mapActions({
      logOut: 'logOut'
    }),
    signOut(){
      this.logOut()
      this.$emit('logout')
      this.$router.push({name: 'home'})
    },
    openNotificationPane(){
      this.$emit('toggle', 'notification')
    }
  }
}
</script>


<style lang="scss">
@import "@/assets/custom.scss";

.main-navbar{
  background: $primary-color;
  padding-top: 20px !important;
  font-family: 'Athiti', sans-serif;
}

.main-navbar .container{
  padding-bottom: 15px;
}

.main-navbar .navbar-brand{
  color: $navbar-font-color !important;
  font-weight: 600;
}

.main-navbar .nav-link{
  color: $navbar-font-color !important;
  font-weight: 500;
  font-size: 1.05em;
  line-height: 1.1em;
}

.main-navbar .right-nav .nav-link{
  margin-top: 0.3em;
}

.main-navbar .nav-profile-btn{
  background: #ffffff;
  color: #000000;
  padding: 5px;
  border-radius: 30px;
  margin-left: 10px;
}

.main-navbar .nav-profile-btn .nav-link{
  color: #000000 !important;
  font-weight: 500;
  margin-top: 0px;
}

.notification-count{
  background: #D64561;
  border-radius: 3px;
  padding: 2px 10px;
  margin-left: 5px;
  font-weight: 600;
}
</style>
