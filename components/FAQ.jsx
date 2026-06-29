"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

export default function FAQ({ items = [] }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="faq-list">
      {items.map((item, i) => (
        <div
          key={i}
          className={`faq-item ${openIndex === i ? "open" : ""}`}
        >
          <button
            className="faq-question"
            onClick={() => toggle(i)}
            aria-expanded={openIndex === i}
            id={`faq-q-${i}`}
          >
            <span>{item.q}</span>
            <span className="faq-icon">
              <Plus size={16} />
            </span>
          </button>
          <div className="faq-answer">
            <div className="faq-answer-inner">{item.a}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
