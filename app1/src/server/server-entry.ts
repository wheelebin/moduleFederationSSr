export const render = () => async (req, res, next) => {
  const renderer = (await import('./render')).default;
  return renderer(req, res, next);
};

export const reload = () => async (req, res, next) => {
  const reloader = (await import('./reload')).default;
  return reloader(req, res, next);
}