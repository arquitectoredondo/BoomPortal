import React, { useMemo, useState } from 'react';
import { TextField } from '@material-ui/core';
import { colors } from '../../services/utils';
import { RgbaStringColorPicker } from 'react-colorful';
import { colord, extend } from 'colord';
import namesPlugin from 'colord/plugins/names';
import Autocomplete from '@material-ui/lab/Autocomplete';
import './color-picker-component.scss';
extend([namesPlugin]);

interface PickerComponentProps {
  color?: string | undefined;
  setColor?: any;
  sampleColor: string | undefined;
  setSampleColor: any;
  paddingLeft?: number;
  width?: number;
}

interface ColorHexType {
  color: string;
  hex: string;
}

export const ColorPickerComponent = ({
  color,
  setColor,
  sampleColor,
  setSampleColor,
  paddingLeft,
  width,
}: PickerComponentProps) => {
  const [backgroundColorHex, setBackgroundColorHex] = useState(
    colord(sampleColor || 'transparent').toHex()
  );
  const [auxColor, setAuxColor] = useState(color||sampleColor);
  typeof sampleColor === 'undefined' && setSampleColor('transparent');

  const ColorPalette = () => (
    <div className="color-palette" style={{ paddingLeft: paddingLeft }}>
      {colors.map((color: string) => (
        <div
          key={color}
          onClick={() => {
            setSampleColor(color);
            setAuxColor(color);
            setColor(color);
          }}
          title={color}
          className="color-palette-item"
          style={{
            background: color,
          }}
        ></div>
      ))}
    </div>
  );

  useMemo(() => {
    sampleColor &&
      sampleColor.startsWith('rgba') &&
      setBackgroundColorHex(colord(sampleColor).toHex());
  }, [sampleColor]);

  useMemo(() => {
    auxColor &&
      auxColor.startsWith('rgba') &&
      setAuxColor(colord(auxColor).toHex());
  }, [auxColor]);

  const CustomPicker = ({ color, ...rest }: any) => {
    const rgbaString = useMemo(() => {
      return color
        ? color.startsWith('rgba')
          ? color
          : colord(color).toRgbString()
        : colord('transparent').toRgbString();
    }, [color]);

    return (
      <RgbaStringColorPicker
        style={{ paddingLeft: paddingLeft, width: width, height: width }}
        color={rgbaString}
        {...rest}
      />
    );
  };
  let colorExist;
  return (
    <div className="color-picker-component">
      {sampleColor && sampleColor.startsWith('rgba') ? (
        <RgbaStringColorPicker
          key="no-custom"
          color={sampleColor}
          onChange={(color: string) => {
            setSampleColor(color);
          }}
          onMouseUp={(i: any) => {
            setColor(sampleColor);
            setAuxColor(sampleColor);
          }}
          style={{ paddingLeft: paddingLeft, width: width, height: width }}
        />
      ) : (
        <CustomPicker
          key="custom"
          color={sampleColor}
          onChange={(color: string) => {
            setSampleColor(color);
          }}
        />
      )}
      <ColorPalette />
      {sampleColor && sampleColor.startsWith('rgba') ? (
        <TextField
          id="field-label"
          value={backgroundColorHex}
          variant="outlined"
          onClick={() => {
            setSampleColor(backgroundColorHex);
            setColor(backgroundColorHex);
          }}
          style={{ paddingLeft: paddingLeft, width: width }}
        />
      ) : (
        <Autocomplete
          id="color-selector"
          inputValue={
            (() =>
              (colorExist = allColorsDec.filter(
                (i) => i.hex === auxColor
              )[0]))()
              ? colorExist.color
              : auxColor
          }
          freeSolo
          disableClearable
          autoHighlight
          options={allColorsDec as ColorHexType[]}
          className="picker-autocomplete"
          style={{ paddingLeft: paddingLeft, width: width }}
          getOptionLabel={(option) => {
            return typeof option === 'string' ? option : option.color;
          }}
          onClose={() => {
            sampleColor &&
              (() => {
                setAuxColor(sampleColor);
                setSampleColor(sampleColor);
                setColor(colord(sampleColor).toHex());
              })();
          }}
          onInputChange={(event, newInputValue, reason) => {
            event &&
              (() => {
                setAuxColor(newInputValue);
                setSampleColor(newInputValue);
              })();
          }}
          onChange={(event, newInputValue, reason) => {
            event &&
              typeof newInputValue === 'object' &&
              (() => {
                setColor(newInputValue.color);
                setAuxColor(newInputValue.color);
              })();
          }}
          onHighlightChange={(event, newInputValue, reason) => {
            newInputValue && setSampleColor(newInputValue.color);
          }}
          renderOption={(option) => (
            <React.Fragment>
              <span>
                <div
                  className="color-list-item"
                  style={{
                    background: option.hex,
                  }}
                ></div>
                {option.color}
              </span>
            </React.Fragment>
          )}
          renderInput={(params) => (
            <TextField
              autoFocus
              style={{ width: width }}
              {...params}
              variant="outlined"
            />
          )}
        />
      )}

      <span className="help-text">
        E.g.: "skyblue", "tomato", "#ff0000", "rgba(89, 138, 115, 1)"
      </span>
    </div>
  );
};

