import React from "react";

const Data = [
  {
    id: 1,
    title: "AirMax Pro",
    image:
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, debitis?",
    link: "#",
  },
  {
    id: 2,
    title: "Running Pro",
    image:
      "https://images.unsplash.com/photo-1543508282-6319a3e2621f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, debitis?",
    link: "#",
  },
  {
    id: 3,
    title: "White Sneakers",
    image:
      "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, debitis?",
    link: "#",
  },
];

const Card = () => {
  return (
    <div className="p-16 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-5">
      {Data.map((item) => (
        <div
          key={item.id}
          className="col-span-4 flex flex-col items-center text-center lg:col-span-1 lg:items-start lg:text-left"
        >
          <div
            className="flex h-80 w-72 flex-col justify-end rounded-md relative overflow-hidden"
            style={{
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              className="object-cover w-full h-full rounded-[10px] z-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
            <div className="absolute left-4 bottom-4 text-left">
              <h1 className="text-xl text-white font-semibold">{item.title}</h1>
              <p className="text-gray-300 mt-2">{item.description}</p>
              <button className="text-base text-white cursor-pointer mt-2 font-semibold">
                Shop Now &rarr;
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
