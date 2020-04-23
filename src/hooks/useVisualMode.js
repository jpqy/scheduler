import { useState } from 'react';

/**
 * A custom hook that manages a "visual mode" state to control the information
 * displayed in each Appointment component. Also keeps track of previous modes
 * to facilitate backtracking through an exported function.
 * 
 * @param    {String}    initial     The initial mode to use
 * 
 * @typedef  {Object}    Mode
 * @property {String}    mode        The current mode
 * @property {Function}  transition  Function to set the current mode
 * @property {Function}  back        Function to return to the previous mode
 * @returns  {Mode}                  {Current mode, mode setter, mode reverser}
 */
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  /**
   * Side-effect function to set a new visual mode and store it in history.
   *
   * @param {String}  newMode The mode to switch to
   * @param {Boolean} skip    Whether to skip adding the mode to history
   */
  const transition = (newMode, skip = false) => {
    setMode(newMode);

    if (!skip) {
      setHistory(prevArray => [...prevArray, newMode]);
    }
  };

  const back = () => {
    // Cannot go back past initial element
    if (history.length === 1) return;

    setHistory(prevArray => {
      prevArray.pop();
      setMode(prevArray[prevArray.length - 1]);
      return prevArray;
    });
  };

  return { mode, transition, back };
}