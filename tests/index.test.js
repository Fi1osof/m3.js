import expect from 'expect'
import * as m3 from 'src/index'

const functions = [
  'degToRad',
  'distance',
  'dot',
  'identity',
  'inverse',
  'multiply',
  'normalize',
  'projection',
  'radToDeg',
  'reflect',
  'rotation',
  'rotate',
  'scaling',
  'scale',
  'transformPoint',
  'translation',
  'translate',
  'project',
];

describe('Check all required functions', () => {

  functions.map(name => {
    it(`Check function ${name} exist`, () => {
      expect(!!m3[name]).toBe(true);
    })
  });

})
