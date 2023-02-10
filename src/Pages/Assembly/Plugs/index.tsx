import { useState } from "react";
import Plug from "../../Components/Plug";
import { ColorCodes, KeyIndex } from "../../helper";
import { H2, Wrapper } from "../../style";

interface PlugsProps{
    plugs: Array<any>;
    setPlugs: any;
}

const Plugs = (props: PlugsProps) => {
    const {plugs, setPlugs} = props
    const [lastPlug, setLastPlug] = useState<string>('')

    const handlePlug = (key: string) => {
        const currentKey = key;
        const lastKey = lastPlug;
        if(lastPlug && lastPlug !== key && (!plugs[KeyIndex[currentKey]]?.connected && !plugs[KeyIndex[lastKey]]?.connected)){
            setPlugs((prev:any) => {
                const tempPlug = JSON.parse(JSON.stringify([...prev]))
                tempPlug[KeyIndex[currentKey]].connected =  lastKey; 
                tempPlug[KeyIndex[lastKey]].connected = currentKey;
                return tempPlug
            })
            setLastPlug('')
        }else if(plugs[KeyIndex[currentKey]]?.connected && plugs[KeyIndex[lastKey]]?.connected){
            setPlugs((prev:any) => {
                const tempPlug = JSON.parse(JSON.stringify([...prev]))
                tempPlug[KeyIndex[currentKey]].connected =  ''; 
                tempPlug[KeyIndex[lastKey]].connected = '';
                return tempPlug
            })
            setLastPlug('')
        }else if(lastPlug === key || lastPlug){
            setLastPlug('')
        }else{ 
            setLastPlug(key)
        }
    }

    return (
        <>
            <H2>PLUGS</H2>
            <Wrapper>
            {
                plugs?.map((key:any, index:number) => 
                    <Plug 
                        key={index} 
                        thisPlug={key?.key} 
                        color={
                            key?.connected ? 
                            (
                                index <= KeyIndex[key?.connected] ?
                                ColorCodes[key?.connected] : 
                                ColorCodes[key?.key]
                            ) :
                            null 
                        } 
                        onClick={() => handlePlug(key?.key)}
                    />
                )
            }
            </Wrapper>
        </>
    )
}

export default Plugs;