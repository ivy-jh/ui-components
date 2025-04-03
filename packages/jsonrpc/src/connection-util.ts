export const urlBuilder = (baseUrl: string | URL, path: string) => {
  const url = `${baseUrl}/${path}`;
  return url.replace(/([^:])(\/\/+)/g, '$1/');
};
