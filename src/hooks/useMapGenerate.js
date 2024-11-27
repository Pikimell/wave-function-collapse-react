import { useState, useEffect, useRef } from 'react';
import {
  clearCanvas,
  collapseStep,
  createMap,
  isAlgorithmComplete,
} from '../utils/waveCollapse';

export const useMapGenerate = () => {
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const startGenerate = ({ size = 10, canvas, frames, delay = 10 }) => {
    const options = Object.keys(frames);
    if (!options.length) return;
    setIsActive(true);
    clearCanvas(canvas);

    const newMap = createMap(size, options);
    const queue = [];

    intervalRef.current = setInterval(() => {
      collapseStep(newMap, frames, canvas, queue);
      if (isAlgorithmComplete(newMap)) {
        setIsActive(false);
        clearInterval(intervalRef.current);
      }
    }, delay);

    setTimeout(() => stopGenerate, 3000);
  };

  const quickGenerate = ({ size = 10, canvas, frames }) => {
    clearCanvas(canvas);
    setIsActive(true);
    const maxIteration = 1000000;
    let iteration = 0;
    const options = Object.keys(frames);
    const newMap = createMap(size, options);
    const queue = [];

    while (isActive && iteration++ < maxIteration) {
      collapseStep(newMap, frames, canvas, queue);
      if (isAlgorithmComplete(newMap)) {
        setIsActive(false);
        break;
      }
    }
  };

  const stopGenerate = () => {
    setIsActive(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return { isActive, startGenerate, quickGenerate, stopGenerate };
};
