export const selectFrames = state => state.frames.items;
export const selectFrameList = state => Object.values(state.frames.items);
export const selectCurrentFrame = state => state.frames.currentFrame;
