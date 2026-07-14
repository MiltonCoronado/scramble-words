import type { FC } from 'react';

type Props = {
  title?: string;
  subtitle?: string;
  isGameOver: boolean;
  currentWord?: string;
};

const ScrambleHeader: FC<Props> = ({
  title = 'Palabras desordenadas',
  subtitle = 'Desordena las letras para encontrar la palabra!',
  isGameOver,
  currentWord,
}) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
        {title}
      </h1>
      <p className="text-gray-600">{subtitle}</p>
      {isGameOver && currentWord && (
        <div className="mt-2 text-red-500 font-semibold">
          Respuesta: {currentWord}
        </div>
      )}
    </div>
  );
};

export { ScrambleHeader };
