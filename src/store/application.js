import actionCreator from '../utils/actionCreator';

const initialState = {
  about: false,
  game: true,
  leaderboard: false,
  savedSolutions: false,
};

const APPLICATION_SHOW_ABOUT = 'APPLICATION_SHOW_ABOUT';
const APPLICATION_SHOW_GAME = 'APPLICATION_SHOW_GAME';
const APPLICATION_SHOW_LEADERBOARD = 'APPLICATION_SHOW_LEADERBOARD';
const APPLICATION_SHOW_SAVED_SOLUTIONS = 'APPLICATION_SHOW_SAVED_SOLUTIONS';

export const applicationShowAbout = actionCreator(APPLICATION_SHOW_ABOUT);
export const applicationShowGame = actionCreator(APPLICATION_SHOW_GAME);
export const applicationShowLeaderboard = actionCreator(APPLICATION_SHOW_LEADERBOARD);
export const applicationShowSavedSolutions = actionCreator(APPLICATION_SHOW_SAVED_SOLUTIONS);

export default (state = initialState, { type }) => {
  switch (type) {
  case APPLICATION_SHOW_ABOUT:
    return {
      ...state,
      about: true,
      game: false,
      leaderboard: false,
      savedSolutions: false,
    };
  case APPLICATION_SHOW_GAME:
    return {
      ...state,
      about: false,
      game: true,
      leaderboard: false,
      savedSolutions: false,
    };
  case APPLICATION_SHOW_LEADERBOARD:
    return {
      ...state,
      about: false,
      game: false,
      leaderboard: true,
      savedSolutions: false,
    };
  case APPLICATION_SHOW_SAVED_SOLUTIONS:
    return {
      ...state,
      about: false,
      game: false,
      leaderboard: false,
      savedSolutions: true,
    };
  default:
    return state;
  }
};
