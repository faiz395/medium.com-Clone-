import React from "react";
import service from "@/appwrite/config.js";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

function PostCard({ $id, title, content, featuredImage }) {
  // Limit the title and description to a certain character count
  const truncatedTitle = title.length > 60 ? title.substr(0, 60) + "..." : title;
  const truncatedContent = content.length > 120 ? content.substr(0, 120) + "..." : content;
  const pContent = parse(truncatedContent + "</div>");

  return (
    <Link to={`/post/${$id}`} className="block group my-6">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center p-4 border rounded-lg hover:shadow-lg transition-shadow duration-300 ease-in-out">
        <div className="flex-grow sm:w-2/3">
          <h2 className="text-lg sm:text-xl text-left font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
            {truncatedTitle}
          </h2>
          <p className="mt-1 text-sm sm:text-base text-left text-gray-700 leading-relaxed">
            {pContent}
          </p>
        </div>
        {featuredImage && (
          <div className="mt-4 sm:mt-0 sm:ml-6 flex-shrink-0 sm:w-1/3">
            <img
              src={service.getFilePreview(featuredImage)}
              alt=""
              className="w-full h-40 sm:h-auto object-cover rounded-md"
            />
          </div>
        )}
      </div>
    </Link>
  );
}

export default PostCard;
