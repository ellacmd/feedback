import React from 'react';
import useStore from '../store';
import { ReactComponent as CommentLogo } from '.././assets/shared/icon-comments.svg';
import UpvoteButton from './UpvoteButton';
import { Link } from 'react-router-dom';

const RoadmapCard = ({ status, statusText }) => {
  const filteredRequests = useStore((state) => state.filteredRequests);
  const styles = 'flex justify-center items-center h-10 w-[69px]';
  const statusLength = filteredRequests.filter(
    (productRequest) => productRequest.status === status
  );
  const border =
    status === 'planned'
      ? 'border-orange'
      : status === 'in-progress'
      ? 'border-purple'
      : 'border-light-blue';
      const color =
      status === 'planned'
        ? 'orange'
        : status === 'in-progress'
        ? 'purple'
        : 'light-blue';



  return (
    <div className='flex flex-col w-[350px] gap-8'>
      <span>
        <h3 className='font-bold text-lg text-dark-blue'>
          {status[0].toUpperCase() + status.slice(1)} ({statusLength.length})
        </h3>
        <p className='text-dark-grey'>{statusText}</p>
      </span>
      <div className='flex flex-col gap-6'>
        {filteredRequests.map((productRequest) => {
          return (
            productRequest.status === status && (
              <Link
                to='/comments'
                state={productRequest.id}
                key={productRequest.id}
              >
                <div
                  className={`w-full p-8 ${border} bg-white border-t-[6px] rounded-md h-[272px] `}
                >
                  <span
                    className={`bg-${color}  w-2 h-2 inline-block rounded-full mr-4`}
                  />
                  <span className='text-dark-grey'>
                    {' '}
                    {productRequest.status[0].toUpperCase() +
                      productRequest.status.slice(1)}
                  </span>
                  <h3 className='text-dark-blue font-bold text-lg'>
                    {productRequest.title}
                  </h3>
                  <p className='text-dark-grey mb-4'>
                    {productRequest.description}
                  </p>
                  <span className=' inline-block text-blue h-[30px] px-4 py-1.5 bg-grey rounded-md font-semibold mb-6'>
                    {productRequest.status[0].toUpperCase() +
                      productRequest.status.slice(1)}
                  </span>

                  <div className='flex justify-between'>
                    <UpvoteButton
                      productRequest={productRequest}
                      styles={styles}
                    />
                    <p className='ml-auto self-center flex items-center gap-2 text-dark-blue font-bold'>
                      <CommentLogo />

                      {productRequest.comments?.length || 0}
                    </p>
                  </div>
                </div>
              </Link>
            )
          );
        })}
      </div>
    </div>
  );
};

export default RoadmapCard;
