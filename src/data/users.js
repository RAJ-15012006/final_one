// Initial seed users for demo purposes
const defaultUsers = [
  {
    id: 'student1',
    password: 'password123',
    name: 'Raj',
    email: 'yashesvi@example.com'
  },
  {
    id: 'admin',
    password: 'admin',
    name: 'Admin User',
    email: 'admin@example.com'
  }
];

// Helper to get all registered users from localStorage, or init if empty
export const getUsers = () => {
  const storedUsers = localStorage.getItem('registeredUsers');
  if (storedUsers) {
    return JSON.parse(storedUsers);
  } else {
    localStorage.setItem('registeredUsers', JSON.stringify(defaultUsers));
    return defaultUsers;
  }
};

// Helper function for mock auth
export const findUser = (id, password) => {
  const users = getUsers();
  return users.find(u => u.id === id && u.password === password);
};

// Helper function to register a new user
export const registerUser = (userData) => {
  const users = getUsers();
  // Check if ID already exists
  if (users.find(u => u.id === userData.id)) {
    return { success: false, message: 'User ID already taken' };
  }
  
  const newUser = {
    ...userData,
    id: userData.id
  };
  
  users.push(newUser);
  localStorage.setItem('registeredUsers', JSON.stringify(users));
  return { success: true, user: newUser };
};
