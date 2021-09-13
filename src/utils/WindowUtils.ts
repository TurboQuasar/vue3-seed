export const openImageWindow = (url: string, title: string) => {
  const img = new Image();
  img.src = url;
  const newWin = window.open('', '_blank') as Window;
  newWin.document.write(img.outerHTML);
  newWin.document.title = title;
  newWin.document.close();
};
export const openNewWindow = (url: string) => {
  window.open(url, '_blank');
};
