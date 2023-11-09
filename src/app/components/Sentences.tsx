"use client";

import { useEffect, useState, useCallback, useLayoutEffect, useMemo, use, useRef, createRef, LegacyRef } from "react";
import { Sentence } from "./Game";
import { WordBox } from "./WordBox";
import { Score } from "./Score";

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
  const spanRefs = useRef<HTMLElement[]>(Array(toComposeArray.length).fill(createRef()));
  const [clickedPosition, setClickedPosition] = useState<any>(undefined)

  const clickedWord = useRef<HTMLElement>(null)
  const initialPosition = clickedWord?.current?.getBoundingClientRect()
  
  useEffect(() => {
    setToComposeArray(options)
    
  },[options])

  const handleNext = useCallback(() => {
    setComposedSentence([])
    next()
  } , [next])


  const checkAnswer = useCallback((originalSentence:string, composedSentence:Record<any,string>) => {
    const {prompt, answer} = composedSentence
    const composedSentenceArray = prompt.split(' ').concat(answer.split(' ')).join(' ')
    const isCorrect =  originalSentence === composedSentenceArray

    if(isCorrect) {
      setScore(prev => prev + 50)
      setComposedSentence(prev => prev.map(word => word.state === 'neutral' ? {...word, state:'correct'} : word))
      setTimeout(() => {
        handleNext()
      }, 800)
      
    } else {
      setComposedSentence(prev => prev.map(word => word.state === 'neutral' ? {...word, state:'wrong'} : word))
      setScore(prev => prev - 50)
      setTimeout(() => {
        handleNext()
      }, 800)
    }


  }, [handleNext]);



  const pickWord = useCallback((pickedWord: Word) => {

    setComposedSentence((prev) => {
      const newSentence = [...prev];
      newSentence.push(pickedWord);
      newSentence.length === options.length && checkAnswer(sentence.sentence, {prompt, answer: newSentence.map(word => word.text).join(' ')})
      return newSentence;
    });

    setToComposeArray((prev) => {
      const newArray = prev.map((word) =>
      word.id === pickedWord.id ? { ...word, isPicked: true } : word
      );
      return newArray;
    })
  }, [options.length, checkAnswer, sentence.sentence, prompt]);

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
  

  const handleClick = useCallback((ref:any, word:Word) => {
    setClickedPosition(ref)
    pickWord(word)
  }, [pickWord])






  return (
    <section className="flex flex-col gap-1 items-center justify-center min-h-[700px]  p-24 sm:p-4">
      <div>
        <Score score={score} />
      </div>
      <p className="self-start sm:self-center text-sm text-stone-600">Finish the Saying</p>
      <h1 className="self-start sm:self-center text-2xl ">{prompt}</h1>
      <div className=" self-start sm:self-center min-w-full mt-4 min-h-24 h-12 my-6 gap-1 flex flex-wrap ">
        {composedSentence.map((word, index) => {
          return (
            <WordBox
              onClick={() => removeWord(word)}
              initialPosition={clickedPosition}
              word={word}
              key={index}
           />
    
          );
        })}
      </div>


      <div className="mt-24 flex  flex-wrap  sm:items-center sm:justify-center gap-2 ">
        {toComposeArray.map((word, index) => {

          return (
            <span
              ref={el => spanRefs.current[index] = el ?? spanRefs.current[index]}
              onClick={(e) => {
                pickWord( word)
                const element = e.target as HTMLElement
                const position = {
                  id: word.id,
                  sizes: element.getBoundingClientRect()
                }
                setClickedPosition(position)
              }}
              key={index}
              className={`hover:cursor-pointer text-1xl text-gray-700 p-2 min-w-[50px] sm:min-w-[30px] flex items-center justify-center border border-stone-900 rounded-md ${
                word.isPicked && "opacity-20 pointer-events-none"}
               `}
            >
              {word.text}
            </span>
          );
        })}
      </div>
    </section>
  );
};


