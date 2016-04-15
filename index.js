/* ACTIONS */
const ROLL = 'ROLL';
function roll(pinfall) {
  return {
    type: ROLL,
    pinfall,
  };
}

export const actions = {
  roll,
};

/* REDUCERS */
const initialState = {
  currentFrame: 0,
  totalScore: 0,
  frames: [{
    rolls: [],
    score: 0,
    mark: '',
  }],
};

export default function score(
  state = initialState,
  action
) {
  switch (action) {
    case ROLL:
      // TODO: calculate score
    default:
      return state;
  }
}
