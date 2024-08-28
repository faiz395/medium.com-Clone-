import React from "react";
import service from "@/appwrite/config.js";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

function PostCard2({ $id, title, content, featuredImage, className }) {
  // Limit the title and description to a certain character count
  const truncatedTitle = title.length > 50 ? title.substr(0, 50) + "..." : title;
  const truncatedContent = content.length > 100 ? content.substr(0, 100) + "..." : content;
  const pContent = parse(truncatedContent + "</div>");

  return (
    <Link to={`/post/${$id}`} className={`block group ${className}`}>
      <div className="flex flex-col items-stretch p-4 border rounded-lg hover:shadow-lg transition-shadow duration-300 ease-in-out">
        {featuredImage && (
          <div className="flex-shrink-0 w-full mb-4">
            <img
              src={service.getFilePreview(featuredImage)}
              alt=""
              className="w-full h-32 sm:h-48 object-cover rounded-md"
            />
          </div>
        )}
        <div className="flex flex-col">
          <h2 className="text-lg text-center sm:text-xl font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
            {truncatedTitle}
          </h2>
          <p className="mt-1 text-center text-sm sm:text-base text-gray-700 leading-relaxed">
            {pContent}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default PostCard2;
