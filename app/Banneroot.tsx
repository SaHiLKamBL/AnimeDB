'use client';

import React from 'react';
interface prop{
  text:string,
  image:string,
  name:string
}

const Banneroot = ({ text, name, image }:prop) => {
  return (
    <div
      className={`w-full h-[60vh] bg-center bg-contain bg-no-repeat flex flex-col justify-center gap-5`}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="w-full h-50 text-5xl italic font-[cursive] text-white text-center px-20">
        {text}
      </div>
      <div className="w-full flex justify-end items-center px-10">
        <h1 className="text-4xl text-white font-semibold italic font-[cursive]">
          - {name}
        </h1>
      </div>
    </div>
  );
};

export default Banneroot;
