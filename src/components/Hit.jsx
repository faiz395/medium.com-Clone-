import { Highlight } from "react-instantsearch";
import { Link } from "react-router-dom";
import { PostCard } from "./index";
import { getLikes, getComments, formatDate } from "@/lib/helperFunctions.js";


export const Hit = ({ hit }) => {
  console.log('Rendering Hit component with:', hit);

  return (
   
    <div className="m-0 max-sm:m-0 bg-white w-full">
      <Link to={`/post/${hit.objectID}`} className="autocomplete-item">
        <article className="flex items-center p-4 border-b border-gray-300">
          <div className="flex-shrink-0 w-24 sm:w-32 md:w-48 lg:w-52">
            <img
              src={hit.featuredImage}
              alt={hit.title}
              className="h-auto w-full object-cover rounded-md"
            />
          </div>
          <div className="flex-grow ml-4">
            <h3 className="text-lg text-left font-semibold text-gray-800 max-sm:text-base">
              <Highlight attribute="title" hit={hit} />
            </h3>
            {/* Uncomment if you want to include content */}
            {/* <p className="mt-2 text-gray-600 text-sm">
              <Highlight attribute="content" hit={hit} />
            </p> */}
          </div>
        </article>
      </Link>
    </div>
  );
};
