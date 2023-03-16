const matchesContainerEl = document.querySelector(".all-matches");
const addNewMatchBtn = document.querySelector(".lws-addMatch");
const deleteMatchBtn = document.querySelector(".lws-addMatch");

//initial state
const initialState = [
  {
    id: 1,
    title: "Match 1",
    increment: 0,
    decrement: 0,
    totalValue: 0,
  },
];

//define actions name
const ADD_MATCH = "ADD_MATCH";
const DELETE_MATCH = "DELETE_MATCH";

//reducer
const reducer = (state = initialState, action) => {
  if (action?.type === ADD_MATCH) {
    return [
      ...state,
      {
        id: state?.length + 1,
        title: `Match ${state?.length + 1}`,
        increment: 0,
        decrement: 0,
        totalValue: 0,
      },
    ];
  } else if (action?.type === DELETE_MATCH) {
    return state.filter((match) => match.id !== action?.payload?.id);
  } else {
    return state;
  }
};

//create redux store
const store = Redux.createStore(reducer);

//render function
const render = () => {
  const matchState = store.getState();
  matchState?.length <= 1 ? matchesContainerEl.innerHTML = '' : '';
  const matchElement = document.createElement("div");
  matchElement.className = 'newMatch';
  matchState.forEach((data) => {
    matchElement.innerHTML = `
        <div class="match">
            <div class="wrapper">
                <button class="lws-delete" type="button">
                    <img src="./image/delete.svg" alt="" />
                </button>
                <h3 class="lws-matchName">${data?.title}</h3>
            </div>
            <div class="inc-dec">
                <form class="incrementForm">
                    <h4>Increment</h4>
                    <input
                        type="number"
                        name="increment"
                        class="lws-increment"
                        value="${data?.increment}"
                    />
                </form>
                <form class="decrementForm">
                    <h4>Decrement</h4>
                    <input
                        type="number"
                        name="decrement"
                        class="lws-decrement"
                        value="${data?.decrement}"
                    />
                </form>
            </div>
            <div class="numbers">
                <h2 class="lws-singleResult">${data?.totalValue}</h2>
            </div>
        </div>
    `;
    matchElement.querySelector(".lws-delete").addEventListener("click", (e) => {
        console.log(data?.id)
        store.dispatch({ type: DELETE_MATCH, payload: { id: data?.id } });
    });
  });
  matchesContainerEl.appendChild(matchElement);
};

//intial call
render();

//subscribe to the redux store
store.subscribe(render);

//action dispatch..........
//-- add new match
addNewMatchBtn.addEventListener("click", () => {
  store.dispatch({
    type: ADD_MATCH,
  });
});
