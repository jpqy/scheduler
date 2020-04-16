import React, { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode) => {
    setMode(newMode);
    setHistory(prevArray => [...prevArray, newMode]);
  };


  const back = () => {
    // Cannot go back past initial element
    if (history.length === 1) return;

    setHistory(prevArray => {
      prevArray.pop();
      setMode(prevArray[prevArray.length - 1]);
      return prevArray;
    });

    // Why didn't the code below work? After calling setHistory, the value of history seems unchanged
    // console.log("before setHistory", history);
    // setHistory(history.slice(0, -1));
    // console.log("after setHistory", history);
    // setMode(history[history.length - 1]);
  };



  return { mode, transition, back };
}