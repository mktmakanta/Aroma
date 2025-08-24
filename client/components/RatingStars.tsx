import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { RatingStarsProps } from "@/types/globalTypes";

const RatingStars: React.FC<RatingStarsProps> = ({ rating }) => {
  return (
    <div className="flex items-center">
      {/* FIRST STAR  */}
      <span>
        {rating >= 1 ? (
          <FaStar className="text-yellow-400" />
        ) : rating >= 0.5 ? (
          <FaStarHalfAlt className="text-yellow-400" />
        ) : (
          <FaRegStar className="text-yellow-400" />
        )}
      </span>
      {/* SECOND STAR  */}
      <span>
        {rating >= 2 ? (
          <FaStar className="text-yellow-400" />
        ) : rating >= 1.5 ? (
          <FaStarHalfAlt className="text-yellow-400" />
        ) : (
          <FaRegStar className="text-yellow-400" />
        )}
      </span>
      {/* THIRD STAR  */}
      <span>
        {rating >= 3 ? (
          <FaStar className="text-yellow-400" />
        ) : rating >= 2.5 ? (
          <FaStarHalfAlt className="text-yellow-400" />
        ) : (
          <FaRegStar className="text-yellow-400" />
        )}
      </span>
      {/* FOUTH STAR  */}
      <span>
        {rating >= 4 ? (
          <FaStar className="text-yellow-400" />
        ) : rating >= 3.5 ? (
          <FaStarHalfAlt className="text-yellow-400" />
        ) : (
          <FaRegStar className="text-yellow-400" />
        )}
      </span>
      {/* FIFTH STAR  */}
      <span>
        {rating >= 5 ? (
          <FaStar className="text-yellow-400" />
        ) : rating >= 4.5 ? (
          <FaStarHalfAlt className="text-yellow-400" />
        ) : (
          <FaRegStar className="text-yellow-400" />
        )}
      </span>
    </div>
  );
};

export default RatingStars;
