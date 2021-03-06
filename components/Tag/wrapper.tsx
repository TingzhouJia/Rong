import styled, { css } from "styled-components";
import { ToRGBA } from "../utils/hex_rgb";

export const CheckItem=styled.span<{checked?:boolean}>`
background-color: ${props=>props.checked?props.theme.colors.primary:"transparent"};
    border-color: transparent;
    cursor: pointer;
    
    &:active{
      color: white;
     
    }
    :hover {
      opacity:0.7;
    }
   
`

export const CloseIcon=styled.div<{status?:any}>`
display:inline-block;
    margin-left: 3px;
    color: ${props=>props.status?"white":"rgba(0,0,0,0.65)"};
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);


`


export const TagBase=styled.span<{visble?:boolean,color?:string,status?:any}>`
display: inline-block;
  height: auto;
  margin-right: 8px;
  padding: 0 7px;
  font-size: 12px;
  line-height: 20px;
  white-space: nowrap;
  background: ${props=>props.color};
  color:${props=>props.status?'white':props.theme.colors.fontColor};
  border-radius: 2px;
  cursor: default;
  opacity: 1;
  transition: all 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
${props=>props.visble?null:css`
display:none;
`}
  &:hover {
    opacity: 0.85;
  }


  > a:first-child:last-child {
    display: inline-block;
    margin: 0 -8px;
    padding: 0 8px;
  }

`