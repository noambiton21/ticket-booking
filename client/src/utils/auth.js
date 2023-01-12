export function defaultHeaders() {
  const storedData = JSON.parse(localStorage.getItem("userData"));
  const token = storedData.token;
  console.log("this is the token:" + token);

  const authorization = {
    Authorization: "Bearer " + token,
  };
  return authorization;
}
