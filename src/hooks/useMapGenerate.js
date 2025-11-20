import { useState, useEffect, useRef } from 'react';
import {
  clearCanvas,
  collapseStep,
  createMap,
  isAlgorithmComplete,
  renderEntropy,
  renderCell,
} from '../utils/waveCollapse';

export const useMapGenerate = () => {
  const [isActive, setIsActive] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [result, setResult] = useState(null);
  const intervalRef = useRef(null);
  const mapRef = useRef(null);
  const entropyModeRef = useRef('count');

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const startGenerate = ({
    size = 10,
    canvas,
    tiles,
    delay = 10,
    entropyMode = 'count',
  }) => {
    const options = Object.keys(tiles);
    if (!options.length) return;
    setIsActive(true);
    setHasResult(false);
    clearCanvas(canvas);
    entropyModeRef.current = entropyMode;

    const newMap = createMap(size, options);
    mapRef.current = newMap;
    if (entropyModeRef.current !== 'none') {
      renderEntropy(canvas, newMap, entropyModeRef.current);
    }
    const queue = [];

    intervalRef.current = setInterval(() => {
      collapseStep(
        newMap,
        tiles,
        canvas,
        queue,
        true,
        entropyModeRef.current,
      );
      if (isAlgorithmComplete(newMap)) {
        setIsActive(false);
        setHasResult(true);
        setResult(newMap);
        clearInterval(intervalRef.current);
      }
    }, delay);

    setTimeout(() => stopGenerate, 3000);
  };

  const quickGenerate = ({
    size = 10,
    canvas,
    tiles,
    entropyMode = 'count',
  }) => {
    clearCanvas(canvas);
    setIsActive(true);
    setHasResult(false);
    const maxTime = 30000;
    const initTime = Date.now();
    const options = Object.keys(tiles);
    const newMap = createMap(size, options);
    mapRef.current = newMap;
    entropyModeRef.current = entropyMode;
    if (entropyModeRef.current !== 'none') {
      renderEntropy(canvas, newMap, entropyModeRef.current);
    }
    const queue = [];

    while (initTime + maxTime > Date.now()) {
      collapseStep(
        newMap,
        tiles,
        canvas,
        queue,
        true,
        entropyModeRef.current,
      );
      if (isAlgorithmComplete(newMap)) {
        setHasResult(true);
        setIsActive(false);
        setResult(newMap);
        break;
      }
    }

    setIsActive(false);
    const diff = Date.now() - initTime;
    console.log(`Кількість спрайтів: ${size};\nЧас виконання: ${diff}ms;`);
  };

  const stopGenerate = () => {
    setIsActive(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const redrawBaseMap = ({ canvas, tiles }) => {
    const map = mapRef.current;
    if (!canvas || !map || !tiles) return;
    clearCanvas(canvas);
    map.forEach(cell => {
      if (cell?.collapsed && cell.finalState) {
        renderCell(canvas, cell, tiles, map.length);
      }
    });
  };

  const setEntropyVisualization = ({ mode, canvas, tiles }) => {
    entropyModeRef.current = mode;
    const map = mapRef.current;
    if (!canvas || !map) return;
    if (entropyModeRef.current === 'none') {
      redrawBaseMap({ canvas, tiles });
      return;
    }
    redrawBaseMap({ canvas, tiles });
    renderEntropy(canvas, map, entropyModeRef.current);
  };

  return {
    isActive,
    hasResult,
    startGenerate,
    quickGenerate,
    stopGenerate,
    result,
    setEntropyVisualization,
  };
};
