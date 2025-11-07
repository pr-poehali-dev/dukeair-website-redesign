interface User {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
}

export const storage = {
  getUser: (): User | null => {
    const userStr = localStorage.getItem('dukeair_user');
    return userStr ? JSON.parse(userStr) : null;
  },
  
  setUser: (user: User) => {
    localStorage.setItem('dukeair_user', JSON.stringify(user));
  },
  
  clearUser: () => {
    localStorage.removeItem('dukeair_user');
  },
  
  isAuthenticated: (): boolean => {
    return storage.getUser() !== null;
  },
};
