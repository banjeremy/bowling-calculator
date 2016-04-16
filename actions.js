/* ACTION TYPES */

export const types = {
  ROLL: 'ROLL',
};

/* ACTION CREATORS */

export function roll(pinfall) {
  return {
    type: types.ROLL,
    pinfall,
  };
}
