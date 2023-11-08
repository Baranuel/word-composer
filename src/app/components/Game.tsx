'use client';

import { useState } from "react";
import { Sentences, Word } from "./Sentences";


const sentences = [
    "Give a man a fish and you feed him for a day teach a man to fish and you feed him for a lifetime.",
    "It's not the size of the dog in the fight, it's the size of the fight in the dog.",
    "When the going gets tough, the tough get going.",
    "The only thing necessary for the triumph of evil is for good men to do nothing.",
    "You can't have your cake and eat it too.",
    "If you want something done right, you have to do it yourself.",
    "A journey of a thousand miles begins with a single step.",
    "You miss 100% of the shots you don't take.",
    "The early bird might get the worm, but the second mouse gets the cheese.",
    "To avoid criticism, do nothing, say nothing, be nothing."
  ];


  export class Sentence {
    prompt = this.sentence.split(" ").slice(0, Math.floor(this.sentence.split(" ").length / 2)).join(" ");
    options = this.sentence.split(" ").slice(Math.floor(this.sentence.split(" ").length / 2)).sort();
    constructor( public sentence:string) {
        this.sentence = sentence;
        
    }
  
  }


export const Game = () => {
      const [sentenceIndex, setSentenceIndex] = useState(0);
      const randomSentence= sentences[sentenceIndex]

      const nextSentence = () => {
        setSentenceIndex(prev => {
          if(prev === sentences.length - 1) {
            return 0
          }
          return prev + 1
        });
      }

      const sentence = new Sentence(randomSentence);
      const op:Word[] = sentence.options.map((word) => {
        return {
            text: word,
            id: Math.random(),
            isPicked: false,
            state:'neutral'
        };
      })


     return (
      <main className="flex items-center justify-center h-full w-full">
        <Sentences sentence={sentence} options={op}  next={() => nextSentence()} />
      </main>
     )
}