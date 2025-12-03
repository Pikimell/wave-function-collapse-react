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
  const [isStepping, setIsStepping] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [result, setResult] = useState(null);
  const [stats, setStats] = useState({
    entropy: 0,
    solved: 0,
    neighborOptions: 0,
  });
  const intervalRef = useRef(null);
  const mapRef = useRef(null);
  const queueRef = useRef([]);
  const entropyModeRef = useRef('count');

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const updateStats = () => {
    const map = mapRef.current || [];
    const solved = map.filter(cell => cell?.collapsed).length;
    const unCollapsed = map.filter(cell => !cell?.collapsed);
    const entropyOptions = unCollapsed.map(
      cell => cell?.options?.length ?? 0,
    );
    const entropy = entropyOptions.length ? Math.min(...entropyOptions) : 0;
    const neighborOptions = queueRef.current.reduce(
      (acc, cell) => acc + (cell?.options?.length || 0),
      0,
    );

    setStats({ entropy, solved, neighborOptions });
  };

  const initializeGeneration = ({
    size,
    canvas,
    tiles,
    entropyMode = 'count',
  }) => {
    const options = Object.keys(tiles || {});
    if (!options.length || !canvas) return null;

    clearCanvas(canvas);
    setResult(null);
    setHasResult(false);
    entropyModeRef.current = entropyMode;

    const newMap = createMap(size, options);
    mapRef.current = newMap;
    queueRef.current = [];

    if (entropyModeRef.current !== 'none') {
      renderEntropy(canvas, newMap, entropyModeRef.current);
    }

    updateStats();

    return newMap;
  };

  const startGenerate = ({
    size = 10,
    canvas,
    tiles,
    delay = 10,
    entropyMode = 'count',
  }) => {
    stopGenerate();
    const newMap = initializeGeneration({
      size,
      canvas,
      tiles,
      entropyMode,
    });
    if (!newMap) return;

    setIsActive(true);
    setIsStepping(false);
    setHasResult(false);

    intervalRef.current = setInterval(() => {
      collapseStep(
        newMap,
        tiles,
        canvas,
        queueRef.current,
        true,
        entropyModeRef.current,
      );
      updateStats();
      if (isAlgorithmComplete(newMap)) {
        setIsActive(false);
        setHasResult(true);
        setResult(newMap);
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }, delay);
  };

  const quickGenerate = ({
    size = 10,
    canvas,
    tiles,
    entropyMode = 'count',
  }) => {
    stopGenerate();
    const newMap = initializeGeneration({
      size,
      canvas,
      tiles,
      entropyMode,
    });
    if (!newMap) return;

    setIsActive(true);
    setIsStepping(false);
    const maxTime = 30000;
    const initTime = Date.now();

    while (initTime + maxTime > Date.now()) {
      collapseStep(
        newMap,
        tiles,
        canvas,
        queueRef.current,
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
    updateStats();
    const diff = Date.now() - initTime;
    console.log(`Кількість спрайтів: ${size};\nЧас виконання: ${diff}ms;`);
  };

  const stepGenerate = ({
    size = 10,
    canvas,
    tiles,
    entropyMode = 'count',
  }) => {
    const needsInitialization =
      !mapRef.current || isAlgorithmComplete(mapRef.current);

    if (needsInitialization) {
      stopGenerate();
      const newMap = initializeGeneration({
        size,
        canvas,
        tiles,
        entropyMode,
      });
      if (!newMap) return;
      setIsActive(true);
      setIsStepping(true);
    } else if (!isStepping) {
      setIsActive(true);
      setIsStepping(true);
    }

    collapseStep(
      mapRef.current,
      tiles,
      canvas,
      queueRef.current,
      true,
      entropyModeRef.current,
    );
    updateStats();

    if (isAlgorithmComplete(mapRef.current)) {
      setIsActive(false);
      setIsStepping(false);
      setHasResult(true);
      setResult(mapRef.current);
    }
  };

  const stopGenerate = () => {
    setIsActive(false);
    setIsStepping(false);
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
    stepGenerate,
    result,
    setEntropyVisualization,
    isStepping,
    stats,
  };
};
