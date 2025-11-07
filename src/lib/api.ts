const API_URLS = {
  auth: 'https://functions.poehali.dev/db4e48f1-2c29-494c-bc01-ecf07acda224',
  flights: 'https://functions.poehali.dev/729ab0ec-4844-4b61-aaa5-651692729e7a',
  hotels: 'https://functions.poehali.dev/7f1961a0-8bca-41c0-94c3-ee1917b5bae6',
  bookings: 'https://functions.poehali.dev/0c3ecd48-c101-4917-892f-403c995c6ece',
};

export const api = {
  auth: {
    login: async (email: string, password: string) => {
      const response = await fetch(API_URLS.auth, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', email, password }),
      });
      return response.json();
    },
    register: async (email: string, password: string, first_name: string, last_name: string) => {
      const response = await fetch(API_URLS.auth, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'register', email, password, first_name, last_name }),
      });
      return response.json();
    },
  },
  
  flights: {
    search: async (from: string, to: string) => {
      const response = await fetch(`${API_URLS.flights}?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`);
      return response.json();
    },
  },
  
  hotels: {
    search: async (city: string) => {
      const response = await fetch(`${API_URLS.hotels}?city=${encodeURIComponent(city)}`);
      return response.json();
    },
    getById: async (id: number) => {
      const response = await fetch(`${API_URLS.hotels}?id=${id}`);
      return response.json();
    },
  },
  
  bookings: {
    getUserBookings: async (userId: number) => {
      const response = await fetch(`${API_URLS.bookings}?user_id=${userId}`);
      return response.json();
    },
    create: async (bookingData: any) => {
      const response = await fetch(API_URLS.bookings, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });
      return response.json();
    },
  },
};
