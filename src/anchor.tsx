import * as React from 'react';
import { BreadcrumbsContext } from './context';

interface BreadcrumbsAnchorProps {
  path: string;
  link: string;
  component: React.ReactElement;
  itemProps?: object;
  disabled?: boolean;
  id?: string;
}

export const BreadcrumbsAnchor: React.FunctionComponent<BreadcrumbsAnchorProps> = ({
  path,
  link,
  disabled,
  component,
  itemProps = {},
  id = '_default',
}) => {
  const { register, update, unregister } = React.useContext(BreadcrumbsContext);

  React.useEffect(() => {
    register(
      {
        link,
        path,
        disabled,
        component,
        itemProps,
      },
      id,
    );

    return () => {
      unregister(
        {
          link,
          path,
          disabled,
          component,
          itemProps,
        },
        id,
      );
    };
  }, []);

  React.useEffect(() => {
    update(
      {
        link,
        path,
        disabled,
        component,
        itemProps,
      },
      id,
    );
  }, [component, link]);

  return null;
};

BreadcrumbsAnchor.displayName = 'Breadcrumbs🥖Anchor⚓️';

export default BreadcrumbsAnchor;
