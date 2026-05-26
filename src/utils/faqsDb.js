const DEFAULT_FAQS = [
  {
    id: 'ivf',
    category: 'In Vitro Fertilization (IVF)',
    faqs: [
      { q: "What is the success rate of IVF at Advika?", a: "Our IVF success rate is consistently above the national average, standing at 85% for patients under 35. Success rates vary based on individual medical history, age, and lifestyle factors." },
      { q: "Is the IVF procedure painful?", a: "The IVF process involves mild discomfort, similar to menstrual cramps, during the egg retrieval phase. The procedure itself is performed under light sedation, ensuring you feel no pain." },
      { q: "How long does one IVF cycle take?", a: "A standard IVF cycle takes about 4 to 6 weeks from the initial consultation to the pregnancy test. This includes ovarian stimulation, egg retrieval, fertilization, and embryo transfer." }
    ]
  },
  {
    id: 'iui',
    category: 'Intrauterine Insemination (IUI)',
    faqs: [
      { q: "How is IUI different from IVF?", a: "IUI is a less invasive procedure where specially washed and concentrated sperm is placed directly into the uterus around the time of ovulation. In IVF, fertilization occurs outside the body in a laboratory." },
      { q: "Who is a good candidate for IUI?", a: "IUI is often recommended for couples with unexplained infertility, mild male factor infertility, or women using donor sperm, provided the fallopian tubes are open and healthy." },
      { q: "Can I try IUI multiple times?", a: "Yes, we typically recommend trying 3 to 4 cycles of IUI before considering more advanced treatments like IVF, depending on your age and medical profile." }
    ]
  },
  {
    id: 'freeze',
    category: 'Fertility Preservation (Egg Freezing)',
    faqs: [
      { q: "What is the best age to freeze my eggs?", a: "The optimal age to freeze eggs is in your late 20s to early 30s, as egg quality and quantity are typically at their highest, leading to better outcomes later." },
      { q: "How long can frozen eggs be stored?", a: "With modern vitrification techniques, frozen eggs can be stored indefinitely without any significant decrease in quality or viability." },
      { q: "Does egg freezing affect my natural fertility?", a: "No, egg freezing does not deplete your ovarian reserve or affect your ability to conceive naturally in the future. It only rescues eggs that would have otherwise naturally degenerated during that menstrual cycle." }
    ]
  },
  {
    id: 'pgt',
    category: 'Genetic Testing (PGT)',
    faqs: [
      { q: "What does PGT screen for?", a: "Preimplantation Genetic Testing (PGT) screens embryos for chromosomal abnormalities (aneuploidy) and specific single-gene genetic disorders before they are transferred to the uterus." },
      { q: "Does PGT increase IVF success rates?", a: "Yes, by ensuring only chromosomally normal (euploid) embryos are transferred, PGT significantly increases implantation rates and reduces the risk of miscarriage." },
      { q: "Is PGT safe for the embryo?", a: "Yes, PGT is performed by highly skilled embryologists who safely biopsy a few cells from the outer layer of the blastocyst (which becomes the placenta), leaving the inner cell mass (which becomes the baby) untouched." }
    ]
  },
  {
    id: 'donor',
    category: 'Donor Programs',
    faqs: [
      { q: "How are donors screened at Advika?", a: "All our donors undergo rigorous medical, psychological, and genetic screening in compliance with national guidelines to ensure the highest safety and success standards." },
      { q: "Is the donor process confidential?", a: "Absolutely. We maintain strict confidentiality and anonymity for both the donors and the intended parents throughout the entire process." },
      { q: "Can we choose our donor's physical characteristics?", a: "Yes, intended parents can select donors based on non-identifying physical characteristics such as height, eye color, hair color, and educational background to closely match their preferences." }
    ]
  },
  {
    id: 'lap',
    category: 'Laparoscopy & Surgical Procedures',
    faqs: [
      { q: "When is laparoscopy recommended for infertility?", a: "Laparoscopy is recommended to diagnose and treat conditions that affect fertility, such as endometriosis, pelvic adhesions, fibroids, or blocked fallopian tubes." },
      { q: "What is the recovery time for fertility surgery?", a: "Recovery times vary, but most minimally invasive procedures allow patients to return home the same day and resume normal activities within a few days to a week." },
      { q: "Will surgery guarantee pregnancy?", a: "While surgery can significantly improve the physical environment for conception by removing obstacles, it does not guarantee pregnancy. However, it often drastically improves the success rates of subsequent natural conception or IVF." }
    ]
  }
];

const LOCAL_STORAGE_KEY = 'advika_faqs_db';

export function getFaqs() {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!data) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_FAQS));
      return DEFAULT_FAQS;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading FAQs database', error);
    return DEFAULT_FAQS;
  }
}

export function saveFaqs(categories) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(categories));
    window.dispatchEvent(new Event('faqs-update'));
    return true;
  } catch (error) {
    console.error('Error saving to FAQs database', error);
    return false;
  }
}

export function addFaq(categoryId, q, a) {
  const categories = getFaqs();
  const index = categories.findIndex(cat => cat.id === categoryId);
  if (index !== -1) {
    categories[index].faqs.push({ q, a });
    saveFaqs(categories);
    return true;
  }
  return false;
}

export function updateFaq(categoryId, faqIndex, q, a) {
  const categories = getFaqs();
  const catIndex = categories.findIndex(cat => cat.id === categoryId);
  if (catIndex !== -1 && categories[catIndex].faqs[faqIndex]) {
    categories[catIndex].faqs[faqIndex] = { q, a };
    saveFaqs(categories);
    return true;
  }
  return false;
}

export function deleteFaq(categoryId, faqIndex) {
  const categories = getFaqs();
  const catIndex = categories.findIndex(cat => cat.id === categoryId);
  if (catIndex !== -1 && categories[catIndex].faqs[faqIndex]) {
    categories[catIndex].faqs.splice(faqIndex, 1);
    saveFaqs(categories);
    return true;
  }
  return false;
}

export function resetFaqs() {
  saveFaqs(DEFAULT_FAQS);
  return DEFAULT_FAQS;
}
