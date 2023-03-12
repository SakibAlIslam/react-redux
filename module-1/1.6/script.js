//action indetifiers
const INCREMENT = "increment";
const DECREMENT = "decrement";

//action creators
const increment = (payload) => {
    return { type: INCREMENT, payload: payload }
}

const decrement = (payload) => {
    return { type: DECREMENT, payload: payload }
}

// intial state
const initialState = {
  value: 0,
};

//create reducer function businees logic
const counterReducer = (state = initialState, action) => {
  if (action.type === INCREMENT) {
    return {
      ...state,
      value: state.value + action?.payload,
    };
  } else if (action.type === DECREMENT) {
    return {
      ...state,
      value: state.value - action?.payload,
    };
  } else {
    return { ...state };
  }
};

//create store
const store = Redux.createStore(counterReducer);

const render = () => {
  const state = store.getState();
  document.getElementById("counter").innerHTML = state?.value.toString();
};

//render initial state
render();

//subscribe to store
store.subscribe(render);

// button click events
document.getElementById("increment").addEventListener("click", () => {
  store.dispatch(increment(5));
});

document.getElementById("decrement").addEventListener("click", () => {
  store.dispatch(decrement(2));
});
