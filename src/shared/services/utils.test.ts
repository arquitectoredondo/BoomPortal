import { useNotOnMountEffect, formatDate } from './utils';
import React from 'react';

describe('utils ', () => {
  it('should trigger effect not on mount', () => {
    jest.spyOn(React, 'useEffect').mockImplementationOnce((f: any) => f());
    jest.spyOn(React, 'useRef').mockReturnValue({ current: true });

    useNotOnMountEffect(() => {}, []);
  });

  it('should trigger effect not on mount', () => {
    jest.spyOn(React, 'useEffect').mockImplementationOnce((f: any) => f());
    jest.spyOn(React, 'useRef').mockReturnValue({ current: false });

    useNotOnMountEffect(() => {}, []);
  });

  it('should retrun correct formated date', () => {
    const formatedDate: string = formatDate('2022-01-20T09:11:16.439+00:00');
    expect(formatedDate).toBe('January 20, 2022');
  });
});
