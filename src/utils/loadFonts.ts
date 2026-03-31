export const loadFont = (name: string, url: string, weight: number) => {
  const supportsWoff2 = typeof document !== 'undefined' && 
    document.fonts && 
    document.fonts.check('1px sans-serif');

  const finalUrl = supportsWoff2 
    ? url.replace(/\.ttf$/i, '.woff2') 
    : url;

  const fontFace = new FontFace(name, `url(${finalUrl})`, {
    weight: String(weight),
    style: 'normal',
    display: 'swap'
  });

  document.fonts.add(fontFace);
  
  fontFace.load().catch((err) => {
    console.warn(`Failed to load font: ${name}`, err);
  });
};