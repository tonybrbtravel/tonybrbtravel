import {
  SemanticFLOATS,
  SemanticSIZES,
} from 'semantic-ui-react/dist/commonjs/generic';
import { SemanticCOLORS } from 'semantic-ui-react';
import React from 'react';

// This Interface is used all over the app for Buttons
// Check Semantic ButtonProps for available props if you want to add some property
export interface ButtonProps {
    icon?: boolean;
    children?: React.ReactNode;
    primary?: boolean;
    secondary?: boolean;
    floated?: SemanticFLOATS;
    size?: SemanticSIZES;
    circular?: boolean;
    color?: SemanticCOLORS;
    inverted?: boolean;
    labelPosition?: 'right' | 'left';
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    iconOnly?: boolean;
}
