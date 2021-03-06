import React from 'react'
import { PanelBase, PanelExtra, CollapseHeader, CollapseArrow } from './wrapper';
import PanelContent from './content';
import CollapseIcon from './icon';
export interface CollapsePanelProps {
    id?: string;
    header?: string | React.ReactNode;
    showArrow?: boolean;
    className?: string;
    style?: object;
    isActive?: boolean;
    disabled?: boolean;
    bordered?: boolean,
    position?: 'left' | 'right'
    extra?: string | React.ReactNode;
    onItemClick?: (panelKey: string | number) => void;
    expandIcon?: (props: any) => React.ReactNode;
    panelKey?: string | number;
    role?: string;
}


const CollapsePanel: React.FC<CollapsePanelProps> = (props) => {
    const {
        className,
        id,
        header,
        bordered = false,
        children,
        isActive = false,
        showArrow=true,
        position,
        disabled,
        expandIcon,
        extra,
    } = props;
    const handleItemClick = () => {
        const { onItemClick, panelKey } = props;

        if (typeof onItemClick === 'function') {
            onItemClick(panelKey as string | number);
        }
    };
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.keyCode === 13 || e.which === 13) {
            handleItemClick();
        }
    };
    const icon= ()=>{
       return expandIcon&&expandIcon(props)

    }
    return (
        <PanelBase key={id} disable={disabled} active={isActive} tabIndex={disabled ? -1 : 0}
            aria-expanded={isActive} id={'collapse-panel'} className={className} onClick={handleItemClick} onKeyPress={handleKeyPress} >
            <CollapseHeader id="collapse-panel-header" arrow={showArrow} right={position === 'right'}>
                {showArrow && icon()}
                {header}
                {extra && <PanelExtra  id="collapse-panel-header-extra">{extra}</PanelExtra>}
            </CollapseHeader>
            <PanelContent  border={bordered} isActive={isActive}>{children}</PanelContent>
        </PanelBase>
    )
}

export default CollapsePanel