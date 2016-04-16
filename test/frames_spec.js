import { expect } from 'chai';
import { roll } from '../actions';
import { frame, frames } from '../reducers';
import deepFreeze from 'deep-freeze';

describe('frame reducer', () => {
  it('sets initial state', () => {
    const stateBefore = undefined;
    const action = { type: null };
    const stateAfter = {
      rolls: [],
      score: 0,
      mark: null,
    };

    expect(frame(stateBefore, action)).to.deep.equal(stateAfter);
  });

  it('adds pinfalls', () => {
    const stateBefore = undefined;
    const action = roll(1);
    const stateAfter = {
      rolls: [1],
      score: 1,
      mark: null,
    };

    deepFreeze(action);

    expect(frame(stateBefore, action)).to.deep.equal(stateAfter);
  });

  it('recognizes strikes', () => {
    const stateBefore = {
      rolls: [],
      score: 0,
      mark: null,
    };
    const action = roll(10);
    const stateAfter = {
      rolls: [10],
      score: 10,
      mark: 'strike',
    };

    deepFreeze(action);

    expect(frame(stateBefore, action)).to.deep.equal(stateAfter);
  });

  it('recognizes spares', () => {
    const stateBefore = {
      rolls: [1],
      score: 1,
      mark: null,
    };
    const action = roll(9);
    const stateAfter = {
      rolls: [1, 9],
      score: 10,
      mark: 'spare',
    };

    deepFreeze(action);

    expect(frame(stateBefore, action)).to.deep.equal(stateAfter);
  });

  it('recognizes open and calculates score', () => {
    const stateBefore = {
      rolls: [3],
      score: 3,
      mark: null,
    };
    const action = roll(4);
    const stateAfter = {
      rolls: [3, 4],
      score: 7,
      mark: 'open',
    };

    deepFreeze(action);

    expect(frame(stateBefore, action)).to.deep.equal(stateAfter);
  });
});

describe('frames reducer', () => {
  it('adds a new frame if none exists', () => {
    const stateBefore = [];
    const action = roll(4);
    const stateAfter = [{
      rolls: [4],
      score: 4,
      mark: null,
    }];

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(frames(stateBefore, action)).to.deep.equal(stateAfter);
  });

  it('updates the last frame if the last frame has not ended', () => {
    const stateBefore = [{
      rolls: [4],
      score: 4,
      mark: null,
    }];
    const action = roll(6);
    const stateAfter = [{
      rolls: [4, 6],
      score: 10,
      mark: 'spare',
    }];

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(frames(stateBefore, action)).to.deep.equal(stateAfter);
  });

  it('adds a new frame if the last frame has ended', () => {
    const stateBefore = [{
      rolls: [4, 3],
      score: 7,
      mark: 'open',
    }];
    const action = roll(8);
    const stateAfter = [{
      rolls: [4, 3],
      score: 7,
      mark: 'open',
    }, {
      rolls: [8],
      score: 8,
      mark: null,
    }];

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(frames(stateBefore, action)).to.deep.equal(stateAfter);
  });

  it('calculates the score of strike frames', () => {
    const stateBefore = [{
      rolls: [10],
      score: 10,
      mark: 'strike',
    }];
    const action1 = roll(7);
    const action2 = roll(2);

    const stateAfter = [{
      rolls: [10],
      score: 19,
      mark: 'strike',
    }, {
      rolls: [7, 2],
      score: 9,
      mark: 'open',
    }];

    deepFreeze(stateBefore);
    deepFreeze(action1);
    deepFreeze(action2);

    expect(frames(frames(stateBefore, action1), action2)).to.deep.equal(stateAfter);
  });

  it('calculates the score of spare frames', () => {
    const stateBefore = [{
      rolls: [9, 1],
      score: 10,
      mark: 'spare',
    }];
    const action1 = roll(2);
    const action2 = roll(7);

    const stateAfter = [{
      rolls: [9, 1],
      score: 12,
      mark: 'spare',
    }, {
      rolls: [2, 7],
      score: 9,
      mark: 'open',
    }];

    deepFreeze(stateBefore);
    deepFreeze(action1);
    deepFreeze(action2);

    expect(frames(frames(stateBefore, action1), action2)).to.deep.equal(stateAfter);
  });
});
