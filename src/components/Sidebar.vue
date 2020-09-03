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
      <transition name="accordion">
        <div
          v-if="slideDown"
          class="accordion"
        >
          <div
            v-for="(item) in list.items"
            :key="item.title"
            class="accordion__element"
          >
            <h3 class="accordion__title">
              {{ item.title }}
            </h3>
            <p class="accordion__description">
              {{ item.description }}
            </p>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      slideDown: false,
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
  @import "../styles/accordion.less";
  @import "../styles/sidebar.less";
  @import (reference) "../styles/variables.less";
</style>
