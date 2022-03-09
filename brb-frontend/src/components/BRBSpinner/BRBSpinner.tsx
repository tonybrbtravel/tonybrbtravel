import React from 'react';
import './BRBSpinner.less';
// import Loader from "react-loader-spinner";
import { Loader, Dimmer } from 'semantic-ui-react';

export interface Props {
    loadingText?:string;
}

export const Spinner = ({ loadingText }:Props) => (
  <div className="Loader">
    <Dimmer active inverted size="massive">
      <Loader inverted>{loadingText ?? ''}</Loader>
    </Dimmer>
  </div>
);
