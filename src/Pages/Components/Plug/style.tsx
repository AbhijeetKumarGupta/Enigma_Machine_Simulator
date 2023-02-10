import styled from 'styled-components';

export const PlugHole = styled.div<{color?:string}>`
    border: 2px solid black;
    padding: 20px;
    min-width: 30px;
    color: white;
    background: ${(props:any) => props?.color || 'black'};
    margin: 20px;
    font-weight: 700;
    cursor: pointer;
`