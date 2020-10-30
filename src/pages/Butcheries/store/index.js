import { createStore } from 'redux';

const INITIAL_STATE = {
  data: ''
}

function butcheries(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ADD_BUTCHERY_ID':
      return { data: [action.id] };
    default:
      return state;
  }
}

const store = createStore(butcheries);

export default store;
