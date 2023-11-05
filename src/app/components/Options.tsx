'use client';
import { useState } from "react";
import { Word } from "./Sentences";


export const Options = ({options}:{options:Word[]}) => {

    const [toComposeArray, setToComposeArray] = useState<Word[]>(options)


    {toComposeArray.map((word, index) => {
        return (
          <span
            key={index}
            className={`hover:cursor-pointer text-1xl text-gray-700 p-2 border border-stone-900 rounded-md ${
              word.isPicked && "opacity-20 pointer-events-none"}
              ${word.state === 'correct' && 'bg-green-200 opacity-100 border-green-500 text-green-500 '}
              ${word.state === 'wrong' && 'bg-red-200 opacity-100 border-red-500 text-red-500'}`}
          >
            {word.text}
          </span>
        );
      })}

}