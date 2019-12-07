import * as React from 'react';
import { BreadcrumbsItemRoute, BreadcrumbsContext } from 'context';

export interface BreadcrumbsProps {
  components: {
    Item: React.ComponentType<BreadcrumbsItemRoute>;
    Divider: keyof JSX.IntrinsicElements | React.ComponentType | React.ComponentType<any>;
    Container: keyof JSX.IntrinsicElements | React.ComponentType | React.ComponentType<any>;
  };
  id?: string;
}

export const Breadcrumbs: React.FunctionComponent<BreadcrumbsProps> = ({
  components: { Item, Divider, Container },
  id = '_default',
  ...props
}) => {
  const {
    routes: { [id]: items },
  } = React.useContext(BreadcrumbsContext);

  const breadcrumbs = items.map((item, i) => (
    <React.Fragment key={`breadcrumbs_${id}_${item.path}`}>
      {React.createElement(Item, item)}
      {i + 1 !== items.length && React.createElement(Divider)}
    </React.Fragment>
  ));

  return React.createElement(Container, props, breadcrumbs);
};

Breadcrumbs.displayName = 'Breadcrumbs🥖';
