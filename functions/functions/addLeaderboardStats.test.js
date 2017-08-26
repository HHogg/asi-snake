import { VM } from 'vm2';
import { FN_TIMEOUT_SECONDS } from '../config';
import { createGetValues, getStats, runSolution } from './addLeaderboardStats';

const mockCell = [4, 4];
const mockSnake = [[8, 4], [7, 4], [6, 4], [5, 4]];
const mockPoint = [5, 5];

const validSolution = `
  function randomFn() {}
  function heuristic(cell, xMax, yMax, snake, point) {
    return Math.abs(cell[0] - point[0]) + Math.abs(cell[1] - point[1]);
  }
`;

const nonIntegerSolution = `
  function heuristic() {
    return null;
  }
`;

const invalidSolution = `
  function notCalledHeuristic() {
    return 0;
  }
`;

const emptySolution = '';
let vm;

describe('addLeaderboardStats:', () => {
  beforeEach(() => {
    vm = new VM({
      timeout: FN_TIMEOUT_SECONDS * 1000,
      sandbox: {},
    });
  });

  describe('createGetValues:', () => {
    it('creates a callable function', () => {
      expect(typeof createGetValues(vm, validSolution)).toBe('function');
    });

    it('returns the value from the heuristic function', () => {
      expect(isNaN(createGetValues(vm, validSolution)(mockCell, mockSnake, mockPoint))).toBe(false);
    });

    it('handles invalid solution', () => {
      expect(() => createGetValues(vm, invalidSolution)(mockCell, mockSnake, mockPoint))
        .toThrow('No function called "heuristic" was found.');
    });

    it('handles empty solution', () => {
      expect(() => createGetValues(vm, emptySolution)(mockCell, mockSnake, mockPoint))
        .toThrow('No function called "heuristic" was found.');
    });
  });

  describe('runSolution:', () => {
    it('handles valid solution', () => {
      const { average, points, score } = runSolution(createGetValues(vm, validSolution));

      expect(average).toBeGreaterThan(0);
      expect(points).toBeGreaterThan(0);
      expect(score).toBeGreaterThan(0);
    });

    it('handles non-integer solution', () => {
      expect(() => runSolution(createGetValues(vm, nonIntegerSolution)))
        .toThrow('The heuristic function returned NaN.');
    });

    it('handles invalid solution', () => {
      expect(() => runSolution(createGetValues(vm, invalidSolution)))
        .toThrow('No function called "heuristic" was found.');
    });

    it('handles empty solution', () => {
      expect(() => runSolution(createGetValues(vm, emptySolution)))
        .toThrow('No function called "heuristic" was found.');
    });
  });

  describe('getStats:', () => {
    it('handles valid solution', () => {
      const { average, points, score } = getStats(validSolution);

      expect(average).toBeGreaterThan(0);
      expect(points).toBeGreaterThan(0);
      expect(score).toBeGreaterThan(0);
    });

    it('handles non-integer solution', () => {
      expect(() => getStats(nonIntegerSolution))
        .toThrow('The heuristic function returned NaN.');
    });

    it('handles invalid solution', () => {
      expect(() => getStats(invalidSolution))
        .toThrow('No function called "heuristic" was found.');
    });

    it('handles empty solution', () => {
      expect(() => getStats(emptySolution))
        .toThrow('No function called "heuristic" was found.');
    });
  });
});
