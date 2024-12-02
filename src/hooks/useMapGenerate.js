import { useState, useEffect, useRef } from 'react';
import {
  clearCanvas,
  collapseStep,
  createMap,
  isAlgorithmComplete,
} from '../utils/waveCollapse';

export const useMapGenerate = () => {
  const [isActive, setIsActive] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [result, setResult] = useState(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const startGenerate = ({ size = 10, canvas, tiles, delay = 10 }) => {
    const options = Object.keys(tiles);
    if (!options.length) return;
    setIsActive(true);
    setHasResult(false);
    clearCanvas(canvas);

    const newMap = createMap(size, options);
    const queue = [];

    intervalRef.current = setInterval(() => {
      collapseStep(newMap, tiles, canvas, queue);
      if (isAlgorithmComplete(newMap)) {
        setIsActive(false);
        setHasResult(true);
        setResult(newMap);
        clearInterval(intervalRef.current);
      }
    }, delay);

    setTimeout(() => stopGenerate, 3000);
  };

  const quickGenerate = ({ size = 10, canvas, tiles }) => {
    clearCanvas(canvas);
    setIsActive(true);
    setHasResult(false);
    const maxIteration = 1000000000;
    let iteration = 0;
    const options = Object.keys(tiles);
    const newMap = createMap(size, options);
    const queue = [];

    while (iteration++ < maxIteration) {
      collapseStep(newMap, tiles, canvas, queue);
      if (isAlgorithmComplete(newMap)) {
        setHasResult(true);
        setIsActive(false);
        setResult(newMap);
        break;
      }
    }

    setIsActive(false);
  };

  const stopGenerate = () => {
    setIsActive(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return {
    isActive,
    hasResult,
    startGenerate,
    quickGenerate,
    stopGenerate,
    result,
  };
};
