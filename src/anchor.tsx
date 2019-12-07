import * as React from 'react';
import { BreadcrumbsContext } from 'context';

interface BreadcrumbsAnchorProps {
  path: string;
  link: string;
  component: React.ElementType;
  itemProps?: object;
  id?: string;
}

export const BreadcrumbsAnchor: React.FunctionComponent<BreadcrumbsAnchorProps> = ({
  path,
  link,
  component,
  itemProps = {},
  id = '_default',
}) => {
  const { register, update, unregister } = React.useContext(BreadcrumbsContext);

  React.useEffect(() => {
    register(
      {
        link: link,
        path: path,
        component: component,
        itemProps: itemProps,
      },
      id,
    );

    return () => {
      unregister(
        {
          link: link,
          path: path,
          component: component,
          itemProps: itemProps,
        },
        id,
      );
    };
  });

  React.useEffect(() => {
    update(
      {
        link: link,
        path: path,
        component: component,
        itemProps: itemProps,
      },
      id,
    );
  }, [component, link]);

  return null;
};

BreadcrumbsAnchor.displayName = 'Breadcrumbs🥖Anchor';

export default BreadcrumbsAnchor;
