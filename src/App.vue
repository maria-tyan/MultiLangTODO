<template>
  <div id="app">
    <Sidebar />
    <div
      class="wrapper"
    >
      <h1>
        MultiLang To Do List
      </h1>
      <TranslatedView />
      <p>
        {{ getErrorState }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Sidebar from './components/Sidebar.vue';
import TranslatedView from './components/TranslatedView.vue';

export default {
  name: 'MultiLangTODO',
  components: {
    Sidebar,
    TranslatedView,
  },
  computed: {
    ...mapGetters([
      'allLists',
      'getErrorState',
      'getFirstListName',
      'translatedListArray',
    ]),
  },
};
</script>

<style lang="less">
  @import "./styles/global.less";
  @import "./styles/variables.less";
</style>
