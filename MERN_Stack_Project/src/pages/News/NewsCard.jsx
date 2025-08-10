import React from "react";
import { Link } from 'react-router-dom';
import { getImgUrl } from '../../utils/getImgUrl';

export const NewsCard = ({ newsPiece }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:h-45  sm:justify-center gap-4">

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold mb-2">{newsPiece.title}</h3>
        <p className="text-sm text-gray-600 flex-1">{newsPiece.description}</p>
      </div>

      <Link to={`/news/${newsPiece.id}`}>
        <img
          src={`${getImgUrl(newsPiece.image, "news")}`}
          alt=""
          className="w-full object-cover"
        />
      </Link>
      
    </div>
  );
};