const allColorsDec = [
  { color: 'white', hex: '#ffffff' },
  { color: 'bisque', hex: '#ffe4c4' },
  { color: 'blue', hex: '#0000ff' },
  { color: 'cadetblue', hex: '#5f9ea0' },
  { color: 'chartreuse', hex: '#7fff00' },
  { color: 'chocolate', hex: '#d2691e' },
  { color: 'coral', hex: '#ff7f50' },
  { color: 'antiquewhite', hex: '#faebd7' },
  { color: 'aqua', hex: '#00ffff' },
  { color: 'azure', hex: '#f0ffff' },
  { color: 'whitesmoke', hex: '#f5f5f5' },
  { color: 'papayawhip', hex: '#ffefd5' },
  { color: 'plum', hex: '#dda0dd' },
  { color: 'blanchedalmond', hex: '#ffebcd' },
  { color: 'black', hex: '#000000' },
  { color: 'gold', hex: '#ffd700' },
  { color: 'goldenrod', hex: '#daa520' },
  { color: 'gainsboro', hex: '#dcdcdc' },
  { color: 'cornsilk', hex: '#fff8dc' },
  { color: 'cornflowerblue', hex: '#6495ed' },
  { color: 'burlywood', hex: '#deb887' },
  { color: 'aquamarine', hex: '#7fffd4' },
  { color: 'beige', hex: '#f5f5dc' },
  { color: 'crimson', hex: '#dc143c' },
  { color: 'cyan', hex: '#00ffff' },
  { color: 'darkblue', hex: '#00008b' },
  { color: 'darkcyan', hex: '#008b8b' },
  { color: 'darkgoldenrod', hex: '#b8860b' },
  { color: 'darkkhaki', hex: '#bdb76b' },
  { color: 'darkgray', hex: '#a9a9a9' },
  { color: 'darkgreen', hex: '#006400' },
  { color: 'darkgrey', hex: '#a9a9a9' },
  { color: 'peachpuff', hex: '#ffdab9' },
  { color: 'darkmagenta', hex: '#8b008b' },
  { color: 'darkred', hex: '#8b0000' },
  { color: 'darkorchid', hex: '#9932cc' },
  { color: 'darkorange', hex: '#ff8c00' },
  { color: 'darkslateblue', hex: '#483d8b' },
  { color: 'gray', hex: '#808080' },
  { color: 'darkslategray', hex: '#2f4f4f' },
  { color: 'darkslategrey', hex: '#2f4f4f' },
  { color: 'deeppink', hex: '#ff1493' },
  { color: 'deepskyblue', hex: '#00bfff' },
  { color: 'wheat', hex: '#f5deb3' },
  { color: 'firebrick', hex: '#b22222' },
  { color: 'floralwhite', hex: '#fffaf0' },
  { color: 'ghostwhite', hex: '#f8f8ff' },
  { color: 'darkviolet', hex: '#9400d3' },
  { color: 'magenta', hex: '#ff00ff' },
  { color: 'green', hex: '#008000' },
  { color: 'dodgerblue', hex: '#1e90ff' },
  { color: 'grey', hex: '#808080' },
  { color: 'honeydew', hex: '#f0fff0' },
  { color: 'hotpink', hex: '#ff69b4' },
  { color: 'blueviolet', hex: '#8a2be2' },
  { color: 'forestgreen', hex: '#228b22' },
  { color: 'lawngreen', hex: '#7cfc00' },
  { color: 'indianred', hex: '#cd5c5c' },
  { color: 'indigo', hex: '#4b0082' },
  { color: 'fuchsia', hex: '#ff00ff' },
  { color: 'brown', hex: '#a52a2a' },
  { color: 'maroon', hex: '#800000' },
  { color: 'mediumblue', hex: '#0000cd' },
  { color: 'lightcoral', hex: '#f08080' },
  { color: 'darkturquoise', hex: '#00ced1' },
  { color: 'lightcyan', hex: '#e0ffff' },
  { color: 'ivory', hex: '#fffff0' },
  { color: 'lightyellow', hex: '#ffffe0' },
  { color: 'lightsalmon', hex: '#ffa07a' },
  { color: 'lightseagreen', hex: '#20b2aa' },
  { color: 'linen', hex: '#faf0e6' },
  { color: 'mediumaquamarine', hex: '#66cdaa' },
  { color: 'lemonchiffon', hex: '#fffacd' },
  { color: 'lime', hex: '#00ff00' },
  { color: 'khaki', hex: '#f0e68c' },
  { color: 'mediumseagreen', hex: '#3cb371' },
  { color: 'limegreen', hex: '#32cd32' },
  { color: 'mediumspringgreen', hex: '#00fa9a' },
  { color: 'lightskyblue', hex: '#87cefa' },
  { color: 'lightblue', hex: '#add8e6' },
  { color: 'midnightblue', hex: '#191970' },
  { color: 'lightpink', hex: '#ffb6c1' },
  { color: 'mistyrose', hex: '#ffe4e1' },
  { color: 'moccasin', hex: '#ffe4b5' },
  { color: 'mintcream', hex: '#f5fffa' },
  { color: 'lightslategray', hex: '#778899' },
  { color: 'lightslategrey', hex: '#778899' },
  { color: 'navajowhite', hex: '#ffdead' },
  { color: 'navy', hex: '#000080' },
  { color: 'mediumvioletred', hex: '#c71585' },
  { color: 'powderblue', hex: '#b0e0e6' },
  { color: 'palegoldenrod', hex: '#eee8aa' },
  { color: 'oldlace', hex: '#fdf5e6' },
  { color: 'paleturquoise', hex: '#afeeee' },
  { color: 'mediumturquoise', hex: '#48d1cc' },
  { color: 'mediumorchid', hex: '#ba55d3' },
  { color: 'rebeccapurple', hex: '#663399' },
  { color: 'lightsteelblue', hex: '#b0c4de' },
  { color: 'mediumslateblue', hex: '#7b68ee' },
  { color: 'thistle', hex: '#d8bfd8' },
  { color: 'tan', hex: '#d2b48c' },
  { color: 'orchid', hex: '#da70d6' },
  { color: 'mediumpurple', hex: '#9370db' },
  { color: 'purple', hex: '#800080' },
  { color: 'pink', hex: '#ffc0cb' },
  { color: 'skyblue', hex: '#87ceeb' },
  { color: 'springgreen', hex: '#00ff7f' },
  { color: 'palegreen', hex: '#98fb98' },
  { color: 'red', hex: '#ff0000' },
  { color: 'yellow', hex: '#ffff00' },
  { color: 'slateblue', hex: '#6a5acd' },
  { color: 'lavenderblush', hex: '#fff0f5' },
  { color: 'peru', hex: '#cd853f' },
  { color: 'palevioletred', hex: '#db7093' },
  { color: 'violet', hex: '#ee82ee' },
  { color: 'teal', hex: '#008080' },
  { color: 'slategray', hex: '#708090' },
  { color: 'slategrey', hex: '#708090' },
  { color: 'aliceblue', hex: '#f0f8ff' },
  { color: 'darkseagreen', hex: '#8fbc8f' },
  { color: 'darkolivegreen', hex: '#556b2f' },
  { color: 'greenyellow', hex: '#adff2f' },
  { color: 'seagreen', hex: '#2e8b57' },
  { color: 'seashell', hex: '#fff5ee' },
  { color: 'tomato', hex: '#ff6347' },
  { color: 'silver', hex: '#c0c0c0' },
  { color: 'sienna', hex: '#a0522d' },
  { color: 'lavender', hex: '#e6e6fa' },
  { color: 'lightgreen', hex: '#90ee90' },
  { color: 'orange', hex: '#ffa500' },
  { color: 'orangered', hex: '#ff4500' },
  { color: 'steelblue', hex: '#4682b4' },
  { color: 'royalblue', hex: '#4169e1' },
  { color: 'turquoise', hex: '#40e0d0' },
  { color: 'yellowgreen', hex: '#9acd32' },
  { color: 'salmon', hex: '#fa8072' },
  { color: 'saddlebrown', hex: '#8b4513' },
  { color: 'sandybrown', hex: '#f4a460' },
  { color: 'rosybrown', hex: '#bc8f8f' },
  { color: 'darksalmon', hex: '#e9967a' },
  { color: 'lightgoldenrodyellow', hex: '#fafad2' },
  { color: 'snow', hex: '#fffafa' },
  { color: 'lightgrey', hex: '#d3d3d3' },
  { color: 'lightgray', hex: '#d3d3d3' },
  { color: 'dimgray', hex: '#696969' },
  { color: 'dimgrey', hex: '#696969' },
  { color: 'olivedrab', hex: '#6b8e23' },
  { color: 'olive', hex: '#808000}' },
];
