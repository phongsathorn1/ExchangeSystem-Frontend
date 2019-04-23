<template>
  <b-col cols-md="12" class="search-container">
    <b-form>
      <b-row>
        <b-col md="6">
          <b-form-input
            id="input-1"
            type="email"
            required
            placeholder="Search product..."
            class="search-input"
          ></b-form-input>
        </b-col>
        <b-col md="4">
          <b-form-select class="search-category" id="input-3" :options="categories"></b-form-select>
        </b-col>
        <b-col md="2">
          <b-button type="submit" variant="primary">Search</b-button>
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


<style lang="scss" scoped>
.search-container {
  padding: 20px;
  background: #82b3c9;
  margin-bottom: 30px;
}

.search-input {
  display: block;
  width: 100%;
}

.search-category {
  display: block;
  width: 100%;
}

.search-input:focus {
  outline: none;
}
</style>
