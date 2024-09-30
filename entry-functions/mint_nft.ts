import { AccountAddressInput } from "@aptos-labs/ts-sdk";
import { InputTransactionData } from "@aptos-labs/wallet-adapter-react";


export type MintNftArguments = {
    boardId: number;
};

export const mintNft = (args: MintNftArguments): InputTransactionData => {
    const {
        boardId,
    } = args;
    return {
        data: {
            function: "0x133d00f4aef05c63944fc861f22ef732ce7a3c2652ce3b2f9ce0d226ef085f2c::boards::mint_nft",
            typeArguments: [],
            functionArguments: [
                boardId
            ],
        },
    };
};
