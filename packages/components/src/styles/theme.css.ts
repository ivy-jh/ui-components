import { createGlobalTheme, createGlobalThemeContract } from '@vanilla-extract/css';

const colors = createGlobalThemeContract({
  color: {
    body: 'body',
    background: 'background',
    n25: 'N25',
    n50: 'N50',
    n75: 'N75',
    n100: 'N100',
    n200: 'N200',
    n300: 'N300',
    n400: 'N400',
    n500: 'N500',
    n600: 'N600',
    n700: 'N700',
    n800: 'N800',
    n900: 'N900',
    p50: 'P50',
    p75: 'P75',
    p300: 'P300',
    p500: 'P500',
    error: 'error-color',
    warning: 'warning-color',
    success: 'success-color'
  }
});

createGlobalTheme(':root', colors, {
  color: {
    body: '#1b1b1b',
    background: '#ffffff',
    n25: '#fafafa',
    n50: '#f8f8f8',
    n75: '#f3f3f3',
    n100: '#ebebeb',
    n200: '#e7e7e7',
    n300: '#dfdfdf',
    n400: '#bfbfbf',
    n500: '#b0b0b0',
    n600: '#a3a3a3',
    n700: '#858585',
    n800: '#757575',
    n900: '#4a4a4a',
    p50: '#e6f1f5',
    p75: '#97c4d4',
    p300: '#007095',
    p500: '#004e69',
    error: '#e5151c',
    warning: '#ff7300',
    success: '#47c46b'
  }
});

createGlobalTheme('.dark', colors, {
  color: {
    body: '#ffffff',
    background: '#2c2c2c',
    n25: '#333333',
    n50: '#202020',
    n75: '#202020',
    n100: '#4a4a4a',
    n200: '#4f4f4f',
    n300: '#606060',
    n400: '#b0b0b0',
    n500: '#757575',
    n600: '#a3a3a3',
    n700: '#858585',
    n800: '#a3a3a3',
    n900: '#a3a3a3',
    p50: '#272727',
    p75: '#7e7e7e',
    p300: '#fafafa',
    p500: '#004e69',
    error: '#e5151c',
    warning: '#ff7300',
    success: '#47c46b'
  }
});

const root = createGlobalThemeContract({
  size: {
    s1: 'size-1',
    s2: 'size-2',
    s3: 'size-3',
    s4: 'size-4'
  },
  padding: {
    input: 'input-padding'
  },
  border: {
    r1: 'border-r1',
    r2: 'border-r2',
    r3: 'border-r3',
    basic: 'basic-border',
    active: 'activ-border',
    dashed: 'dashed-border',
    warning: 'warning-border',
    error: 'error-border'
  },
  dynamic: {
    inputBorder: 'input-border'
  },
  shadow: {
    editor: 'editor-shadow',
    focus: 'focus-shadow',
    popover: 'popover-shadow'
  }
});

createGlobalTheme(':root, .dark', root, {
  size: {
    s1: '0.25rem',
    s2: '0.5rem',
    s3: '0.75rem',
    s4: '1rem'
  },
  padding: {
    input: '10px'
  },
  border: {
    r1: '3px',
    r2: '5px',
    r3: '10px',
    basic: `1px solid ${colors.color.n200}`,
    active: `1px solid ${colors.color.p300}`,
    dashed: `1px dashed ${colors.color.n400}`,
    warning: `1px solid ${colors.color.warning}`,
    error: `1px solid ${colors.color.error}`
  },
  dynamic: {
    inputBorder: root.border.basic
  },
  shadow: {
    editor:
      '0px 9px 27px rgba(0, 0, 0, 0.07), 0px 3.75998px 11.28px rgba(0, 0, 0, 0.0503198), 0px 2.01027px 6.0308px rgba(0, 0, 0, 0.0417275), 0px 1.12694px 3.38082px rgba(0, 0, 0, 0.035), 0px 0.598509px 1.79553px rgba(0, 0, 0, 0.0282725), 0px 0.249053px 0.747159px rgba(0, 0, 0, 0.0196802)',
    focus: `0 0 0 1px ${colors.color.body}`,
    popover: '0px 4px 30px 0px rgba(0, 0, 0, 0.2)'
  }
});

export const vars = { ...root, ...colors };
