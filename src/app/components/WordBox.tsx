import { Ref, RefObject, useEffect, useLayoutEffect, useRef } from "react";
import { Word } from "./Sentences";


interface DOMRectExtended extends DOMRect {
    id: number;
    sizes: DOMRect
}
interface Props {
    word: Word;
    initialPosition:DOMRectExtended;
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

    useLayoutEffect(() => {
        if(!ref.current) return;
        if(word.id !== initialPosition.id) return;
        const rect = ref.current.getBoundingClientRect();
        const dx = initialPosition.sizes.x - rect.x;
        const dy = initialPosition.sizes.y - rect.y;

        ref.current.animate([
            {transform: `translate(${dx}px, ${dy}px)`},
            {transform: `translate(0px, 0px)`}
        ] ,{
            duration: 200,
            easing: 'ease-in-out',
        
        })

        


    })


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