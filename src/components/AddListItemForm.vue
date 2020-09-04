<template>
  <form id="form-new-item" class="form" @submit.prevent="submitItem">
    <input
      v-model="formData.newItem.title"
      type="text"
      class="form__input"
    />
    <input
      v-model="formData.newItem.description"
      type="text"
      class="form__input"
    />
    <input
      type="submit"
      value="add"
    >
  </form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      formData: {
        listName: 'ShoppingList',
        newItem: {
          title: 'Bread',
          description: 'For breakfast',
        },
      },
    };
  },
  computed: {
    ...mapGetters([
      'allLists',
    ]),
  },
  mounted() {
  },
  methods: {
    ...mapActions([
      'addItemToTheList',
    ]),
    submitItem() {
      this.addItemToTheList(this.formData);
    },
  },
};
</script>

<style lang="less">
  @import (reference) "../styles/variables.less";
</style>
