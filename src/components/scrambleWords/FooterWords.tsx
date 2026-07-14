import type { FC } from 'react';

type Props = {
  words: string[];
};

const FooterWords: FC<Props> = ({ words }) => {
  return (
    <div className="text-center mt-6">
      <p className="text-sm text-gray-500">
        Desafíate con palabras desordenadas!
        <br />
        <br />
        {words.join(', ')}
      </p>
    </div>
  );
};

export { FooterWords };
