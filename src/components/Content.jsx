import { ReactComponent as SuggestionIcon } from '.././assets/suggestions/icon-suggestions.svg';
import { ReactComponent as PlusIcon } from '.././assets/shared/icon-plus.svg';
import { ReactComponent as EmptyIcon } from '.././assets/suggestions/illustration-empty.svg';
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown';
import Feedback from './Feedback';
import useStore from '../store';

const Content = () => {
  const filteredRequests = useStore((state) => state.filteredRequests);
  const loading = useStore((state) => state.loading);
  // console.log(filteredRequests);

  return (
    <div className='flex flex-col gap-6'>
      <div className=' relative h-[72px] bg-dark-blue rounded-md text-white p-[24px] flex gap-[38px] items-center'>
        <div className='flex gap-4 font-semibold text-lg'>
          <SuggestionIcon />
          <h2>6 Suggestions</h2>
        </div>

        <Dropdown />

        <Link to='/add' className='ml-auto'>
          <button className='bg-purple w-[158px] h-11 rounded-md font-semibold flex justify-center items-center gap-1 '>
            <PlusIcon /> Add Feedback
          </button>
        </Link>
      </div>
      {loading ? (
        <div className='flex flex-col justify-center items-center'>
          <EmptyIcon />
          <p className='text-dark-grey text-center'>Loading...</p>
        </div>
      ) : filteredRequests.length ? (
        filteredRequests.map((productRequest) => {
          return (
            <Feedback key={productRequest.id} productRequest={productRequest} />
          );
        })
      ) : (
        <div className='flex py-28 justify-center  h-[600px] bg-white'>
          <div className=' w-[410px] h-[380px] flex flex-col items-center '>
            <EmptyIcon className='mb-14' />
            <h1 className='text-2xl text-dark-blue font-bold mb-4'>
              There is no feedback yet.
            </h1>
            <p className='mb-12 text-dark-grey'>
              Got a suggestion? Found a bug that needs to be squashed? We love
              hearing about new ideas to improve our app.
            </p>
            <Link to='/add'>
              <button className='bg-purple w-[158px] h-11 rounded-md font-semibold flex justify-center items-center gap-1 text-white '>
                <PlusIcon /> Add Feedback
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Content;
