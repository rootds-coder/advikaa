const DEFAULT_DOCTORS = [
  {
    id: 'doc-1',
    name: 'Dr. Priyanka Singh',
    title: 'Fertility & IVF Specialist',
    qual: 'MS (Obstetrics & Gynaecology), Fellowship in Reproductive Medicine',
    desc: 'At the heart of Advika Fertility & IVF Center stands Dr. Priyanka Singh, a dedicated and compassionate fertility specialist committed to turning the dream of parenthood into reality.',
    exp: '10+ yrs',
    patients: '1,200+',
    image: '/assets/images/dr-priyanka-singh.jpeg',
    color: '#8B111B', // Kumkum Red
    bg: '#F9E8EA',
  },
  {
    id: 'doc-2',
    name: 'Dr. Kuldeep Singh',
    title: 'Neonatologist & Child Care Specialist',
    qual: 'MBBS, MD Pediatrics, DNB Pediatrics & DM Neonatology',
    desc: 'Leading Advika Fertility & IVF Center with vision and dedication, Dr. Kuldeep Singh brings a deep commitment to ensuring that every child receives the safest and healthiest start to life.',
    exp: '10+ yrs',
    patients: '900+',
    image: '/assets/images/dr-kuldeep-singh.jpeg',
    color: '#D58F4B', // Kesar Gold
    bg: '#FCF3E8',
  },
  {
    id: 'doc-3',
    name: 'Dr. Priyanka Malik',
    title: 'Embryologist & IVF Lab Specialist',
    qual: 'ART & IVF Laboratory Specialist',
    desc: 'Behind every successful IVF journey lies the precision of an expert embryologist—and at Advika, that laboratory expertise is led by Dr. Malik. With specialized training in clinical embryology.',
    exp: '5+ yrs',
    patients: '800+ cycles',
    image: '/assets/images/dr-priyanka-malik.jpeg',
    color: '#8B111B', // Kumkum Red
    bg: '#F9E8EA',
  },
  {
    id: 'doc-4',
    name: 'Dr. Pawan Kapoor',
    title: 'Urologist & Renal Transplant Surgeon',
    qual: 'FMAS, FCLS, DrNB Urology & MNAMS',
    desc: 'Dr. Pawan Kapoor is a highly trained Urologist and Renal Transplant Surgeon with strong academic and clinical experience.',
    exp: '10+ yrs',
    patients: '2,000+',
    image: '/assets/images/dr-pawan-kapoor.jpeg',
    color: '#D58F4B', // Kesar Gold
    bg: '#FCF3E8',
  },
  {
    id: 'doc-5',
    name: 'Dr. Shailja Jaswal',
    title: 'Medical Officer & Counselor',
    qual: 'Medical Officer',
    desc: 'Dr. Jaswal is known for exceptional counseling skills, believing that every patient journey is unique and deserves personalized attention, clear guidance, and emotional support.',
    exp: '5+ yrs',
    patients: '2,000+',
    image: '/assets/images/dr-shailja-jaswal.jpeg',
    color: '#8B111B', // Kumkum Red
    bg: '#F9E8EA',
  },
  {
    id: 'doc-6',
    name: 'Dr. Shweta',
    title: 'In-House Fertility Counselor',
    qual: 'Fertility Counselor',
    desc: 'Dr. Shweta works as a counselor at Advika, bringing a wealth of experience in guiding and supporting patients through the emotional pathways of fertility journeys.',
    exp: '5+ yrs',
    patients: '2,000+',
    image: '/assets/images/dr-shweta.jpeg',
    color: '#D58F4B', // Kesar Gold
    bg: '#FCF3E8',
  },
];

const LOCAL_STORAGE_KEY = 'advika_doctors_db';

export function getDoctors() {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!data) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_DOCTORS));
      return DEFAULT_DOCTORS;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading doctors database', error);
    return DEFAULT_DOCTORS;
  }
}

export function saveDoctors(doctors) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(doctors));
    window.dispatchEvent(new Event('doctors-update'));
    return true;
  } catch (error) {
    console.error('Error saving to doctors database', error);
    return false;
  }
}

export function addDoctor(doctor) {
  const doctors = getDoctors();
  const newDoctor = {
    id: 'doc-' + Date.now(),
    color: doctors.length % 2 === 0 ? '#8B111B' : '#D58F4B',
    bg: doctors.length % 2 === 0 ? '#F9E8EA' : '#FCF3E8',
    ...doctor
  };
  doctors.push(newDoctor); // Add to end
  saveDoctors(doctors);
  return newDoctor;
}

export function updateDoctor(id, updatedFields) {
  const doctors = getDoctors();
  const index = doctors.findIndex(doc => doc.id === id);
  if (index !== -1) {
    doctors[index] = { ...doctors[index], ...updatedFields };
    saveDoctors(doctors);
    return true;
  }
  return false;
}

export function deleteDoctor(id) {
  const doctors = getDoctors();
  const filtered = doctors.filter(doc => doc.id !== id);
  saveDoctors(filtered);
  return true;
}

export function resetDoctors() {
  saveDoctors(DEFAULT_DOCTORS);
  return DEFAULT_DOCTORS;
}
