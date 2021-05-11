import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import { asyncFetchCollections } from '../../redux/shop/shop.actions';
import { selectIsCollectionFetching, selectIsCollectionLoaded } from '../../redux/shop/shop.selectors'
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import { createStructuredSelector } from 'reselect';

const CollectionOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);


const ShopPage = ({ match, asyncFetchCollections, isFetchingCollections, isCollectionLoaded }) => {
  useEffect(() => {
     asyncFetchCollections();
  }, []);

  return (
    <div className='shop-page'>
      <Route exact path={`${match.path}/`} render={(props) => <CollectionOverviewWithSpinner isLoading={isFetchingCollections} {...props}  /> } />
      <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={!isCollectionLoaded} {...props}/>} />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isFetchingCollections: selectIsCollectionFetching,
  isCollectionLoaded: selectIsCollectionLoaded
})

const mapDispatchToProps = (dispatch) => ({
  asyncFetchCollections: () => dispatch(asyncFetchCollections()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
