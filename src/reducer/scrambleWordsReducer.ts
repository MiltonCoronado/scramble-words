import { GAME_WORDS, scrambleWord, shuffleArray } from '../utils/data';

interface ScrambleWordsState {
  currentWord: string;
  errorCounter: number;
  guess: string;
  isGameOver: boolean;
  maxAllowErrors: number;
  maxSkips: number;
  points: number;
  scrambledWord: string;
  skipCounter: number;
  words: string[];
  totalWords: number;
}

const getInitialState = (): ScrambleWordsState => {
  const shuffledWords = shuffleArray([...GAME_WORDS]);

  return {
    currentWord: shuffledWords[0],
    errorCounter: 0,
    guess: '',
    isGameOver: false,
    maxAllowErrors: 3,
    maxSkips: 3,
    points: 0,
    scrambledWord: scrambleWord(shuffledWords[0]),
    skipCounter: 0,
    words: shuffledWords,
    totalWords: shuffledWords.length,
  };
};

type ScrambleWordsAction =
  | { type: 'SET_GUESS'; payload: string }
  | { type: 'CHECK_ANSWER' }
  | { type: 'START_NEW_GAME'; payload: ScrambleWordsState }
  | { type: 'SKIP_WORD' };

const scrambledWordReducer = (
  state: ScrambleWordsState,
  action: ScrambleWordsAction,
): ScrambleWordsState => {
  switch (action.type) {
    case 'SET_GUESS':
      return {
        ...state,
        guess: action.payload.toUpperCase().trim(),
      };

    case 'CHECK_ANSWER': {
      if (state.currentWord === state.guess) {
        const newWord = state.words.slice(1);

        return {
          ...state,
          words: newWord,
          points: state.points + 1,
          guess: '',
          currentWord: newWord[0],
          scrambledWord: scrambleWord(newWord[0]),
        };
      }

      return {
        ...state,
        errorCounter: state.errorCounter + 1,
        isGameOver: state.errorCounter + 1 >= state.maxAllowErrors,
      };
    }

    case 'SKIP_WORD': {
      if (state.skipCounter >= state.maxSkips) return state;

      const updateWords = state.words.slice(1);

      return {
        ...state,
        skipCounter: state.skipCounter + 1,
        words: updateWords,
        currentWord: updateWords[0],
        scrambledWord: scrambleWord(updateWords[0]),
        guess: '',
      };
    }

    case 'START_NEW_GAME':
      return action.payload;

    default:
      return state;
  }
};

export { scrambledWordReducer, getInitialState };
