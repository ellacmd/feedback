import { ReactComponent as ArrowDown } from '.././assets/shared/icon-arrow-down.svg';
import { ReactComponent as ArrowUp } from '.././assets/shared/icon-arrow-up.svg';
import { ReactComponent as CheckIcon } from '.././assets/shared/icon-check.svg';
import useStore from '..//store';
import { useState } from 'react';

const Dropdown = () => {
  const [optionValue, setOptionValue] = useState('Most upvotes');

  const showOptions = useStore((state) => state.showOptions);
  const toggleShowOptions = useStore((state) => state.toggleShowOptions);
  const sortByMostUpvotes = useStore((state) => state.sortByMostUpvotes);
  const sortByLeastUpvotes = useStore((state) => state.sortByLeastUpvotes);
  const sortByMostComments = useStore((state) => state.sortByMostComments);
  const sortByLeastComments = useStore((state) => state.sortByLeastComments);

  const changeOptionHandler = (e) => {
    toggleShowOptions(e);
    setOptionValue(e.target.innerText);
  };

  return (
    <>
      <div className='cursor-pointer' onClick={(e) => toggleShowOptions(e)}>
        <span className='font-thin text-grey'>Sort by :</span>
        <span className='font-bold'>
          {' '}
          {optionValue}{' '}
          {!showOptions ? (
            <ArrowDown className='inline stroke-white' />
          ) : (
            <ArrowUp className='inline stroke-white' />
          )}
        </span>
      </div>
      {showOptions && (
        <div className='absolute -bottom-52 left-52 w-[255px] bg-white flex flex-col text-dark-grey shadow-lg h-[195px] rounded-md '>
          <span
            onClick={(e) => {
              changeOptionHandler(e);
              sortByMostUpvotes();
            }}
            className=' py-3 px-6 cursor-pointer border-b border-grey flex justify-between items-center hover:text-purple'
          >
            Most Upvotes
            <CheckIcon className=' ' />
          </span>

          <span
            onClick={(e) => {
              changeOptionHandler(e);
              sortByLeastUpvotes();
            }}
            className='py-3 px-6 cursor-pointer border-b border-grey hover:text-purple flex justify-between items-center '
          >
            Least Upvotes
          </span>

          <span
            onClick={(e) => {
              changeOptionHandler(e);
              sortByMostComments();
            }}
            className='py-3 px-6 cursor-pointer border-b border-grey hover:text-purple'
          >
            Most Comments
          </span>

          <span
            onClick={(e) => {
              changeOptionHandler(e);
              sortByLeastComments();
            }}
            className='py-3 px-6 cursor-pointer  hover:text-purple'
          >
            Least Comments
          </span>
        </div>
      )}
    </>
  );
};

export default Dropdown;
