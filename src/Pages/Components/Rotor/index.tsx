import { RotorHole } from "./style";

interface RotorProps{
    curChar: string;
}

const Rotor = (props:RotorProps) => {
    const {curChar} = props
    return(
        <RotorHole>
            {curChar}
        </RotorHole>
    )
}

export default Rotor;