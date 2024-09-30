"use client";
import React from "react";
import { useState } from "react";
import { Image } from "@nextui-org/image";
import khaleesi from "../public/1.png";
import {Link} from "@nextui-org/link";
import {  Button } from "@nextui-org/button";

export const Nft = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-zinc-950/50 group aspect-square w-full p-2 shadow-inner-[0px 2px 21px 8px rgba(0,0,0,0.05)]">
      <div className="relative w-full aspect-square bg-zinc-500">
      <Button
      href="https://github.com/nextui-org/nextui"
      as={Link}
      color="default"
      size="sm"
      variant="solid"
      radius="full"
      className="absolute group-hover:opacity-100 opacity-0  bottom-2 z-20 px-2 left-1/2 transform -translate-x-1/2"
      
    >
      Mint ↗ 
    </Button>
       <Image
          className="w-[800px] aspect-square saturate-0 mix-blend-multiply"
          alt="NextUI hero Image"
          radius="none"
          src={khaleesi.src}
        />
      </div>
    </div>
  );
};
