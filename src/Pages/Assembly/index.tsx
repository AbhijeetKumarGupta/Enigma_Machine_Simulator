import { useEffect, useState } from "react";
import { Alphabets, KeysList, NextKeys, RotorKeys, RotorOne, RotorThree, RotorTwo } from "../helper";
import Keys from "./Keys";
import Plugs from "./Plugs";
import Rotors from "./Rotors";

interface EnigmaProps{
    currentKey: string;
}

const Enigma = () => {
    const [keyAndPlug, setKeyPlug] = useState<Array<any>>(KeysList)
    const [currentKey, setCurrentKey] = useState<string>('')
    const [rotorKeys, setRotorKeys] = useState<Array<string>>(RotorKeys)
    const [rotorOne, setRotorOne] = useState<any>(RotorOne)
    const [rotorTwo, setRotorTwo] = useState<any>(RotorTwo)
    const [rotorThree, setRotorThree] = useState<any>(RotorThree)
    const [isFirst, setFirst] = useState<boolean>(true)

    const keyDown = (event:any) => {
        onClick(event)
    }

    const keyUp = (event:any) => {
        setCurrentKey('')
    }

    const handleRotateRotor = (rotor:any, setter:any) => {
        const tempRotor = JSON.parse(JSON.stringify(rotor))
        Object.keys(tempRotor)?.forEach((key:any) => tempRotor[key] = NextKeys[tempRotor[key]])
        setter(tempRotor)
    }

    const onClick = (event: KeyboardEvent) => {
        if(Alphabets.includes(event?.key?.toUpperCase())){
            setCurrentKey(event?.key?.toUpperCase());  
            handleRotate()
        }
        if(isFirst){
            setFirst(false)
        }else{
            document.body.removeEventListener("keydown", keyDown);  
            document.body.removeEventListener("keyup", keyUp); 
        }
    
    }

    const handleRotate = () => {
        let alreadyEntered = false
        if(rotorKeys?.[0] === 'Z'){
            setRotorKeys((prev:any) => {
                const temp = JSON.parse(JSON.stringify(prev))
                temp[2] = NextKeys[rotorKeys?.[2]]//NextKeys[RotorThree[rotorKeys?.[2]]]
                temp[0] = NextKeys[rotorKeys?.[0]]//NextKeys[RotorOne[rotorKeys?.[0]]]
                return temp
            })
            handleRotateRotor(rotorThree, setRotorThree)
            handleRotateRotor(rotorOne, setRotorOne)
        }
        if(rotorKeys?.[1] === 'Z' && rotorKeys?.[2] === 'Z'){
            alreadyEntered = true
            setRotorKeys((prev:any) => {
                const temp = JSON.parse(JSON.stringify(prev))
                temp[0] = NextKeys[rotorKeys?.[0]]//NextKeys[RotorOne[rotorKeys?.[0]]]
                temp[1] = NextKeys[rotorKeys?.[1]]//NextKeys[RotorTwo[rotorKeys?.[1]]]
                return temp
            })
            handleRotateRotor(rotorOne, setRotorOne)
            handleRotateRotor(rotorTwo, setRotorTwo)
        }
        if(rotorKeys?.[2] === 'Z'){
            setRotorKeys((prev:any) => {
                const temp = JSON.parse(JSON.stringify(prev))
                if(!alreadyEntered) temp[1] = NextKeys[rotorKeys?.[1]]//NextKeys[RotorTwo[rotorKeys?.[1]]]
                temp[2] = NextKeys[rotorKeys?.[2]]//NextKeys[RotorThree[rotorKeys?.[2]]]
                return temp
            })
            if(!alreadyEntered) handleRotateRotor(rotorTwo, setRotorTwo)
            handleRotateRotor(rotorThree, setRotorThree)
        }else{
            setRotorKeys((prev:any) => {
                const temp = JSON.parse(JSON.stringify(prev))
                temp[2] = NextKeys[rotorKeys?.[2]]//NextKeys[RotorThree[rotorKeys?.[2]]]
                return temp
            })
            handleRotateRotor(rotorThree, setRotorThree)
        }
    }

    useEffect(() => {
        if(!currentKey){
            document.body.addEventListener('keydown', keyDown);
            document.body.addEventListener('keyup', keyUp);
        }
        return () => {
            document.body.addEventListener('keydown', keyDown);
            document.body.addEventListener('keyup', keyUp);
        };
    },[currentKey])
        
    return (
        <>
            <Rotors rotorKeys={rotorKeys}/>
            <Keys currentKey={currentKey} KeysList={keyAndPlug}/>
            <Plugs plugs={keyAndPlug} setPlugs={setKeyPlug}/>
        </>
    )
}

export default Enigma;