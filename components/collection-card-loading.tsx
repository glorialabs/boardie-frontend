"use client";
import React, {useState} from "react";
import {Skeleton} from "@nextui-org/react";
import {useWallet} from "@aptos-labs/wallet-adapter-react";
import {aptosClient} from "@/utils/aptosClient";
import {mintNft} from "@/entry-functions/mint_nft";
import {Button} from "@nextui-org/button";

export const CollectionCardLoading = () => {
    return (
        <div className="flex flex-col bg-zinc-900  rounded-sm w-full">
            {/* Header */}
            <div className="grid grid-cols-12 justify-between p-3 pb-0 lg:pb-16 w-full">
        <span className="col-start-1 col-span-4 text-zinc-400 uppercase w-full text-sm tracking-wider">
          <Skeleton className="w-24 rounded-lg">
            <div className="h-3 w-full rounded-lg bg-default-200"></div>
          </Skeleton>
        </span>
                <div className="col-start-5 col-span-8 w-full flex justify-end">
                    <Skeleton className="w-3/5 rounded-lg">
                        <div className="h-3 w-full rounded-lg bg-default-200"></div>
                    </Skeleton>
                </div>
            </div>
            {/* Conditions */}
            <div className="grid grid-cols-12 justify-between p-3 pb-40 items-center">
                {/* Condition */}
                <div className="hidden col-start-1 col-span-3 w-full lg:flex flex-col"></div>
                {/* Reward */}
                <div className="lg:col-start-5 lg:col-span-4 col-start-2 col-span-10 w-full items-center relative">
                    <Skeleton className="rounded-lg">
                        <img alt="" src="" className="w-full aspect-square "/>
                    </Skeleton>
                    <div
                        className="z-10 absolute -bottom-24 w-full left-1/2 transform -translate-x-1/2 flex flex-col gap-3 items-center max-w-72">
            <span className="text-zinc-300 text-center text-sm w-full pt-2 flex flex-col gap-2 items-center">
              <Skeleton className="w-full rounded-lg">
                <div className="h-3 w-full rounded-lg bg-default-200"></div>
              </Skeleton>
              <Skeleton className="w-40 rounded-lg">
                <div className="h-3 w-full rounded-lg bg-default-200"></div>
              </Skeleton>
            </span>
                        <div>


                        </div>
                        {/* <span> {endCountdown !== null && endCountdown > 0 && !startCountdown && renderCountdown(endCountdown, "Ends in ")}</span> */}
                    </div>
                </div>
            </div>
            {/* Mob condition & progress */}

            <div className="grid lg:grid-cols-5 grid-cols-2 md:grid-cols-3 gap-4 px-3 pb-3">
                <Skeleton className="rounded-lg">
                    <img alt="" src="" className="w-full aspect-square "/>
                </Skeleton>
                <Skeleton className="rounded-lg">
                    <img alt="" src="" className="w-full aspect-square "/>
                </Skeleton>
                <Skeleton className="rounded-lg">
                    <img alt="" src="" className="w-full aspect-square "/>
                </Skeleton>
                <Skeleton className="rounded-lg">
                    <img alt="" src="" className="w-full aspect-square "/>
                </Skeleton>
                <Skeleton className="rounded-lg">
                    <img alt="" src="" className="w-full aspect-square "/>
                </Skeleton>
                <Skeleton className="rounded-lg">
                    <img alt="" src="" className="w-full aspect-square "/>
                </Skeleton>
                <Skeleton className="rounded-lg">
                    <img alt="" src="" className="w-full aspect-square "/>
                </Skeleton>
                <Skeleton className="rounded-lg">
                    <img alt="" src="" className="w-full aspect-square "/>
                </Skeleton>
            </div>
        </div>
    );
};
