"use client";

import { useEffect, useState, useCallback, useLayoutEffect, useMemo, use } from "react";
import { Sentence } from "./Game";

export type Word = {
  text: string;
  id: number;
  isPicked: boolean;
  state:'correct' | 'wrong' | 'neutral'
};

interface Props {
    sentence: Sentence;
    options: Word[];
    next: () => void;
}


export const  Sentences = ({ sentence, next, options }:Props) => {

const { prompt } = sentence;

  const [toComposeArray, setToComposeArray] = useState<Word[]>(options)
  const [composedSentence, setComposedSentence] = useState<Word[]>([]);
  const [score, setScore] = useState(0);
  
  useEffect(() => {
    setToComposeArray(options)
    
  },[options])

  const pickWord = (pickedWord: Word) => {
    setComposedSentence((prev) => {
      const newSentence = [...prev];
      newSentence.push(pickedWord);
      return newSentence;
    });

    
    setToComposeArray((prev) => {
      const newArray = prev.map((word) =>
      word.id === pickedWord.id ? { ...word, isPicked: true } : word
      );
      return newArray;
    })

};


  const removeWord = (wordToRemove: Word) => {
    setComposedSentence((prev) => {
      const newSentence = prev.filter((word) => word.id !== wordToRemove.id);
      return newSentence;
    });


    setToComposeArray((prev) => {
      const newArray = prev.map((word) =>
        word.id === wordToRemove.id ? { ...word, isPicked: false } : word
      );
      return newArray;
    });
  };
  
  const handleNext = useCallback(() => {
    setComposedSentence([])
    next()
  } , [next])

  const checkAnswer = useCallback((originalSentence:string, composedSentence:Record<any,string>) => {
    const {prompt, answer} = composedSentence
    const composedSentenceArray = prompt.split(' ').concat(answer.split(' ')).join(' ')
    const isCorrect =  originalSentence === composedSentenceArray
    
    if(isCorrect) {
      setComposedSentence(prev => prev.map(word => word.state === 'neutral' ? {...word, state:'correct'} : word))
      setTimeout(() => {
        handleNext()
      }, 800)
      
    } else {
      setComposedSentence(prev => prev.map(word => word.state === 'neutral' ? {...word, state:'wrong'} : word))}

  }, [handleNext]);



  useEffect(() => {
    const everyWordIsPicked = toComposeArray.every(word => word.isPicked)
    if (everyWordIsPicked) {
    checkAnswer(sentence.sentence, {prompt: prompt, answer: composedSentence.map(word => word.text).join(' ')})  
    }
  },[checkAnswer, composedSentence, prompt, sentence.sentence, toComposeArray])


  



  return (
    <section className="flex flex-col gap-1 items-center justify-center min-h-[700px] p-24">
      <div>
        <h1 className="text-3xl">Score: {score}</h1>
      </div>
      <p className="self-start text-sm text-stone-600">Finish the Saying</p>
      <h1 className="self-start text-2xl ">{prompt}</h1>
      <div className="block self-start min-w-full mt-4 min-h-24 h-12 ">
        {composedSentence.map((word, index) => {
          return (
            <span
              onClick={() => removeWord(word)}
              key={index}
              className={`text-2xl  mr-2 hover:cursor-pointer text-1xl text-gray-700 p-2 min-w-[50px]  border rounded-md
              ${word.state === 'correct' && ' opacity-100  text-green-500 border-green-500 '}
              ${word.state === 'wrong' && ' opacity-100  text-red-500 border-red-500 '}
              ${word.state === 'neutral' && '  text-stone-900 border-stone-900 '}
              `}
            >
              {word.text}
            </span>
          );
        })}
      </div>

      <div className="mt-24 flex gap-2 ">
        {toComposeArray.map((word, index) => {
          return (
            <span
              onClick={() => pickWord(word)}
              key={index}
              className={`hover:cursor-pointer text-1xl text-gray-700 p-2 min-w-[50px] flex items-center justify-center border border-stone-900 rounded-md ${
                word.isPicked && "opacity-20 pointer-events-none"}
               `}
            >
              {word.text}
            </span>
          );
        })}
      </div>

      <button onClick={() => handleNext()}>NEXT</button>
    </section>
  );
};


