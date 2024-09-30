"use client";
import React, {useState} from "react";
import {Progress} from "@nextui-org/progress";
import {Link} from "@nextui-org/link";
import {Button} from "@nextui-org/button";
import {NftCollected} from "@/components/nft-collected";
import {WalletSelector as ShadcnWalletSelector} from "@/components/wallet-selector";
import useCountdown from "@/utils/use-countdown";
import {useWallet} from "@aptos-labs/wallet-adapter-react";
import {aptosClient} from "@/utils/aptosClient";
import {mintNft} from "@/entry-functions/mint_nft";
import {BACKEND_URL} from "@/constants";

export const CollectionCard: React.FC<{ board: any; address: string }> = ({board, address}) => {
    const [claiming, setClaiming] = useState(false); // State to track claiming process
    const [claimed, setClaimed] = useState(false); // State to track if the NFT is claimed

    const startCountdown = useCountdown(board?.start_date);
    const endCountdown = useCountdown(board?.end_date);

    const array = board?.nfts || [];
    const placeholderArray = board?.my_count < board?.count ? new Array(board?.count - board?.my_count).fill(null) : [];
    const { signAndSubmitTransaction } = useWallet();

    const mintTransaction = async (boardId: number) => {
        try {
            const response = await signAndSubmitTransaction(
                mintNft({ boardId })
            );


            // Wait for the transaction to be commited to chain
            const committedTransactionResponse = await aptosClient().waitForTransaction({
                transactionHash: response.hash,
            });
            console.log("Transaction committed", committedTransactionResponse);
            console.log(response.hash);
            board.status = 'minted';
            await handleClaimNFT(response.hash);

        } catch (error) {
            console.log(error);
            // alert(error);
        } finally {
            console.log("Minting NFT completed");
        }
    };

    const handleClaimNFT = async (transactionHash: string) => {
        setClaiming(true);
        try {
            const response = await fetch(BACKEND_URL + 'submissions/' + board?.submission_id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    submission: {
                        board_id: board?.id,
                        address: address,
                        transaction_hash: transactionHash,
                    },
                }),
            });

            if (response.ok) {
                console.log('here')
                board.status = 'minted';
                // Handle successful response
                //setClaimed(true);
            } else {
                // Handle error response
                console.error('Failed to store transaction hash');
            }
        } catch (error) {
            console.error('Error storing transaction hash:', error);
        } finally {
            //setClaiming(false);
        }
    };

    const renderDescriptionText = () => {
        // if (!address) {
        //     return "When your wallet is connected, our system will display your NFTs on the board automatically.";
        // }

        switch (board?.status) {
            case 'whitelist_pending':
                return "We're adding you to the whitelist. You'll be able to get your reward soon.";
            case 'whitelisted':
                return "You're on the list! Click on “Mint Reward” to get your special NFT.";
            default:
                return board?.description;
        }
    };

    const renderActionButton = () => {
        // if (claimed) {
        //     return <span className="text-green-500">NFT Claimed</span>;
        // }

        if (endCountdown !== null && endCountdown <= 0) {
            return <span className="text-red-500">Event Ended</span>;
        }

        if (!address) {
            return <ShadcnWalletSelector/>;
        }

        switch (board?.status) {
            case 'eligible':
            case 'not_eligible':
                return <Button className="bg-white text-zinc-950 uppercase tracking-wider rounded py-2 px-4 h-fit" onClick={() => mintTransaction(board?.id)}
                               isDisabled={board?.status === 'not_eligible'}>
                    Mint Reward
                </Button>
            case 'minted':
                return (
                    // TODO: add styles?
                    <p className="inline-block text-transparent bg-clip-text uppercase tracking-wider font-medium bg-gradient-to-r from-pink-500 to-yellow-500">Board Completed</p>
                );
            default:
                return null;
        }
    };

    const renderCountdown = (timeLeft: number | null, label: string) => {
        if (timeLeft === null) return null;
        if (timeLeft <= 0) return renderActionButton();

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        return (
            <div className="text-center flex flex-row gap-3">
                <div className="uppercase tracking-wider text-xs">{label}:</div>
                <div className="uppercase tracking-wider text-zinc-300 text-xs">
                    {days}d : {hours}h : {minutes}m : {seconds}s
                </div>
            </div>
        );
    };

    return (

        <div className="flex flex-col w-full gap-4">
        <div
            className={`w-full rounded-sm  ${
                board?.status === 'minted' ? 'bg-zinc-900' : 'bg-zinc-900'
            } h-full`}
        >
            {/* Header */}
            <div className="grid grid-cols-12 justify-between p-3 pb-0 lg:pb-16 w-full">
                <span className={`col-start-1 col-span-4  ${
                board?.status === 'minted' ? 'text-zinc-400/80' : 'text-zinc-400'
            } uppercase w-full text-sm tracking-wider`}>
                    #{board?.position}
                </span>
                <div className="col-start-5 col-span-8 w-full flex justify-end">
                    <span className={`uppercase ${
                board?.status === 'minted' ? 'text-zinc-400/80' : 'text-zinc-400'
            } w-full text-sm tracking-wider max-w-56 text-right`}>
                        {board?.submissions_count === 0 ? 'finish first' : `completed by ${board?.submissions_count} collectors`}
                    </span>
                </div>
            </div>
            {/* Conditions */}
            <div className="grid grid-cols-12 justify-between p-3 pb-40 items-center">
                {/* Condition */}
                <div className="hidden col-start-1 col-span-3 w-full lg:flex flex-col"></div>
                {/* Reward */}
                <div className="lg:col-start-5 lg:col-span-4 col-start-2 col-span-10 w-full items-center relative">
                    <img alt={board?.name} src={board?.cover_url} className={`w-full aspect-square ${
                board?.status === 'minted' ? 'opacity-70' : 'opacity-100'
            }`} />
                    <div className="z-10 absolute -bottom-24 w-full left-1/2 transform -translate-x-1/2 flex flex-col gap-3 items-center max-w-72">
                        {startCountdown !== null && startCountdown > 0 ? renderCountdown(startCountdown, "Starts in") : renderActionButton()}
                        <span className={`${
                board?.status === 'minted' ? 'text-zinc-400/80' : 'text-zinc-300'
            } text-center text-sm w-full pt-2`}>{renderDescriptionText()}</span>
                        <div>
                            {board?.my_count !== undefined && board?.status !== 'minted' && (
                                <Progress
                                    size="sm"
                                    radius="none"
                                    classNames={{
                                        base: "flex flex-row items-center",
                                        track: "drop-shadow-md border border-default w-[80px]",
                                        indicator: "bg-gradient-to-r from-pink-500 to-yellow-500",
                                        label: "text-zinc-500 uppercase w-full text-right text-sm",
                                        value: "text-foreground/60",
                                    }}
                                    label={`${board?.my_count} / ${board?.count}`}
                                    value={(board?.my_count / board?.count) * 100}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* Mob condition & progress */}
            {board?.my_count !== undefined && board?.status !== 'minted' && (
                <div className="grid lg:grid-cols-5 grid-cols-2 md:grid-cols-3 gap-4 px-3 pb-3">
                    {array.map((item: any) => (
                        <NftCollected
                            key={item.current_token_data.token_data_id}
                            image={item.current_token_data.cdn_asset_uris.cdn_image_uri}
                            backupImage={item.current_token_data.cdn_asset_uris.backup_cdn_image_uri}
                            name={item.current_token_data.token_name}
                        />
                    ))}
                    {placeholderArray.map((_, index) => (
                        <NftCollected key={index} image="/placeholder.png" />
                    ))}
                </div>
            )}
        </div>
    </div>

    );
};