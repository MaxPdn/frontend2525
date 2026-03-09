import { computed, ref, watch } from "vue";
import { fetchData } from "./api";

// --------- Données Utilisateurs ----------------------------------

export const users = ref([]);

const loadUsers = async () => {
  const data = await fetchData("http://localhost:3000/api/users");
  users.value = data || [
    {
      id: 1,
      username: "John",
      age: 55,
      telephone: "0152458522",
      email: "johnDoe@gmail.com",
      firstname: "Doe",
      role: "admin",
      password: "1234",
    },
    {
      id: 2,
      username: "Rogalex",
      age: 35,
      telephone: "0154458522",
      email: "zannourogalex@gmail.com",
      firstname: "ZANNOU",
      role: "doctor",
      password: "1234",
    },
    {
      id: 3,
      username: "Marcel",
      age: 25,
      telephone: "0152488522",
      email: "yessia@gmail.com",
      firstname: "YESSIA",
      role: "recept",
      password: "1234",
    },
  ];
  console.log(users.value);
};

loadUsers();
// const storedUsers = JSON.parse(localStorage.getItem('users'))

// export const users = ref( storedUsers ||[
//     { id: 1, username: 'John', age: 55, telephone: "0152458522", email: "johnDoe@gmail.com", firstname: 'Doe', role: 'admin', password: '1234' },
//     { id: 2, username: 'Rogalex', age: 35, telephone: "0154458522", email: "zannourogalex@gmail.com", firstname: 'ZANNOU', role: 'doctor', password: '1234' },
//     { id: 3, username: 'Marcel', age: 25, telephone: "0152488522", email: "yessia@gmail.com", firstname: 'YESSIA', role: 'recept', password: '1234' },
// ])

// localStorage.setItem('users', JSON.stringify(users.value))

watch(
  users,
  (newValue) => {
    localStorage.setItem("users", JSON.stringify(newValue));
  },
  { deep: true },
);

// --------- Données Médecins ----------------------------------
// const storedDoctors = JSON.parse(localStorage.getItem('doctors'))
export const doctors = ref([
  {
    id: Date.now(),
    name: "Rogalex",
    speciality: "chirugie",
    phone: "0166010292",
    available: true,
  },
]);
localStorage.setItem("doctors", JSON.stringify(doctors.value));
watch(
  doctors,
  (newValue) => {
    localStorage.setItem("doctors", JSON.stringify(newValue));
  },
  { deep: true },
);

// --------- Données Patients ----------------------------------
const storedPatients = JSON.parse(localStorage.getItem("patients"));
export const patients = ref(
  storedPatients || [
    {
      id: Date.now(),
      firstName: "SOUDE",
      lastName: "Armel0",
      gender: "male",
      phone: "0158010353",
      bloodGroup: "O+",
      status: "hospitalized",
      rdv: false,
      doctorId: 3,
      roomId: 12,
      createdAt: new Date(),
    },
    {
      id: Date.now(),
      firstName: "SOUDE",
      lastName: "Armel2",
      gender: "male",
      phone: "0158010353",
      bloodGroup: "O+",
      status: "hospitalized",
      rdv: false,
      doctorId: 3,
      roomId: 12,
      createdAt: new Date(),
    },
    {
      id: Date.now(),
      firstName: "SOUDE",
      lastName: "Armel1",
      gender: "male",
      phone: "0158010353",
      bloodGroup: "O+",
      status: "hospitalized",
      rdv: false,
      doctorId: 3,
      roomId: 12,
      createdAt: new Date(),
    },
  ],
);
localStorage.setItem("patients", JSON.stringify(patients.value));
watch(
  patients,
  (newValue) => {
    localStorage.setItem("patients", JSON.stringify(newValue));
  },
  { deep: true },
);

// --------- Données Chambres ----------------------------------
export const rooms = ref([
  {
    roomId: 1,
    numero: "001",
    capacite: 5,
    statut: "available",
    affectationPatient: [],
  },
  {
    roomId: 2,
    numero: "002",
    capacite: 5,
    statut: "available",
    affectationPatient: [],
  },
  {
    roomId: 3,
    numero: "003",
    capacite: 5,
    statut: "available",
    affectationPatient: [],
  },
  {
    roomId: 4,
    numero: "004",
    capacite: 5,
    statut: "available",
    affectationPatient: [],
  },
  {
    roomId: 5,
    numero: "005",
    capacite: 5,
    statut: "available",
    affectationPatient: [],
  },
  {
    roomId: 6,
    numero: "006",
    capacite: 5,
    statut: "available",
    affectationPatient: [],
  },
  {
    roomId: 7,
    numero: "007",
    capacite: 5,
    statut: "available",
    affectationPatient: [],
  },
  {
    roomId: 8,
    numero: "008",
    capacite: 5,
    statut: "available",
    affectationPatient: [],
  },
  {
    roomId: 9,
    numero: "009",
    capacite: 5,
    statut: "available",
    affectationPatient: [],
  },
  {
    roomId: 10,
    numero: "010",
    capacite: 5,
    statut: "available",
    affectationPatient: [],
  },
  {
    roomId: 11,
    numero: "011",
    capacite: 5,
    statut: "available",
    affectationPatient: [],
  },
  {
    roomId: 12,
    numero: "012",
    capacite: 5,
    statut: "available",
    affectationPatient: [],
  },
  {
    roomId: 13,
    numero: "013",
    capacite: 5,
    statut: "available",
    affectationPatient: [],
  },
  {
    roomId: 14,
    numero: "014",
    capacite: 5,
    statut: "available",
    affectationPatient: [],
  },
  {
    roomId: 15,
    numero: "015",
    capacite: 5,
    statut: "available",
    affectationPatient: [],
  },
  {
    roomId: 16,
    numero: "016",
    capacite: 5,
    statut: "available",
    affectationPatient: [],
  },
  {
    roomId: 17,
    numero: "017",
    capacite: 5,
    statut: "available",
    affectationPatient: [],
  },
  {
    roomId: 18,
    numero: "018",
    capacite: 5,
    statut: "available",
    affectationPatient: [],
  },
  {
    roomId: 19,
    numero: "019",
    capacite: 5,
    statut: "available",
    affectationPatient: [],
  },
  {
    roomId: 20,
    numero: "020",
    capacite: 5,
    statut: "available",
    affectationPatient: [],
  },
]);
localStorage.setItem("rooms", JSON.stringify(rooms.value));
watch(
  rooms,
  (newVal) => {
    localStorage.setItem("rooms", JSON.stringify(newVal));
  },
  { deep: true },
);
export const roomsdispo = computed(() =>
  rooms.value.filter((x) => {
    return x.statut == "available";
  }),
);
export const roomsAvailable = computed(() =>
  rooms.value.filter((r) => r.capacite >= 1),
);
watch(
  roomsAvailable,
  (newValue) => {
    localStorage.setItem("roomsAvailable", JSON.stringify(newValue));
  },
  { deep: true },
);
