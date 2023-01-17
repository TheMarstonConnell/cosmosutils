import Head from 'next/head'
import styles from '../styles/Home.module.css'

declare global {
    interface Window {
        keplr: Keplr
        getOfflineSigner: Function
    }
    interface EnableFunction {
        (source: string): boolean
    }
    interface Keplr {
        enable: EnableFunction;
        getKey: Function;
        getOfflineSigner: Function;
        experimentalSuggestChain: Function;
    }
}

export default function TerraIBC() {
    const chainId = "jackal-1"
    
    function addJackal(){
        let prefix = "jkl"
        window.keplr.experimentalSuggestChain({
            chainId: chainId,
            chainName: "Jackal",
            rpc: "https://rpc.jackalprotocol.com",
            rest: "https://api.jackalprotocol.com",
            bip44: {
                coinType: 118,
            },
            bech32Config: {
                bech32PrefixAccAddr: prefix,
                bech32PrefixAccPub: prefix + "pub",
                bech32PrefixValAddr: prefix + "valoper",
                bech32PrefixValPub: prefix + "valoperpub",
                bech32PrefixConsAddr: prefix + "valcons",
                bech32PrefixConsPub: prefix + "valconspub",
            },
            currencies: [ 
                { 
                    coinDenom: "JKL", 
                    coinMinimalDenom: "ujkl", 
                    coinDecimals: 6, 
                    coinGeckoId: "jackal-protocol", 
                }, 
            ],
            feeCurrencies: [
                {
                    coinDenom: "JKL", 
                    coinMinimalDenom: "ujkl", 
                    coinDecimals: 6, 
                    coinGeckoId: "jackal-protocol", 
                    gasPriceStep: {
                        low: 0.01,
                        average: 0.025,
                        high: 0.04,
                    },
                },
            ],
            stakeCurrency: {
                coinDenom: "JKL", 
                    coinMinimalDenom: "ujkl", 
                    coinDecimals: 6, 
                    coinGeckoId: "jackal-protocol", 
            },
        });
    }

   
    return (
        
            <div className={styles.container}>
                <Head>
                    <title>Jackal to Keplr</title>
                    <meta name="description" content="Adding Jackal to Keplr" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <main className={styles.main}>
                    <h1 className={styles.title}>
                        Jackal on Keplr
                    </h1>

                    {/* <button onClick={connectKeplrWallet}>IBC Send</button> */}
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={addJackal}>Add to Keplr</button>

                   
                </main>
                <footer className={styles.footer}>
                    Jackal Labs 2022
                </footer>
            </div>
    )
}
