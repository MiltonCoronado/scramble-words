import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import { SkipForward, Play } from 'lucide-react';

type Props = {
  onSkip: () => void;
  onPlayAgain: () => void;
  skipCounter: number;
  maxSkips: number;
  isGameOver: boolean;
};

const ActionButtons: FC<Props> = ({
  onSkip,
  onPlayAgain,
  skipCounter,
  maxSkips,
  isGameOver,
}) => (
  <div className="grid grid-cols-2 gap-3">
    <Button
      onClick={onSkip}
      variant="outline"
      className="border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
      disabled={isGameOver || skipCounter >= maxSkips}
    >
      <SkipForward className="w-4 h-4" />
      Saltar ({skipCounter} / {maxSkips})
    </Button>
    <Button
      onClick={onPlayAgain}
      variant="outline"
      className="border-2 border-indigo-300 hover:border-indigo-400 hover:bg-indigo-50 text-indigo-600 transition-colors flex items-center justify-center gap-2"
    >
      <Play className="w-4 h-4" />
      Jugar de nuevo
    </Button>
  </div>
);

export { ActionButtons };
