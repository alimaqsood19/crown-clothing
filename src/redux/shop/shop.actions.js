import ShopActionTypes from './shop.types';
import axios from 'axios';

const apiFetchCollections = async () => {
  try {
    const collections = await axios.get('/api/collections');
    console.log(collections);
    return collections;
  } catch (err) {
    console.log(err);
  }
};

export const fetchCollections = async () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS,
  payload: await apiFetchCollections(),
});
