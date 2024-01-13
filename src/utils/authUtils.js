export function checkIfLoggedIn() {
  const user = sessionStorage.getItem("user");
  return !!user;
}
export function getLoggedInUser() {
  const user = sessionStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  } else {
    return null;
  }
}
