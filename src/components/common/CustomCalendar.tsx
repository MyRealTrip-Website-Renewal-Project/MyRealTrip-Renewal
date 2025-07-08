import React, { useState } from 'react';
import styles from './CustomCalendar.module.css';

interface CustomCalendarProps {
  visible: boolean;
  onClose: () => void;
  checkIn: Date | null;
  checkOut: Date | null;
  onSelect: (checkIn: Date, checkOut: Date) => void;
  minDate?: Date;
  className?: string;
}

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

function addMonths(date: Date, months: number) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function isInRange(date: Date, start: Date | null, end: Date | null) {
  if (!start || !end) return false;
  return date > start && date < end;
}

function getMonthMatrix(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const matrix: (Date | null)[][] = [];
  let week: (Date | null)[] = [];
  let day = 1 - firstDay.getDay();
  while (day <= lastDay.getDate()) {
    for (let i = 0; i < 7; i++) {
      if (day < 1 || day > lastDay.getDate()) {
        week.push(null);
      } else {
        week.push(new Date(year, month, day));
      }
      day++;
    }
    matrix.push(week);
    week = [];
  }
  return matrix;
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({ visible, onClose, checkIn, checkOut, onSelect, minDate, className }) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selecting, setSelecting] = useState<'checkIn' | 'checkOut'>('checkIn');
  const [tempCheckIn, setTempCheckIn] = useState<Date | null>(checkIn);
  const [tempCheckOut, setTempCheckOut] = useState<Date | null>(checkOut);

  if (!visible) return null;

  const handleDayClick = (date: Date) => {
    if (selecting === 'checkIn' || !tempCheckIn || (tempCheckIn && tempCheckOut)) {
      setTempCheckIn(date);
      setTempCheckOut(null);
      setSelecting('checkOut');
    } else if (selecting === 'checkOut' && tempCheckIn && date > tempCheckIn) {
      setTempCheckOut(date);
      onSelect(tempCheckIn, date);
      setSelecting('checkIn');
      onClose();
    } else {
      setTempCheckIn(date);
      setTempCheckOut(null);
      setSelecting('checkOut');
    }
  };

  const renderMonth = (base: Date) => {
    const year = base.getFullYear();
    const month = base.getMonth();
    const matrix = getMonthMatrix(year, month);
    return (
      <div className={styles.monthWrap}>
        <div className={styles.monthHeader}>{year}년 {month + 1}월</div>
        <div className={styles.weekdays}>
          {WEEKDAYS.map(d => <div key={d} className={styles.weekday}>{d}</div>)}
        </div>
        <div className={styles.days}>
          {matrix.map((week, i) => (
            <div className={styles.week} key={i}>
              {week.map((date, j) => {
                if (!date) return <div key={j} className={styles.emptyDay} />;
                const isToday = isSameDay(date, today);
                const isSelected = (tempCheckIn && isSameDay(date, tempCheckIn)) || (tempCheckOut && isSameDay(date, tempCheckOut));
                const inRange = isInRange(date, tempCheckIn, tempCheckOut);
                const isDisabled = minDate && date < minDate;
                return (
                  <button
                    key={j}
                    className={[
                      styles.day,
                      isToday ? styles.today : '',
                      isSelected ? styles.selected : '',
                      inRange ? styles.inRange : '',
                      isDisabled ? styles.disabled : ''
                    ].join(' ')}
                    disabled={isDisabled}
                    onClick={() => handleDayClick(date)}
                    type="button"
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={[styles.calendarModal, className].join(' ')}>
      <div className={styles.calendarHeader}>
        <button className={styles.navBtn} onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}>&lt;</button>
        <span className={styles.headerTitle}>{currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월</span>
        <button className={styles.navBtn} onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>&gt;</button>
        <button className={styles.closeBtn} onClick={onClose}>닫기</button>
      </div>
      <div className={styles.monthsWrap}>
        {renderMonth(currentMonth)}
        {renderMonth(addMonths(currentMonth, 1))}
      </div>
      <div className={styles.summary}>
        <span>체크인: {tempCheckIn ? tempCheckIn.toLocaleDateString() : '-'}</span>
        <span>체크아웃: {tempCheckOut ? tempCheckOut.toLocaleDateString() : '-'}</span>
        {tempCheckIn && tempCheckOut && <span>{Math.round((+tempCheckOut - +tempCheckIn) / (1000 * 60 * 60 * 24))}박</span>}
      </div>
    </div>
  );
};

export default CustomCalendar; 