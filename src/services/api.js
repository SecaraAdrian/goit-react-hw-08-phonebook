import axios from 'axios';

// Instanță Axios pentru utilizatori
const usersApi = axios.create({
  baseURL: 'https://66ccbdb3a4dd3c8a71b8aaad.mockapi.io/users',
});

// Instanță Axios pentru contacte
const contactsApi = axios.create({
  baseURL: 'https://66c3433cd057009ee9bfa42b.mockapi.io/contacts',
});

// Funcție pentru înregistrarea unui utilizator nou
export const registerUser = async (userData) => {
  try {
    // Verificăm dacă utilizatorul există deja
    const { data: existingUsers } = await usersApi.get('', {
      params: { email: userData.email }
    });

    if (existingUsers.length > 0) {
      throw new Error('Email already exists. Please use a different email.');
    }

    // Dacă nu există, creăm utilizatorul
    const { data } = await usersApi.post('', userData);
    return data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

// Funcție pentru autentificarea unui utilizator existent
export const loginUser = async (userData) => {
  try {
    // Verificăm utilizatorul în baza de date MockAPI
    const { data } = await usersApi.get('', {
      params: {
        email: userData.email,
        password: userData.password,
      },
    });

    if (data.length > 0) {
      return data[0]; // Returnăm utilizatorul găsit
    } else {
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// Funcție pentru obținerea contactelor utilizatorului
export const fetchContacts = async () => {
  try {
    const { data } = await contactsApi.get(''); // Folosim instanța pentru contacte
    return data;
  } catch (error) {
    console.error('Error fetching contacts', error);
    throw error;
  }
};

// Funcție pentru adăugarea unui contact nou
export const addContact = async (contactData) => {
  try {
    const { data } = await contactsApi.post('', contactData); // Folosim instanța pentru contacte
    return data;
  } catch (error) {
    console.error('Error adding contact:', error);
    throw error;
  }
};

// Funcție pentru ștergerea unui contact
export const deleteContact = async (contactId) => {
  try {
    const { data } = await contactsApi.delete(`/${contactId}`); // Folosim instanța pentru contacte
    return data;
  } catch (error) {
    console.error('Error deleting contact:', error);
    throw error;
  }
};
