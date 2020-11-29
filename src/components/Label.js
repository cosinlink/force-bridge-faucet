import React from 'react'
import styled from 'styled-components'

const Label = ({ text }) => (
  <StyledLabel>{text}</StyledLabel>
)

const StyledLabel = styled.div`
  color: ${(props) => props.theme.color.grey[400]};
`

export default Label
