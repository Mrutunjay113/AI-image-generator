import React from "react";
import { download } from "../assets";
import { downloadImage } from "../utils";
import deleteImg from "../assets/deleteImg.png";

const Card = ({ _id, name, photo, prompt }) => {
  const handleDelete = async (_id) => {
    console.log(_id);
    try {
      const response = await fetch("http://localhost:8080/api/v1/post", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id }),
      });
      if (response.ok) {
        window.location.reload();
        console.log("deleted", _id);
      } else {
        console.log("Error Deleting data");
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <>
      <div
        className="rounded-xl group relative shadow-card hover:shadow-cardhover card"
        key={_id}
      >
        <img
          className="w-full h-auto object-cover rounded-xl"
          src={photo}
          alt={prompt}
        />
        <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md">
          <p className="text-white text-md overflow-y-auto">{prompt}</p>
          <div className="mt-5 flex justify-between items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold">
                {name[0]}
              </div>
              <p className="text-white text-sm">{name}</p>
            </div>
            <button
              type="button"
              onClick={() => handleDelete(_id)}
              className="outline-none bg-transparent border-none"
            >
              <img
                src={deleteImg}
                alt="download"
                className="w-6 h-7 object-contain invert"
              />
            </button>
            <button
              type="button"
              onClick={() => downloadImage(_id, photo)}
              className="outline-none bg-transparent border-none"
            >
              <img
                src={download}
                alt="download"
                className="w-6 h-7 object-contain invert"
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
