// Define the initial state
const initialState = [
    {
      id: 1,
      matchNumber: 'Match 1',
      incrementValue: 0,
      decrementValue: 0,
      resultValue: 0,
    },
  ];
  
  // Define the Redux actions
  const ADD_MATCH = 'ADD_MATCH';
  const UPDATE_MATCH = 'UPDATE_MATCH';
  const DELETE_MATCH = 'DELETE_MATCH';
  const RESET_MATCHES = 'RESET_MATCHES';
  
  // Define the Redux reducer
  function matchesReducer(state = initialState, action) {
    switch (action.type) {
      case ADD_MATCH:
        return [
          ...state,
          {
            id: state.length + 1,
            matchNumber: `Match ${state.length + 1}`,
            incrementValue: 0,
            decrementValue: 0,
            resultValue: 0,
          },
        ];
      case UPDATE_MATCH:
        return state.map((match) => {
          if (match.id === action.payload.id) {
            return {
              ...match,
              [action.payload.field]: action.payload.value,
              resultValue: parseInt(match.resultValue) + parseInt(action.payload.value),
            };
          } else {
            return match;
          }
        });
      case DELETE_MATCH:
        return state.filter((match) => match.id !== action.payload);
      case RESET_MATCHES:
        return initialState;
      default:
        return state;
    }
  }
  
  // Create the Redux store
  const store = Redux.createStore(matchesReducer);
  
  // Render the initial state
  render();
  
  // Subscribe to the store changes and re-render on every change
  store.subscribe(render);
  
  // Define the render function to update the HTML with the current state
  function render() {
    const container = document.querySelector('.all-matches');
    const matches = store.getState();
  
    // Remove all existing match rows
    container.innerHTML = '';
  
    // Render each match row
    matches.forEach((match) => {
      const matchRow = document.createElement('div');
      matchRow.classList.add('match');
      matchRow.innerHTML = `
        <div class="wrapper">
          <button class="lws-delete">
            <img src="./image/delete.svg" alt="" />
          </button>
          <h3 class="lws-matchName">${match.matchNumber}</h3>
        </div>
        <div class="inc-dec">
          <form class="incrementForm">
            <h4>Increment</h4>
            <input
              type="number"
              name="increment"
              class="lws-increment"
              value="${match.incrementValue}"
              onchange="handleInputChange(${match.id}, 'incrementValue', event.target.value)"
            />
          </form>
          <form class="decrementForm">
            <h4>Decrement</h4>
            <input
              type="number"
              name="decrement"
              class="lws-decrement"
              value="${match.decrementValue}"
              onchange="handleInputChange(${match.id}, 'decrementValue', event.target.value)"
            />
          </form>
        </div>
        <div class="numbers">
          <h2 class="lws-singleResult">${match.resultValue}</h2>
        </div>
      `;
  
      // Add an event listener to the delete button
      matchRow.querySelector('.lws-delete').addEventListener('click', () => {
        store.dispatch({ type: DELETE_MATCH, payload: match.id });
      });
  
      // Append the match row to the container
      container.appendChild(matchRow);
    });
  
    // Render the "Add Another Match" and "Reset" buttons
    const addMatchBtn = document.querySelector('.lws-addMatch');
    addMatchBtn.addEventListener('click', () => {
        store.dispatch({ type: ADD_MATCH });
        });
  }