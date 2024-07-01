import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";

const ReviewStar = ({ rating }: { rating: number }) => {
  const total_Stars = [1, 2, 3, 4, 5];
  const currentStarArr =Array.from({ length: rating }, (_, i) => i);
  const restStars = total_Stars.length - rating
  const restStarsArr =Array.from({ length: restStars }, (_, i) => i);
  return (
    <>
      {currentStarArr.map((star) => (
        <StarFilledIcon
          key={star}
          className="w-6 h-6 text-yellow-400 hover:pr-1"
          aria-hidden="true"
        />
      ))}
      {restStarsArr.map((star) => (
        <StarIcon
          key={star}
          className="w-6 h-6 hover:pr-1"
          aria-hidden="true"
        />
      ))}
      </>
  );
};

export default ReviewStar;