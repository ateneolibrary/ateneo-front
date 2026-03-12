"use client";
import { useState, useRef, useEffect } from "react";
import styles from "./Pickers.module.css";

const DURATIONS = [
  { label: "30M", value: 30 },
  { label: "1H", value: 60 },
  { label: "1H 30M", value: 90 },
  { label: "2H", value: 120 },
  { label: "2H 30M", value: 150 },
  { label: "3H", value: 180 },
];

export function DurationPicker({ value, onChange }: { value: number, onChange: (minutes: number) => void }) {
  // Compute smart options based on current value.
  // Rule: if 30min, all forward. If >= 60min, 1 step back, 3 steps forward.
  const getOptions = () => {
    let startIdx = DURATIONS.findIndex(d => d.value === value);
    if (startIdx === -1) startIdx = 1; // default to 60m if unknown

    let options = [];
    if (value === 30) {
      // all forward
      options = DURATIONS.slice(0, 4);
    } else {
      // 1 back, 3 forward
      const start = Math.max(0, startIdx - 1);
      options = DURATIONS.slice(start, start + 4);
    }

    // fallback if we hit the end of the array
    if (options.length < 4) {
      options = DURATIONS.slice(-4);
    }

    return options;
  };

  const options = getOptions();
  const displayLabel = DURATIONS.find(d => d.value === value)?.label || `${value}M`;

  return (
    <div className={styles.flatContainer}>
      <div className={styles.flatHeader}>
        <span className={styles.iconWrapperSmall}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="2" x2="12" y2="6"></line>
            <line x1="8" y1="2" x2="16" y2="2"></line>
            <circle cx="12" cy="14" r="8"></circle>
            <line x1="12" y1="14" x2="14.5" y2="10.5"></line>
          </svg>
        </span>
        <input
          type="number"
          className={styles.triggerInput}
          value={value}
          onChange={(e) => onChange(Number(e.target.value) || 0)}
          style={{ flex: "none", width: "3.5ch" }}
        />
        <span style={{ fontSize: "1.3rem", fontWeight: 300, color: "#1b202a" }}>min</span>
      </div>
      
      <div className={styles.flatOptionsList}>
        {options.map(d => (
          <button 
            key={d.value} 
            type="button"
            className={`${styles.durationBtnFlat} ${value === d.value ? styles.selectedFlatDur : ""}`}
            onClick={(e) => { 
              e.preventDefault(); 
              e.stopPropagation();
              onChange(d.value); 
            }}
          >
            {d.label}
          </button>
        ))}
      </div>
    </div>
  );
}
