import { expect } from 'chai';
import { roll } from '../actions';
import { score } from '../reducers';

describe('score reducer', () => {
  const games = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map(roll),
    [9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9].map(roll),
    [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10].map(roll),
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 1, 0].map(roll),
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 1, 0].map(roll),
  ];

  it('should calculate the bowling score', () => {
    expect(games[0].reduce(score, undefined).totalScore).to.equal(0);
    expect(games[1].reduce(score, undefined).totalScore).to.equal(190);
    expect(games[2].reduce(score, undefined).totalScore).to.equal(300);
    expect(games[3].reduce(score, undefined).totalScore).to.equal(11);
    expect(games[4].reduce(score, undefined).totalScore).to.equal(12);
  });
});
