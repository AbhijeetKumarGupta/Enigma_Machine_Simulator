import Key from "../../Components/Key";
import { StaticWheel } from "../../helper";
import { H2, Wrapper } from "../../style";
import { KeysListType } from "../../types";

interface PlugsProps{
    currentKey: string;
    KeysList: Array<KeysListType>;
    rotorOne: any;
    rotorTwo: any;
    rotorThree: any;
    isDecryption: boolean;
}

const Keys = (props: PlugsProps) => {
    const {currentKey, KeysList, rotorOne, rotorTwo, rotorThree, isDecryption} = props

    const passThroughEncryptionRotor = (key: string) => {
        let outputKey:string;
        outputKey = StaticWheel?.[key]
        outputKey = rotorThree?.[outputKey]
        outputKey = rotorTwo?.[outputKey]
        outputKey = rotorOne?.[outputKey]
        return outputKey
    }

    const passThroughDecryptionRotor = (key: string) => {
        let outputKey:string;
        outputKey = Object.keys(rotorOne)?.find((rotorKey:any) => rotorOne?.[rotorKey] === key) || ''
        outputKey = Object.keys(rotorTwo)?.find((rotorKey:any) => rotorTwo?.[rotorKey] === outputKey) || ''
        outputKey = Object.keys(rotorThree)?.find((rotorKey:any) => rotorThree?.[rotorKey] === outputKey) || ''
        outputKey = Object.keys(StaticWheel)?.find((rotorKey:any) => StaticWheel?.[rotorKey] === outputKey) || ''
        return outputKey
    }

    const isActiveKey = (key: string) => {
        let curKey;
        if(cur?.connected){
            curKey = cur?.connected
        }
        const encryptionDecryptionFunction = isDecryption ? passThroughDecryptionRotor : passThroughEncryptionRotor
        curKey = encryptionDecryptionFunction(curKey || currentKey)
        return key === curKey
    }

    const cur = KeysList?.find((key: KeysListType) => key?.key === currentKey)

    return (
        <>
            <H2>LAMPS</H2>
            <Wrapper>
            {
                KeysList?.map((key: KeysListType, index: number) => {
                    
                    return(
                        <Key key={index} keyText={key?.key} isActive={isActiveKey(key?.key)}/>
                    )
                })
            }
            </Wrapper>
        </>
    )
}

export default Keys;
