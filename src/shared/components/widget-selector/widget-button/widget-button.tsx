import React from 'react';
import './widget-button.scss';
import { Box } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface WidgetButtonProps {
  id?: string;
  title: string;
  icon: any;
  onClick: () => void;
}

export default function WidgetButton(props: WidgetButtonProps): JSX.Element {
  return (
    <Box
      id={props.id}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      className="widget-button"
      onClick={() => props.onClick()}
    >
      <div>
        <FontAwesomeIcon size="3x" icon={props.icon} />
      </div>
      <span>{props.title}</span>
    </Box>
  );
}
