export default {
  state: {
    listOfLists: [
      {
        name: 'ToDoList',
        open: false,
        items: [
          {
            title: 'First Item',
            description: 'We need to start somewhere',
          },
          {
            title: 'Second Item',
            description: 'Time TODO',
          },
        ],
      },
      {
        name: 'ShoppingList',
        open: true,
        items: [
          {
            title: 'Bread',
            description: 'For breakfast',
          },
          {
            title: 'Vine',
            description: 'For dinner',
          },
          {
            title: 'Cheese',
            description: 'For lunch',
          },
        ],
      },
    ],
    translationRu: [],
    errors: [],
  },
  mutations: {
    updateTranslation(state, translationResults) {
      state.translationRu = translationResults;
    },
    updateErrorState(state, data) {
      state.errors = data;
    },
    updateListItem(state, { newItem, listName }) {
      const listIndex = state.listOfLists.map((e) => e.name).indexOf(listName);
      state.listOfLists[listIndex].items.push(newItem);
    },
    updateListVisibility(state, listName) {
      const listIndex = state.listOfLists.map((e) => e.name).indexOf(listName);
      state.listOfLists[listIndex].open = !state.listOfLists[listIndex].open;
    },
  },
  actions: {
    async getRuTranslation(context) {
      // POST request using fetch with error handling
      const requestOptions = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          body: ['laba diena', 'labas', 'sveikas, kaip laikaisi?', 'aš pavargau nuo viso šito.'],
        }),
      };
      fetch('http://lightspeed.difficu.lt:62000/api/translate/lt/ru', requestOptions)
        .then(async (response) => {
          const data = await response.json();

          // check for error response
          if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
          }

          context.commit('updateTranslation', data.translated);
          return data;
        })
        .catch((error) => {
          context.commit('updateErrorState', error);
        });
    },
    addItemToTheList(context, { newItem, listName }) {
      context.commit('updateListItem', { newItem, listName });
    },
  },
  getters: {
    allLists(state) {
      return state.listOfLists;
    },
    translationResultsRu(state) {
      return state.translationRu;
    },
    getErrorState(state) {
      return state.errors;
    },
    getArrayOutOfLists(state) {
      return state.listOfLists.map((e) => e.items);
    },
    getFirstListName(state) {
      // for default state of the app
      return state.listOfLists[0].name;
    },
  },
};
