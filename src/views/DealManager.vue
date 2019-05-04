<template>
  <div id="deal-manager">
    <div class="header">
      <b-container>
        <h1>จัดการข้อเสนอ</h1>
      </b-container>
    </div>
    <div class="wrapper-container">
      <b-container>
        <div class="deal-item-container">
          <div class="your-item-card">
            <b-row>
              <b-col cols="4">
                <div class="your-item-card-image">
                  <img src="https://via.placeholder.com/200">
                </div>
              </b-col>
              <b-col cols="8">
                <h3>ปากกา</h3>
                <ul>
                  <li>หมวดหมู่: ปากกา</li>
                  <li>จำนวน 1</li>
                  <li>สิ่งที่อยากได้: ดินสอ</li>
                </ul>
              </b-col>
            </b-row>
          </div>
          <div class="get-offer-container">
            <h2>ข้อเสนอที่ได้รับ</h2>
            <div class="item-container">
              <div class="deal-item">
                <b-row>
                  <b-col cols="9">
                    <div class="deal-item-name">ดินสอ</div>
                  </b-col>
                  <b-col cols="3">
                    <div class="deal-item-control">
                      <b-button>รับข้อเสนอ</b-button>
                    </div>
                  </b-col>
                </b-row>
              </div>
            </div>
          </div>
          <div class="get-offer-container">
            <h2>ข้อเสนอที่ยื่นไว้</h2>
          </div>
        </div>
      </b-container>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            
        }
    },
    created(){
        
    },
    methods:{
        async loadProduct(){
            
        }
    }
};
</script>

<style lang="scss">
.deal-item-container .your-item-card {
  background: #e0e0e0;
  padding: 20px;
}

.your-item-card-image {
  text-align: center;
}

.get-offer-container {
  margin: 30px 0px;
}

.item-container {
  background: #f5f5f5;
  padding: 10px 20px;
}

.deal-item-name{
    font-size: 1.2em;
    vertical-align: middle;
}
</style>
