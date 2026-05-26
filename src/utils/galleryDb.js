const DEFAULT_IMAGES = [
  {
    id: 'img-1',
    title: 'State-of-the-Art IVF Embryology Lab',
    category: 'lab',
    description: 'Our Class 100 cleanroom laboratory, equipped with advanced micromanipulators for ICSI and time-lapse incubators.',
    imageUrl: 'https://images.unsplash.com/photo-1579154769741-628d023f8c3c?auto=format&fit=crop&q=80&w=800',
    date: '2026-05-24'
  },
  {
    id: 'img-2',
    title: 'Warm & Comforting Consulting Suite',
    category: 'consulting',
    description: 'A private and soothing environment where our specialists discuss your personalized treatment plans.',
    imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800',
    date: '2026-05-23'
  },
  {
    id: 'img-3',
    title: 'Advanced AI-Powered Incubators',
    category: 'lab',
    description: 'Continuous monitoring incubators that utilize machine learning models to non-invasively grade and select embryos.',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
    date: '2026-05-22'
  },
  {
    id: 'img-4',
    title: 'Reassuring Patient Consultations',
    category: 'consulting',
    description: 'Our fertility specialists provide dedicated, compassionate counseling at every phase of your journey.',
    imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800',
    date: '2026-05-21'
  },
  {
    id: 'img-5',
    title: 'Advika Welcome Lounge & Reception',
    category: 'lobby',
    description: 'A soothing and peaceful welcome area designed to ease anxiety and make your visits comfortable.',
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
    date: '2026-05-20'
  },
  {
    id: 'img-6',
    title: 'Cryopreservation Nitrogen Storage',
    category: 'lab',
    description: 'Ultra-secure, backup-monitored liquid nitrogen tanks for safe, long-term egg, sperm, and embryo storage.',
    imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?auto=format&fit=crop&q=80&w=800',
    date: '2026-05-19'
  }
];

const LOCAL_STORAGE_KEY = 'advika_gallery_images';

export function getGalleryImages() {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!data) {
      // Prepopulate
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_IMAGES));
      return DEFAULT_IMAGES;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading gallery database', error);
    return DEFAULT_IMAGES;
  }
}

export function saveGalleryImages(images) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(images));
    // Trigger custom event so other components (e.g. Gallery section & Admin panel) can auto-refresh
    window.dispatchEvent(new Event('gallery-update'));
    return true;
  } catch (error) {
    console.error('Error saving to gallery database', error);
    return false;
  }
}

export function addGalleryImage(image) {
  const images = getGalleryImages();
  const newImage = {
    id: 'img-' + Date.now(),
    date: new Date().toISOString().split('T')[0],
    ...image
  };
  images.unshift(newImage); // Add to beginning of list
  saveGalleryImages(images);
  return newImage;
}

export function updateGalleryImage(id, updatedFields) {
  const images = getGalleryImages();
  const index = images.findIndex(img => img.id === id);
  if (index !== -1) {
    images[index] = { ...images[index], ...updatedFields };
    saveGalleryImages(images);
    return true;
  }
  return false;
}

export function deleteGalleryImage(id) {
  const images = getGalleryImages();
  const filtered = images.filter(img => img.id !== id);
  saveGalleryImages(filtered);
  return true;
}

export function resetGallery() {
  saveGalleryImages(DEFAULT_IMAGES);
  return DEFAULT_IMAGES;
}
