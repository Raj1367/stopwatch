import React, {useEffect, useRef, useState } from 'react'
import { VscDebugStart } from "react-icons/vsc";
import { FaPause } from "react-icons/fa6";
import { VscDebugRestart } from "react-icons/vsc";
import { FaLightbulb } from "react-icons/fa";


const Stopwatch = () => {

    const [isRunning, setRunning] = useState(false)
    const [elapstedTime, setElapsedTime] = useState(0)
    const startTimeRef = useRef(0)
    const intervalIdRef = useRef<number | null>(null);

    const [darkMode, setDarkmode] = useState(false)

    const handleStart = () => {
        setRunning(true)
        startTimeRef.current = Date.now() - elapstedTime
        // console.log(startTimeRef.current)
    }

    const handleStop = () => {
        setRunning(false)
    }

    const handleReset = () => {
        setRunning(false)
        setElapsedTime(0)
    }

    const formatTime = () => {

        let hours: string | number = Math.floor(elapstedTime / (1000 * 60 * 60))
        let minutes: string | number = Math.floor(elapstedTime / (1000 * 60) % 60)
        let seconds: string | number = Math.floor(elapstedTime / (1000) % 60)
        let milliSec: string | number = Math.floor((elapstedTime % 1000) / 10)

        hours = String(hours).padStart(2, "0")
        minutes = String(minutes).padStart(2, "0")
        seconds = String(seconds).padStart(2, "0")
        milliSec = String(milliSec).padStart(2, "0")

        return `${hours} : ${minutes} : ${seconds} : ${milliSec}`

    }

    useEffect(() => {

        if (isRunning) {

            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current)
            }, 10);
        }

        return () => {
            clearInterval(intervalIdRef.current ?? 0)
        }

    }, [isRunning])

    return (
        <>
            <div className="flex justify-center items-center h-screen">

                <div className={`container border w-[380px] shadow-md rounded-lg ${darkMode ? "bg-gray-900" : ""}`}>

                    <div className="flex flex-col justify-center items-center m-4 relative">

                        <div className="absolute right-2 top-0">
                            <button
                                onClick={() => setDarkmode((prev) => !prev)}
                                className={`border rounded-full p-2 transition-all active:scale-95 ${darkMode ? "border-yellow-400 text-yellow-400" : "border-gray-300 text-gray-400"}`}><FaLightbulb size={20} />
                            </button>
                        </div>


                        <div className={`container h-[300px] w-[300px] border shadow-md rounded-full mt-5 ${darkMode ? "bg-white border-gray-500 border-[3px]" : ""}`}>
                            <div className="flex flex-col justify-center items-center mt-[44%]">

                                <div className={`flex justify-center gap-2 text-4xl transition-all ${darkMode ? "text-black" : "text-gray-400"}`}>
                                    <p>{formatTime()}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center items-center m-8">
                        {
                            isRunning ? (
                                <div className="flex items-center gap-16">
                                    <button onClick={handleStop} className={`border border-gray-300 rounded-full p-2 shadow-md text-gray-400 active:scale-95 active:text-red-500 
                                    hover:text-red-500 hover:border-red-500 active:border-red-500 transition-all ${darkMode ? "bg-white" : ""}`}><FaPause size={23} />
                                    </button>

                                    <button onClick={handleReset} className={`border border-gray-300 rounded-full p-2 shadow-md text-gray-400 active:scale-95 active:text-blue-500 
                                    hover:text-blue-500 hover:border-blue-500 active:border-blue-500 transition-all ${darkMode ? "bg-white" : ""}`}><VscDebugRestart size={23} />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-16">
                                    <button onClick={handleStart} className={`border border-gray-300 rounded-full p-2 shadow-md text-gray-400 active:scale-95 active:text-green-500
                                     hover:text-green-500 hover:border-green-500 active:border-green-500 transition-all ${darkMode ? "bg-white" : ""}`}><VscDebugStart size={23} />
                                    </button>

                                    <button onClick={handleReset} className={`border border-gray-300 rounded-full p-2 shadow-md text-gray-400 active:scale-95 active:text-blue-500
                                     hover:text-blue-500 hover:border-blue-500 active:border-blue-500 transition-all ${darkMode ? "bg-white" : ""}`}><VscDebugRestart size={23} />
                                    </button>
                                </div>
                            )
                        }
                    </div>


                </div>


            </div>
        </>
    )
}

export default Stopwatch
