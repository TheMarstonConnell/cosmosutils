import Head from 'next/head'
import Image from 'next/image'
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
    
    function addTerra(){
        let prefix = "terra"
        window.keplr.experimentalSuggestChain({
            chainId: "phoenix-1",
            chainName: "Terra2",
            rpc: "https://terra-rpc.polkachu.com/",
            rest: "https://terra-api.polkachu.com/",
            bip44: {
                coinType: 330,
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
                    coinDenom: "LUNA", 
                    coinMinimalDenom: "uluna", 
                    coinDecimals: 6, 
                    coinGeckoId: "terra", 
                }, 
            ],
            feeCurrencies: [
                {
                    coinDenom: "LUNA", 
                    coinMinimalDenom: "uluna", 
                    coinDecimals: 6, 
                    coinGeckoId: "terra", 
                    gasPriceStep: {
                        low: 0.01,
                        average: 0.025,
                        high: 0.04,
                    },
                },
            ],
            stakeCurrency: {
                coinDenom: "LUNA", 
                    coinMinimalDenom: "uluna", 
                    coinDecimals: 6, 
                    coinGeckoId: "terra", 
            },
        });
    }

   
    return (
        
            <div className={styles.container}>
                <Head>
                    <title>Address Converter</title>
                    <meta name="description" content="Adding Terra 2 to Keplr to test IBC" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <main className={styles.main}>
                    <h1 className={styles.title}>
                        Terra on Keplr
                    </h1>

                    {/* <button onClick={connectKeplrWallet}>IBC Send</button> */}
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={addTerra}>Add Terra</button>

                   
                </main>
                <footer className={styles.footer}>
                    Jackal Labs 2022
                </footer>
            </div>
    )
}
