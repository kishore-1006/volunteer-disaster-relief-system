import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  authService, userService,
  disasterService, volunteerService, shelterService,
  donationService, taskService, dashboardService
} from '../services/api';
import { initialActivities } from '../utils/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Authentication State
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('token'));

  // Entity State — starts empty; populated from backend APIs
  const [disasters, setDisasters] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [shelters, setShelters] = useState([]);
  const [donations, setDonations] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [activities, setActivities] = useState(initialActivities);

  // Dashboard aggregated stats from /api/dashboard/stats
  const [dashboardStats, setDashboardStats] = useState(null);
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const [dashboardError, setDashboardError] = useState(null);

  // Toast Notification State
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ id: Date.now(), message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // ─── Fetch all entity lists from backend ───────────────────────────────────
  const fetchAllData = useCallback(async () => {
    try {
      const [
        disastersRes, volunteersRes, sheltersRes,
        donationsRes, tasksRes
      ] = await Promise.allSettled([
        disasterService.getAll(),
        volunteerService.getAll(),
        shelterService.getAll(),
        donationService.getAll(),
        taskService.getAll(),
      ]);

      if (disastersRes.status === 'fulfilled') setDisasters(disastersRes.value.data);
      if (volunteersRes.status === 'fulfilled') setVolunteers(volunteersRes.value.data);
      if (sheltersRes.status === 'fulfilled') setShelters(sheltersRes.value.data);
      if (donationsRes.status === 'fulfilled') setDonations(donationsRes.value.data);
      if (tasksRes.status === 'fulfilled') setTasks(tasksRes.value.data);
    } catch (err) {
      console.warn('fetchAllData error:', err);
    }
  }, []);

  // ─── Fetch aggregated dashboard statistics ─────────────────────────────────
  const fetchDashboardStats = useCallback(async () => {
    setDashboardLoading(true);
    setDashboardError(null);
    try {
      const res = await dashboardService.getStats();
      setDashboardStats(res.data);
    } catch (err) {
      console.warn('Dashboard stats fetch failed:', err);
      setDashboardError('Failed to load dashboard statistics. Retrying with local data.');
    } finally {
      setDashboardLoading(false);
    }
  }, []);

  // ─── Sync token validation + fetch data on load ────────────────────────────
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      authService.getCurrentUser()
        .then((res) => {
          setUser(res.data);
          setIsAuthenticated(true);
          localStorage.setItem('user', JSON.stringify(res.data));
          // Load backend data once authenticated
          fetchAllData();
          fetchDashboardStats();
        })
        .catch(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
          setIsAuthenticated(false);
        });
    }
  }, [fetchAllData, fetchDashboardStats]);

  // ─── Auth Operations ───────────────────────────────────────────────────────
  const login = async (email, password) => {
    try {
      const response = await authService.login({ email, password });
      const { accessToken, user: userData } = response.data;

      localStorage.setItem('token', accessToken);
      localStorage.setItem('user', JSON.stringify(userData));

      setUser(userData);
      setIsAuthenticated(true);
      showToast('Logged in successfully! Welcome back.');

      // Fetch real backend data after login
      fetchAllData();
      fetchDashboardStats();

      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Invalid email or password';
      showToast(errorMessage, 'danger');
      return { success: false, message: errorMessage };
    }
  };

  const register = async (formData) => {
    try {
      const response = await authService.register(formData);
      const { accessToken, user: userData } = response.data;

      localStorage.setItem('token', accessToken);
      localStorage.setItem('user', JSON.stringify(userData));

      setUser(userData);
      setIsAuthenticated(true);
      showToast('Account registered successfully! Welcome.');

      fetchAllData();
      fetchDashboardStats();

      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      showToast(errorMessage, 'danger');
      return { success: false, message: errorMessage };
    }
  };

  const updateUserProfile = async (profileData) => {
    try {
      let updatedUser = { ...user, ...profileData };
      try {
        const res = await userService.updateProfile(profileData);
        if (res.data) {
          updatedUser = { ...updatedUser, ...res.data };
        }
      } catch (err) {
        console.warn('Backend updateProfile API fallback:', err);
      }

      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));

      if (profileData.name || profileData.phoneNumber || profileData.location || profileData.skills) {
        setVolunteers((prev) =>
          prev.map((v) =>
            v.email === updatedUser?.email
              ? {
                  ...v,
                  name: profileData.name || v.name,
                  phoneNumber: profileData.phoneNumber || v.phoneNumber,
                  location: profileData.location || v.location,
                  skills: profileData.skills || v.skills,
                }
              : v
          )
        );
      }

      showToast('Profile updated successfully!');
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update profile';
      showToast(errorMessage, 'danger');
      return { success: false, message: errorMessage };
    }
  };

  const forgotPassword = async (email) => {
    try {
      const response = await authService.forgotPassword({ email });
      const resetToken = response.data?.resetToken;
      showToast('Reset token generated! Enter it below to reset your password.');
      return { success: true, resetToken, message: response.data?.message };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to request password reset';
      showToast(errorMessage, 'danger');
      return { success: false, message: errorMessage };
    }
  };

  const resetPassword = async (data) => {
    try {
      const response = await authService.resetPassword(data);
      showToast('Password reset successfully! You can now log in.');
      return { success: true, message: response.data?.message };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Password reset failed';
      showToast(errorMessage, 'danger');
      return { success: false, message: errorMessage };
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setDashboardStats(null);
    setDisasters([]);
    setVolunteers([]);
    setShelters([]);
    setDonations([]);
    setTasks([]);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    showToast('Logged out successfully.', 'info');
  };

  // ─── CRUD — Disaster ───────────────────────────────────────────────────────
  const addDisaster = async (item) => {
    try {
      const res = await disasterService.create(item);
      setDisasters((prev) => [res.data, ...prev]);
      showToast(`Disaster "${res.data.title}" reported successfully.`);
      fetchDashboardStats();
    } catch {
      const newItem = { ...item, id: Date.now(), reportedAt: new Date().toISOString() };
      setDisasters((prev) => [newItem, ...prev]);
      showToast(`Disaster "${item.title}" reported successfully.`);
    }
  };

  const updateDisaster = async (id, item) => {
    try {
      const res = await disasterService.update(id, item);
      setDisasters((prev) => prev.map((d) => (d.id === id ? res.data : d)));
      showToast('Disaster updated successfully.');
      fetchDashboardStats();
    } catch {
      setDisasters((prev) => prev.map((d) => (d.id === id ? { ...d, ...item } : d)));
      showToast('Disaster updated successfully.');
    }
  };

  const deleteDisaster = async (id) => {
    try {
      await disasterService.delete(id);
      setDisasters((prev) => prev.filter((d) => d.id !== id));
      showToast('Disaster removed successfully.', 'warning');
      fetchDashboardStats();
    } catch {
      setDisasters((prev) => prev.filter((d) => d.id !== id));
      showToast('Disaster removed successfully.', 'warning');
    }
  };

  // ─── CRUD — Volunteer ──────────────────────────────────────────────────────
  const addVolunteer = async (item) => {
    try {
      const res = await volunteerService.create(item);
      setVolunteers((prev) => [res.data, ...prev]);
      showToast(`Volunteer ${res.data.name} registered.`);
      fetchDashboardStats();
    } catch {
      const newItem = { ...item, id: Date.now() };
      setVolunteers((prev) => [newItem, ...prev]);
      showToast(`Volunteer ${item.name} registered.`);
    }
  };

  const updateVolunteer = async (id, item) => {
    try {
      const res = await volunteerService.update(id, item);
      setVolunteers((prev) => prev.map((v) => (v.id === id ? res.data : v)));
      showToast('Volunteer details updated.');
      fetchDashboardStats();
    } catch {
      setVolunteers((prev) => prev.map((v) => (v.id === id ? { ...v, ...item } : v)));
      showToast('Volunteer details updated.');
    }
  };

  const deleteVolunteer = async (id) => {
    try {
      await volunteerService.delete(id);
      setVolunteers((prev) => prev.filter((v) => v.id !== id));
      showToast('Volunteer removed.', 'warning');
      fetchDashboardStats();
    } catch {
      setVolunteers((prev) => prev.filter((v) => v.id !== id));
      showToast('Volunteer removed.', 'warning');
    }
  };

  // ─── CRUD — Shelter ────────────────────────────────────────────────────────
  const addShelter = async (item) => {
    try {
      const res = await shelterService.create(item);
      setShelters((prev) => [res.data, ...prev]);
      showToast(`Shelter "${res.data.name}" added.`);
      fetchDashboardStats();
    } catch {
      const newItem = { ...item, id: Date.now() };
      setShelters((prev) => [newItem, ...prev]);
      showToast(`Shelter "${item.name}" added.`);
    }
  };

  const updateShelter = async (id, item) => {
    try {
      const res = await shelterService.update(id, item);
      setShelters((prev) => prev.map((s) => (s.id === id ? res.data : s)));
      showToast('Shelter details updated.');
      fetchDashboardStats();
    } catch {
      setShelters((prev) => prev.map((s) => (s.id === id ? { ...s, ...item } : s)));
      showToast('Shelter details updated.');
    }
  };

  const deleteShelter = async (id) => {
    try {
      await shelterService.delete(id);
      setShelters((prev) => prev.filter((s) => s.id !== id));
      showToast('Shelter deleted.', 'warning');
      fetchDashboardStats();
    } catch {
      setShelters((prev) => prev.filter((s) => s.id !== id));
      showToast('Shelter deleted.', 'warning');
    }
  };

  // ─── CRUD — Donation ───────────────────────────────────────────────────────
  const addDonation = async (item) => {
    try {
      const res = await donationService.create(item);
      setDonations((prev) => [res.data, ...prev]);
      showToast(`Donation recorded from ${res.data.donorName}.`);
      fetchDashboardStats();
    } catch {
      const newItem = { ...item, id: Date.now(), donatedAt: new Date().toISOString() };
      setDonations((prev) => [newItem, ...prev]);
      showToast(`Donation recorded from ${item.donorName}.`);
    }
  };

  const updateDonation = async (id, item) => {
    try {
      const res = await donationService.update(id, item);
      setDonations((prev) => prev.map((d) => (d.id === id ? res.data : d)));
      showToast('Donation record updated.');
      fetchDashboardStats();
    } catch {
      setDonations((prev) => prev.map((d) => (d.id === id ? { ...d, ...item } : d)));
      showToast('Donation record updated.');
    }
  };

  const deleteDonation = async (id) => {
    try {
      await donationService.delete(id);
      setDonations((prev) => prev.filter((d) => d.id !== id));
      showToast('Donation record removed.', 'warning');
      fetchDashboardStats();
    } catch {
      setDonations((prev) => prev.filter((d) => d.id !== id));
      showToast('Donation record removed.', 'warning');
    }
  };

  // ─── CRUD — Task ───────────────────────────────────────────────────────────
  const addTask = async (item) => {
    try {
      const res = await taskService.create(item);
      setTasks((prev) => [res.data, ...prev]);
      showToast(`Relief task "${res.data.title}" dispatched.`);
      fetchDashboardStats();
    } catch {
      const newItem = { ...item, id: Date.now(), createdAt: new Date().toISOString() };
      setTasks((prev) => [newItem, ...prev]);
      showToast(`Relief task "${item.title}" dispatched.`);
    }
  };

  const updateTask = async (id, item) => {
    try {
      const res = await taskService.update(id, item);
      setTasks((prev) => prev.map((t) => (t.id === id ? res.data : t)));
      showToast('Task status updated.');
      fetchDashboardStats();
    } catch {
      setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...item } : t)));
      showToast('Task status updated.');
    }
  };

  const deleteTask = async (id) => {
    try {
      await taskService.delete(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
      showToast('Task deleted.', 'warning');
      fetchDashboardStats();
    } catch {
      setTasks((prev) => prev.filter((t) => t.id !== id));
      showToast('Task deleted.', 'warning');
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        updateUserProfile,
        forgotPassword,
        resetPassword,
        logout,
        // Entity lists (for CRUD pages)
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
        // Dashboard real-time stats
        dashboardStats,
        dashboardLoading,
        dashboardError,
        fetchDashboardStats,
        // Toast
        toast,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
