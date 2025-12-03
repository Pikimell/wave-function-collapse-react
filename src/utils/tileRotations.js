const DIRECTIONS = ['up', 'right', 'down', 'left'];
const ROTATIONS = [0, 90, 180, 270];

const normalizeRotation = rotation => {
  if (!Number.isFinite(rotation)) return 0;
  const normalized = ((rotation % 360) + 360) % 360;
  const stepAligned = Math.round(normalized / 90) * 90;
  return ((stepAligned % 360) + 360) % 360;
};

const normalizeRotationSteps = rotation => {
  const steps = Math.round(rotation / 90);
  return ((steps % 4) + 4) % 4;
};

const directionForRotation = (direction, rotationSteps) => {
  const index = DIRECTIONS.indexOf(direction);
  if (index === -1) return direction;
  const sourceIndex = (index - rotationSteps + DIRECTIONS.length) % DIRECTIONS.length;
  return DIRECTIONS[sourceIndex];
};

const cloneRuleBucket = bucket => (Array.isArray(bucket) ? [...bucket] : []);

const rotateRules = (rules, rotationSteps, getRotatedNeighborId) => {
  const safeRules = rules || {};
  const rotated = { up: [], right: [], down: [], left: [] };

  DIRECTIONS.forEach(direction => {
    const sourceDirection = directionForRotation(direction, rotationSteps);
    rotated[direction] = cloneRuleBucket(safeRules[sourceDirection]).map(
      ruleId => getRotatedNeighborId(ruleId),
    );
  });

  return rotated;
};

const cloneEdge = edge => {
  if (!edge) return edge;
  const segments = Array.isArray(edge.segments)
    ? edge.segments.map(segment => ({ ...segment }))
    : edge.segments;

  return { ...edge, segments };
};

const reverseEdge = edge => {
  if (!edge) return edge;
  const base = cloneEdge(edge);
  if (Array.isArray(base.segments)) {
    base.segments = [...base.segments].reverse();
  }
  return base;
};

export const rotateEdgeColors = (edgeColors, rotationSteps) => {
  if (!edgeColors) return null;
  const rotated = {};

  DIRECTIONS.forEach(direction => {
    const sourceDirection = directionForRotation(direction, rotationSteps);
    rotated[direction] = cloneEdge(edgeColors[sourceDirection]);
  });

  return rotated;
};

export const mirrorEdgeColors = (edgeColors, axis = 'horizontal') => {
  if (!edgeColors) return null;
  const horizontal = axis === 'horizontal';

  if (horizontal) {
    return {
      up: reverseEdge(edgeColors.up),
      down: reverseEdge(edgeColors.down),
      left: cloneEdge(edgeColors.right),
      right: cloneEdge(edgeColors.left),
    };
  }

  return {
    up: cloneEdge(edgeColors.down),
    down: cloneEdge(edgeColors.up),
    left: reverseEdge(edgeColors.left),
    right: reverseEdge(edgeColors.right),
  };
};

export const mirrorRules = (rules, axis = 'horizontal') => {
  const safeRules = rules || {};

  if (axis === 'horizontal') {
    return {
      up: cloneRuleBucket(safeRules.up),
      down: cloneRuleBucket(safeRules.down),
      left: cloneRuleBucket(safeRules.right),
      right: cloneRuleBucket(safeRules.left),
    };
  }

  return {
    up: cloneRuleBucket(safeRules.down),
    down: cloneRuleBucket(safeRules.up),
    left: cloneRuleBucket(safeRules.left),
    right: cloneRuleBucket(safeRules.right),
  };
};

const buildRotationIdMap = tiles => {
  const map = {};
  Object.keys(tiles || {}).forEach(tileId => {
    const baseRotation = normalizeRotation(tiles[tileId]?.rotation || 0);
    const rotations = baseRotation ? [0] : ROTATIONS;
    map[tileId] = {};
    map[tileId]._baseRotation = baseRotation;
    rotations.forEach(rotation => {
      map[tileId][rotation] = rotation === 0 ? tileId : `${tileId}__rot${rotation}`;
    });
  });
  return map;
};

export const createRotatedTiles = tiles => {
  const baseTiles = Object.values(tiles || {});
  if (!baseTiles.length) return {};

  const rotationIds = buildRotationIdMap(tiles);
  const rotatedTiles = {};

  baseTiles.forEach(tile => {
    const baseRotation = rotationIds[tile.id]?._baseRotation || 0;
    const rotations = baseRotation ? [0] : ROTATIONS;

    rotations.forEach(rotation => {
      const rotationSteps = normalizeRotationSteps(rotation);
      const id = rotationIds[tile.id]?.[rotation];
      const totalRotation = normalizeRotation(baseRotation + rotation);

      const mapNeighbor = neighborId => {
        const rotatedNeighbor = rotationIds[neighborId]?.[rotation];
        return rotatedNeighbor || neighborId;
      };

      rotatedTiles[id] = {
        ...tile,
        id,
        baseId: tile.id,
        rotation: totalRotation,
        rules: rotateRules(tile.rules, rotationSteps, mapNeighbor),
        edgeColors: rotateEdgeColors(tile.edgeColors, rotationSteps),
      };
    });
  });

  return rotatedTiles;
};
