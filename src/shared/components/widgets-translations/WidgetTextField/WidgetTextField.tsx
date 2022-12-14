import React from 'react';
import './widgets-text-field.scss';
import { Box, TextField } from '@material-ui/core';
import { widgetPayloadProp } from '../widgets-translations';

export const WidgetTextField = ({
  i,
  label,
  type,
  widgetPayload,
  setWidgetPayload,
  languages,
  requiredLanguage,
  required,
  validationRules,
}: any) => (
  <Box
    className="layout-dialog-body"
    display="flex"
    flexDirection="row"
    flex={1}
  >
    {languages.map((ln: string, index: number) => {
      let value =
        typeof widgetPayload[i.uuid]?.[type][ln] === 'undefined'
          ? widgetPayload[i.uuid]?.[type]
          : widgetPayload[i.uuid]?.[type][ln];
      let requiredFieldValue =
        typeof widgetPayload[i.uuid]?.[type][requiredLanguage] === 'undefined'
          ? widgetPayload[i.uuid]?.[type]
          : widgetPayload[i.uuid]?.[type][requiredLanguage];
      let rules = validationRules(ln, value, requiredFieldValue);
      let error = rules.error;
      let helperText = rules.helperText;
      let validationType = rules.type;
      let validationRequired =
        (ln === requiredLanguage || validationType === 2) && required;
      /*uncomment this condition if you want to prohibit to 
            continue if the other language has content regardless 
            of whether it is required or not.*/
      // ? required
      // : validationType === 2 && requiredFieldValue !== '' && true;
      return (
        <Box
          display="flex"
          className="widget-translation-form-label-textfield"
          flexDirection="column"
          flex={1}
          key={index}
        >
          <TextField
            id={`text-field-${ln}-${i.uuid}`}
            key={`text-field-${ln}-${i.uuid}`}
            onInput={(e: any) => {
              e.target.setCustomValidity('');
            }}
            onInvalid={(e: any) => {
              e.target.setCustomValidity(helperText);
            }}
            label={`${label} (${ln.toUpperCase()})`}
            value={value}
            multiline={(type === 'text' && i.widgetType) === 6 ? true : false}
            rows={(type === 'text' && i.widgetType) === 6 ? 4 : 1}
            rowsMax={(type === 'text' && i.widgetType) === 6 ? 4 : 1}
            variant="outlined"
            aria-required={validationRequired}
            required={validationRequired}
            error={error}
            helperText={helperText}
            InputLabelProps={{ shrink: true }}
            onChange={(evt: any) => {
              const { value } = evt.target;
              setWidgetPayload((oldWidgetPayload: widgetPayloadProp) => ({
                ...oldWidgetPayload,
                [i.uuid]: {
                  ...widgetPayload[i.uuid],
                  ...{
                    [type]: {
                      ...widgetPayload[i.uuid][type],
                      ...{ [ln]: value },
                    },
                  },
                },
              }));
            }}
          />
        </Box>
      );
    })}
  </Box>
);
