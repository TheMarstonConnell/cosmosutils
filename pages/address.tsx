import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import converter from "bech32-converting";

let address = ""
let prefix = ""


const HEX_REGEX = /[0-9A-Fa-f]{6}/g;

function updateBoxes() {
    let output = ""
    let hex = address.match(HEX_REGEX)
    if (hex) {
        if (prefix.trim().length == 0) {
            output = ""
        } else {
            try {
                output = converter(prefix).toBech32(address)
            } catch (error) {
                output = "nil"
            }
        }
    } else {
        let io = address.indexOf('1')
        let pref = address.substring(0, io)
        let ha = ""
        try {
            ha = converter(pref).toHex(address)
        } catch (error) {
            output = "nil"
        }
        if (prefix.trim().length == 0) {
            output = ha
        } else {
            try {
                output = converter(prefix).toBech32(ha)
            } catch (error) {
                output = "nil"
            }
        }
    }

    let out = document.getElementById("output_address") as HTMLInputElement

    out.value = output

}

function checkAddress(e: KeyboardEvent) {
    let target: HTMLInputElement = e.target as HTMLInputElement
    address = target.value
    updateBoxes()
}

function checkPrefix(e: KeyboardEvent) {
    let target: HTMLInputElement = e.target as HTMLInputElement
    prefix = target.value
    updateBoxes()
}

export default function AddressConv() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Address Converter</title>
                <meta name="description" content="Converting addresses between networks." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Address Converter
                </h1>

                <div className='w-8/12 flex flex-wrap mt-10'>
                    <div className='w-full flex flex-row space-x-4 '>
                        <input className='w-full px-2 py-1 border-solid border-2 border-blue-400 rounded' type="text" name="input_address" id="input_address" placeholder="input address" onKeyUp={checkAddress} />
                    </div>
                    <div className='w-full flex flex-row space-x-4 mt-8'>
                        <input className='w-3/12 px-2 py-1 border-solid border-2 border-blue-400 rounded' type="text" name="output_prefix" id="output_prefix" placeholder="prefix" onKeyUp={checkPrefix} />
                        <input className='w-9/12 px-2 py-1 border-solid border-2 border-blue-400 rounded' type="text" name="output_address" id="output_address" placeholder="output address" />
                    </div>
                </div>

                <p className='mt-10 w-7/12 p-10 border-solid border-2 border-blue-400 rounded'>
                    Input an address, it can be Hex like ethereum, or bech32 like bitcoin/cosmos. If the address is hex, it will be converted to bech32 according to the prefix. If the input is bech32, it will be converted to hex (if no prefix is specified), or to a different bech32 prefix.
                </p>
            </main>

            <footer className={styles.footer}>
                Jackal Labs 2022
            </footer>
        </div>
    )
}
