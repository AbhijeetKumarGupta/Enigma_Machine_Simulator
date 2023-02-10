import styled from 'styled-components';

export const BoardKey = styled.div<{isActive:boolean}>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border: 5px solid black;
    border-radius: 50%;
    margin: 20px;
    background: ${(props:any) => props?.isActive ? 'yellow' : 'white'};
`