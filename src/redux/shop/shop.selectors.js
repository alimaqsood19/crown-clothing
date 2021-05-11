import { createSelector } from 'reselect';

const selectShop = (state) => state.shop;

export const selectCollections = createSelector([selectShop], (shop) => {
  const collectionObject = shop.collections.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.routeName] = currentValue;
      return accumulator;
    },
    {}
  );
  return collectionObject;
});

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  (collections) =>
    collections ? Object.keys(collections).map((key) => collections[key]) : []
);

export const selectCollection = (collectionUrlParam) => {
  return createSelector([selectCollections], (collections) =>
    collections ? collections[collectionUrlParam] : null
  );
};

export const selectIsCollectionFetching = createSelector(
  [selectShop],
  (shop) => shop.isFetching
);

export const selectIsCollectionLoaded = createSelector(
  [selectShop],
  (shop) => shop.collections.length
);
