import { fetchGraphQL } from "./utils";

export type TokenInfo = {
    mintAddress: string;
    amount: number;
}

export type TxSwapInfo = {
    buy: TokenInfo;
    sell: TokenInfo;
    block: {
        time: number;
        height: number;
    };
    transaction: {
        signature: string;
        feePayer: string;
        signer: string;
    };
}

export async function getSwapTxs(address: string) {
    const query = 
    `
    query MyQuery($address: String) {
        Solana {
            DEXTrades(
            where: {Trade: {Dex: {ProgramAddress: {is: "675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8"}}}, Transaction: {Signer: {is: $address}}}
            ) {
            Trade {
                Dex {
                ProgramAddress
                ProtocolFamily
                ProtocolName
                }
                Buy {
                Account {
                    Address
                }
                Amount
                Currency {
                    MintAddress
                    Decimals
                    Symbol
                    ProgramAddress
                    Name
                }
                PriceAgaistSellCurrency: Price
                }
                Sell {
                Account {
                    Address
                }
                Amount
                Currency {
                    MintAddress
                    Decimals
                    Symbol
                    Name
                }
                PriceAgaistBuyCurrency: Price
                }
            }
            Block {
                Time
                Height
            }
            Transaction {
                Signature
                FeePayer
                Signer
            }
            }
        }
    }
    `;
    const variables = {
        address,
    };
    const result = (await fetchGraphQL(query, variables)).data.Solana.DEXTrades;
    const transformedResult = result.map((res: any) => {
        return {
            buy: {
                mintAddress: res.Trade.Buy.Currency.MintAddress,
                amount: res.Trade.Buy.Amount,
            },
            sell: {
                mintAddress: res.Trade.Sell.Currency.MintAddress,
                amount: res.Trade.Sell.Amount,
            },
            block: {
                time: res.Block.Time,
                height: res.Block.Height,
            },
            transaction: {
                signature: res.Transaction.Signature,
                feePayer: res.Transaction.FeePayer,
                signer: res.Transaction.Signer,
            },
        }
    });
    return transformedResult;
}