export const createMap = (size, options) => {
  const len = size * size;
  const map = new Array(len).fill(null);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = x + y * size;
      map[i] = {
        position: { x, y },
        collapsed: false,
        options: [...options],
        finalState: null,
      };
    }
  }
};

export const findLowestEntropy = map => {
  const unCollapsed = map.filter(cell => !cell.collapsed);
  if (unCollapsed.length === 0) return null;

  // Знаходимо комірку з найменшою кількістю варіантів
  const minEntropy = Math.min(...unCollapsed.map(cell => cell.options.length));
  const candidates = unCollapsed.filter(
    cell => cell.options.length === minEntropy,
  );

  // Вибираємо рандомний елемент із кандидатів
  return candidates[Math.floor(Math.random() * candidates.length)];
};

export const isAlgorithmComplete = map => {
  return map.every(cell => cell.collapsed);
};

const getValidOptions = (cell, ruleType, frames) => {
  if (!cell?.collapsed) return [];
  const frame = frames[cell.finalState];
  if (!frame) return [];
  return frame.rules[ruleType];
};

const getNeighbors = (cell, map) => {
  const size = map.length / 2;
  const { x, y } = cell.position;
  const index = (x, y) => y * size + x;

  const neighbors = {
    top: y > 0 ? map[index(x, y - 1)] : null,
    bottom: y < size - 1 ? map[index(x, y + 1)] : null,
    left: x > 0 ? map[index(x - 1, y)] : null,
    right: x < size - 1 ? map[index(x + 1, y)] : null,
  };

  return neighbors;
};

const collapsedCell = cell => {
  const rand = Math.floor(Math.random() * cell.options.length);
  const chosenOption = cell.options[rand];
  cell.options = [chosenOption];
  cell.collapsed = true;
  cell.finalState = chosenOption;
};

export function updateOptions(map, cell, frames) {
  const neighbors = getNeighbors(cell, map);

  const topRules = getValidOptions(neighbors.top, 'down', frames);
  const bottomRules = getValidOptions(neighbors.bottom, 'up', frames);
  const leftRules = getValidOptions(neighbors.left, 'right', frames);
  const rightRules = getValidOptions(neighbors.right, 'left', frames);

  const allRules = [topRules, bottomRules, leftRules, rightRules].filter(
    r => r.length > 0,
  );
  if (allRules.length > 0) {
    cell.options = cell.options.filter(option =>
      allRules.every(rules => rules.includes(option)),
    );
  }
}

export function collapseStep(map, frames, canvas) {
  const cell = findLowestEntropy(map);
  renderCell(canvas, cell, frames);

  if (!cell) {
    console.log('Алгоритм завершено.');
    return;
  }

  collapsedCell(cell);

  updateOptions(map, cell, frames);
}

export function generate({ size = 10, frames, delay = 1000, canvas }) {
  const options = Object.keys(frames);
  const map = createMap(size, options);

  const intervalId = setInterval(() => {
    collapseStep(map, frames, canvas);
    const isEnd = isAlgorithmComplete(map);
    if (isEnd) clearInterval(intervalId);
  }, delay);
}

export function renderCell(canvas, cell, frames) {
  if (!canvas || !cell || !frames || !cell.finalState) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.error('Canvas rendering context not found.');
    return;
  }

  const frame = frames[cell.finalState];
  if (!frame || !frame.url) {
    console.error(`Frame for state "${cell.finalState}" not found.`);
    return;
  }

  // Завантаження зображення з URL
  const img = new Image();
  img.src = frame.url;

  img.onload = () => {
    // Розмір клітинки (можна зробити динамічним або фіксованим)
    const cellSize = canvas.width / Math.sqrt(canvas.cellsCount || 1);

    // Розрахунок координат клітинки на канвасі
    const x = cell.position.x * cellSize;
    const y = cell.position.y * cellSize;

    // Малюємо фрейм у відповідній позиції
    ctx.drawImage(img, x, y, cellSize, cellSize);
  };

  img.onerror = () => {
    console.error(`Failed to load image at "${frame.url}".`);
  };
}