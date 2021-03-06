import styled, { css,keyframes } from "styled-components";

export const DrawerHandler=styled.div``

export const DrawerHanderIcon=styled.i``

const animiation=keyframes`
0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`
export const DrawerBase=styled.div<{open?:boolean,placement?:'left'|'right'|'top'|'bottom',mask?:number}>`
position: fixed;
  z-index: 1000;
  width: 100%;
  height: 100%;
  ${props=>props.mask===0?css` bottom: 1px;
        transform: translateY(1px);`:null}
  transition: transform 0.3 cubic-bezier(0.7, 0.3, 0.1, 1),
    height 0s ease 0.3s, width 0s ease 0.3s;
  > * {
    transition: transform 0.3s cubic-bezier(0.7, 0.3, 0.1, 1),
      box-shadow 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
  }
  ${props=>props.placement==='left'||props.placement==='right'?css`
    top: 0;
    height: 100%;
    ${props.placement==='left'?'left:0;':'right:0;'}
  `:css`
    left: 0;
    width: 100%;
    height: 0%;
    ${props.placement==='top'?'top:0;':'bottom:0;'}
  `}
  ${props=>props.open&&props.mask?css`
    height: 100%;
    opacity: 1;
    transition: none;
    animation: ${animiation} 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
    pointer-events: auto;
  `:null}

`

export const DrawerMask=styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${props=>props.theme.expressiveness.maskColor};

    transition: opacity 0.3s linear, height 0s ease 0.3s;
`

export const DrawerContentWrapper=styled.div<{placement:'left'|'right'|'top'|'bottom',open?:boolean,value?:string}>`
position: absolute;
    width: ${props=>props.placement==='left'||props.placement==='right'?props.value+'px':"100%"};
    height: ${props=>props.placement==='top'||props.placement==='bottom'?props.value+'px':"100%"};
    ${props=>props.placement==='left'?'left:0;':'right:0;'}
    ${props=>String(props.placement)}:0;
    background: white;
    box-shadow:${props=>ps[props.placement]}

`

export const DrawerContent=styled.div<{open?:boolean}>`
width: 100%;
    height: 100%;

   ${props=>props.open?css`box-shadow: ${shadow};`:null}
`
const shadowup = "0 -6px 16px -8px rgba(0, 0, 0, 0.08), 0 -9px 28px 0 rgba(0, 0, 0, 0.05),0 -12px 48px 16px rgba(0, 0, 0, 0.03)";
const shadowdown= "0 6px 16px -8px rgba(0, 0, 0, 0.08), 0 9px 28px 0 rgba(0, 0, 0, 0.05),0 12px 48px 16px rgba(0, 0, 0, 0.03)";
const shadowleft='-6px 0 16px -8px rgba(0, 0, 0, 0.08), -9px 0 28px 0 rgba(0, 0, 0, 0.05), -12px 0 48px 16px rgba(0, 0, 0, 0.03)';
const shadowright="6px 0 16px -8px rgba(0, 0, 0, 0.08), 9px 0 28px 0 rgba(0, 0, 0, 0.05),12px 0 48px 16px rgba(0, 0, 0, 0.03)";
const shadow = "0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08),0 9px 28px 8px rgba(0, 0, 0, 0.05)";

const ps= {"top":shadowup,"right":shadowright,"bottom":shadowdown,"left":shadowleft,}


export const DrawerHeader=styled.div`
position: relative;
    padding: 12px 16px;
    color: rgba(0,0,0,0,85);
    background: white;
    border-bottom: 1px solid ${props=>props.theme.colors};
    border-radius: 2px 2px 0 0;
`

export const DrawerFooter=styled.div`
flex-shrink: 0;
    padding: 10px;
    border-top: 1px solid ${props=>props.theme.colors};
`

export const DrawerBody=styled.div`
display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    width: 100%;
    height: 100%;
    flex-grow: 1;
    padding: 16px;
    overflow: auto;
    font-size: 14px;
    line-height: 22px;
    word-wrap: break-word;
`

export const DrawerHeaderTitle=styled.div`
margin: 0;
    color: black;
    font-weight: 500;
    font-size: 22px;
    line-height: 22px;
`

export const DrawerCloseBtn=styled.button`
position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
    display: block;
    padding: 12px;
    color: rgba(0,0,0,0.45);
    font-weight: 700;
    font-size: 18px;
    font-style: normal;
    line-height: 1;
    text-align: center;
    text-transform: none;
    text-decoration: none;
    background: transparent;
    border: 0;
    outline: 0;
    cursor: pointer;
    text-rendering: auto;

    &:focus,
    &:hover {
      color: black;
      text-decoration: none;
    }
`

export const DrawerBodyWrapper=styled.div``