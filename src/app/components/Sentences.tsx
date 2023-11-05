"use client";

import { useEffect, useState, useCallback, useLayoutEffect, useMemo } from "react";
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
  const isEveryWordPicked = toComposeArray.every((word) => word.isPicked);
  
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
    const prompt = composedSentence.prompt
    const answer = composedSentence.answer
    const composedSentenceArray = prompt.split(' ').concat(answer.split(' ')).join(' ')
    const isCorrect =  originalSentence === composedSentenceArray

    if(isCorrect) {
      setToComposeArray(prev => prev.map(word => word.state === 'neutral' ? {...word, state:'correct'} : word))
      setTimeout(() => {
        handleNext()
      }, 400)
    } else {
        setToComposeArray(prev => prev.map(word => word.state === 'neutral' ? {...word, state:'wrong'} : word))}
        
  }, [handleNext]);


  useLayoutEffect(() => {
    isEveryWordPicked && checkAnswer(sentence.sentence, {prompt: prompt, answer: composedSentence.map(word => word.text).join(' ')})
  }, [checkAnswer, composedSentence, isEveryWordPicked, prompt, sentence])

  



  return (
    <section className="flex flex-col gap-4 items-center justify-center min-h-[700px] p-24">
      <h1 className="text-4xl text-violet-700">{prompt}</h1>
      <div className="block self-start mt-4 min-h-24">
        {composedSentence.map((word, index) => {
          return (
            <span
              onClick={() => removeWord(word)}
              key={index}
              className="text-2xl text-stone-900 mr-2 hover:cursor-pointer"
            >
              {word.text}
            </span>
          );
        })}
      </div>

      <div className="mt-24 flex gap-2">
        {toComposeArray.map((word, index) => {
          return (
            <span
              onClick={() => pickWord(word)}
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
      </div>

      <button onClick={() => handleNext()}>NEXT</button>
    </section>
  );
};


