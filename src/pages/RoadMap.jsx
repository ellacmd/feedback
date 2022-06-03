import { ReactComponent as ArrowLeft } from '../assets/shared/icon-arrow-left.svg';
import { ReactComponent as PlusIcon } from '../assets/shared/icon-plus.svg';
import RoadmapCard from '../components/RoadmapCard';
import { Link } from 'react-router-dom';

const RoadMap = () => {

  return (
    <div className=' bg-grey min-h-screen py-20 flex justify-center'>
      <div className=' max-w-5xl w-full min-h-max'>
        <div className='h-[113px] bg-dark-blue w-full rounded-md px-8 flex justify-between items-center'>
          <div>
            <p className='flex items-center gap-3 font-bold text-white'>
              <ArrowLeft className='inline stroke-white' />{' '}
              <Link to='/'>Go Back</Link>
            </p>
            <h1 className='text-white text-2xl font-bold'>Roadmap</h1>
          </div>
          <Link to='/add' className='ml-auto'>
            <button className='bg-purple w-[158px] h-11 rounded-md font-semibold flex justify-center items-center gap-1 text-white'>
              <PlusIcon /> Add Feedback
            </button>
          </Link>
        </div>

        <div className='flex py-12 gap-[30px]'>
          <RoadmapCard
            status={'planned'}
            statusText={'Ideas prioritized for research'}
           
          />

          <RoadmapCard
            status={'in-progress'}
            statusText={'Currently being developed'}
          
          />

          <RoadmapCard
            status={'live'}
            statusText={'Released features'}
        
          />
        </div>
      </div>
    </div>
  );
};

export default RoadMap;
