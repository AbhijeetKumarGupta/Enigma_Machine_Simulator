import { BoardKey } from './style';

interface KeyProps{
    keyText: string;
    isActive: boolean;
}

const Key = (props: KeyProps) => {
    const { keyText, isActive } = props;
    return (
        <BoardKey isActive={isActive} >
            {keyText}
        </BoardKey>
    )
}

export default Key;