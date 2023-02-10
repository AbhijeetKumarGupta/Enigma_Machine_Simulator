import Rotor from "../../Components/Rotor";
import { H2, Wrapper } from "../../style";

interface RotorsProps {
    rotorKeys: Array<string>;
}

const Rotors = (props: RotorsProps) => {

    const {rotorKeys} = props

    return(
        <>
            <H2>ROTORS</H2>
            <Wrapper>
                {
                    rotorKeys?.map((rotorKey: string, index: number) => <Rotor key={index} curChar={rotorKey}/>)
                }
            </Wrapper>
        </>
    )
}

export default Rotors;