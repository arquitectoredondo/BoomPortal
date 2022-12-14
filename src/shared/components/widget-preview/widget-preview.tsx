import React from 'react';
import './widget-preview.scss';
import { Button, Dialog } from '@material-ui/core';

interface WidgetsPreviewProps {
  open: boolean;
  setOpen: (val: any) => void;
}

export default function WidgetsPreview(
  props: WidgetsPreviewProps
): JSX.Element {
  const handleCloseDialog = () => {
    props.setOpen(false);
  };

  return (
    <Dialog
      className="dialog-preview"
      fullScreen
      open={props.open}
      onClose={() => handleCloseDialog()}
    >
      <div className="preview-info">
        <p>
          Your are on a preview page.
          <Button
            id="cancel-preview"
            className="main-blue-button"
            variant="contained"
            onClick={() => handleCloseDialog()}
          >
            Back
          </Button>
        </p>
      </div>
      <div className="iframe-disabler">
        <iframe
          title="Page preview"
          width="300"
          height="200"
          src="https://boomportaal-dev-env1.beta.boomdenhaag.nl/"
        ></iframe>
      </div>
    </Dialog>
  );
}
