import { ReactComponent as ArrowUp } from '.././assets/shared/icon-arrow-up.svg';
import useStore from '../store';

const UpvoteButton = ({ productRequest, styles }) => {

  const increaseUpvotes = useStore((state) => state.increaseUpvotes);
  const decreaseUpvotes = useStore((state) => state.decreaseUpvotes)
  const toggleUpvoted = useStore((state) => state.toggleUpvoted);

  const onToggleUpvotes = (e) => {
    e.stopPropagation()
    e.preventDefault()
    if (!productRequest.upvoted) {
      increaseUpvotes(productRequest.id);
      toggleUpvoted(productRequest.id);
    } else {
      decreaseUpvotes(productRequest.id);
      toggleUpvoted(productRequest.id);
    }
  };
 

  return (
    <div>
      <button
        onClick={(e)=> onToggleUpvotes(e)}
        className={`gap-2  rounded-xl ${styles} ${
          productRequest.upvoted ? 'bg-blue' : 'bg-grey hover:bg-hover-blue'
        }`}
      >
        <ArrowUp className={`${productRequest.upvoted ? 'stroke-white' : 'stroke-blue'}`} />{' '}
        <p
          className={` font-bold ${productRequest.upvoted ? 'text-white' : 'text-dark-blue'}`}
        >
          {productRequest.upvotes}
        </p>
      </button>
    </div>
  );
};

export default UpvoteButton;
