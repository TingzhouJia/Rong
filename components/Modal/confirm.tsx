import Modal, { ModalFuncProps, destroyFns, } from "./modal";
import React, { useContext } from "react";
import { ConfirmBody, ConfirmHeader, ConfirmTitle, ConfirmContent, ConfirmBtn } from "./wrapper";
import * as ReactDOM from 'react-dom';
import InfoCircleOutlined from '@ant-design/icons/InfoCircleOutlined';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import CloseCircleOutlined from '@ant-design/icons/CloseCircleOutlined';
import ExclamationCircleOutlined from '@ant-design/icons/ExclamationCircleOutlined';
import { getColor } from "../utils/getColor";
import Button from "../Button";
import {  ThemeContext, DefaultTheme, ThemeProvider } from "styled-components";



interface ConfirmDialogProps extends ModalFuncProps {
    afterClose?: () => void;
    close: (...args: any[]) => void;
}
export type ModalFunc = (
    props: ModalFuncProps,
    theme:DefaultTheme
) => {
    destroy: () => void;
    update: (newConfig: ModalFuncProps) => void;
};
const ConfirmDialog: React.FC<ConfirmDialogProps> = (props) => {
    const {
        icon,
        type="confirm",
        onCancel,
        onOk,
        close,
        zIndex,
        afterClose,
        visible,
        keyboard,
        centered,
        getContainer,
        maskStyle,
        okText,
        okButtonProps,
        cancelText,
        cancelButtonProps,
    } = props;
    const okCancel = 'okCancel' in props ? props.okCancel! : true;
    const width = props.width || 416;
    const style = props.style || {};
    const mask = props.mask === undefined ? true : props.mask;
    const maskClosable = props.maskClosable === undefined ? false : props.maskClosable;
    const theme=useContext(ThemeContext)
    const OkClick=()=>{
        onOk&&onOk()
        close()
    }
    const CancelClick=()=>{
        onCancel&&onCancel()
        close()
    }
    const cancelButton = okCancel && (
        <Button
            onClick={CancelClick}
           {...cancelButtonProps}
        >
            {cancelText}
        </Button>
    );
 
    return (
        <Modal
            visible={visible}
            onCancel={() => close({ triggerCancel: true })}
            mask={mask}
            maskClosable={maskClosable}
            maskStyle={maskStyle}
            style={style}
            width={width}
            zIndex={zIndex}
            afterClose={afterClose}
            keyboard={keyboard}
            centered={centered}
            getContainer={getContainer}
        >
            <ConfirmBody id="confirm-body">
                <ConfirmHeader id="confirm-header">
                    {React.cloneElement(icon as any,{style:{color:type&&type!=='confirm'?getColor(type,theme):theme.colors.info,fontSize:"20px"},})}
                    <ConfirmTitle id="confirm-title">{props.title}</ConfirmTitle>
                </ConfirmHeader>
                <ConfirmContent id="confirm-content">{props.content}</ConfirmContent>
                <ConfirmBtn id="confirm-button">
                    {cancelButton}
                    <Button
                        type="primary"
                        onClick={OkClick}
                        {...okButtonProps}
                    >
                        {okText}
                    </Button>
                </ConfirmBtn>
            </ConfirmBody>
        </Modal>
    )
}
export interface ModalFunctions {
    info: ModalFunc;
    success: ModalFunc;
    error: ModalFunc;
    warning: ModalFunc;
    confirm: ModalFunc;
}

export default function confirm(config: ModalFuncProps,theme:DefaultTheme) {
    const div = document.createElement('div',);
    document.body.appendChild(div);
    let currentConfig = { ...config, close, visible: true } as any;
    function destroy(...args: any[]) {
        const unmountResult = ReactDOM.unmountComponentAtNode(div);
        if (unmountResult && div.parentNode) {
            div.parentNode.removeChild(div);
        }
        const triggerCancel = args.some(param => param && param.triggerCancel);
        if (config.onCancel && triggerCancel) {
            config.onCancel(...args);
        }
        for (let i = 0; i < destroyFns.length; i++) {
            const fn = destroyFns[i];
            if (fn === close) {
                destroyFns.splice(i, 1);
                break;
            }
        }
    }

    function render({ okText, cancelText, ...props }: any) {
        ReactDOM.render(
           <ThemeProvider theme={theme}>
                <ConfirmDialog
                {...props}
        
                okText={okText || 'Yes'}
                cancelText={cancelText || 'No'}/>
           </ThemeProvider>
  ,div)
      

    }

    function close(...args: any[]) {
        currentConfig = {
            ...currentConfig,
            visible: false,
            afterClose: () => destroy(...args),
        };
        render(currentConfig);
    }

    function update(newConfig: ModalFuncProps) {
        currentConfig = {
            
            ...currentConfig,
            ...newConfig,
        };
        render(currentConfig);
    }

    render(currentConfig);

    destroyFns.push(close);

    return {
        destroy: close,
        update,
    };
}

export function useWarning(props: ModalFuncProps): ModalFuncProps {
    return {
      type: 'warning',
      icon: <ExclamationCircleOutlined />,
      okCancel: false,
      ...props,
    };
  }
  
  export function useInfo(props: ModalFuncProps): ModalFuncProps {
    return {
      type: 'info',
      icon: <InfoCircleOutlined />,
      okCancel: false,
      ...props,
    };
  }
  
  export function useSuccess(props: ModalFuncProps): ModalFuncProps {
    return {
      type: 'success',
      icon: <CheckCircleOutlined />,
      okCancel: false,
      ...props,
    };
  }
  
  export function useError(props: ModalFuncProps): ModalFuncProps {
    return {
      type: 'danger',
      icon: <CloseCircleOutlined />,
      okCancel: false,
      ...props,
    };
  }
  
  export function useConfirm(props: ModalFuncProps): ModalFuncProps {
    return {
      type: 'confirm',
      icon: <ExclamationCircleOutlined />,
      okCancel: true,
      ...props,
    };
  }