// Check that an image loads to validate imgage url
export const checkImageLoads = (
  url: string,
  timeoutMs = 6000,
): Promise<boolean> => {
  return new Promise((resolve) => {
    // create an img object to try fetching img url
    const img = new Image();

    // default to img fetch failure on timeout
    const timer = setTimeout(() => {
      img.onload = null;
      img.onerror = null;
      resolve(false);
    }, timeoutMs);

    // img fetched successfully
    img.onload = () => {
      clearTimeout(timer); // no longer need the timeout backstop
      resolve(true);
    };

    // img fetch failure
    img.onerror = () => {
      clearTimeout(timer);
      resolve(false);
    };

    // fetch url
    img.src = url;
  });
};
