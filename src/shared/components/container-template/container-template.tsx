import React from 'react';
import './container-template.scss';
import { Box, CircularProgress } from '@material-ui/core';
import ErrorAlert from '../error-alert/error-alert';

interface ContainerTemplateProps {
  id?: string;
  children: any;
  empty?: boolean;
  loading: boolean;
  error: boolean;
  errorMsg?: string;
  reload?: boolean;
  onReload?: () => void;
}

export default function ContainerTemplate(
  props: ContainerTemplateProps
): JSX.Element {
  const getComponent = (key: string) => {
    return props.children instanceof Array
      ? props.children.filter((comp: any) => comp.key === key)
      : props.children;
  };

  // checking in order the following states: error -> loading -> empty -> content
  const selectState = () => {
    if (props.error) {
      const errorComponent: any = getComponent('error');
      return errorComponent.length > 0 ? (
        errorComponent
      ) : (
        <ErrorAlert errorMsg={props.errorMsg} reload={props.reload} onReload={props.onReload || undefined}/>
      );
    }

    if (props.loading) {
      const loadingComponent: any = getComponent('loading-default');
      return loadingComponent.length > 0 ? (
        loadingComponent
      ) : (
        <Box
          id="loading-default"
          className="loading"
          display="flex"
          flex={1}
          flexDirection="row"
          justifyContent="center"
        >
          <CircularProgress size={100} />
        </Box>
      );
    }

    if (props.empty) {
      return getComponent('empty');
    }

    return getComponent('content');
  };

  return <div className="body">{selectState()}</div>;
}
