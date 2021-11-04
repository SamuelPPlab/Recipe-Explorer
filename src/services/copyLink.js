const copy = require('clipboard-copy');

export const copyLink = (pathname) => {
  // copia o link da pagina atual
  const link = `http://localhost:3000${pathname}`;
  copy(link);
};