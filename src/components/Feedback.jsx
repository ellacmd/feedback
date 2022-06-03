import { ReactComponent as CommentLogo } from '.././assets/shared/icon-comments.svg';
import { Link } from 'react-router-dom';
import UpvoteButton from './UpvoteButton';

const Feedback = ({ productRequest }) => {
  const styles = 'flex flex-col justify-center items-center  w-10 h-[53px]';
const category = productRequest.category;
  const upperCaseCategory = category.length > 2 ?
    category[0].toUpperCase() + category.slice(1) : category.toUpperCase()



  return (
    <Link to='/comments' state={productRequest.id}>
      <div className='bg-white rounded-md min-h-[151px] p-8 shadow-sm flex gap-10 '>
        <UpvoteButton productRequest={productRequest} styles={styles} />

        <div className='gap-3 flex flex-col'>
          <h2 className='text-dark-blue tetx-lg font-bold'>
            {productRequest.title}
          </h2>

          <p className='text-dark-grey'> {productRequest.description}</p>
          <span className='text-blue h-[30px] px-4 py-1.5 bg-grey rounded-md font-semibold self-start'>
            {upperCaseCategory}
          </span>
        </div>
        <p className='ml-auto self-center flex items-center gap-2 text-dark-blue font-bold'>
          <CommentLogo />

          {productRequest.comments?.length || 0}
        </p>
      </div>
    </Link>
  );
};

export default Feedback;
