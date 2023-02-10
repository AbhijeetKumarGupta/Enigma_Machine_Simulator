import { PlugHole } from "./style";

interface PlugProps{
    thisPlug: string;
    color: string;
    onClick: () => void;
}

const Plug = (props: PlugProps) => {
    const {thisPlug, color, onClick} = props
    return(
        <PlugHole color={color} onClick={onClick}>
            {thisPlug}
        </PlugHole>
    )
}

export default Plug;