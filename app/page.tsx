"use client";

import React, {useEffect, useState} from "react";
import Carousel from '@/components/carousel';
import {CollectionCard} from "@/components/collection-card";
import {CollectionCardLoading} from "@/components/collection-card-loading";
import {WalletSelector as ShadcnWalletSelector} from "@/components/wallet-selector";
import {
    useWallet
} from "@aptos-labs/wallet-adapter-react";
import {BACKEND_URL} from "@/constants";
import mixpanel from 'mixpanel-browser'

export default function Home() {
    const {account, connected, network, wallet, changeNetwork} = useWallet();
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(true); // State to track loading status

    useEffect(() => {
        if (typeof window !== 'undefined') {
            mixpanel.init("f093ac66ca1a77bcf13f241a03d7688d", {
                debug: false,
                track_pageview: true,
                persistence: "localStorage",
            });
            if (account) {
                mixpanel.track('Connect Wallet', {
                    'Address': account?.address
                });
                mixpanel.identify(account?.address);
            }

        }
        fetch(BACKEND_URL + 'boards?address=' + account?.address)
            .then((response) => response.json())
            .then((data) => {
                setBoards(data['boards']);
            })
            .catch((err) => {
                console.log(err.message);
            })
            .finally(() => {
                setLoading(false); 
            });
    }, [connected, account?.address]);

    return (
        <section className="flex flex-col items-center justify-center gap-4 bg-zinc-950" id="page">
            <div className="w-full flex flex-row md:grid md:grid-cols-12 p-1 justify-between">
                <div className="flex flex-col md:grid-start-1 md:col-span-4">
               <div className="flex flex-row gap-1 pl-1"><img src="/logo.svg" className="w-8" alt="Logo" /><h1 className=" font-mono uppercase text-sm py-2 tracking-wider "> Boardie</h1></div>
                <p className="md:hidden font-mono uppercase text-left  pl-3 md:pl-0 text-zinc-500 text-sm tracking-wider">
                    NFT collections boards
                </p>
                </div>
                <p className="hidden md:block py-2 md:grid-start-5 md:col-span-4 font-mono uppercase text-left md:text-center pl-3 md:pl-0 text-zinc-500 text-sm tracking-wider">
                    NFT collections boards
                </p>
                <div className="flex justify-end md:grid-start-9 md:col-span-4 ">
                    <ShadcnWalletSelector/>
                </div>
            </div>

            <div className="pt-12"></div>

            <div className="w-full mr-auto h-screen bg-zinc-950">
           
              
                {loading ? ( // Display loading text while fetching data
                    <Carousel>
                        <CollectionCardLoading/>
                    </Carousel>
                ) : (
                    <Carousel>

                        {boards.map((board: any) => (
                            <CollectionCard key={board?.id} board={board} address={account?.address || ''} />
                        ))}
                       
                    </Carousel>
                )}
            </div>
        </section>
    );
}


