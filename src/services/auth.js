import { ref, onMounted } from "vue";
import { users } from "./data";
import { fetchData } from "./api";

export const auThis = ref(!!localStorage.getItem("userId"));
export const currentId = ref(
  localStorage.getItem("userId")
    ? { id: Number(localStorage.getItem("userId")) }
    : null,
);

export async function login(username, password) {
  const url = "http://localhost:3000/api/login";
  const m = "POST";
  const body = {
    username: username,
    password: password,
  };

  const data = await fetchData(url, m, body);
  const existance = data;
  console.log(existance);

  if (!existance) {
    return false;
  } else {
    localStorage.setItem("userId", existance.id);
    currentId.value = { id: existance.id };
    auThis.value = true;
    return existance;
  }
}

export function getUser() {
  if (!currentId.value) return null;
  return users.value.find((u) => u.id === currentId.value.id);
}
export function logout() {
  // localStorage.removeItem('token')
  localStorage.removeItem("userId");
  auThis.value = false;
}
export function isAuthenticated() {
  return !!localStorage.getItem("userId");
}
