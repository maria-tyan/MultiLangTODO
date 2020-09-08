<template>
  <div id="translated-view" class="translated-view">
    <ul>
      <li
        v-for="(item, index) in originalListArray"
        :key="index"
      >
        {{ item }}
      </li>
    </ul>
    <ul>
      <li
        v-for="(item, index) in translatedListArray"
        :key="index"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
    };
  },
  mounted() {
    this.getTranslation({
      lang: 'ru',
      listName: this.getFirstListName,
    });
  },
  computed: {
    ...mapGetters([
      'allLists',
      'translatedListArray',
      'originalListArray',
      'getFirstListName',
    ]),
  },
  methods: {
    ...mapActions([
      'getTranslation',
    ]),
  },
};
</script>

<style lang="less">
  @import (reference) "../styles/variables.less";

  .translated-view {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 700px;
    align-self: center;
    margin: 20px auto;
  }
</style>
