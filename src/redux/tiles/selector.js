export const selectTiles = state => state.tiles.items;
export const selectTileList = state => Object.values(state.tiles.items);
export const selectCurrentTile = state => state.tiles.currentTile;
