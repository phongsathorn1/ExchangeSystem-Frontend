<template>
  <div class="card-a">
    <b-form>
      <h1>เข้าสู่ระบบ</h1>
      <b-form-group
        id="input-group-1"
        label="ชื่อผู้ใช้ (Username)"
        label-for="username"
      >
        <b-form-input
          id="username"
          v-model="username"
          type="text"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-2"
        label="รหัสผ่าน"
        label-for="username"
      >
        <b-form-input
          id="password"
          v-model="password"
          type="password"
          required
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" class="default-btn">เข้าสู่ระบบ</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
    data(){
        return {
            username: '',
            password: ''
        }
    }
}
</script>


<style lang="scss" scoped>
@import "@/assets/custom.scss";


</style>
