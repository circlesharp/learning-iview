import React from 'react';
import { AppContext } from './App';

const withContent = Component =>
  props => (
    <AppContext.Consumer>
      {
        ({ state }) =>
          (<Component {...props} data={state} />)
      }
    </AppContext.Consumer>
  );

export default withContent;
