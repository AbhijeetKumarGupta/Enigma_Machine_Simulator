import { useEffect, useState } from "react";
import { Alphabets, KeysList, NextKeys, RotorEncryptionKeys, RotorDecryptionKeys, RotorOne, RotorThree, RotorTwo } from "../helper";
import { EncDecControllButton } from "../style";
import { KeyType, KeysListType } from "../types";
import Keys from "./Keys";
import Plugs from "./Plugs";
import Rotors from "./Rotors";

const Enigma = () => {
    const [keyAndPlug, setKeyPlug] = useState<Array<KeysListType>>(KeysList)
    const [currentKey, setCurrentKey] = useState<string>('')
    const [rotorKeys, setRotorKeys] = useState<Array<string>>(RotorEncryptionKeys)
    const [rotorOne, setRotorOne] = useState<KeyType>(RotorOne)
    const [rotorTwo, setRotorTwo] = useState<KeyType>(RotorTwo)
    const [rotorThree, setRotorThree] = useState<KeyType>(RotorThree)
    const [isFirst, setFirst] = useState<boolean>(true)
    const [isDecryption, setIsDecryption] = useState<boolean>(false)

    useEffect(()=>{
        setRotorKeys(isDecryption ? RotorDecryptionKeys : RotorEncryptionKeys)
    },[isDecryption])

    const keyDown = (event: KeyboardEvent) => {
        onClick(event)
    }

    const keyUp = (event: KeyboardEvent) => {
        setCurrentKey('')
    }

    const handleRotateRotor = (rotor: KeyType, setter:(value: KeyType) => void) => {
        const tempRotor = JSON.parse(JSON.stringify(rotor))
        Object.keys(tempRotor)?.forEach((key: string) => tempRotor[key] = NextKeys[tempRotor[key]])
        setter(tempRotor)
    }

    const onClick = (event: KeyboardEvent) => {
        if(Alphabets.includes(event?.key?.toUpperCase())){
            setCurrentKey(event?.key?.toUpperCase());  
            setTimeout(()=>handleRotate(),500)
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
                temp[2] = NextKeys[rotorKeys?.[2]]
                temp[0] = NextKeys[rotorKeys?.[0]]
                return temp
            })
            handleRotateRotor(rotorThree, setRotorThree)
            handleRotateRotor(rotorOne, setRotorOne)
        }
        if(rotorKeys?.[1] === 'Z' && rotorKeys?.[2] === 'Z'){
            alreadyEntered = true
            setRotorKeys((prev:any) => {
                const temp = JSON.parse(JSON.stringify(prev))
                temp[0] = NextKeys[rotorKeys?.[0]]
                temp[1] = NextKeys[rotorKeys?.[1]]
                return temp
            })
            handleRotateRotor(rotorOne, setRotorOne)
            handleRotateRotor(rotorTwo, setRotorTwo)
        }
        if(rotorKeys?.[2] === 'Z'){
            setRotorKeys((prev:any) => {
                const temp = JSON.parse(JSON.stringify(prev))
                if(!alreadyEntered) temp[1] = NextKeys[rotorKeys?.[1]]
                temp[2] = NextKeys[rotorKeys?.[2]]
                return temp
            })
            if(!alreadyEntered) handleRotateRotor(rotorTwo, setRotorTwo)
            handleRotateRotor(rotorThree, setRotorThree)
        }else{
            setRotorKeys((prev:any) => {
                const temp = JSON.parse(JSON.stringify(prev))
                temp[2] = NextKeys[rotorKeys?.[2]]
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
     // eslint-disable-next-line
    },[currentKey])
        
    return (
        <>
            <EncDecControllButton onClick={() => setIsDecryption((prev: boolean) => !prev)}>{isDecryption ? 'Encrypt' : 'Decrypt'}</EncDecControllButton>
            <Rotors rotorKeys={rotorKeys}/>
            <Keys isDecryption={isDecryption} rotorOne={rotorOne} rotorTwo={rotorTwo} rotorThree={rotorThree} currentKey={currentKey} KeysList={keyAndPlug}/>
            <Plugs plugs={keyAndPlug} setPlugs={setKeyPlug}/>
        </>
    )
}

export default Enigma;