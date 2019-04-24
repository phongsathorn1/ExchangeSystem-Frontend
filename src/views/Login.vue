<template>
    <div id="signin">
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
</template>

<script>
import LoginBox from '@/components/LoginBox.vue'

export default {
    components:{
        LoginBox
    }
}
</script>


<style lang="scss" scoped>
#signin{
    background: #8d3f75;
    min-height: 100vh;
}

.inner-signin-container{
    padding-top: 8em;
}
</style>
