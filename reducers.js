import { types as actionTypes } from './actions';

export function frame(
  state = {
    rolls: [],
    score: null,
    mark: null,
  },
  action) {
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

      return nextState;
    default:
      return state;
  }
}

export function frames(state = [], action) {
  let nextState;
  let currentFrame;
  let currentFrameIndex = state.length > 0
    ? state.length - 1
    : 0;

  if (state[currentFrameIndex] && state[currentFrameIndex].mark) {
    currentFrameIndex++;
  }

  switch (action.type) {
    case actionTypes.ROLL:
      currentFrame = frame(state[currentFrameIndex], action);

      nextState = [
        ...state.slice(0, currentFrameIndex),
        currentFrame,
      ];

      // TODO: optimize: only recalculate the score for the previous 3 frames
      nextState = nextState.map((f, i) => {
        const nextRolls = nextState.slice(i + 1)
          .reduce((a, b) => a.concat(b.rolls), []);
        let nextFrame;

        if (f.mark === 'strike' && nextRolls.length >= 2) {
          nextFrame = {
            ...f,
            score: f.rolls.reduce((a, b) => a + b) + nextRolls[0] + nextRolls[1],
          };
        } else if (f.mark === 'spare' && nextRolls.length >= 1) {
          nextFrame = {
            ...f,
            score: f.rolls.reduce((a, b) => a + b) + nextRolls[0],
          };
        } else if (f.mark === 'open') {
          // console.log('marked open');
          nextFrame = {
            ...f,
            score: f.rolls.reduce((a, b) => a + b),
          };
        } else {
          nextFrame = f;
        }

        return nextFrame;
      });

      return nextState;
    default:
      return state;
  }
}

export function score(
  state = {
    totalScore: 0,
    frames: [],
  },
  action
) {
  let nextFrames;

  switch (action.type) {
    case actionTypes.ROLL:
      nextFrames = frames(state.frames, action);

      return {
        ...state,
        totalScore: nextFrames.slice(0, 10).reduce((a, b) => a + b.score, 0),
        frames: nextFrames,
      };
    default:
      return state;
  }
}
