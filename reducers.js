import { types as actionTypes } from './actions';
/* REDUCERS */

export function frame(state = {
  rolls: [],
  score: 0,
  mark: null,
}, action) {
  let nextState;
  let totalPinfall;

  switch (action.type) {
    case actionTypes.ROLL:
      nextState = {
        ...state,
        rolls: [
          ...state.rolls,
          action.pinfall,
        ],
      };

      totalPinfall = nextState.rolls.reduce((a, b) => a + b);

      if (nextState.rolls.length === 1 && totalPinfall === 10) {
        nextState.mark = 'strike';
      } else if (nextState.rolls.length === 2) {
        if (totalPinfall === 10) {
          nextState.mark = 'spare';
        } else {
          nextState.mark = 'open';
        }
      }
      nextState.score = totalPinfall;

      return nextState;
    default:
      return state;
  }
}

export function frames(state = [], action) {
  let nextState;
  let currentFrame;
  let previousFrame;
  let currentFrameIndex = state.length > 0
    ? state.length - 1
    : 0;

  if (state[currentFrameIndex] && state[currentFrameIndex].mark) {
    currentFrameIndex++;
  }

  const previousFrameIndex = currentFrameIndex - 1;

  switch (action.type) {
    case actionTypes.ROLL:
      currentFrame = frame(state[currentFrameIndex], action);
      previousFrame = state[previousFrameIndex];

      if (previousFrame) {
        if (previousFrame.mark === 'strike') {
          previousFrame = {
            ...previousFrame,
            score: previousFrame.score + action.pinfall,
          };
        } else if (previousFrame.mark === 'spare' &&
                  currentFrame.rolls.length < 2) {
          previousFrame = {
            ...previousFrame,
            score: previousFrame.score + action.pinfall,
          };
        }

        nextState = [
          ...state.slice(0, previousFrameIndex),
          previousFrame,
          currentFrame,
        ];
      } else {
        nextState = [
          ...state.slice(0, currentFrameIndex),
          currentFrame,
        ];
      }

      return nextState;
    default:
      return state;
  }
}

// export default function score(
//   state = {
//     currentFrameIndex: 0,
//     totalScore: 0,
//     frames: [],
//   },
//   action
// ) {
//   let currentFrame;
//   switch (action.type) {
//     case ROLL:
//     if (!state.frames.length) {
//       currentFrame = frame(state.frames, action);
//     }
//     default:
//       return state;
//   }
// }
