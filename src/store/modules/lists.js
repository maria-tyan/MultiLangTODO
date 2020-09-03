export default {
  state: {
    listOfLists: [
      {
        name: 'ToDoList',
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
          console.log('response', response);
          const data = await response.json();

          // check for error response
          if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
          }

          console.log(data, response);

          context.commit('updateTranslation', data.translated);
          return data;
        })
        .catch((error) => {
          context.commit('updateErrorState', error);
        });
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
      return state.listOfLists;
    },
  },
};
