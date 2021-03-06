import React from 'react'
import { Alert } from '../../components'
import { themeIt } from './utils/withTheme'
import { Meta } from '@storybook/react/types-6-0';
export default {
    title: 'Data Display / Alert',
    component: Alert,
    decorators: [themeIt],
    parameters: {
        componentSubtitle: 'Alert for action or feedback',
        docs: {
            description: {
                component: "<h3>When To Use?</h3><br/><ul><li>When you need to show alert messages to users.</li><li>When you need a persistent static container which is closable by user actions.</li></ul>"
                ,

            },
            source: {
                type: "code"
            }
        }
    },
    argTypes: {
        message: { name: 'message', description: 'Content of message<br/><h6>type:</h6><code>string</code>', type: { name: 'string', required: true }, control: {} },
        type: {
            name: 'type',
            description: 'Type of Alert styles<h6>type:</h6><code>success</code> | <code>info</code> | <code>warning</code> | <code>error</code>',
            table: {
                defaultValue: { summary: 'info' }
            }
        },
        closable: {
            description: "Whether Alert can be closed<br/><h6>type:</h6><code>boolean</code>",
            table: {
                defaultValue: { summary: "false" }
            }
        },
        showIcon: {
            description: "Whether show icon or not<br/><h6>type:</h6><code>boolean</code>",
            table: { defaultValue: { summary: "false" } }
        },
        icon: { description: 'Customized icon when <code>showIcon</code> property is true<br/><h6>type:</h6><code>ReactNode</code>' },
        className: { description: 'Classname for Alert<br/><h6>type:</h6><code>string</code>' },
        description: {  description: 'Detail information for Alert<br/><h6>type:</h6><code>string</code>', },
        closeText: {  description: 'Customized close button<br/><h6>type:</h6><code>ReactNode</code>' },
        afterClose: { description: 'Callback aftrer Alert closed<br/><h6>type:</h6><code>()=>void</code>' },
        onClose: { description: "Callback when Alert closed<br/><h6>type:</h6><code>(event: React.MouseEvent<T, MouseEvent>) => void</code> " }
    },

} as Meta

export const Basic = () => {
    return (<Alert message="hello" />)
};


export const Status = () => (<>

    <Alert type="info" message="info" />
    <br />
    <Alert type="error" message="error" />
    <br />
    <Alert type="warning" message="warning" />
    <br />
    <Alert type="success" message="success" />
</>);

export const Closable = () => {
    return (<Alert message="close" closable />)
};

export const withDescription = () => {
    return <Alert message="title" description="description" />
};

export const withIcon = () => {
    return (
        <>
            <Alert message="title" showIcon />
            <br />
            <Alert message="title" description="description" showIcon />
        </>
    )
};

export const closeText = () => {
    return <Alert message="title" showIcon closeText="close" />
};

