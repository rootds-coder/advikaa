const DEFAULT_TESTIMONIALS = [
  {
    id: 'test-1',
    name: 'Priya & Arjun Sharma',
    location: 'Ambala',
    avatar: '👩‍👩‍👦',
    rating: 5,
    treatment: 'IVF — 2nd Attempt',
    quote: "After two failed attempts elsewhere, Advika IVF changed our lives. Dr. Priyanka's expertise and the team's warmth gave us the courage to try again. Today we hold our miracle baby boy, Aarav.",
    outcome: 'Baby boy born — January 2024',
  },
  {
    id: 'test-2',
    name: 'Sunita & Rohit Kapoor',
    location: 'Ambala Cantt',
    avatar: '👩‍👩‍👧',
    rating: 5,
    treatment: 'IUI — 1st Attempt',
    quote: "The entire team at Advika made us feel like family. The transparency, the technology, and the genuine care — we conceived on our very first IUI cycle. Our daughter is our greatest joy.",
    outcome: 'Baby girl born — March 2024',
  },
  {
    id: 'test-3',
    name: 'Kavitha & Suresh Nair',
    location: 'Chandigarh',
    avatar: '👩‍👩‍👦‍👦',
    rating: 5,
    treatment: 'IVF with PGT — Twins',
    quote: "Seven years of trying, countless heartbreaks. The PGT testing at Advika gave us the confidence of selecting the healthiest embryos. We are now proud parents of twin boys!",
    outcome: 'Twin boys born — November 2023',
  },
  {
    id: 'test-4',
    name: 'Ananya Krishnan',
    location: 'Ambala City',
    avatar: '👩‍👦',
    rating: 5,
    treatment: 'Egg Freezing + IVF',
    quote: "As a single mother by choice, Advika respected my decision completely. They froze my eggs at 33, and when I was ready at 37, the IVF was a success. My son is my entire universe.",
    outcome: 'Baby boy born — June 2024',
  },
];

const LOCAL_STORAGE_KEY = 'advika_testimonials_db';

export function getTestimonials() {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!data) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_TESTIMONIALS));
      return DEFAULT_TESTIMONIALS;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading testimonials database', error);
    return DEFAULT_TESTIMONIALS;
  }
}

export function saveTestimonials(testimonials) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(testimonials));
    window.dispatchEvent(new Event('testimonials-update'));
    return true;
  } catch (error) {
    console.error('Error saving to testimonials database', error);
    return false;
  }
}

export function addTestimonial(testimonial) {
  const testimonials = getTestimonials();
  const newTestimonial = {
    id: 'test-' + Date.now(),
    avatar: testimonial.avatar || '👶',
    rating: 5,
    ...testimonial
  };
  testimonials.unshift(newTestimonial); // Add to beginning of list
  saveTestimonials(testimonials);
  return newTestimonial;
}

export function updateTestimonial(id, updatedFields) {
  const testimonials = getTestimonials();
  const index = testimonials.findIndex(t => t.id === id);
  if (index !== -1) {
    testimonials[index] = { ...testimonials[index], ...updatedFields };
    saveTestimonials(testimonials);
    return true;
  }
  return false;
}

export function deleteTestimonial(id) {
  const testimonials = getTestimonials();
  const filtered = testimonials.filter(t => t.id !== id);
  saveTestimonials(filtered);
  return true;
}

export function resetTestimonials() {
  saveTestimonials(DEFAULT_TESTIMONIALS);
  return DEFAULT_TESTIMONIALS;
}
