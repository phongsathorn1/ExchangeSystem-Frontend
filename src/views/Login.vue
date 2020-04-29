<template>
    <div id="signin">
        <div class="header">
        </div>
        <div class="wrapper-container">
            <b-container>
                <div class="inner-signin-container">
                    <b-row>
                        <b-col md="4" offset-md="8">
                            <login-box>
                            </login-box>
                        </b-col>
                    </b-row>
                </div>
            </b-container>
        </div>
    </div>
</template>

<script>
import LoginBox from '@/components/LoginBox.vue'

export default {
  components: {
    LoginBox
  }
}
</script>

<style lang="scss" scoped>
#signin{
    background: #ffffff;
    height: 90vh;
}

#signin .wrapper-container{
    background: url('~@/assets/images/background.png');
    background-size: cover;
    height: 100%;
}

.inner-signin-container{
    padding-top: 8em;
}
</style>
