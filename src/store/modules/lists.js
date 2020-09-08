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
    translation: [],
    errors: [],
  },
  mutations: {
    updateTranslation(state, translationResults) {
      state.translation = translationResults;
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
    async getTranslation({ commit, getters }, payload) {
      // transform data to the suitable array for the request form
      let dataForTranslation = getters.allLists
        .find((list) => (list.name === payload.listName));
      dataForTranslation = Object.values(dataForTranslation.items)
        .map((e) => Object.values(e))
        .flat(1);

      const requestObj = {
        body: dataForTranslation,
      };
      console.log(requestObj);
      // POST request using fetch with error handling
      const requestOptions = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestObj),
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

          // if translated data not found return error
          if (!data.translated) {
            const error = 'No data';
            return Promise.reject(error);
          }

          commit('updateTranslation', data.translated);
          return data;
        })
        .catch((error) => {
          commit('updateErrorState', error);
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
    translatedListArray(state) {
      return state.translation;
    },
    getErrorState(state) {
      return state.errors;
    },
    originalListArray(state) {
      // transform data to the suitable array for the request form
      const array = state.listOfLists
        .find((list) => (list.name === state.listOfLists[0].name));
      return Object.values(array.items)
        .map((e) => Object.values(e))
        .flat(1);
    },
    getFirstListName(state) {
      // for default state of the app
      return state.listOfLists[0].name;
    },
  },
};
