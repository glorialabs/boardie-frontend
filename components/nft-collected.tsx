"use client";
import React from "react";
import { useState } from "react";
import { Image } from "@nextui-org/image";

interface NftCollectedProps {
    image?: string;
    backupImage?: string;
    name?: string;
}

export const NftCollected: React.FC<NftCollectedProps> = ({ image = '/placeholder.png', backupImage, name }) => {
    // console.log(image);

  const [count, setCount] = useState(0);



  return (
    <div className="bg-zinc-950/50 aspect-square w-full p-2 shadow-inner-[0px 2px 21px 8px rgba(0,0,0,0.05)]">
      <div className="w-full aspect-square bg-zinc-500">
          <img className="w-[800px] aspect-square" src={image} onError={(e) => {
              // Check if the onError has already been executed
              if (!e.currentTarget.dataset.errorHandled) {
                  // Set the custom attribute to mark that onError has been executed
                  e.currentTarget.dataset.errorHandled = "true";
                  // Set the source to the backup image
                  e.currentTarget.src = backupImage || '';
              }
          }} title={name} alt={name}/>

      </div>
    </div>
  );
};
