// src/utils/apiWrapper.js
import { apiRequest } from './api';

// Gallery
export const getGalleryImages = (token) => apiRequest('/gallery', 'GET', null, token);
export const addGalleryImage = (data, token) => apiRequest('/gallery', 'POST', data, token);
export const updateGalleryImage = (id, data, token) => apiRequest(`/gallery/${id}`, 'PUT', data, token);
export const deleteGalleryImage = (id, token) => apiRequest(`/gallery/${id}`, 'DELETE', null, token);
export const resetGallery = async (token) => {
  // optional endpoint to clear collection
  return apiRequest('/gallery/reset', 'POST', null, token);
};

// Doctors
export const getDoctors = (token) => apiRequest('/doctors', 'GET', null, token);
export const addDoctor = (data, token) => apiRequest('/doctors', 'POST', data, token);
export const updateDoctor = (id, data, token) => apiRequest(`/doctors/${id}`, 'PUT', data, token);
export const deleteDoctor = (id, token) => apiRequest(`/doctors/${id}`, 'DELETE', null, token);
export const resetDoctors = async (token) => apiRequest('/doctors/reset', 'POST', null, token);

// Testimonials
export const getTestimonials = (token) => apiRequest('/testimonials', 'GET', null, token);
export const addTestimonial = (data, token) => apiRequest('/testimonials', 'POST', data, token);
export const updateTestimonial = (id, data, token) => apiRequest(`/testimonials/${id}`, 'PUT', data, token);
export const deleteTestimonial = (id, token) => apiRequest(`/testimonials/${id}`, 'DELETE', null, token);
export const resetTestimonials = async (token) => apiRequest('/testimonials/reset', 'POST', null, token);

// FAQs
export const getFaqs = (token) => apiRequest('/faqs', 'GET', null, token);
export const addFaq = (data, token) => apiRequest('/faqs', 'POST', data, token);
export const updateFaq = (id, data, token) => apiRequest(`/faqs/${id}`, 'PUT', data, token);
export const deleteFaq = (id, token) => apiRequest(`/faqs/${id}`, 'DELETE', null, token);
export const resetFaqs = async (token) => apiRequest('/faqs/reset', 'POST', null, token);
