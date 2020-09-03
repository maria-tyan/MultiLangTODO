<template>
  <div id="app">
    <Sidebar />
    <div
      class="wrapper"
    >
      <h1>
        MultiLang To Do List
      </h1>
      <h3>
        {{ translationResultsRu }}
      </h3>
      <p>
        {{ getErrorState }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Sidebar from './components/Sidebar.vue';

export default {
  name: 'MultiLangTODO',
  components: {
    Sidebar,
  },
  computed: {
    ...mapGetters([
      'allLists',
      'translationResultsRu',
      'getErrorState',
    ]),
  },
  mounted() {
    if (false) {
      this.getRuTranslation();
    }
  },
  methods: {
    ...mapActions([
      'getRuTranslation',
    ]),
  },
};
</script>

<style lang="less">
  @import "./styles/global.less";
  @import "./styles/variables.less";
</style>
