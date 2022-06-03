import { useState } from 'react';
import { Link } from 'react-router-dom';
import useStore from '../store';

const Sidebar = () => {
  const filterByCategory = useStore((state) => state.filterByCategory);
  const filteredRequests = useStore((state) => state.filteredRequests);

  const [activeCategory, setActiveCategory] = useState('All');

  const plannedNumber = filteredRequests.filter(
    (productRequest) => productRequest.status === 'planned'
  ).length;
  const inProgressNumber = filteredRequests.filter(
    (productRequest) => productRequest.status === 'in-progress'
  ).length;
  const liveNumber = filteredRequests.filter(
    (productRequest) => productRequest.status === 'live'
  ).length;

  const categories = ['UI', 'UX', 'Bug', 'Enhancement', 'Feature'];

  const changeActiveCategory = (category) => {
    setActiveCategory(category);
    
  };

  return (
    <div className=' flex gap-6 flex-col'>
      <header className='bg-header-img p-6 h-[137px] rounded-md flex justify-end flex-col'>
        <h1 className='text-white font-bold text-xl '>Frontend Mentor</h1>
        <p className='text-white font-light text-sm'>Feedback Board</p>
      </header>

      <ul className='bg-white p-6 rounded-md flex flex-wrap h-[166px] gap-x-2 gap-y-3.5 shadow-sm'>
        <li
          className={` ${
            activeCategory === 'All'
              ? 'text-white bg-blue hover:bg-blue'
              : 'text-blue bg-grey'
          }  h-[30px] px-4 py-[5px]  rounded-md font-semibold cursor-pointer`}
          onClick={() => {
            filterByCategory('all');
            changeActiveCategory('All');
          }}
        >
          All
        </li>
        {categories.map((category, i) => (
          <li
            key={i}
            className={` ${
              activeCategory === category
                ? 'text-white bg-blue hover:bg-blue'
                : 'text-blue bg-grey'
            } h-[30px] px-4 py-[5px] rounded-md font-semibold cursor-pointer `}
            onClick={() => {
              filterByCategory(category.toLowerCase());
              changeActiveCategory(category);
            }}
          >
            {category}
          </li>
        ))}
      </ul>

      <div className='bg-white p-6 rounded-md flex flex-col h-[178px] gap-6 shadow-sm'>
        <div className='flex justify-between'>
          <h3 className='text-dark-blue font-bold text-lg'>Roadmap</h3>

          <Link to='/roadmap'>
            {' '}
            <p className='text-blue underline cursor-pointer '>View</p>
          </Link>
        </div>
        <ul>
          <li className='text-dark-grey flex items-center gap-4'>
            <span className='bg-orange w-2 h-2 inline-block rounded-full' />{' '}
            Planned{' '}
            <span className='inline-block ml-auto font-semibold'>
              {plannedNumber}
            </span>
          </li>
          <li className='text-dark-grey flex items-center gap-4'>
            <span className='bg-purple w-2 h-2 inline-block rounded-full' />{' '}
            In-progress{' '}
            <span className='inline-block ml-auto font-semibold'>
              {inProgressNumber}
            </span>
          </li>
          <li className='text-dark-grey flex items-center gap-4'>
            <span className='bg-light-blue w-2 h-2 inline-block rounded-full' />{' '}
            Live
            <span className='inline-block ml-auto font-semibold'>
              {liveNumber}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
