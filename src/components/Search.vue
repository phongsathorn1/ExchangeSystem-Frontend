<template>
  <div class="search" id="search">
    <b-row>
      <b-col md="12" class="search-container">
        <b-form method="get">
          <b-row>
            <b-col md="6">
              <b-form-group id="input-group-1" label="ค้นหา:" label-for="input-3">
                <b-form-input
                  id="input-1"
                  type="text"
                  name="q"
                  placeholder="ค้นหาสินค้าที่ต้องการ..."
                  v-model="form.search"
                  class="search-input"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group id="input-group-1" label="หมวดหมู่:" label-for="search-category">
                <b-form-select
                  class="search-category"
                  id="search-category"
                  name="category"
                  v-model="form.category"
                  :options="categories"
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col md="2">
              <b-button type="submit" class="search-btn">ค้นหา</b-button>
            </b-col>
          </b-row>
        </b-form>
      </b-col>
    </b-row>
    <h1 class="search-title" v-if="isShowTitle">
      ผลลัพธ์การค้นหาสำหรับ
      <span class="underdot-line">{{ form.search }}</span> ใน
      <span class="underdot-line">{{ form.category }}</span>
    </h1>
  </div>
</template>

<script>
export default {
  name: "search",
  data() {
    return {
      form: {
        search: "",
        category: null
      },
      categories: [
        { text: "ทั้งหมด", value: null },
        "รูปภาพ",
        "เข็มกลัด",
        "แท่งไฟ"
      ]
    };
  },
  mounted() {
    this.loadCategories();
    if (Object.keys(this.$route.query).length !== 0) {
      this.form.search = this.$route.query.q;
      this.form.category = this.$route.query.category;
    }
  },
  methods: {
    async loadCategories() {
      let response = await this.$axios.get("/category/");
      this.categories = [{ text: "ทั้งหมด", value: null }];
      response.data.results.forEach(x => {
        this.categories.push(x.name);
      });
    }
  },
  computed: {
    isShowTitle() {
      if (Object.keys(this.$route.query).length !== 0) {
        return true;
      }
      return false;
    }
  },
  watch: {
    isShowTitle() {
      this.form.search = ''
      this.form.category = null
    }
  }
};
</script>


<style lang="scss">
@import "@/assets/custom.scss";

.search-container {
  padding: 30px 20px;
  border-top: 1px solid $primary-light-color;
}

.search-container input,
.search-container select {
  background-color: $primary-light-color;
  border: none;
  color: #ffffff;
  font-size: 1.1em;
}

.search-container input::placeholder,
.search-container input::placeholder {
  color: #ffffff;
}

.search-container .d-block {
  color: #ffffff;
  font-size: 1.1em;
}

.search-input {
  display: block;
  width: 100%;
}

#search-category.search-category {
  display: block;
  width: 100%;
  color: #ffffff;
  background: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3e%3cpath fill='%23ffffff' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e")
    no-repeat right 0.75rem center/8px 10px;
  background-color: $primary-light-color;
}

.search-input:focus {
  outline: none;
}

.search-container .search-btn {
  display: block;
  width: 100%;
  font-weight: 600;
  font-size: 1.1em;
  position: relative;
  top: 1.9em;
  background: #ffd54f;
  color: #000000;
}

.search-title {
  font-size: 1.8em;
}

.underdot-line{
  text-decoration: underline dotted;
}
</style>
