export default function usernameTranslator(name, soname, username) {
  if (name === null && soname === null) return username;
  return soname + " " + name;
}
