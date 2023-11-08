import { useLayoutEffect, useRef, useState } from "react"


export const Score = ({score}:{score:number}) => {
    const [showScore, setShowScore] = useState(0)


    useLayoutEffect(() => {
        const interval = setInterval(() => {
            if(score === showScore) return

            if(showScore <= score) {
                setShowScore( showScore + 1)
            }
            else {
                setShowScore(showScore - 1)
            }
        }, 10)


        return () => clearInterval(interval)

    }, [score, showScore])

    return <h1 className="text-3xl">Score: {showScore}</h1>
}