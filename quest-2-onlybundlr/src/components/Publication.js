import React from "react";

const Publication = ({ id, content, description, media, publisher }) => {
  return (
    <div className="w-[580px] flex flex-col justify-center bg-white my-5 shadow-lg px-4 py-4 rounded-xl" key={id}>
      <div className="flex flex-row items-center">
        <img
          className="inline-block h-10 w-10 mr-3 rounded-full"
          src={publisher.picture?.original.url}
          alt={publisher.handle}
        />
        <h2 className="font-bold text-lg">
          <a className="text-primary font-bold underline" href={"/" + publisher.handle}>
            {publisher.handle}
          </a>
        </h2>
      </div>
      {media &&
        media.map((picture, id) => {
          return (
            <img
              key={id}
              className="mt-3 rounded-xl"
              src={picture.original?.url}
              alt="Publication media"
            />
          );
        })}
      <h2 className="mt-3 text-xl font-bold">{content}</h2>
      <p className="mt-2">{description}</p>
    </div>
  );
};

export default Publication;
