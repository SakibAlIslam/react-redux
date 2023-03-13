//intial state
const initialState = [
  {
    id: 1,
    title: "Match 1",
    increment: 0,
    decrement: 0,
    resultValue: 0,
  },
];

// Define the Redux actions
const ADD_MATCH = "ADD_MATCH";
const UPDATE_MATCH = "UPDATE_MATCH";
const DELETE_MATCH = "DELETE_MATCH";
const RESET_MATCHES = "RESET_MATCHES";

//add new mathces
const matchesReducer = (state = initialState, action) => {
  if (action.type === ADD_MATCH) {
    return [
      ...state,
      {
        id: state?.length + 1,
        title: `Match ${state?.length + 1}`,
        increment: 0,
        decrement: 0,
        resultValue: 0,
      },
    ];
  } else if (action.type === DELETE_MATCH) {
    return state.filter((match) => match.id !== action.payload);
  } else {
    return state;
  }
};

const store = Redux.createStore(matchesReducer);

const render = () => {
  const matches = store.getState();
  const matchesContainer = document.querySelector(".all-matches");
  matchesContainer.innerHTML = "";
  matches.forEach((match) => {
    const matchElement = document.createElement("div");
    matchElement.className = "match";
    matchElement.innerHTML = `
        <div class="wrapper">
          <button class="lws-delete">
            <img src="./image/delete.svg" alt="" />
          </button>
          <h3 class="lws-matchName">${match.title}</h3>
        </div>
        <div class="inc-dec">
          <form class="incrementForm">
            <h4>Increment</h4>
            <input type="number" name="increment" class="lws-increment" value="${match.increment}" />
          </form>
          <form class="decrementForm">
            <h4>Decrement</h4>
            <input type="number" name="decrement" class="lws-decrement" value="${match.decrement}" />
          </form>
        </div>
        <div class="numbers">
          <h2 class="lws-singleResult">${match.resultValue}</h2>
        </div>
      `;
    matchElement.querySelector(".lws-delete").addEventListener("click", () => {
      store.dispatch({
        type: DELETE_MATCH,
        payload: match?.id,
      });
    });
    matchesContainer.appendChild(matchElement);
  });
};

render();

store.subscribe(render);

//add matches
const addAnotherMatchedBtn = document.querySelector(".lws-addMatch");
addAnotherMatchedBtn.addEventListener("click", () => {
  store.dispatch({ type: ADD_MATCH });
});
