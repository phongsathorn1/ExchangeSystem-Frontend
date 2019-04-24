<template>
  <b-col cols-md="12" class="search-container">
    <b-form>
      <b-row>
        <b-col md="6">
          <b-form-group
            id="input-group-1"
            label="ค้นหา:"
            label-for="input-3"
          >
            <b-form-input
              id="input-1"
              type="email"
              required
              placeholder="ค้นหาสินค้าที่ต้องการ..."
              class="search-input"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group
            id="input-group-1"
            label="หมวดหมู่:"
            label-for="search-category"
          >
            <b-form-select class="search-category" id="search-category" v-model="form.category" :options="categories">

            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col md="2">
          <b-button type="submit" class="search-btn">Search</b-button>
        </b-col>
      </b-row>
    </b-form>
  </b-col>
</template>

<script>
export default {
  name: "search",
  data() {
    return {
      form: {
        category: null
      },
      categories: [
        { text: "Select Category...", value: null },
        "รูปภาพ",
        "เข็มกลัด",
        "แท่งไฟ"
      ]
    };
  }
};
</script>


<style lang="scss">
.search-container {
  padding: 30px 20px;
}

.search-container input,
.search-container select{
  background-color: #80286d;
  border: none;
  color: #FFFFFF;
  font-size: 1.1em;
}

.search-container input::placeholder,
.search-container input::placeholder{
  color: #FFFFFF;
}

.search-container .d-block{
  color: #FFFFFF;
  font-size: 1.1em;
}

.search-input {
  display: block;
  width: 100%;
}

#search-category.search-category {
  display: block;
  width: 100%;
  color: #FFFFFF;
  background: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3e%3cpath fill='%23ffffff' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e") no-repeat right 0.75rem center/8px 10px;
  background-color: #80286d;
}

.search-input:focus {
  outline: none;
}

.search-container .search-btn{
  display: block;
  width: 100%;
  font-weight: 600;
  font-size: 1.1em;
  position: relative;
  top: 1.9em;
  background: #ffd54f;
  color: #000000;
}
</style>
