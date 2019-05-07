<template>
  <div class="notification" :class="{'close-pane': close}" v-if="showPane">
    <div class="notification-overlay" @click="closePane"></div>
    <div id="notification-pane">
      <div class="notification-pane-title">
        <div class="notification-pane-title-msg">
          การแจ้งเตือน
          <span
            class="notification-pane-count"
          >({{ countNotifications() }} แจ้งเตือนใหม่)</span>
        </div>
        <div class="notification-pane-title-button">
          <b-button @click="closePane">ปิด</b-button>
        </div>
        <div class="clearfix"></div>
      </div>
      <div class="main-notification-pane">
        <div class="no-notification" v-if="!isHaveNotifications">ไม่มีการแจ้งเตือน</div>
        <router-link :to="{name: 'deal-manager'}" v-else>
          <div
            class="notification-card"
            v-for="notification in notifications"
            :key="notification.id"
            @click="closePane"
          >
            <div class="notification-card-title">{{ notification.title }}</div>
            <div class="notification-card-content">{{ notification.message }}</div>
            <div class="notification-card-time">{{ notification.created_date | moment("calendar") }}</div>
          </div>
        </router-link>
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
      showPane: false,
      notifications: null,
      polling: null
    };
  },
  mounted() {
    this.polling = setInterval(this.loadNotification, 15000);
  },
  beforeDestroy() {
    clearInterval(this.polling);
  },
  methods: {
    closePane() {
      this.$emit("close");
      let self = this;

      this.close = true;
      setTimeout(function() {
        self.showPane = false;
      }, 200);
    },
    async loadNotification() {
      let response = await this.$axios.get("/notification/");
      this.notifications = response.data.results;
      this.countNotifications();
      console.log(response);
    },
    countNotifications() {
      let count = this.notifications.filter(x => !x.is_readed).length;
      console.log(count);
      this.$emit("notification-count", count);
      return count;
    }
  },
  computed: {
    isHaveNotifications() {
      if (this.notifications.length > 0) {
        return true;
      }
      return false;
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

.close-pane .notification-overlay {
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

.notification-pane-count {
  font-size: 0.8em;
  font-weight: 400;
}

.main-notification-pane a,
.main-notification-pane a:hover {
  color: #000000;
  text-decoration: none;
}
</style>

