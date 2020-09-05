<template>
  <form id="form-new-item" class="form" @submit.prevent="submitItem">
    <div class="form__input-wrapper">
      <label
        class="form__label"
        :class="'form__label_active'"
      >
        This is the title
      </label>
      <input
        v-model="title"
        type="text"
        class="form__input"
      />
    </div>
    <div class="form__input-wrapper">
      <label
        class="form__label"
        :class="'form__label_active'"
      >
        And a description
      </label>
      <input
        v-model="description"
        type="text"
        class="form__input form__input-description"
      />
    </div>
    <input
      type="submit"
      class="form__input-submit"
      value="add"
    >
  </form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  props: {
    currentListName: {
      default: '',
      type: String,
    },
  },
  data() {
    return {
      listName: this.currentListName,
      title: 'Chocolate',
      description: 'For me',
    };
  },
  mounted() {
    this.listName = this.currentListName ? this.currentListName : this.getFirstListName;
  },
  computed: {
    ...mapGetters([
      'getFirstListName',
    ]),
  },
  methods: {
    ...mapActions([
      'addItemToTheList',
    ]),
    submitItem() {
      this.addItemToTheList({
        newItem: {
          title: this.title,
          description: this.description,
        },
        listName: this.listName,
        id: Date.now(),
      });
      this.title = '';
      this.description = '';
    },
  },
};
</script>

<style lang="less">
  @import (reference) "../styles/variables.less";
  @import "../styles/form.less";
</style>
