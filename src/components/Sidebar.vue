<template>
  <div id="sidebar" class="sidebar">
    <div
      v-for="(list, index) in allLists"
      :key="index"
    >
      <div
        class="sidebar__title-wrapper"
      >
        <h2
          class="sidebar__title"
        >
          {{ list.name }}
        </h2>
        <div
          class="sidebar__toogle"
          @click="slideDown = !slideDown"
        />
      </div>
      <transition-group
        name="slider"
        tag="div"
      >
        <div
          v-for="(item) in list.items"
          :key="item.title"
          class="sidebar__list-item"
        >
          <h3>
            {{ item.title }}
          </h3>
          <p>
            {{ item.description }}
          </p>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      slideDown: true,
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
  },
};
</script>

<style lang="less">
  @import "../styles/sidebar.less";
  @import (reference) "../styles/variables.less";
</style>
