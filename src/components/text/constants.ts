import type { RCXFontStyle } from '../../types.ts';

export const DEFAULT_FONT_STYLE = {
  // font string
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: 10,
  fontFamily: 'sans-serif',
  // other ctx2d properties
  fontStretch: 'normal',
  fontVariant: 'normal',
  fontKerning: 'normal',
} satisfies Required<RCXFontStyle>;
