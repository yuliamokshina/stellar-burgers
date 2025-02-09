import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeeds } from '../../services/feed/actions';
import { getAllOrders, getFeedsIsLoading } from '../../services/feed/slice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(getAllOrders);
  const isLoading = useSelector(getFeedsIsLoading);

  useEffect(() => {
    dispatch(getFeeds());
  }, [dispatch]);

  const handleGetFeeds = () => {
    dispatch(getFeeds());
  };

  if (isLoading) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
