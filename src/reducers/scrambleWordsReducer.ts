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
) => {
  switch (action.type) {
    default:
      return state;
  }
};

export { scrambledWordReducer, getInitialState };
