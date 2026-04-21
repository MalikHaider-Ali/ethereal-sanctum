"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "./animations";

const treatments = [
  {
    label: "Precision",
    title: "Face",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVv49mV4yo2yWHVLkWyyh2qjJZMeBbVlLNw9_GhMwgXLurv4t8jgCmAPynpH96jZXqXQYo4Ly8au_MIPhT3r4ynkmkzrd5Vk2g4eADPAzNtnGexpKtAj8SkDKf2r7k0r1mfXkSyDXX8QdGLoX4f4Y9LMlUR4HSp1bJUhmkVlP66ds9Bhom7rS17INuoVNxgeSgEFAtQs0mvia5Q6zEUzjjeicVHVLdQdeijhr6-SwYKu1mbogvCAvN1LFw5_moJ7fNHoQgfjzUag",
    alt: "Luxury facial treatment",
  },
  {
    label: "Sculpting",
    title: "Body",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDdTGBCwPfoCudAFc4igK8dOnXJvkiv9qsM-eIihMhP1gdnCrcR1kjAXg7TMYbmgKwVKf5LhfXQPHKxB6VibKZeYYC86j9ZtzrdRuImd8cyJ57fWH1HZ-r5RRCo8UKUiteHe0yqrweuTtgpF-8uZeQEAfDd3IFZbpija04p4NY0qqLJdNe8dfD7mzuxO9y0UUwaKzeusMU4R3V4aPgi83fRChUIdpCdAuyE93YEB5_GqyyXB1UBrCP9ZPniM_7fcipexRfIPFe1tw",
    alt: "Serene spa interior",
  },
  {
    label: "Vitality",
    title: "Skin Wellness",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKcJezgi_IV6ilk2S-4pEh39xMUG0_Fc_dO04zdS272-skcWftbKE0mWmQ3AzlB1JtBRYSGnSjtQeFxmHQNk9D376BAKhZulLEtzswbHOFxZggH8O0Kc54zycvrYcWIFD0AyKerB2af1IgCChThB2GY7_rHnjUIicb8fXUjV_d9gNOqW3r5C0XoC_s6HJ18wXUjVLW6dKNex03n-bau75rRvmebd_iPX_LVWAQXsdJ7MJD5_xlfl-R_OQfZFcC7yLRVbXUZTtVjA",
    alt: "Water droplets macro",
  },
  {
    label: "Advanced",
    title: "Injectables",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFLOYS9kOSzbPE0hrBdi2jMwX8teObgXMr2fP9cNj5DOzPCic52csFoANndgCzealhEU7u2c21MlMpH21XnNTTxY_TbgpaYydrMHHDNKJtpX8JhELEfBT5ThBtfZL1FiSnBtpXx5A8QLBj3alQHbjb4CbXkSzvnjwt6O9CaTB4-zFJjzc4kErr-tUewB4ml5e_tmwb5XmLOp-xcXIbtwyZqRm4m3gvQsDhaucNP0qqldePvjFhvi4lKhvbjf2WA63E3FUh0l2RUw",
    alt: "Minimalist skincare",
  },
  {
    label: "Aura",
    title: "Holistic Rituals",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDdlrM_AtLj3TEnSr1yQAGmXxaPmbyVcH40tFVDVo0qnIIutjbYOhUgzIqMtmQCg2qiq595HUS-kzf7K-DPrO-Zo6dDGoIgIRNkewpfkUH4m9kNFB_OORZuVdGiliHgcJ7vP0-AEAWJ2IdVqaYbEFyxPVRw_Kx15giEkPsS7aZxcPS_C8Tw0NLiN9F3fbOmbo3mQ0SZKR-g6Py-3I_KRaJqP4UqI78cTZbo02MY1u5mNKfeYmNbB9qy7ImVHvMrbJqKLLJ8pYhVBg",
    alt: "Massage stones",
  },
];

export default function TreatmentShowcase() {
  return (
    <section className="py-32 overflow-hidden bg-surface relative">
      {/* Header */}
      <motion.div
        className="px-12 mb-16 flex justify-between items-end"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <h2 className="font-headline text-6xl text-primary">The Collective</h2>
        <div className="flex gap-4">
          <button className="p-4 rounded-full border border-outline-variant/30 hover:border-primary transition-colors">
            <span className="material-symbols-outlined text-primary">arrow_back</span>
          </button>
          <button className="p-4 rounded-full border border-outline-variant/30 hover:border-primary transition-colors">
            <span className="material-symbols-outlined text-primary">arrow_forward</span>
          </button>
        </div>
      </motion.div>

      {/* Cards — stagger from bottom */}
      <div className="flex gap-8 px-12 overflow-x-auto no-scrollbar pb-12">
        {treatments.map((t, i) => (
          <motion.div
            key={t.title}
            className="min-w-[400px] aspect-[4/5] bg-surface-container-high rounded-lg overflow-hidden group cursor-pointer relative flex-shrink-0"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.7,
              delay: i * 0.1,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
          >
            <Image
              src={t.src}
              alt={t.alt}
              fill
              className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
              sizes="400px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-10 left-10 space-y-2">
              <motion.span
                className="font-label text-[10px] tracking-widest text-secondary uppercase block"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                {t.label}
              </motion.span>
              <h3 className="font-headline text-3xl text-primary">{t.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}