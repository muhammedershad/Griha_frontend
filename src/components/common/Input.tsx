import React from 'react';

interface Props {
  state: string | number;
  setState: (value: string | number) => void;
}

const Input: React.FC<Props> = ({ state, setState }) => {
  return (
    <input
      value={state}
      onChange={(e) => setState(e.target.value)}
      className="bg-gray-50 my-2 border max-w-lg border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    />
  );
};

export default Input;
