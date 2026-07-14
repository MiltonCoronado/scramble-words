import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Props = {
  guess: string;
  setGuess: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  disabled: boolean;
  maxLength: number;
};

const GuessForm: FC<Props> = ({
  guess,
  setGuess,
  onSubmit,
  disabled,
  maxLength,
}) => {
  return (
    <form onSubmit={onSubmit} className="mb-6">
      <div className="space-y-4">
        <div>
          <label
            htmlFor="guess"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Adivina la palabra
          </label>
          <Input
            id="guess"
            type="text"
            value={guess}
            onChange={(event) =>
              setGuess(event.target.value.toUpperCase().trim())
            }
            placeholder="Ingresa tu palabra..."
            className="text-center text-lg font-semibold h-12 border-2 border-indigo-200 focus:border-indigo-500 transition-colors"
            maxLength={maxLength}
            disabled={disabled}
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
          disabled={!guess.trim() || disabled}
        >
          Enviar Adivinanza
        </Button>
      </div>
    </form>
  );
};

export { GuessForm };
