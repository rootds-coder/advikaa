import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Enormous Specialized Clinical FAQ Database - 100+ Key Questions & Comforting Responses
const LOCAL_FAQ = [
  // ── IVF & BASICS ──
  {
    q: "What is IVF (In Vitro Fertilization)?",
    keywords: ["what is ivf", "define ivf", "ivf meaning", "ivf stand for", "explain ivf"],
    a: "IVF stands for In Vitro Fertilization. It is an advanced reproductive technology where mature eggs are retrieved from the ovaries, fertilized by sperm in a controlled laboratory, and the resulting healthy embryo is precisely transferred back to the uterus."
  },
  {
    q: "How long does one complete IVF cycle take?",
    keywords: ["how long", "timeline", "duration", "weeks", "days", "cycle take", "length of ivf"],
    a: "A single IVF cycle takes about 4 to 6 weeks. This timeline includes initial diagnostic testing, 10-12 days of gentle ovarian stimulation injections, egg retrieval, laboratory fertilization, and finally the embryo transfer."
  },
  {
    q: "Is IVF painful?",
    keywords: ["painful", "pain", "hurt", "uncomfortable", "sore", "soreness"],
    a: "Most patients experience very minimal discomfort. Daily hormone injections feel like a tiny pinch. The egg retrieval is performed under light, completely comfortable anesthesia, so you will feel absolutely no pain during the procedure itself."
  },
  {
    q: "What are the key steps in the IVF process?",
    keywords: ["steps in ivf", "ivf steps", "ivf stage", "stages of ivf", "process of ivf"],
    a: "The standard IVF process consists of five main steps: 1) Diagnostic mapping & ovulation suppression, 2) Ovarian stimulation via daily injections, 3) Painless egg retrieval, 4) Laboratory fertilization & embryo culture, and 5) Embryo transfer."
  },
  {
    q: "What is a blastocyst?",
    keywords: ["what is a blastocyst", "blastocyst stage", "blastocyst meaning", "day 5 embryo"],
    a: "A blastocyst is an embryo that has developed for 5 to 6 days after fertilization. It consists of about 100 cells, divided into an inner cell mass (which becomes the baby) and an outer layer (which becomes the placenta). Blastocysts have the highest implantation success rates."
  },
  {
    q: "Should I do a Day 3 or a Day 5 embryo transfer?",
    keywords: ["day 3 vs day 5", "day 3 or day 5", "cleavage vs blastocyst", "embryo transfer day"],
    a: "At Advika, we strongly recommend Day 5 (Blastocyst) transfers whenever possible. Developing embryos to Day 5 allows our laboratory to naturally select the strongest, healthiest embryos, resulting in significantly higher pregnancy rates per transfer."
  },
  {
    q: "What is a fresh vs. frozen embryo transfer?",
    keywords: ["fresh vs frozen", "fresh or frozen", "frozen transfer", "fresh transfer"],
    a: "A fresh transfer occurs 5 days after your egg retrieval. A frozen transfer (FET) involves freezing the embryos, allowing your hormone levels to completely return to natural baseline before transferring them in a later, calmer cycle—which often yields higher success."
  },
  {
    q: "What is FET (Frozen Embryo Transfer)?",
    keywords: ["what is fet", "fet process", "frozen embryo transfer process", "explain fet"],
    a: "Frozen Embryo Transfer (FET) is a procedure where a frozen embryo from a previous IVF cycle is thawed and carefully placed into the uterus during a highly optimized hormonal window. It is gentle, highly successful, and very common."
  },
  {
    q: "What is a natural cycle FET?",
    keywords: ["natural fet", "natural cycle fet", "unmedicated fet"],
    a: "A natural cycle FET relies on your body's natural ovulation timeline rather than synthetic estrogen and progesterone. We monitor your natural cycle closely via ultrasound and perform the transfer exactly 5 days after your natural ovulation."
  },
  {
    q: "How many embryos are typically transferred at once?",
    keywords: ["how many embryos", "single embryo", "multiple embryos", "number of embryos to transfer"],
    a: "At Advika, we practice Single Embryo Transfer (SET) for the vast majority of cases. Transferring one high-quality blastocyst gives you an outstanding chance of pregnancy while avoiding the severe high-risk clinical complications associated with twins or triplets."
  },
  {
    q: "What is the two-week wait?",
    keywords: ["two week wait", "2 week wait", "tww", "waiting after transfer"],
    a: "The 'two-week wait' is the 10 to 14 day period between your embryo transfer and the official blood pregnancy test (beta-hCG). It is natural to feel anxious; we recommend resting gently and staying occupied with relaxing activities."
  },
  {
    q: "Can I take a home pregnancy test early during the two-week wait?",
    keywords: ["home test early", "pregnancy test early", "urine test after transfer", "hpt"],
    a: "We highly recommend waiting for the official blood test. Home urine tests can give frustrating false positives (due to hormone injections still in your system) or false negatives (if hormone levels aren't high enough yet), causing unnecessary anxiety."
  },

  // ── EGG & EMBRYO FREEZING ──
  {
    q: "How does egg freezing work?",
    keywords: ["how does egg freezing", "egg freezing process", "freeze eggs", "egg preservation"],
    a: "Egg freezing is structured just like the first half of an IVF cycle. You undergo 10-12 days of gentle hormone stimulation followed by a 15-minute, painless retrieval. The eggs are immediately vitrified (flash-frozen) and stored safely."
  },
  {
    q: "What is vitrification?",
    keywords: ["what is vitrification", "flash freezing", "vitrification process"],
    a: "Vitrification is a state-of-the-art 'flash-freezing' technology that cools eggs or embryos to -196°C in milliseconds. This rapid speed prevents damaging ice crystals from forming, ensuring a post-thaw survival rate of over 99%."
  },
  {
    q: "What is the best age to freeze my eggs?",
    keywords: ["best age to freeze", "freeze eggs age", "freezing eggs in 20s", "freezing eggs in 30s"],
    a: "The biological sweet spot for egg freezing is between ages 28 and 35, when ovarian reserve and egg quality are both at their peak. However, freezing eggs in your late 30s is still highly beneficial for preserving your current fertility potential."
  },
  {
    q: "How long can frozen eggs or embryos remain stored?",
    keywords: ["how long store eggs", "storage limit", "embryo storage limit", "how long frozen last"],
    a: "Scientifically, frozen eggs and embryos can remain cryopreserved in liquid nitrogen indefinitely. Studies show no decline in viability or increased risk of birth defects even after decades of safe storage."
  },
  {
    q: "Does egg retrieval deplete my future egg supply?",
    keywords: ["deplete supply", "run out of eggs", "lose eggs", "does freezing reduce fertility"],
    a: "No. Every month, your body recruits a group of eggs that would otherwise naturally dissolve. Ovarian stimulation simply rescues these eggs, allowing us to retrieve them rather than letting them go to waste. Your future egg supply is unaffected."
  },
  {
    q: "How many eggs should I aim to freeze?",
    keywords: ["how many eggs to freeze", "number of eggs to freeze", "target egg count"],
    a: "For women under 35, we typically aim to freeze 10 to 15 mature eggs, which gives an excellent statistical probability (over 85%) of at least one live birth in the future. For women over 35, aiming for 15 to 20 eggs is recommended."
  },
  {
    q: "What is embryo freezing?",
    keywords: ["embryo freezing", "freeze embryos", "cryopreserve embryos"],
    a: "Embryo freezing is the preservation of fertilized eggs (blastocysts). If you have a partner or are using donor sperm, freezing embryos offers slightly higher survival and predictability rates compared to freezing unfertilized eggs."
  },
  {
    q: "What is ovarian tissue freezing?",
    keywords: ["ovarian tissue freezing", "freeze ovarian tissue"],
    a: "Ovarian tissue freezing is an advanced technique where a small piece of ovarian tissue is surgically removed, frozen, and later grafted back. It is primary recommended for young cancer patients prior to chemotherapy to preserve fertility."
  },

  // ── GENETIC TESTING (PGT) ──
  {
    q: "What is PGT (Pre-implantation Genetic Testing)?",
    keywords: ["what is pgt", "explain pgt", "preimplantation genetic", "embryo genetic test"],
    a: "PGT is a state-of-the-art procedure where a few cells are safely biopsied from a Day 5 blastocyst and tested for genetic abnormalities. This ensures we only transfer embryos with normal chromosomes, boosting success rates."
  },
  {
    q: "What is PGT-A testing?",
    keywords: ["pgt-a", "pgta", "aneuploidy screening", "down syndrome test"],
    a: "PGT-A screens embryos for aneuploidy (abnormal chromosome counts). It identifies embryos with chromosomal issues (like Down syndrome) before transfer, dramatically reducing miscarriage rates and improving live birth success."
  },
  {
    q: "What is PGT-M testing?",
    keywords: ["pgt-m", "pgtm", "monogenic disease", "genetic disease test", "inherited disease test"],
    a: "PGT-M is designed for couples who carry a known inherited single-gene genetic disorder (such as Cystic Fibrosis, Thalassemia, or Sickle Cell Anemia). It prevents passing the hereditary disease to the child."
  },
  {
    q: "What is PGT-SR testing?",
    keywords: ["pgt-sr", "pgtsr", "structural rearrangement", "translocation"],
    a: "PGT-SR screens embryos for chromosomal structural rearrangements (like translocations or inversions), which are a major cause of recurrent miscarriages and implantation failures."
  },
  {
    q: "Does embryo biopsy damage the embryo?",
    keywords: ["damage embryo", "biopsy safe", "is pgt safe", "biopsy risk"],
    a: "At Advika, our highly skilled embryologists perform the biopsy on Day 5 blastocysts. We only take a few cells from the outer layer (trophoblast), which becomes the placenta, leaving the inner cell mass (baby) completely untouched."
  },
  {
    q: "Who is recommended to undergo PGT genetic testing?",
    keywords: ["who should do pgt", "pgt candidate", "is pgt necessary"],
    a: "PGT is highly recommended for: 1) Women over age 35, 2) Couples with a history of recurrent miscarriages, 3) Patients with multiple failed IVF cycles, or 4) Carriers of known genetic mutations."
  },
  {
    q: "What is a mosaic embryo?",
    keywords: ["mosaic embryo", "mosaicism", "what does mosaic mean"],
    a: "A mosaic embryo contains a mix of both normal and abnormal cells. Depending on the percentage of abnormal cells and which chromosomes are affected, mosaic embryos can still result in perfectly healthy, successful pregnancies."
  },
  {
    q: "What is the accuracy rate of PGT genetic testing?",
    keywords: ["pgt accuracy", "how accurate is pgt", "is pgt 100 percent"],
    a: "PGT testing is extremely precise, boasting an accuracy rate of 97% to 99% in detecting chromosomal balances, making it one of the most reliable tools in modern reproductive medicine."
  },

  // ── MALE INFERTILITY ──
  {
    q: "What causes male factor infertility?",
    keywords: ["male infertility", "male factor", "sperm issue", "sperm count cause"],
    a: "Male factor infertility accounts for nearly 40% of cases. Common causes include low sperm count, poor sperm motility (swimming), abnormal morphology (shape), hormonal imbalances, varicoceles, or environmental factors."
  },
  {
    q: "What is a semen analysis?",
    keywords: ["semen analysis", "sperm test", "check sperm count", "semen test"],
    a: "A semen analysis is a foundational diagnostic test that evaluates the health of the sperm. It measures key parameters: sperm concentration (count), motility (movement), morphology (shape), and total volume."
  },
  {
    q: "What is a normal sperm count?",
    keywords: ["normal sperm count", "healthy sperm count", "sperm count number"],
    a: "According to WHO guidelines, a normal sperm count is 15 million or more sperm per milliliter of semen, with at least 40% showing active motility and 4% showing normal morphology."
  },
  {
    q: "What is ICSI (Intracytoplasmic Sperm Injection)?",
    keywords: ["what is icsi", "icsi process", "explain icsi", "sperm injection"],
    a: "ICSI is a specialized laboratory technique where a single high-quality sperm is injected directly into a mature egg. It bypasses barriers to fertilization and is the gold standard for severe male infertility."
  },
  {
    q: "When is ICSI recommended?",
    keywords: ["when do icsi", "why do icsi", "icsi indicator", "icsi vs ivf"],
    a: "ICSI is recommended for severe male factor infertility (low count, poor motility), failed fertilization in previous standard IVF cycles, using thawed sperm, or when performing PGT testing."
  },
  {
    q: "What is TESA / PESA?",
    keywords: ["tesa", "pesa", "sperm retrieval surgery", "surgical sperm extraction"],
    a: "TESA and PESA are minimally invasive, outpatient surgical procedures used to retrieve sperm directly from the testicles or epididymis when there is no sperm present in the semen (azoospermia)."
  },
  {
    q: "What is microTESE?",
    keywords: ["microtese", "micro-tese", "microscopic sperm extraction"],
    a: "microTESE is an advanced microscopic surgical procedure where a specialist searches the testicular tissue under an operative microscope to find tiny pockets of active sperm in men with non-obstructive azoospermia."
  },
  {
    q: "Can sperm motility be improved?",
    keywords: ["improve motility", "better sperm motility", "sperm motility cure"],
    a: "Yes. Sperm motility can often be improved within 90 days (the sperm lifecycle) through targeted antioxidant supplements, managing stress, treating varicoceles, avoiding hot baths/saunas, and quitting smoking."
  },
  {
    q: "What is a varicocele?",
    keywords: ["varicocele", "testicular vein", "scrotum vein"],
    a: "A varicocele is an enlargement of the veins within the scrotum, similar to varicose veins in the legs. It raises testicular temperature, which can impair sperm production and quality. It is highly treatable."
  },
  {
    q: "What is sperm DNA fragmentation?",
    keywords: ["dna fragmentation", "sperm dna", "sperm damage"],
    a: "Sperm DNA fragmentation refers to damage or breaks in the genetic material carried by the sperm. High fragmentation can cause failed fertilization, poor embryo quality, and recurrent miscarriages."
  },

  // ── WOMEN'S HEALTH & FERTILITY CAUSES ──
  {
    q: "What is PCOS (Polycystic Ovary Syndrome)?",
    keywords: ["pcos", "pcod", "polycystic", "ovary syndrome"],
    a: "PCOS is a very common hormonal disorder characterized by irregular periods, excess androgen (male hormone) levels, and multiple tiny immature follicles in the ovaries, which can prevent regular ovulation."
  },
  {
    q: "How does PCOS affect my fertility?",
    keywords: ["pcos fertility", "pcos get pregnant", "pcos baby"],
    a: "PCOS primarily causes infertility by preventing regular ovulation (anovulation). At Advika, we successfully treat PCOS-related infertility through gentle lifestyle modifications, ovulation induction, or highly customized IVF."
  },
  {
    q: "What is endometriosis?",
    keywords: ["endometriosis", "endo", "painful period cause"],
    a: "Endometriosis is a condition where tissue similar to the lining of the uterus grows outside the uterus, causing painful periods, inflammation, pelvic scarring, and potential blockages that impact fertility."
  },
  {
    q: "How does endometriosis impact fertility?",
    keywords: ["endometriosis fertility", "endo pregnant"],
    a: "Endometriosis can damage egg quality, trigger pelvic inflammation, and create physical adhesions that block the fallopian tubes, preventing the egg and sperm from meeting. IVF is exceptionally effective for endometriosis."
  },
  {
    q: "What are blocked fallopian tubes?",
    keywords: ["blocked tubes", "fallopian tube block", "tubal factor"],
    a: "Blocked fallopian tubes prevent the egg from traveling to the uterus and block sperm from reaching the egg. If both tubes are blocked, IVF is the primary path to pregnancy as it bypasses the tubes entirely."
  },
  {
    q: "How is a fallopian tube blockage diagnosed?",
    keywords: ["diagnose blocked tubes", "hsg test", "hysterosalpingogram", "dye test"],
    a: "Blocked tubes are most commonly diagnosed using an HSG (Hysterosalpingogram), a specialized X-ray procedure where a safe contrast dye is gently guided through the cervix to check if the tubes are open."
  },
  {
    q: "What are uterine fibroids?",
    keywords: ["fibroids", "uterine fibroid", "uterus lump"],
    a: "Uterine fibroids are non-cancerous growths of muscle tissue in the uterus. Depending on their size and location (especially submucosal fibroids inside the uterine cavity), they can interfere with embryo implantation."
  },
  {
    q: "What is adenomyosis?",
    keywords: ["adenomyosis", "thick uterus", "painful uterus"],
    a: "Adenomyosis occurs when endometrial tissue grows directly into the muscular wall of the uterus, leading to a thickened, tender uterus, painful cycles, and potential challenges with embryo implantation."
  },
  {
    q: "What is a low ovarian reserve?",
    keywords: ["low ovarian reserve", "poor ovarian reserve", "egg supply low"],
    a: "Low ovarian reserve means a woman has fewer eggs remaining in her ovaries than expected for her age. While it sounds discouraging, we specialize in advanced micro-flare and customized protocols to maximize egg yields."
  },
  {
    q: "What is AMH (Anti-Müllerian Hormone)?",
    keywords: ["what is amh", "amh hormone", "amh levels", "amh meaning"],
    a: "AMH is a hormone produced by the tiny follicles in your ovaries. It is measured via a simple blood test and is the most reliable marker to estimate your remaining egg supply (ovarian reserve)."
  },
  {
    q: "What is a normal AMH level?",
    keywords: ["normal amh", "good amh level", "healthy amh"],
    a: "A healthy AMH level for a woman of reproductive age typically ranges between 1.0 ng/mL and 3.5 ng/mL. Levels below 1.0 ng/mL suggest a low ovarian reserve, while levels above 3.5 ng/mL can indicate PCOS."
  },
  {
    q: "What is premature ovarian insufficiency (POI)?",
    keywords: ["poi", "premature ovarian", "early menopause"],
    a: "POI is the loss of normal ovarian function before age 40, resulting in irregular cycles and low estrogen. Women with POI can successfully build families using advanced customized protocols or donor eggs."
  },
  {
    q: "What is unexplained infertility?",
    keywords: ["unexplained", "no cause found", "reason for infertility"],
    a: "Unexplained infertility is diagnosed when standard tests (semen analysis, ovulation check, HSG) show completely normal results, yet pregnancy hasn't occurred. It accounts for 20% of cases and responds incredibly well to IVF."
  },
  {
    q: "What is secondary infertility?",
    keywords: ["secondary infertility", "second baby struggle", "already have child"],
    a: "Secondary infertility is the struggle to conceive or carry a pregnancy to term after previously giving birth naturally. It is very common and can be caused by changes in age, ovarian reserve, or health factors."
  },

  // ── COSTS, PACKAGES & FINANCING ──
  {
    q: "What is the approximate cost of IVF?",
    keywords: ["cost of ivf", "ivf cost", "treatment price", "how much is ivf"],
    a: "The cost of IVF varies depending on medications, PGT testing, or ICSI needs. At Advika, we provide complete, transparent cost breakdowns with zero hidden fees during your very first consultation."
  },
  {
    q: "Do you offer zero-interest EMI financing?",
    keywords: ["emi options", "0 percent emi", "payment plan", "installment", "monthly payment", "loan"],
    a: "Yes! We offer convenient 0% interest EMI options and flexible monthly payment plans to ensure that premium fertility treatments fit comfortably into your family budget."
  },
  {
    q: "Is IVF covered by medical insurance?",
    keywords: ["insurance coverage", "medical insurance", "mediclaim", "covered by insurance"],
    a: "Most standard health insurance plans do not cover IVF. However, some premium corporate policies do provide fertility benefits. Our billing team will help you review and maximize any eligible coverage."
  },
  {
    q: "Are there refund or package programs available?",
    keywords: ["refund program", "guarantee program", "multi cycle package"],
    a: "Yes, we offer multi-cycle packages that bundle treatments at a heavily discounted rate, giving you peace of mind and maximum cumulative success rates at a predictable, fixed budget."
  },
  {
    q: "What does an IVF package typically include?",
    keywords: ["package include", "what is included", "hidden charge"],
    a: "Our core packages include all laboratory charges, physician fees, ultrasound monitoring scans, egg retrieval, and embryo transfer. Medications and PGT testing are detailed separately so there are never any surprises."
  },

  // ── SUCCESS RATES & FACTORS ──
  {
    q: "What is Advika's IVF success rate?",
    keywords: ["success rate of advika", "advika success rate", "clinics success rate"],
    a: "Advika features an advanced success rate of up to 85% for eligible couples, driven by our highly experienced embryologists, state-of-the-art laboratory, and personalized treatment protocols."
  },
  {
    q: "How does maternal age affect IVF success?",
    keywords: ["maternal age success", "age success rate", "fertility over 40", "pregnancy after 35"],
    a: "Maternal age is a primary factor because egg quantity and chromosomal health naturally decline over time. Success rates are highest under age 35, but advanced techniques like PGT screening have revolutionized success for women over 40."
  },
  {
    q: "Can lifestyle changes improve my IVF success rate?",
    keywords: ["improve success", "lifestyle change", "increase chances", "what to eat", "diet"],
    a: "Absolutely. Maintaining a balanced BMI, eating an antioxidant-rich diet, quitting smoking and alcohol, reducing caffeine, and taking coenzyme Q10 (CoQ10) can noticeably improve egg and sperm quality."
  },
  {
    q: "Does stress reduce IVF success rates?",
    keywords: ["stress affect success", "anxiety success", "mental health"],
    a: "While stress does not directly cause IVF to fail, managing anxiety heavily improves your physical well-being. We offer integrated clinical counseling and gentle yoga support to keep you feeling calm and supported."
  },
  {
    q: "What is recurrent implantation failure (RIF)?",
    keywords: ["implantation failure", "rif", "embryo won't stick", "failed transfers"],
    a: "Recurrent Implantation Failure (RIF) occurs when high-quality embryos fail to implant after multiple transfers. We treat RIF using advanced diagnostics like ERA lining tests, immune therapy, and hysteroscopy."
  },

  // ── IUI & ALTERNATIVES ──
  {
    q: "What is IUI (Intrauterine Insemination)?",
    keywords: ["what is iui", "iui meaning", "artificial insemination"],
    a: "IUI is a gentle, low-intervention fertility treatment where washed, highly concentrated sperm is placed directly inside the uterus using a thin catheter, timed precisely with your ovulation."
  },
  {
    q: "How does IUI differ from IVF?",
    keywords: ["iui vs ivf", "difference between iui and ivf", "iui or ivf"],
    a: "IUI is simple: fertilization happens naturally inside your body. IVF is advanced: eggs are retrieved, fertilized in our laboratory, and then transferred back. IVF has significantly higher success rates but is more involved."
  },
  {
    q: "What is the success rate of IUI?",
    keywords: ["iui success rate", "success of iui", "is iui successful"],
    a: "IUI success rates range from 10% to 20% per cycle, depending on age and sperm quality. It is an excellent, budget-friendly starting point for couples with mild ovulation issues or unexplained fertility."
  },
  {
    q: "How many IUI cycles should I try before moving to IVF?",
    keywords: ["how many iui before ivf", "failed iui", "when to switch to ivf"],
    a: "Clinical guidelines generally suggest moving to IVF after 3 to 4 unsuccessful IUI cycles, as the probability of success drops significantly after the fourth attempt."
  },
  {
    q: "Is IUI painful?",
    keywords: ["iui painful", "does iui hurt", "comfort during iui"],
    a: "Not at all. Most patients describe IUI as feeling very similar to a standard pap smear. It takes only a few minutes and is performed comfortably in our clinic without any anesthesia."
  },

  // ── DIAGNOSTICS & GENERAL ──
  {
    q: "What happens during a hysteroscopy?",
    keywords: ["hysteroscopy", "camera in uterus", "check uterine lining"],
    a: "A hysteroscopy is a quick procedure where a thin, lighted telescope is guided through the cervix to inspect the inside of the uterus for polyps, fibroids, or scar tissue that might prevent implantation."
  },
  {
    q: "What is an ERA (Endometrial Receptivity Analysis) test?",
    keywords: ["era test", "endometrial receptivity", "biopsy of lining"],
    a: "An ERA test is a molecular biopsy of the uterine lining. It identifies the exact, personalized timing window when your uterus is most receptive to embryo implantation, ensuring perfect transfer timing."
  },
  {
    q: "What is assisted hatching?",
    keywords: ["assisted hatching", "laser hatching", "embryo shell thinning"],
    a: "Assisted hatching is a microscopic laboratory procedure where a safe laser creates a tiny opening in the embryo's outer shell, helping it hatch out more easily to implant into the uterus."
  },
  {
    q: "How do I book a free consultation at Advika?",
    keywords: ["book consultation", "book appointment", "how to book", "schedule call", "appointment"],
    a: "Booking is extremely simple! You can click the 'Book Appointment' button on our page, fill out the form at the bottom, or call our clinical coordinator directly at +91 98765 43210."
  },
  {
    q: "Where is Advika IVF Centre located?",
    keywords: ["location", "address", "where are you", "direction", "ambala"],
    a: "Our state-of-the-art center is located in Ambala, featuring ample parking, absolute patient privacy, and a warm, welcoming botanical design. We would love to welcome you for a visit!"
  },
  {
    q: "What are the common side effects of stimulation drugs?",
    keywords: ["side effects", "bloating", "mood swings", "headache", "stim drugs"],
    a: "Mild side effects include temporary bloating, mood swings, mild headaches, or bruising at the injection site. These are standard reactions to elevated hormones and resolve quickly after egg retrieval."
  },
  {
    q: "What is OHSS (Ovarian Hyperstimulation Syndrome)?",
    keywords: ["ohss", "hyperstimulation", "swollen ovaries"],
    a: "OHSS is a medical complication where ovaries overrespond to stimulation medications. At Advika, we prevent OHSS entirely by using 'freeze-all' cycles, customized trigger injections, and close hormone monitoring."
  },
  {
    q: "Can I exercise during IVF?",
    keywords: ["exercise during ivf", "workout", "gym", "running"],
    a: "We recommend gentle walking or light stretching. Avoid high-impact cardio, heavy lifting, or intense twisting exercises, as your ovaries will be temporarily enlarged and need protection from twisting."
  },
  {
    q: "Can I travel during my treatment?",
    keywords: ["travel during ivf", "flying", "can i travel"],
    a: "Short travel is perfectly fine. However, we advise staying close to the clinic during the 10-12 days of stimulation monitoring and egg retrieval so we can track your progress safely."
  },
  {
    q: "What is the role of acupuncture in IVF?",
    keywords: ["acupuncture", "alternative therapy", "needle therapy"],
    a: "Clinical studies show that acupuncture can noticeably reduce stress levels and increase uterine blood flow when performed near the time of your embryo transfer, boosting your overall sense of comfort."
  },
  {
    q: "What is ERA vs Alice vs Emma tests?",
    keywords: ["emma", "alice", "uterine microbiome", "endometrial test"],
    a: "These are endometrial health tests. ERA checks transfer timing; EMMA evaluates healthy bacterial levels (microbiome) in the uterus; ALICE screens for chronic endometritis-causing pathogens."
  },
  {
    q: "Can I select the gender of the baby?",
    keywords: ["gender selection", "choose gender", "boy or girl", "sex selection"],
    a: "In India, pre-conception and pre-natal sex selection is strictly illegal under the PCPNDT Act. At Advika, we strictly adhere to medical ethics and law. We perform PGT testing solely to screen for genetic health."
  },
  {
    q: "What is donor egg IVF success rate?",
    keywords: ["donor egg success", "egg donor rate"],
    a: "Donor egg IVF features our highest success rates (exceeding 85% to 90% per cycle), because the eggs are retrieved from young, thoroughly screened, healthy donors with peak fertility."
  },
  {
    q: "How are egg donors screened?",
    keywords: ["donor screening", "select donor", "egg donor check"],
    a: "Donors undergo extremely rigorous screening: full genetic karyotyping, infectious disease testing, fertility reserve checks, psychological evaluation, and family history verification."
  },
  {
    q: "Can I use my friend's sperm or egg?",
    keywords: ["known donor", "friend egg", "friend sperm"],
    a: "In India, legal guidelines require egg and sperm donation to be anonymous through registered clinics, protecting the legal parenthood and future privacy of your family."
  },
  {
    q: "What is a gestational carrier?",
    keywords: ["gestational carrier", "surrogate mother", "explain surrogacy"],
    a: "A gestational carrier (surrogate) is a woman who carries a pregnancy created using the parents' or donors' eggs and sperm. She has absolutely no biological or genetic connection to the child."
  },
  {
    q: "What is secondary infertility causes?",
    keywords: ["secondary causes", "why secondary struggle"],
    a: "It can be caused by scarring from previous C-sections, age-related decline in egg quality, changes in sperm health, or development of conditions like fibroids or thyroid disorders."
  },
  {
    q: "What is a hysteroscopy recovery time?",
    keywords: ["hysteroscopy recovery", "after hysteroscopy"],
    a: "Recovery is very rapid. Most patients experience mild spotting or light cramping for 24 hours and can comfortably return to normal daily work activities the very next day."
  },
  {
    q: "What is laparoscopy recovery time?",
    keywords: ["laparoscopy recovery", "laparoscopy hospital stay"],
    a: "Laparoscopy is minimally invasive. Most patients go home the same day and recover fully within 5 to 7 days, leaving only tiny, barely visible marks."
  },
  {
    q: "What is ideal endometrial thickness?",
    keywords: ["endometrial thickness", "lining thickness", "ideal lining mm"],
    a: "The ideal endometrial lining thickness for a successful embryo transfer is between 8 mm and 12 mm, with a classic, healthy 'triple-line' appearance on the ultrasound."
  },
  {
    q: "What causes a thin endometrial lining?",
    keywords: ["thin lining", "thin endometrium", "lining issue"],
    a: "A thin lining can be caused by low estrogen levels, poor uterine blood flow, previous uterine infections, or scar tissue (Asherman's syndrome). We successfully treat this with targeted therapies."
  },
  {
    q: "What is Asherman's syndrome?",
    keywords: ["asherman", "uterine scarring", "adhesions in uterus"],
    a: "Asherman's syndrome is the presence of scar tissue (adhesions) inside the uterine cavity, often caused by past surgeries. We easily diagnose and treat this via hysteroscopic scar release."
  },
  {
    q: "What is embryo glue?",
    keywords: ["embryo glue", "glue for transfer", "adhesion solution"],
    a: "Embryo glue is not actually a glue, but a specialized transfer medium enriched with hyaluronan, which mimics the natural fluids in the uterus to help the embryo adhere and implant."
  },
  {
    q: "Does caffeine reduce fertility?",
    keywords: ["caffeine", "coffee fertility", "tea fertility", "how much coffee"],
    a: "Moderate caffeine intake (under 200 mg per day, or about 1 standard cup of coffee) does not affect fertility or increase miscarriage risk. We recommend limiting caffeine during treatment."
  },
  {
    q: "Does obesity affect IVF results?",
    keywords: ["obesity", "bmi fertility", "weight loss success", "overweight"],
    a: "A high BMI can slightly reduce ovarian response to medications and lower embryo implantation rates. Achieving a stable, healthy weight before starting cycles can noticeably boost success."
  },
  {
    q: "What is uterine retroversion?",
    keywords: ["tilted uterus", "retroverted uterus", "tilted womb"],
    a: "A tilted (retroverted) uterus is a completely normal anatomical variation present in 20% of women. It does not affect your natural fertility or the success of an embryo transfer."
  },
  {
    q: "What is a hydrocele?",
    keywords: ["hydrocele", "fluid in scrotum"],
    a: "A hydrocele is a harmless buildup of fluid around a testicle. It does not cause infertility itself, but we evaluate it to ensure there are no underlying infections or varicoceles."
  },
  {
    q: "What is azoospermia?",
    keywords: ["azoospermia", "zero sperm", "no sperm in semen", "sperm count 0"],
    a: "Azoospermia means there is zero sperm detected in the ejaculate. It can be obstructive (blockage) or non-obstructive (production issue). We achieve high success rates here using surgical sperm retrieval (TESA/microTESE) + ICSI."
  },
  {
    q: "What is the difference between obstructive and non-obstructive azoospermia?",
    keywords: ["obstructive vs non-obstructive", "azoospermia difference"],
    a: "Obstructive means sperm is produced normally but blocked from release (easily treated). Non-obstructive means sperm production in the testes is extremely low (treated via microTESE)."
  },
  {
    q: "Do you offer psychological counseling?",
    keywords: ["counseling", "therapist", "mental support", "psychological", "emotional help"],
    a: "Yes! Emotional comfort is a pillar of care at Advika. We offer complimentary, private psychological counseling sessions to help you and your partner navigate the emotional path of fertility with peace."
  },
  {
    q: "What diagnostic tests are done before starting IVF?",
    keywords: ["diagnostic tests", "blood tests before ivf", "pre ivf tests"],
    a: "Standard diagnostic mapping includes: 1) Semen analysis for the partner, 2) AMH blood test to check egg reserve, 3) Pelvic ultrasound to map the uterus, and 4) General viral screening to ensure complete safety."
  },
  {
    q: "What should I pack for my egg retrieval day?",
    keywords: ["pack for retrieval", "retrieval day preparation"],
    a: "Dress in loose, comfortable clothing. Bring a sanitary pad, your photo ID, and ensure you have a partner or companion to drive you home safely, as you will feel sleepy after the light anesthesia."
  },
  {
    q: "How soon after embryo transfer can I return to work?",
    keywords: ["return to work", "bed rest after transfer", "when to work"],
    a: "You can comfortably return to work the very next day! Studies show that strict bed rest does not improve success. Just avoid heavy physical lifting or exhausting shifts."
  },
  {
    q: "Can I have sexual intercourse during stimulation?",
    keywords: ["intercourse during stims", "sex during stimulation", "intimacy"],
    a: "We advise avoiding intercourse during the latter half of ovarian stimulation, as your ovaries will be enlarged and intercourse could cause discomfort or a rare condition called ovarian torsion."
  },
  {
    q: "What is the success rate of a frozen embryo transfer compared to fresh?",
    keywords: ["frozen vs fresh rate", "success rate frozen vs fresh"],
    a: "Frozen embryo transfers (FET) now yield slightly higher success rates (up to 10% higher in some age groups) because the uterine lining has time to recover from stimulation hormones, creating a more natural environment."
  },
  {
    q: "What are the key factors for a healthy pregnancy?",
    keywords: ["healthy pregnancy", "safe pregnancy", "pregnancy care"],
    a: "The pillars are an antioxidant-rich diet, prenatal vitamins (folic acid), gentle activity, avoiding chemical exposure, regular clinical checkups, and maintaining emotional peace."
  },
  {
    q: "How does thyroid health impact fertility?",
    keywords: ["thyroid fertility", "hypothyroidism", "tsh level"],
    a: "Thyroid hormone imbalances (especially elevated TSH) can interfere with regular ovulation and increase miscarriage risks. We optimize TSH levels under 2.5 mIU/L before starting any treatment cycle."
  },
  {
    q: "What is a mock embryo transfer?",
    keywords: ["mock transfer", "trial transfer"],
    a: "A mock transfer is a quick trial run performed before the actual transfer. It maps the unique pathway of your cervix, ensuring the real transfer is perfectly smooth, precise, and completely painless."
  },
  {
    q: "Is there an age limit for undergoing IVF in India?",
    keywords: ["age limit in india", "art law age", "how old can do ivf"],
    a: "Under the Indian ART (Assisted Reproductive Technology) Act, the legal age limit for undergoing fertility treatment is up to 50 years for women and up to 55 years for men."
  },
  {
    q: "Can low progesterone cause IVF transfer to fail?",
    keywords: ["progesterone level", "low progesterone", "progesterone support"],
    a: "Yes. Progesterone is vital to support the uterine lining. At Advika, we provide comprehensive, customized progesterone support (gel, capsules, or gentle injections) and monitor your levels closely."
  },
  {
    q: "What causes ovarian cysts during IVF?",
    keywords: ["ovarian cyst", "cyst in ovary", "functional cyst"],
    a: "Ovarian cysts are typically functional fluid-filled sacs that occur naturally. If a cyst is active before stimulation starts, we may recommend a short birth control cycle to safely dissolve it."
  },
  {
    q: "What is endometrial scratch?",
    keywords: ["endometrial scratch", "scratching lining", "lining scratch"],
    a: "An endometrial scratch is a simple, outpatient procedure where the lining of the uterus is gently scratched before an IVF cycle. It releases growth factors that can help the embryo stick."
  },
  {
    q: "Can low vitamin D cause fertility issues?",
    keywords: ["vitamin d", "sunlight fertility", "vitamin d level"],
    a: "Yes. Studies show that optimal Vitamin D levels are associated with better egg quality and higher clinical implantation rates. We routinely test and supplement Vitamin D for all patients."
  },
  {
    q: "How long does a consultation take at Advika?",
    keywords: ["consultation time", "duration of consultation", "first visit duration"],
    a: "Your first, completely free consultation takes about 45 to 60 minutes. This gives our reproductive specialist ample time to listen to your history, review prior reports, and draft a caring, custom roadmap."
  }
]

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Hello, I am your Advika Care Assistant. 🌸 I am here to share general information about fertility science, IVF, and egg freezing in a private, supportive space. How can I comfort or guide you today?',
      isWelcome: true
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const chatEndRef = useRef(null)

  // Scroll to bottom whenever messages or typing state change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const handleSendMessage = (textToSend) => {
    if (!textToSend.trim()) return

    const userMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: textToSend
    }

    setMessages((prev) => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)

    // AI local algorithm to scan 100+ high-quality clinical Q&As
    setTimeout(() => {
      const query = textToSend.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g, "").trim()
      let bestMatch = null
      let highestScore = 0

      // Match logic: Scoring system to find the best local clinical response
      for (const faq of LOCAL_FAQ) {
        let score = 0
        
        // Exact or major phrase match in keywords
        for (const keyword of faq.keywords) {
          if (query.includes(keyword)) {
            score += 5
          }
        }

        // Substring matching in the actual question text
        const normalizedQuestion = faq.q.toLowerCase()
        if (query.includes(normalizedQuestion) || normalizedQuestion.includes(query)) {
          score += 8
        }

        if (score > highestScore) {
          highestScore = score
          bestMatch = faq
        }
      }

      let responseText = ''
      let showBookingCTA = false

      if (highestScore > 0 && bestMatch) {
        responseText = bestMatch.a
        showBookingCTA = true
      } else {
        // Empathetic referral booking driver for highly unique/complex custom clinical queries
        responseText = 'That is an extremely important and personal question. While I can share general reproductive science, clinical matters are best answered based on your unique body. Let me connect you for a private, free virtual call with our senior embryologist this week?'
        showBookingCTA = true
      }

      setIsTyping(false)
      setMessages((prev) => [
        ...prev,
        {
          id: `reply-${Date.now()}`,
          sender: 'ai',
          text: responseText,
          showBooking: showBookingCTA
        }
      ])
    }, 1100)
  }

  const quickPrompts = [
    { label: '📈 IVF Success Rates', query: 'What is your IVF success rate?' },
    { label: '💉 Does IVF hurt?', query: 'Are IVF injections painful?' },
    { label: '🧬 PGT Genetic Testing', query: 'Tell me about PGT genetic screening.' },
    { label: '❄️ Egg Freezing cycle', query: 'How does egg freezing work?' }
  ]

  return (
    <>
      {/* Floating Action Button (FAB) */}
      <motion.button
        id="ai-assistant-fab"
        className="ai-fab"
        onClick={() => setIsOpen(!isOpen)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open AI Assistant"
      >
        <span className="pulse-glow" />
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      </motion.button>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="ai-chat-window"
            initial={{ opacity: 0, y: 35, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Header */}
            <div className="chat-header">
              <div className="header-info">
                <span className="doctor-avatar">👩‍⚕️</span>
                <div>
                  <h4>Advika Assistant</h4>
                  <div className="status-indicator">
                    <span className="status-dot" />
                    <span>Specialist Companion</span>
                  </div>
                </div>
              </div>
              <button className="chat-close" onClick={() => setIsOpen(false)} aria-label="Close Chat">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {/* Messages Body with Strict Scroll Containment */}
            <div 
              className="chat-body"
              onWheel={(e) => {
                // Prevent parent window from scrolling when inside the chat window
                const target = e.currentTarget;
                const isScrollingDown = e.deltaY > 0;
                const isScrollingUp = e.deltaY < 0;

                if (isScrollingDown && target.scrollHeight - target.scrollTop <= target.clientHeight + 2) {
                  e.preventDefault();
                } else if (isScrollingUp && target.scrollTop <= 0) {
                  e.preventDefault();
                }
              }}
            >
              {messages.map((m) => (
                <div key={m.id} className={`message-bubble-wrapper ${m.sender}`}>
                  <div className="message-bubble">
                    <p>{m.text}</p>
                    
                    {/* Inline Clinical Booking CTA */}
                    {m.showBooking && (
                      <div className="inline-booking-card">
                        <span>Ready to speak with our clinical lead?</span>
                        <a href="#contact" onClick={() => setIsOpen(false)} className="chat-booking-btn">
                          Schedule Free Call
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="message-bubble-wrapper ai">
                  <div className="message-bubble typing-bubble">
                    <div className="typing-dots">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Replies Panel */}
            {messages.length === 1 && (
              <div className="quick-replies">
                <span className="quick-replies-label">Suggested Questions:</span>
                <div className="quick-replies-grid">
                  {quickPrompts.map((qp, idx) => (
                    <button
                      key={idx}
                      className="quick-reply-btn"
                      onClick={() => handleSendMessage(qp.query)}
                    >
                      {qp.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Box footer */}
            <form 
              className="chat-footer-form" 
              onSubmit={(e) => {
                e.preventDefault()
                handleSendMessage(inputText)
              }}
            >
              <input
                type="text"
                placeholder="Ask me a question..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                maxLength={180}
              />
              <button type="submit" disabled={!inputText.trim()} aria-label="Send Message">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        /* Floating Button Styles */
        .ai-fab {
          position: fixed;
          bottom: 96px; /* Sits perfectly stacked above the round WhatsApp FAB */
          right: 28px;
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--k700) 0%, var(--k900) 100%);
          color: white;
          border: none;
          box-shadow: 0 6px 20px rgba(139, 17, 27, 0.35);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 990;
          outline: none;
        }

        .pulse-glow {
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          border: 2px solid var(--k700);
          opacity: 0.6;
          animation: fab-pulse 2.2s cubic-bezier(0.24, 0, 0.38, 1) infinite;
          pointer-events: none;
        }

        @keyframes fab-pulse {
          0% { transform: scale(1); opacity: 0.6; }
          70% { transform: scale(1.3); opacity: 0; }
          100% { transform: scale(1.3); opacity: 0; }
        }

        /* Chat Window Glassmorphic Container */
        .ai-chat-window {
          position: fixed;
          bottom: 164px;
          right: 28px;
          width: 360px;
          height: 480px;
          background: rgba(255, 255, 255, 0.88);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(230, 163, 168, 0.3);
          border-radius: 20px;
          box-shadow: 0 16px 44px rgba(139, 17, 27, 0.12);
          display: flex;
          flex-direction: column;
          z-index: 995;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
        }

        /* Header block */
        .chat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          background: linear-gradient(to right, rgba(253, 245, 246, 0.95), rgba(255, 255, 255, 0.95));
          border-bottom: 1px solid rgba(230, 163, 168, 0.2);
        }

        .header-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .doctor-avatar {
          font-size: 1.6rem;
        }

        .header-info h4 {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--k900);
          margin: 0;
        }

        .status-indicator {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 1px;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          background: #25D366;
          border-radius: 50%;
        }

        .status-indicator span:last-child {
          font-size: 0.68rem;
          color: #666;
          font-weight: 500;
        }

        .chat-close {
          background: none;
          border: none;
          color: #888;
          cursor: pointer;
          padding: 4px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s ease, color 0.2s ease;
        }

        .chat-close:hover {
          background: rgba(139, 17, 27, 0.05);
          color: var(--k900);
        }

        /* Message flow area with strict boundary containment */
        .chat-body {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 14px;
          overscroll-behavior: contain; /* Prevents scroll chaining/leaks to background page! */
          -webkit-overflow-scrolling: touch;
        }

        .message-bubble-wrapper {
          display: flex;
          width: 100%;
        }

        .message-bubble-wrapper.ai {
          justify-content: flex-start;
        }

        .message-bubble-wrapper.user {
          justify-content: flex-end;
        }

        .message-bubble {
          max-width: 82%;
          padding: 11px 15px;
          border-radius: 16px;
          font-size: 0.8rem;
          line-height: 1.5;
        }

        .ai .message-bubble {
          background: #fff;
          color: #333;
          border: 1px solid rgba(230, 163, 168, 0.15);
          border-top-left-radius: 4px;
          box-shadow: 0 4px 12px rgba(139, 17, 27, 0.015);
        }

        .user .message-bubble {
          background: var(--k700);
          color: white;
          border-top-right-radius: 4px;
          box-shadow: 0 4px 12px rgba(139, 17, 27, 0.15);
        }

        .message-bubble p {
          margin: 0;
        }

        /* Inline clinical booking */
        .inline-booking-card {
          margin-top: 10px;
          padding: 10px 12px;
          background: rgba(213, 143, 75, 0.06);
          border: 1px solid rgba(213, 143, 75, 0.18);
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .inline-booking-card span {
          font-size: 0.72rem;
          color: #775533;
          font-weight: 500;
        }

        .chat-booking-btn {
          background: var(--k700);
          color: #fff;
          text-decoration: none;
          font-size: 0.72rem;
          font-weight: 700;
          text-align: center;
          padding: 6px 12px;
          border-radius: 8px;
          transition: background 0.2s ease;
        }

        .chat-booking-btn:hover {
          background: var(--k900);
        }

        /* Typing Dots Animation */
        .typing-bubble {
          padding: 12px 18px !important;
        }

        .typing-dots {
          display: flex;
          gap: 4px;
          align-items: center;
        }

        .typing-dots span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #B63A45;
          opacity: 0.4;
          animation: dot-pulse 1.4s infinite ease-in-out;
        }

        .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
        .typing-dots span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes dot-pulse {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-4px); opacity: 1; }
        }

        /* Quick Replies Grid */
        .quick-replies {
          padding: 0 20px 14px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .quick-replies-label {
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #888;
        }

        .quick-replies-grid {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .quick-reply-btn {
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(230, 163, 168, 0.25);
          border-radius: 10px;
          padding: 8px 12px;
          font-size: 0.75rem;
          color: #444;
          font-weight: 600;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .quick-reply-btn:hover {
          background: #fff;
          border-color: var(--k700);
          color: var(--k900);
          transform: translateX(2px);
        }

        /* Footer Input Form */
        .chat-footer-form {
          display: flex;
          padding: 12px 16px;
          background: #fff;
          border-top: 1px solid rgba(230, 163, 168, 0.18);
          align-items: center;
          gap: 10px;
        }

        .chat-footer-form input {
          flex: 1;
          border: 1px solid rgba(230, 163, 168, 0.25);
          outline: none;
          background: #FAF8F8;
          padding: 9px 14px;
          border-radius: 20px;
          font-size: 0.8rem;
          color: #333;
          transition: border-color 0.2s ease, background 0.2s ease;
        }

        .chat-footer-form input:focus {
          border-color: var(--k700);
          background: #fff;
        }

        .chat-footer-form button {
          background: none;
          border: none;
          outline: none;
          color: var(--k700);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
          transition: color 0.2s ease, transform 0.2s ease;
        }

        .chat-footer-form button:disabled {
          color: #ccc;
          cursor: default;
        }

        .chat-footer-form button:not(:disabled):hover {
          color: var(--k900);
          transform: scale(1.05);
        }

        /* Mobile adaptation */
        @media (max-width: 480px) {
          .ai-chat-window {
            bottom: 0;
            right: 0;
            width: 100vw;
            height: 100vh;
            border-radius: 0;
            border: none;
          }
          .ai-fab {
            bottom: 84px;
            right: 20px;
          }
        }
      `}</style>
    </>
  )
}
