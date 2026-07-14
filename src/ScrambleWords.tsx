import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import confetti from 'canvas-confetti';

import { GAME_WORDS, scrambleWord, shuffleArray } from './utils/data';
import { ScrambleHeader } from './components/scrambleWords/ScrambleHeader';
import { ScrambledWordDisplay } from './components/scrambleWords/ScrambleWordDisplay';
import { GuessForm } from './components/scrambleWords/GuessForm';
import { StatsPanel } from './components/scrambleWords/StatsPanel';
import { ActionButtons } from './components/scrambleWords/ActionButtons';
import { FooterWords } from './components/scrambleWords/FooterWords';

const ScrambleWords = () => {
  const [words, setWords] = useState(shuffleArray(GAME_WORDS));
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [scrambledWord, setScrambledWord] = useState(scrambleWord(currentWord));

  const [guess, setGuess] = useState('');
  const [points, setPoints] = useState(16);
  const [errorCounter, setErrorCounter] = useState(0);
  const [maxAllowErrors] = useState(3);

  const [skipCounter, setSkipCounter] = useState(0);
  const [maxSkips] = useState(3);

  const [isGameOver, setIsGameOver] = useState(false);

  const handleGuessSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (guess === currentWord) {
      const newWords = words.slice(1);

      confetti({ particleCount: 100, spread: 120, origin: { y: 0.6 } });

      setPoints((prev) => prev + 1);
      setGuess('');
      setWords(newWords);
      setCurrentWord(newWords[0]);
      setScrambledWord(scrambleWord(newWords[0]));
      return;
    }

    setErrorCounter((prev) => prev + 1);
    setGuess('');

    if (errorCounter + 1 >= maxAllowErrors) {
      setIsGameOver(true);
    }
  };

  const handleSkip = () => {
    if (skipCounter >= maxSkips) return;

    const updateWords = words.slice(1);

    setSkipCounter((prev) => prev + 1);
    setWords(updateWords);
    setCurrentWord(updateWords[0]);
    setScrambledWord(scrambleWord(updateWords[0]));
    setGuess('');
  };

  const handlePlayAgain = () => {
    const newArray = shuffleArray(GAME_WORDS);

    setPoints(0);
    setErrorCounter(0);
    setGuess('');
    setWords(newArray);
    setCurrentWord(newArray[0]);
    setIsGameOver(false);
    setSkipCounter(0);
    setScrambledWord(scrambleWord(newArray[0]));
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
              total={GAME_WORDS.length}
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
