import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
    /* Adapt the colors based on primary prop */
    background: ${(props) =>
        props.displayed === true ? 'palevioletred' : '#d5d7d8'};

    width: 1em;
    height: 1em;
    margin: 0 0;
    border: 1px solid transparent;
    //border-radius: 3px;
`

export const Grid = ({ displayed }) => {
    return <Button disabled displayed={displayed} />
}
