// Define the initial state
const initialState = {
    matches: [
      {
        id: 1,
        title: 'Match 1',
        increment: 0,
        decrement: 0,
        result: 0
      }
    ]
  };
  
  // Define the reducer function
  function reducer(state = initialState, action) {
    switch (action.type) {
      // add a new match to the state
      case 'ADD_MATCH':
        return {
          ...state,
          matches: [
            ...state.matches,
            {
              id: state.matches.length + 1,
              title: `Match ${state.matches.length + 1}`,
              increment: 0,
              decrement: 0,
              result: 0
            }
          ]
        };
      // update the increment value of a match
      case 'UPDATE_INCREMENT':
        return {
          ...state,
          matches: state.matches.map(match => {
            if (match.id === action.payload.id) {
              return {
                ...match,
                increment: action.payload.value,
                result: match.result + Number(action.payload.value)
              };
            } else {
              return match;
            }
          })
        };
      // update the decrement value of a match
      case 'UPDATE_DECREMENT':
        return {
          ...state,
          matches: state.matches.map(match => {
            if (match.id === action.payload.id) {
              return {
                ...match,
                decrement: action.payload.value,
                result: match.result - Number(action.payload.value)
              };
            } else {
              return match;
            }
          })
        };
      // reset all matches to their initial state
      case 'RESET':
        return {
          ...state,
          matches: state.matches.map(match => ({
            ...match,
            increment: 0,
            decrement:0
          }));