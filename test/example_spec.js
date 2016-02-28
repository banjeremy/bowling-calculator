import { expect } from 'chai';

describe('example', () => {
  it('should compare 1 and 1', () => {
    expect(1).to.equal(1);
  });

  it('should compare 1 and 1 asynchronously', (done) => {
    setTimeout(() => {
      expect(1).to.equal(1);
      done();
    }, 10);
  });
});
