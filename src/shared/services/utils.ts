import React from 'react';

// wrapper for common succes failure effect
export const errorSuccessLoad = (
  endpoint: any,
  loadSuccess: any,
  loadError: any
) => {
  endpoint()
    .then((res: any) => {
      loadSuccess(res.data);
    })
    .catch((e: any) => {
      loadError();
    });
};

export const useNotOnMountEffect = (func: any, deps: any[]) => {
  const didMount = React.useRef(false);

  React.useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
    // eslint-disable-next-line
  }, deps);
};
const months: string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export const formatDate = (dateString: string | undefined): string => {
  if (dateString) {
    const date: Date = new Date(dateString.slice(0, 10));
    return `${
      months[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;
  }
  return '';
};

export const colors = [
  '#293b77',
  '#01aec7',
  '#09c9ca',
  '#5daddc',
  '#e50134',
  '#e23750',
  '#00a13a',
  '#313131',
  '#dd642f',
  '#fbcc2a',
];

export const filterToString = (data: any) =>
  JSON.stringify(
    data
      .map((widget: any) => {
        const { i, x, y, w, h } = widget;
        return { i, x, y, w, h };
      })
      .sort((a: any, b: any) => parseInt(a.i) - parseInt(b.i))
  );
