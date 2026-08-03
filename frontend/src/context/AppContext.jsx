import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialDisasters,
  initialVolunteers,
  initialShelters,
  initialDonations,
  initialTasks,
  initialActivities
} from '../utils/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Authentication State
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : { name: 'Admin Coordinator', email: 'admin@reliefnet.org', role: 'ADMIN' };
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('token') || true);

  // Entities State initialized from LocalStorage or Default Mock Data
  const [disasters, setDisasters] = useState(() => {
    const saved = localStorage.getItem('vdr_disasters');
    return saved ? JSON.parse(saved) : initialDisasters;
  });

  const [volunteers, setVolunteers] = useState(() => {
    const saved = localStorage.getItem('vdr_volunteers');
    return saved ? JSON.parse(saved) : initialVolunteers;
  });

  const [shelters, setShelters] = useState(() => {
    const saved = localStorage.getItem('vdr_shelters');
    return saved ? JSON.parse(saved) : initialShelters;
  });

  const [donations, setDonations] = useState(() => {
    const saved = localStorage.getItem('vdr_donations');
    return saved ? JSON.parse(saved) : initialDonations;
  });

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('vdr_tasks');
    return saved ? JSON.parse(saved) : initialTasks;
  });

  const [activities, setActivities] = useState(initialActivities);

  // Toast Notification State
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ id: Date.now(), message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Sync state changes to localStorage
  useEffect(() => {
    localStorage.setItem('vdr_disasters', JSON.stringify(disasters));
  }, [disasters]);

  useEffect(() => {
    localStorage.setItem('vdr_volunteers', JSON.stringify(volunteers));
  }, [volunteers]);

  useEffect(() => {
    localStorage.setItem('vdr_shelters', JSON.stringify(shelters));
  }, [shelters]);

  useEffect(() => {
    localStorage.setItem('vdr_donations', JSON.stringify(donations));
  }, [donations]);

  useEffect(() => {
    localStorage.setItem('vdr_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Auth Operations
  const login = (email, password) => {
    const mockUser = {
      name: email.split('@')[0].toUpperCase() + ' (Coordinator)',
      email,
      role: 'ADMIN',
    };
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('token', 'mock-jwt-token-123456789');
    localStorage.setItem('user', JSON.stringify(mockUser));
    showToast('Logged in successfully! Welcome back.');
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    showToast('Logged out successfully.', 'info');
  };

  // CRUD Operations Helpers
  const addDisaster = (item) => {
    const newItem = { ...item, id: Date.now(), reportedAt: new Date().toISOString() };
    setDisasters([newItem, ...disasters]);
    showToast(`Disaster "${item.title}" reported successfully.`);
  };

  const updateDisaster = (id, item) => {
    setDisasters(disasters.map((d) => (d.id === id ? { ...d, ...item } : d)));
    showToast(`Disaster updated successfully.`);
  };

  const deleteDisaster = (id) => {
    setDisasters(disasters.filter((d) => d.id !== id));
    showToast(`Disaster removed successfully.`, 'warning');
  };

  const addVolunteer = (item) => {
    const newItem = { ...item, id: Date.now() };
    setVolunteers([newItem, ...volunteers]);
    showToast(`Volunteer ${item.name} registered.`);
  };

  const updateVolunteer = (id, item) => {
    setVolunteers(volunteers.map((v) => (v.id === id ? { ...v, ...item } : v)));
    showToast(`Volunteer details updated.`);
  };

  const deleteVolunteer = (id) => {
    setVolunteers(volunteers.filter((v) => v.id !== id));
    showToast(`Volunteer removed.`, 'warning');
  };

  const addShelter = (item) => {
    const newItem = { ...item, id: Date.now() };
    setShelters([newItem, ...shelters]);
    showToast(`Shelter "${item.name}" added.`);
  };

  const updateShelter = (id, item) => {
    setShelters(shelters.map((s) => (s.id === id ? { ...s, ...item } : s)));
    showToast(`Shelter details updated.`);
  };

  const deleteShelter = (id) => {
    setShelters(shelters.filter((s) => s.id !== id));
    showToast(`Shelter deleted.`, 'warning');
  };

  const addDonation = (item) => {
    const newItem = { ...item, id: Date.now(), donatedAt: new Date().toISOString() };
    setDonations([newItem, ...donations]);
    showToast(`Donation recorded from ${item.donorName}.`);
  };

  const updateDonation = (id, item) => {
    setDonations(donations.map((d) => (d.id === id ? { ...d, ...item } : d)));
    showToast(`Donation record updated.`);
  };

  const deleteDonation = (id) => {
    setDonations(donations.filter((d) => d.id !== id));
    showToast(`Donation record removed.`, 'warning');
  };

  const addTask = (item) => {
    const newItem = { ...item, id: Date.now(), createdAt: new Date().toISOString() };
    setTasks([newItem, ...tasks]);
    showToast(`Relief task "${item.title}" dispatched.`);
  };

  const updateTask = (id, item) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, ...item } : t)));
    showToast(`Task status updated.`);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
    showToast(`Task deleted.`, 'warning');
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        disasters,
        addDisaster,
        updateDisaster,
        deleteDisaster,
        volunteers,
        addVolunteer,
        updateVolunteer,
        deleteVolunteer,
        shelters,
        addShelter,
        updateShelter,
        deleteShelter,
        donations,
        addDonation,
        updateDonation,
        deleteDonation,
        tasks,
        addTask,
        updateTask,
        deleteTask,
        activities,
        toast,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
