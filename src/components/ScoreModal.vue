<template>
  <b-modal
    id="score-box"
    v-model="modalShow"
    title="ให้คะแนนสำหรับการแลกเปลี่ยนในครั้งนี้"
    @ok="handleOk(dealId)"
  >
    <template slot="default">
      <p class="my-4">คะแนนที่คุณอยากจะให้ (เต็ม 5 คะแนน)</p>
      <star-rating
        :max-rating="5"
        :increment="1"
        :show-rating="false"
        v-model="scoreForm.score"
        @rating-selected="handleRating"
      ></star-rating>
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
  props: ["value", "dealId"],
  components: {
    StarRating
  },
  data() {
    return {
      scoreForm: this.value,
      modalShow: false
    };
  },
  methods: {
    handleRating() {
      this.$emit("input", this.scoreForm);
    },
    handleOk() {
      this.$emit("ok", scoreForm);
    }
  },
  watch: {
    modalShow() {
      if (!this.modalShow) {
        this.scoreForm.dealId = null;
        this.scoreForm.score = null;
      }
    }
  }
};
</script>
