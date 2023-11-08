import { Ref, RefObject, useEffect, useLayoutEffect, useRef } from "react";
import { Word } from "./Sentences";


interface Props {
    word: Word;
    initialPosition:RefObject<HTMLElement>;
    onClick: (word: Word) => void;

}

interface RectBox {
    x: number;
    y: number;
    width: number;
    height: number;

}

export const WordBox = ({ word, onClick, initialPosition }: Props) => {
    const ref = useRef<HTMLElement>(null);

    // useLayoutEffect(() => {
    //     if(!ref.current) return;
    //     ref.current.animate([
    //         {scale: 1.5, opacity: 0.5},
    //     ], {
    //         duration: 100,
    //         fill: 'forwards'
    //     }) 
    // })
    return <span
    ref={ref}
    onClick={() => onClick(word)}
    className={`text-2xl hover:cursor-pointer text-1xl text-gray-700 p-2 min-w-[50px] sm:min-w-0  border rounded-md
    ${word.state === 'correct' && ' opacity-100  text-green-500 border-green-500 '}
    ${word.state === 'wrong' && ' opacity-100  text-red-500 border-red-500 '}
    ${word.state === 'neutral' && '  text-stone-900 border-stone-900 '}
    `}
    >{word.text}</span>
}