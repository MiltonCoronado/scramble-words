import React, { useReducer } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import confetti from 'canvas-confetti';

import { ScrambleHeader } from './components/scrambleWords/ScrambleHeader';
import { ScrambledWordDisplay } from './components/scrambleWords/ScrambleWordDisplay';
import { GuessForm } from './components/scrambleWords/GuessForm';
import { StatsPanel } from './components/scrambleWords/StatsPanel';
import { ActionButtons } from './components/scrambleWords/ActionButtons';
import { FooterWords } from './components/scrambleWords/FooterWords';
import {
  getInitialState,
  scrambledWordReducer,
} from './reducers/scrambleWordsReducer';

const ScrambleWords = () => {
  const [state, dispatch] = useReducer(scrambledWordReducer, getInitialState());

  const {
    words,
    currentWord,
    errorCounter,
    guess,
    isGameOver,
    maxAllowErrors,
    maxSkips,
    points,
    scrambledWord,
    skipCounter,
    totalWords,
  } = state;

  const handleGuessSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (guess === currentWord) {
      confetti({ particleCount: 100, spread: 120, origin: { y: 0.6 } });
    }

    dispatch({ type: 'CHECK_ANSWER' });
  };

  const setGuess = (value: string) => {
    dispatch({ type: 'SET_GUESS', payload: value });
  };

  const handleSkip = () => {
    dispatch({ type: 'SKIP_WORD' });
  };

  const handlePlayAgain = () => {
    dispatch({ type: 'START_NEW_GAME', payload: getInitialState() });
  };

  if (words.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto">
          <ScrambleHeader isGameOver={isGameOver} currentWord={currentWord} />
          <p className="text-gray-600">No hay palabras para jugar</p>
          <br />
          <div>Puntaje: {points}</div>
          <br />
          <div>Errores: {errorCounter}</div>
          <br />
          <div>Saltos: {skipCounter}</div>
          <br />
          <div>
            <button onClick={handlePlayAgain} className="btn">
              Jugar de nuevo
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <ScrambleHeader isGameOver={isGameOver} currentWord={currentWord} />
        <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
          <CardContent className="p-8">
            <ScrambledWordDisplay scrambledWord={scrambledWord} />

            <GuessForm
              guess={guess}
              setGuess={setGuess}
              onSubmit={handleGuessSubmit}
              disabled={isGameOver}
              maxLength={scrambledWord.length}
            />

            <StatsPanel
              points={points}
              total={totalWords}
              errorCounter={errorCounter}
              maxAllowErrors={maxAllowErrors}
            />

            <ActionButtons
              onSkip={handleSkip}
              onPlayAgain={handlePlayAgain}
              skipCounter={skipCounter}
              maxSkips={maxSkips}
              isGameOver={isGameOver}
            />
          </CardContent>
        </Card>

        <FooterWords words={words} />
      </div>
    </div>
  );
};

export { ScrambleWords };
