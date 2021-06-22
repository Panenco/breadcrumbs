import * as React from 'react';
import { BreadcrumbsRoutesMap, BreadcrumbsContext, BreadcrumbsItemRoute } from './context';

export interface BreadcrumbsProviderProps {
  children: React.ReactElement;
}

export interface BreadcrumbsProviderState {
  routes: BreadcrumbsRoutesMap;
}

export class BreadcrumbsProvider extends React.Component<BreadcrumbsProviderProps, BreadcrumbsProviderState> {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    routes: {
      _default: [],
    },
  };

  register = (route: BreadcrumbsItemRoute, id: string): void => {
    this.setState(state => ({
      routes: {
        ...state.routes,
        [id]: [...state.routes[id], route],
      },
    }));
  };

  unregister = (route: BreadcrumbsItemRoute, id: string): void => {
    this.setState(state => ({
      routes: {
        ...state.routes,
        [id]: state.routes[id].filter(rt => rt.path !== route.path),
      },
    }));
  };

  update = (route: BreadcrumbsItemRoute, id: string): void => {
    this.setState(state => ({
      routes: {
        ...state.routes,
        [id]: state.routes[id].map(rt => (rt.path === route.path ? route : rt)),
      },
    }));
  };

  render() {
    const { children } = this.props;
    const { routes } = this.state;
    return (
      <BreadcrumbsContext.Provider
        value={{ routes, register: this.register, unregister: this.unregister, update: this.update }}
      >
        {children}
      </BreadcrumbsContext.Provider>
    );
  }
}

BreadcrumbsProvider.contextType = BreadcrumbsContext;
