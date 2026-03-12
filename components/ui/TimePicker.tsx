"use client";
import { useState, useRef, useEffect } from "react";
import styles from "./Pickers.module.css";

const TIMES = ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"];

export function TimePicker({ value, onChange }: { value: string, onChange: (time: string) => void }) {
  // Generate 4 surrounding times, based on `value` (which is HH:MM)
  const getSurroundingTimes = (baseTime: string) => {
    const [hStr, mStr] = baseTime.split(":");
    let h = parseInt(hStr, 10);
    let m = parseInt(mStr, 10);
    
    // Nearest 30 min rounding
    if (m < 15) m = 0;
    else if (m < 45) m = 30;
    else { m = 0; h = (h + 1) % 24; }

    const makeTimeStr = (hour: number, min: number) => {
      let finalH = hour;
      if (finalH < 0) finalH += 24;
      finalH = finalH % 24;
      return `${String(finalH).padStart(2, '0')}:${String(min).padStart(2, '0')}`;
    };

    return [
      makeTimeStr(h, m - 30 < 0 ? 30 : m - 30),
      makeTimeStr(h, m),
      makeTimeStr(h, m + 30 >= 60 ? m - 30 : m + 30), // Fix math properly
      makeTimeStr(h + 1, m)
    ];
  };

  // Safe time math
  const getSurroundingTimesSafe = (baseTime: string) => {
    const [hStr, mStr] = baseTime.split(":");
    const baseDate = new Date();
    baseDate.setHours(parseInt(hStr, 10), parseInt(mStr, 10), 0);
    
    // round to nearest 30 mins
    const m = baseDate.getMinutes();
    baseDate.setMinutes(m < 15 ? 0 : (m < 45 ? 30 : 60));

    const times = [];
    for (let i = -1; i <= 2; i++) {
       const d = new Date(baseDate.getTime() + i * 30 * 60000);
       times.push(`${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`);
    }
    return times;
  };

  const options = getSurroundingTimesSafe(value || "19:00");

  return (
    <div className={styles.flatContainer}>
      <div className={styles.flatHeader}>
        <span className={styles.iconWrapperSmall}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </span>
        <input 
          type="time"
          className={styles.triggerInput}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      
      <div className={styles.flatOptionsList}>
        {options.map(t => (
          <button 
            key={t} 
            type="button"
            className={`${styles.timeBtnFlat} ${value === t ? styles.selectedFlat : ""}`}
            onClick={(e) => { 
              e.preventDefault(); 
              e.stopPropagation();
              onChange(t); 
            }}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}
