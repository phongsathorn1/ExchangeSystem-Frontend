<template>
  <div class="notification-overlay" :class="{'close-pane': close}" v-if="showPane">
    <div id="notification-pane">
      <div class="notification-pane-title">
        <div class="notification-pane-title-msg">การแจ้งเตือน</div>
        <div class="notification-pane-title-button">
          <b-button @click="closePane">ปิด</b-button>
        </div>
        <div class="clearfix"></div>
      </div>
      <div class="main-notification-pane">
        <div class="notification-card">
          <div class="notification-card-title">ข้อเสนอที่คุณยื่นถูกตกลงรับแล้ว</div>
          <div class="notification-card-content">ข้อเสนอที่คุณยื่นบลาๆๆๆๆๆๆ</div>
          <div class="notification-card-time">9 วันที่แล้ว</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["show"],
  data() {
    return {
      close: true,
      showPane: false
    };
  },
  methods: {
    closePane() {
      this.$emit("close");
      let self = this;

      this.close = true;
      setTimeout(function() {
        self.showPane = false;
      }, 200);
    }
  },
  watch: {
    show() {
      let self = this;
      if (this.show) {
        this.showPane = this.show;
        setTimeout(function() {
          self.close = !self.show;
        }, 200);
      } else {
        this.close = !this.show;
        setTimeout(function() {
          self.showPane = self.show;
        }, 200);
      }
    }
  }
};
</script>

<style lang="scss">
#notification-pane {
  display: block;
  position: absolute;
  height: 100%;
  background: #ffffff;
  max-width: 500px;
  width: 100%;
  top: 0;
  right: 0;
  z-index: 999;
  box-shadow: -4px 0px 12px 1px rgba($color: #000000, $alpha: 0.3);
  overflow-x: hidden;
  transition: 0.5s;
}

.close-pane.notification-overlay {
  background: rgba($color: #000000, $alpha: 0);
}

.close-pane #notification-pane {
  right: -500px;
}

.notification-overlay {
  background: rgba($color: #000000, $alpha: 0.3);
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 199;
  top: 0px;
  transition: 0.5s;
}

.notification-pane-title {
  font-size: 1.3em;
  font-weight: 600;
  padding: 30px 40px;
  border-bottom: 1px solid #e0e0e0;
}

.main-notification-pane {
  padding: 20px;
}

.notification-card {
  border: 1px solid #e0e0e0;
  padding: 20px;
}

.notification-card-title {
  font-weight: 600;
  font-size: 1.1em;
}

.notification-card-content {
  font-size: 1em;
  font-weight: 400;
}

.notification-pane-title-msg {
  float: left;
}

.notification-pane-title-button {
  float: right;
}

.notification-card-time {
  font-size: 0.9em;
  margin-top: 10px;
}
</style>

