import jwtDecode from 'jwt-decode';

export default (encodedToken, refreshThreshold = 300) => {
  const decodedToken = jwtDecode(encodedToken);
  const timeNow = (Math.round(Date.now().valueOf() / 1000));
  const expiryTime = decodedToken.exp - timeNow;

  return (expiryTime - refreshThreshold) < 0;
};
