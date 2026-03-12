"use client";

import styles from "./Pickers.module.css";

type DatePickerProps = {
  value: string; // "YYYY-MM-DD"
  onChange: (date: string) => void;
};

export function DatePicker({ value, onChange }: DatePickerProps) {
  const getOptions = () => {
    const makeDate = (addDays: number) => {
      const d = new Date();
      d.setDate(d.getDate() + addDays);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      return `${yyyy}-${mm}-${dd}`;
    };
    return [
      { label: "Hoy", val: makeDate(0) },
      { label: "Mañana", val: makeDate(1) },
      { label: "+2 Días", val: makeDate(2) },
      { label: "+1 Sem", val: makeDate(7) }
    ];
  };
  
  const options = getOptions();

  return (
    <div className={styles.flatContainer}>
      <div className={styles.flatHeader}>
        <span className={styles.iconWrapperSmall}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        </span>
        <input 
          type="date"
          className={styles.triggerInput}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      
      <div className={styles.flatOptionsList}>
        {options.map(o => (
          <button 
            key={o.label} 
            type="button"
            className={`${styles.timeBtnFlat} ${value === o.val ? styles.selectedFlat : ""}`}
            onClick={(e) => { 
              e.preventDefault(); 
              e.stopPropagation();
              onChange(o.val); 
            }}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}
