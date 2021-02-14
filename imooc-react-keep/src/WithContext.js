import React from 'react';
import { AppContext } from './App';

const withContent = Component =>
  props => (
    <AppContext.Consumer>
      {
        ({ state, actions }) =>
          <Component {...props} data={state} actions={actions} />
      }
    </AppContext.Consumer>
  );

export default withContent;
