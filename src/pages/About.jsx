import React from "react";
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black bg-opacity-80 text-white p-6">
      <div className="max-w-4xl my-12 md:my-24 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Everyone has a story to tell.
        </h1>
        <p className="text-xl md:text-2xl leading-relaxed mb-8">
          Medium is a home for human stories and ideas. Here, anyone can share
          insightful perspectives, useful knowledge, and life wisdom with the
          world—without building a mailing list or a following first. The
          internet is noisy and chaotic; Medium is quiet yet full of insight.
          It’s simple, beautiful, collaborative, and helps you find the right
          audience for whatever you have to say.
        </p>

        <p className="text-xl md:text-2xl leading-relaxed mb-8">
          We believe that what you read and write matters. Words can divide or
          empower us, inspire or discourage us. In a world where the most
          sensational and surface-level stories often win, we’re building a
          system that rewards depth, nuance, and time well spent. A space for
          thoughtful conversation more than drive-by takes, and substance over
          packaging.
        </p>

        <p className="text-xl md:text-2xl leading-relaxed mb-8">
          Ultimately, our goal is to deepen our collective understanding of the
          world through the power of writing.
        </p>

        <p className="text-xl md:text-2xl leading-relaxed mb-8">
          Over 100 million people connect and share their wisdom on Medium every
          month. Many are professional writers, but just as many aren’t—they’re
          CEOs, computer scientists, U.S. presidents, amateur novelists, and
          anyone burning with a story they need to get out into the world. They
          write about what they’re working on, what’s keeping them up at night,
          what they’ve lived through, and what they’ve learned that the rest of
          us might want to know too.
        </p>

        <p className="text-xl md:text-2xl leading-relaxed mb-8">
          Instead of selling ads or selling your data, we’re supported by a
          growing community of Medium members who align with our mission. If
          you’re new here, start exploring. Dive deeper into whatever matters to
          you. Find a post that helps you learn something new, or reconsider
          something familiar—and then share your own story.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <button
            onClick={() => navigate("/")}
            className="px-8 py-3 text-lg md:text-xl font-semibold bg-white text-black rounded-lg hover:bg-gray-300 transition-colors"
          >
            Start reading &rarr;
          </button>
          <button
            onClick={() => navigate("/add-post")}
            className="px-8 py-3 text-lg md:text-xl font-semibold bg-white text-black rounded-lg hover:bg-gray-300 transition-colors"
          >
            Start writing &rarr;
          </button>
          
        </div>
      </div>
    </div>
  );
}

export default About;
