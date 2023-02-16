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
        signArbitrary: Function;
    }
}

export default function TerraIBC() {
    const chainId = "jackal-1"
    
    async function sign(){
        let data_in = document.getElementById("data_input")
        let data_out = document.getElementById("data_output")
        if (data_out == null) {
            return
        }
        if (data_in == null) {
            return
        }

        

        let toSign = (data_in as HTMLTextAreaElement).value
        console.log(toSign)


        let key =  await window.keplr.getKey(chainId)
        let data = await window.keplr.signArbitrary(chainId, key.bech32Address, toSign)
        
        

        let out = data_out as HTMLTextAreaElement
        out.value = data.signature

        
    }

   
    return (
        
            <div className={styles.container}>
                <Head>
                    <title>Sign Message</title>
                    <meta name="description" content="Signing data with Jackal address." />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <main className={styles.main}>
                    <h1 className={styles.title}>
                        Sign Message With Jackal
                    </h1>

                    <textarea className='my-4 border-solid border-2 border-blue-400 rounded' id="data_input" name="data_input" rows={4} cols={50}></textarea>
                    {/* <button onClick={connectKeplrWallet}>IBC Send</button> */}
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={sign}>Sign Data</button>
                    <textarea className='my-4 border-solid border-2 border-blue-400 rounded' id="data_output" name="data_output" rows={4} cols={50} readOnly={true}></textarea>

                   
                </main>
                <footer className={styles.footer}>
                    Jackal Labs 2022
                </footer>
            </div>
    )
}
