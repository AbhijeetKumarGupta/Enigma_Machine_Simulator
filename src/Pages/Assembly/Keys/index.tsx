import Key from "../../Components/Key";
import { RotorOne, RotorThree, RotorTwo, StaticWheel } from "../../helper";
import { H2, Wrapper } from "../../style";

interface PlugsProps{
    currentKey: string;
    KeysList: Array<any>;
}

const Keys = (props: PlugsProps) => {
    const {currentKey, KeysList} = props

    const passThroughRotor = (key: string) => {
        let outputKey;
        outputKey = StaticWheel?.[key]
        outputKey = RotorThree?.[outputKey]
        outputKey = RotorTwo?.[outputKey]
        outputKey = RotorOne?.[outputKey]
        return outputKey
    }

    const cur = KeysList?.find((key:any) => key?.key === currentKey)

    return (
        <>
            <H2>LAMPS</H2>
            <Wrapper>
            {
                KeysList?.map((key:any, index:number) => {
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
