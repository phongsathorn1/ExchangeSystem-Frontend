<template>
  <b-modal
    id="score-box"
    v-model="modalShow"
    title="ให้คะแนนสำหรับการแลกเปลี่ยนในครั้งนี้"
    @ok="handleOk()"
    centered
  >
    <template slot="default">
      <div class="text-center inner-score-modal">
        <p class="score-modal-title">คะแนนที่คุณอยากจะให้ (เต็ม 5 คะแนน)</p>
        <star-rating
          :max-rating="5"
          :increment="1"
          :show-rating="false"
          v-model="scoreForm.score"
          @rating-selected="handleRating"
        ></star-rating>
        <span class="preview-score">{{ previewScore }}</span>
      </div>
    </template>

    <template slot="modal-footer" slot-scope="{ ok, cancel }">
      <b-button size="sm" @click="cancel()">ยกเลิก</b-button>
      <b-button size="sm" variant="primary" :disabled="!scoreForm.score" @click="ok()">ให้คะแนน</b-button>
    </template>
  </b-modal>
</template>

<script>
import StarRating from "vue-star-rating";

export default {
  props: ["value"],
  components: {
    StarRating
  },
  data() {
    return {
      scoreForm: this.value,
      modalShow: false,
      hoverScore: null
    };
  },
  methods: {
    handleRating() {
      this.$emit("input", this.scoreForm);
    },
    handleOk() {
      this.$emit("ok", this.scoreForm);
    }
  },
  watch: {
    modalShow() {
      if (!this.modalShow) {
        this.scoreForm.dealId = null;
        this.scoreForm.score = null;
      }
    }
  },
  computed: {
      previewScore(){
          if(this.scoreForm.score){
              return this.scoreForm.score
          }
          return 'ยังไม่ได้ระบุคะแนน'
      }
  }
};
</script>

<style lang="scss">
.vue-star-rating{
    justify-content: center;
}
.inner-score-modal{
    padding: 25px 0;
}
.preview-score{
    margin-top: 20px;
    display: inline-block;
    font-size: 1.1em;
}
.score-modal-title{
    font-size: 1.2em;
    font-weight: 600;
    margin-bottom: 20px;
}
</style>
