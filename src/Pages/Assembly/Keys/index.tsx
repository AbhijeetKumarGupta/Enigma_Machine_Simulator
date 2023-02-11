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
}

const Keys = (props: PlugsProps) => {
    const {currentKey, KeysList, rotorOne, rotorTwo, rotorThree} = props

    const passThroughRotor = (key: string) => {
        let outputKey:string;
        outputKey = StaticWheel?.[key]
        outputKey = rotorThree?.[outputKey]
        outputKey = rotorTwo?.[outputKey]
        outputKey = rotorOne?.[outputKey]
        return outputKey
    }

    const cur = KeysList?.find((key: KeysListType) => key?.key === currentKey)

    return (
        <>
            <H2>LAMPS</H2>
            <Wrapper>
            {
                KeysList?.map((key: KeysListType, index: number) => {
                    let curKey;
                    if(cur?.connected){
                        curKey = cur?.connected
                    }
                    curKey = passThroughRotor(curKey || currentKey)
                    const isActive = key?.key === curKey
                    return(
                        <Key key={index} keyText={key?.key} isActive={isActive}/>
                    )
                })
            }
            </Wrapper>
        </>
    )
}

export default Keys;
