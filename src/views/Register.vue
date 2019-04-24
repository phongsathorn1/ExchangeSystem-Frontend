<template>
    <div id="register">
        <b-container>
            <div class="inner-register-container">
                <b-row class="justify-content-md-center">
                    <b-col md="10">
                        <template v-if="step == 1">
                            <register-box @submit="onRegisterSubmit">
                            </register-box>
                        </template>
                        <template v-if="step == 2">
                            <add-profile-pic>
                                
                            </add-profile-pic>
                        </template>
                    </b-col>
                </b-row>
            </div>
        </b-container>
    </div>
</template>

<script>
import RegisterBox from '@/components/RegisterBox.vue'
import AddProfilePic from '@/components/AddProfilePic.vue'

export default {
    components:{
        RegisterBox,
        AddProfilePic
    },
    data(){
        return {
            step: 1
        }
    },
    methods: {
        onRegisterSubmit(){
            this.step++
        }
    }
}
</script>


<style lang="scss">
#register{
    background: #8d3f75;
    min-height: 100vh;
}

.inner-register-container{
    padding: 8em 0;
}
</style>
