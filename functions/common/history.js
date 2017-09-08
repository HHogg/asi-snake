const manipulateHistory = (history, n, predicate) => [
  ...history.slice(0, n),
  predicate(history[n]),
  ...history.slice(n + 1),
];

const createBlock = (history, n, snake, point) =>
  manipulateHistory(history, n, () => [
    point, snake, [],
  ]);

const moveForwards = (history, n, newSnake, tail) =>
  manipulateHistory(history, n, ([ point,, tails ]) => [
    point, newSnake, (tail ? [tail, ...tails] : tails),
  ]);

const moveBackwards = (history, n) =>
  manipulateHistory(history, n, ([ point, snake, tails ]) => [
    point, [...snake.slice(1), tails[0]], tails.slice(1),
  ]);

module.exports = {
  manipulateHistory,
  createBlock,
  moveForwards,
  moveBackwards,
};
