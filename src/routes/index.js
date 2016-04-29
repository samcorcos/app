import React from 'react';
import AppFactory from 'components/app';
import worlds from './worlds';
import login from './login';
import { model } from 'stores/model';
import uiStore from 'stores/ui';
import { setTheme } from 'stores/actions/meta';
import withUiStore from 'behaviours/with-ui-store';
import withTheme from 'behaviours/with-theme';
import withShallowCompare from 'behaviours/with-shallow-compare';

const App = AppFactory(
  React,
  withShallowCompare,
  withTheme,
  withUiStore
);

export default {
  path: '/',
  component: App,
  indexRoute: {
    onEnter ( nextState, replace ) {
      if ( uiStore.getState().auth.token ) {
        // replace( '/redirect' );
      } else {
        replace( '/login' );
      }
    },
  },
  childRoutes: [
    {
      path: 'redirect',
      onEnter ( nextState, replace, callback ) {
        // TODO: move to react-side-effect to allow nesting
        uiStore.dispatch( setTheme( 'main' ) );
        model.getValue( 'currentUser.ux.lastVisited' )
          .subscribe( path => {
            replace( path );
            callback()
          })
          ;
      },
    },
    worlds,
    login,
  ],
};

