<template>
  <div id="chat">
    <b-container>
      <h1>แชท</h1>
      <div class="main-chat" id="#mainchat" ref="mainchat">
        <div class="chat-item" v-for="chat in chats" :key="chat.id">
          <div
            class="chat-username"
          >{{chat.user.first_name}} {{chat.user.last_name}} ({{chat.user.email}})</div>
          <div class="chat-message">{{chat.message}}</div>
          <div class="chat-time">{{ chat.created_date | moment("calendar")}}</div>
        </div>
      </div>
    </b-container>
    <div class="chat-bottom">
      <b-container>
        <b-form @submit.prevent="sendChat">
          <b-row>
            <b-col cols="10">
              <b-input
                id="inline-form-input-name"
                placeholder="พิมพ์ข้อความของคุณ..."
                class="mb-2 mr-sm-2 mb-sm-0"
                v-model="message"
              ></b-input>
            </b-col>
            <b-col cols="2">
              <b-button variant="primary" type="submit">ส่ง</b-button>
            </b-col>
          </b-row>
        </b-form>
      </b-container>
    </div>
  </div>
</template>

<style lang="scss">
@import "@/assets/custom.scss";

.chat-item {
  border-bottom: 1px solid #e0e0e0;
  padding: 10px 0;
}

.chat-username {
  font-size: 1.1em;
  font-weight: 600;
}

.main-chat {
  padding: 10px 20px;
  height: 450px;
  overflow-y: scroll;
  position: relative;
}

.chat-bottom {
  position: fixed;
  width: 100%;
  padding: 20px 0;
  bottom: 0;
  border-top: 1px solid #e0e0e0;
  background: #f0f0f0;
}

.chat-message {
  font-size: 1em;
  font-weight: 500;
}

#chat h1 {
  color: $primary-color;
  font-size: 1.8em;
  margin: 25px 10px;
}

.chat-time {
  font-size: 0.8em;
  margin-top: 10px;
}
</style>

<script>
export default {
  data() {
    return {
      chats: null,
      polling: null,
      message: "",
    };
  },
  mounted() {
    this.loadChats();
    this.polling = setInterval(this.loadChats, 5000);
  },
  methods: {
    async loadChats() {
      this.scrollToBottom();
      let response = await this.$axios.get("/chat/20/");
      this.chats = response.data;
      this.scrollToBottom();
    },
    async sendChat() {
      let response = await this.$axios.post("/chat/20/", {
        message: this.message
      });
      this.loadChats();
      this.message = "";
      console.log(response);
    },
    scrollToBottom() {
      this.$refs.mainchat.scrollTop = this.$refs.mainchat.scrollHeight;
    }
  }
};
</script>
