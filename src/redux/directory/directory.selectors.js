import { createSelector } from 'reselect';

const selectDirectory = (state) => state.directory;

export const selectDirectroySelections = createSelector(
  [selectDirectory],
  (directory) => directory.sections
);
