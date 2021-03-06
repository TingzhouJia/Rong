import {
    NotificationInstance as RNotificationInstance,
    NoticeContent,
} from '../Notification/notification';
import Notification from '../Notification/notification'
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import ExclamationCircleFilled from '@ant-design/icons/ExclamationCircleFilled';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import InfoCircleFilled from '@ant-design/icons/InfoCircleFilled';
import React from 'react';
import { getColor } from '../utils/getColor';
import styled, { DefaultTheme } from 'styled-components';
import { IconRender } from './wrapper';

type NoticeType = 'info' | 'success' | 'error' | 'warning' | 'loading';

let messageInstance: RNotificationInstance | null;
let defaultDuration = 3;
let defaultTop: number = 8;
let key = 1;
let getContainer: () => HTMLElement;
let maxCount: number;

export interface ConfigOptions {
    top?: number;
    duration?: number;
    getContainer?: () => HTMLElement;
    transitionName?: string;
    maxCount?: number;
    rtl?: boolean;
}

export interface ThenableArgument {
    (val: any): void;
}

export interface MessageType {
    (): void;
    then: (fill: ThenableArgument, reject: ThenableArgument) => Promise<void>;
    promise: Promise<void>;
}

const typeToIcon = {
    info: InfoCircleFilled,
    success: CheckCircleFilled,
    error: CloseCircleFilled,
    warning: ExclamationCircleFilled,
    loading: LoadingOutlined,
};
export interface ArgsProps {
    content: React.ReactNode;
    duration: number | null;
    type: NoticeType;
    onClose?: () => void;
    icon?: React.ReactNode;
    key?: string | number;
    style?: React.CSSProperties;
    className?: string;
}

function setMessageConfig(options: ConfigOptions) {
    if (options.top !== undefined) {
        defaultTop = options.top;
        messageInstance = null; // delete messageInstance for new defaultTop
    }
    if (options.duration !== undefined) {
        defaultDuration = options.duration;
    }

    if (options.getContainer !== undefined) {
        getContainer = options.getContainer;
    }

    if (options.maxCount !== undefined) {
        maxCount = options.maxCount;
        messageInstance = null;
    }

}

function getRCNotificationInstance(
    args: ArgsProps,
    callback: (info: { instance: RNotificationInstance }) => void,
    theme: DefaultTheme
) {

    if (messageInstance) {
        callback({
            instance: messageInstance,
        });
        return;
    }
    Notification.newInstance(
        {
            style: { top: defaultTop, left: "50%" },
            getContainer,
            maxCount,
        },
        (instance: any) => {
            if (messageInstance) {
                callback({
                    instance: messageInstance,
                });
                return;
            }
            messageInstance = instance;
            callback({
                instance,
            });
        },
        theme
    );
}


function getRCNoticeProps(args: ArgsProps, ): NoticeContent {
    const duration = args.duration !== undefined ? args.duration : defaultDuration;
    const IconComponent = typeToIcon[args.type];

    return {
        key: args.key,
        duration,
        style: args.style || {},
        className: args.className,
        content: (
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: "center" }}>
                <IconRender type={args.type}>
                    {args.icon || (IconComponent && <IconComponent />)}
                </IconRender>
                <span style={{ marginLeft: '4px' }}>{args.content}</span>
            </div>
        ),
        onClose: args.onClose,
    };
}

function notice(args: ArgsProps, theme: DefaultTheme): MessageType {
    const target = args.key || key++;
    const closePromise = new Promise(resolve => {
        const callback = () => {
            if (typeof args.onClose === 'function') {
                args.onClose();
            }
            return resolve(true);
        };

        getRCNotificationInstance(args, ({ instance }) => {
            instance.notice(getRCNoticeProps({ ...args, key: target, onClose: callback }));
        }, theme);
    });
    const result: any = () => {
        if (messageInstance) {
            messageInstance.removeNotice(target);
        }
    };
    result.then = (filled: ThenableArgument, rejected: ThenableArgument) =>
        closePromise.then(filled, rejected);
    result.promise = closePromise;
    return result;
}

type ConfigContent = React.ReactNode | string;
type ConfigDuration = number | (() => void);
type JointContent = ConfigContent | ArgsProps;
export type ConfigOnClose = () => void;

function isArgsProps(content: JointContent): content is ArgsProps {
    return (
        Object.prototype.toString.call(content) === '[object Object]' &&
        !!(content as ArgsProps).content
    );
}



export function attachTypeApi(originalApi: any, type: NoticeType, theme: DefaultTheme) {
    originalApi[type] = (
        content: JointContent,
        duration?: ConfigDuration,
        onClose?: ConfigOnClose,
    ) => {
        if (isArgsProps(content)) {
            return notice({ ...content, type }, theme);
        }

        if (typeof duration === 'function') {
            onClose = duration;
            duration = undefined;
        }

        return originalApi.open({ content, duration, type, onClose });
    };
}





export interface MessageInstance {
    info(content: JointContent, duration?: ConfigDuration, onClose?: ConfigOnClose): MessageType;
    success(content: JointContent, duration?: ConfigDuration, onClose?: ConfigOnClose): MessageType;
    error(content: JointContent, duration?: ConfigDuration, onClose?: ConfigOnClose): MessageType;
    warning(content: JointContent, duration?: ConfigDuration, onClose?: ConfigOnClose): MessageType;
    loading(content: JointContent, duration?: ConfigDuration, onClose?: ConfigOnClose): MessageType;
    open(args: ArgsProps): MessageType;
}
const useMessage = (theme: DefaultTheme): MessageInstance => {
    let cur: any = { success: () => { }, info: () => { }, warning: () => { }, error: () => { } }
    let so = ['success', 'info', 'warning', 'error']
    so.forEach((type: any) => attachTypeApi(cur, type as NoticeType, theme));
    return cur
}
export interface MessageApi {
    // warn(content: JointContent, duration?: ConfigDuration, onClose?: ConfigOnClose): MessageType;
    config(options: ConfigOptions): void;
    destroy(messageKey?: React.Key): void;
    useMessage: (theme: DefaultTheme) => MessageInstance,
    open(args: ArgsProps,theme:DefaultTheme): MessageType;
}

const api: MessageApi = {

    config: setMessageConfig,
    destroy(messageKey?: React.Key) {
        if (messageInstance) {
            if (messageKey) {
                const { removeNotice } = messageInstance;
                removeNotice(messageKey);
            } else {
                const { destroy } = messageInstance;
                destroy();
                messageInstance = null;
            }
        }
    },
    useMessage,
    open:notice
};
export default api 
