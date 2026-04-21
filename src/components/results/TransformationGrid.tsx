"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FilterBar from "./FilterBar";
import TransformationCard from "./TransformationCard";

const transformations = [
  {
    title: "Radiance Protocol IV",
    timeline: "4 Months Intensive Care",
    category: "Dermal Renewal",
    beforeSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCzsmISkq08SwyS2Kp1GnOMeh1gDh1im7J30nPnpe11Fqv23z4o2h8dWuBRo12HMzDCFkieUkazZa0RO3BnR5_Uqf2-yP95w55mZYDmgYSi88ZApiyLBlpQJyhB3dTGF442lmwmGYjEes-88j0c3HV1xVx1YwNWe5_yAikJo9E-ZtuROjRAevlRUDmIJaeyLu980GGRoZaP52fx1JByOxqf-bj2ADgcwjIsxuWWUZRosKnQKnGSTV3aTJO3vGtwd9JD9yZh74sbSg",
    afterSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD2OIw88zcL3R7_XW1BVuMRwA5Tj60Pp6wNZ03TNABORvpNAh5KR7nftVbpkNiFCRqnhOED0auvzSJuzSDuihPEKbht6at_il1uxwrbn0La3T7FF1trLsGYiTLxW6ReWwvyyHT5wxIadFsQU90mhQH9tNG-7t9tmfWvW_Aw5-uHj-C11xbILm-k3z513wlGnRLJmgjJbRdpED6tnij4V4iRBZl-EafGfrriyRkp0DgrzVmEFy3a7A6_IgTU2zb8FqHev1P-VCuXeg",
    beforeAlt: "Before dermal rejuvenation",
    afterAlt: "After dermal rejuvenation",
    offset: false,
  },
  {
    title: "Architectural Contouring",
    timeline: "12 Weeks Progressive",
    category: "Facial Sculpting",
    beforeSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAm6FQETIq4EVtFx89c3DFXu2Hc_BCUSsFMVXwgn1wTpB32Z7kMzK6UXuPmVFQTekFzvgu8i9oljhsu70Yn8pSf3uB_3yaUbYHAp22Wp_IxCpVXUMRRVohWh_9rBsjjZPg_QRNTBybnczfP5OV5z2KuyniZHZr0dSxUWFCcEzJXdUvI9tKaw9t2dAGaYAj1IKMyzk9_8opfNxoLv_8fJeg-4ARhJCDGh8s3LWXSnD2HfqMRqVrwckCAce3flwdiCYwSSuR9WLPhIQ",
    afterSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDk6dBKkShT5IkYtaMU_W1aA_m19lIg6O8AwSUCpg0eQ8jp1XDOTQmneLr6aQsxMug_rXq-7_64Ndwl6y6Eqcw0lWks2F6fD_wuP_h6ARVy3QWEWxCPzqdB2w9IyPXj3gLSdVgmtRpTWqHN_p4rtxIs9mnHtJUPdbudzFFQCtrht7-E8WLPG14GM44M6grt54B0tOZsmBkjYMHAqSkBRHXrO-ypIWo_kNyB69gF9Z3Hkx4CUmFY0wJF7ywS0oFIf5ZnL4Jq5l7Feg",
    beforeAlt: "Before facial sculpting",
    afterAlt: "After facial sculpting",
    offset: true,
  },
  {
    title: "Velvet Resurfacing",
    timeline: "Single Session + 14 Days Recovery",
    category: "Contour Mastery",
    beforeSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBs1Q1WcodTph3qUgug0wVYo789mKbv7ig1RPgNQvgh47jQrJ1mxN7arJYndcF6qiMMHbZXNf1gMdn-SdtL_oB51Ec0eMrY7b6s3br7sGXeWQbLEquEzy9OimRxtfgO0JjRMsIE5mlSYv2o2xSGbHLMCuHLwP7a4M-qGW3NdGmNfME3VZcw3uM5klkTFcqe16Fyg2LTlO9hnAbUET5pqCwvpZDu-SiUO4KYVUgOJsyZ-v3T32ubLty9rpMOmjlLVahsFfB85X5PBA",
    afterSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCfVpogTVSGVSL7bhm5pYvoo81PLnptHlDaxzNAMIc486tklxYwWO8qk2IU7MXTq5sAXxMUHckz0MbV8wRxmvTsuEgbidYuw9iKiE1XKZNHkWo5t0jKkAXpm1pG4ZJATjiPLewPCW9rtYKx3T8IJcpUGJ6nNiC765KzvwUPEXPV8GZGJI1dE0g_PxMGvPM-3V1MmLPz8Gg-PTdOf2p0u30QaJEM1IDBwSQOXrch1MbbkJC-9ePo7te_r_2yO80YKKGgALhIjClOeA",
    beforeAlt: "Before velvet resurfacing",
    afterAlt: "After velvet resurfacing",
    offset: false,
  },
  {
    title: "Illumination Therapy",
    timeline: "Immediate Results",
    category: "Bio-Luminescence",
    beforeSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCrExKbtb5tnRcNhpRqWpeK1BIodh6V1zB_-k1kXXy0YEyW8JM7HjGQ_KoAPlOAOx-nvv4lBYz6iMFVM5RI_axc0SI__THZ5CLi596RQjfh6YzVku1eqHLvRe-UC7057zRBMJnhqYNV6R-0XYOrl9nssM2fe9wdm7t4dd6aQ3GOpcwYXb3ibiZpSnXaVV8vHtFfGM-9EEjXmYnecNaBfRfRQW4uuTYV6xlGILCHOjfL6EAbu3Hwb8K-xuHcfgOHHI09SMGV4D0Q3A",
    afterSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBZJqmkPRZvQVp4u6oiD3F18eHXxOcKsyql6yqoCAqT8cYjcIVxzw2xCtia4r3voTuufU9Gu1pzcKDZYkILZlWs_HUKpBQy3vqO7BoEbP5oY9j_QHVuJCpKO-uXjl5ywGRN2sP6yp9PTTlnsNN-19S1ufl3ZPPoa6Q7K4xFpxZRsyfjiDoVpNR7LQNEVtAbLf1jJ7w-pcp7g2uqiJju9-oGigxABGVRxNHzJTmQKUSx1-BpQw60YYi6KRI4ckb5ODZtOCGhNyzx_Q",
    beforeAlt: "Before illumination therapy",
    afterAlt: "After illumination therapy",
    offset: true,
  },
];

export default function TransformationGrid() {
  const [activeFilter, setActiveFilter] = useState("All Outcomes");

  const filtered =
    activeFilter === "All Outcomes"
      ? transformations
      : transformations.filter((t) => t.category === activeFilter);

  return (
    <>
      <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
        >
          {filtered.map((item, i) => (
            <TransformationCard key={item.title} item={item} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>
    </>
  );
}