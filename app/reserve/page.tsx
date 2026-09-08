'use client'

import { useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, Check, ChevronDown, ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react'

type Step = 1 | 2 | 3 | 4
type CalendarView = 'week' | 'month'
type CalendarDate = { day: number; weekday: string; month: string; year: number; monthIndex: number; available: boolean; iso: string }

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const weekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const timeSlots = ['6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM']

function makeDate(date: Date): CalendarDate {
  return { day: date.getDate(), weekday: weekdayNames[date.getDay()], month: monthNames[date.getMonth()].slice(0, 3), year: date.getFullYear(), monthIndex: date.getMonth(), available: date.getDay() !== 1, iso: date.toISOString().slice(0, 10) }
}

function getWeekDates(date: Date) {
  const sunday = new Date(date)
  sunday.setDate(date.getDate() - date.getDay())
  return Array.from({ length: 7 }, (_, index) => { const current = new Date(sunday); current.setDate(sunday.getDate() + index); return makeDate(current) })
}

function getMonthDates(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  return Array.from({ length: firstDay + daysInMonth }, (_, index) => index < firstDay ? null : makeDate(new Date(year, month, index - firstDay + 1)))
}

const steps = [
  { number: 1, label: 'Date & time' },
  { number: 2, label: 'Your details' },
  { number: 3, label: 'Email / login' },
  { number: 4, label: 'Confirmation' },
]

function formatGuests(count: number) {
  return `${count} ${count === 1 ? 'guest' : 'guests'}`
}

function getDefaultDate() {
  const date = new Date()
  while (date.getDay() === 1) date.setDate(date.getDate() + 1)
  return date
}

export default function ReservePage() {
  const [initialDate] = useState(getDefaultDate)
  const [step, setStep] = useState<Step>(1)
  const [calendarView, setCalendarView] = useState<CalendarView>('week')
  const [calendarCursor, setCalendarCursor] = useState(initialDate)
  const [selectedDate, setSelectedDate] = useState(makeDate(initialDate))
  const [selectedTime, setSelectedTime] = useState('7:00 PM')
  const [guests, setGuests] = useState(2)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [occasion, setOccasion] = useState('')
  const [email, setEmail] = useState('')
  const [confirmed, setConfirmed] = useState(false)

  const dateLabel = useMemo(() => `${selectedDate.weekday}, ${selectedDate.month} ${selectedDate.day}`, [selectedDate])
  const visibleDates = useMemo(() => calendarView === 'week' ? getWeekDates(calendarCursor) : getMonthDates(calendarCursor.getFullYear(), calendarCursor.getMonth()), [calendarView, calendarCursor])
  const availableTimes = useMemo(() => timeSlots.filter((_, index) => {
    if (!selectedDate.available) return false
    const capacity = guests <= 2 ? 6 : guests <= 4 ? 5 : guests <= 6 ? 4 : 3
    return index < capacity && !(selectedDate.day % 5 === 0 && index === 0)
  }), [guests, selectedDate])

  const canContinue = step === 1 ? Boolean(selectedDate.available && selectedTime) : (step === 2 ? firstName.trim() && lastName.trim() : step === 3 ? email.trim().includes('@') : true)

  function continueFlow() {
    if (!canContinue) return
    if (step === 4) {
      setConfirmed(true)
      return
    }
    setStep((current) => (current + 1) as Step)
  }

  function startOver() {
    setStep(1)
    setConfirmed(false)
    setFirstName('')
    setLastName('')
    setOccasion('')
    setEmail('')
  }

  return (
    <main className="reservation-shell">
      <header className="site-header">
        <a className="brand" href="/" aria-label="Élan home">
          <span className="brand-mark">K</span>
          <span>ÉLAN</span>
        </a>
        <div className="header-note">Kigali · Rwanda</div>
        <a className="header-link" href="https://www.kozokg.com/" target="_blank" rel="noreferrer">Visit restaurant</a>
      </header>

      <div className="reservation-layout" id="top">
        <aside className="reservation-aside" aria-label="Reservation information">
          <p className="eyebrow">A table at Élan</p>
          <h1>Make an evening<br /><em>of it.</em></h1>
          <p className="aside-copy">Afro-Asian fine dining, warm hospitality, and the kind of evening worth lingering over.</p>
          <div className="aside-rule" />
          <p className="aside-detail">KG 7 Ave<br />Kigali, Rwanda</p>
          <p className="aside-detail">Tuesday — Sunday<br />6:00 PM — 10:30 PM</p>
        </aside>

        <section className="reservation-card" aria-label="Reservation booking">
          {!confirmed ? (
            <>
              <nav className="stepper" aria-label="Reservation progress">
                {steps.map((item) => (
                  <div className={`step-item ${step === item.number ? 'active' : ''} ${step > item.number ? 'complete' : ''}`} key={item.number}>
                    <span className="step-number">{step > item.number ? <Check size={13} strokeWidth={2.5} /> : item.number}</span>
                    <span className="step-label">{item.label}</span>
                  </div>
                ))}
              </nav>

              <div className="form-content">
                {step === 1 && (
                  <section className="step-panel" aria-labelledby="date-heading">
                    <p className="eyebrow">Step 01 / 04</p>
                    <h2 id="date-heading">When will we see you?</h2>
                    <p className="step-intro">Choose a date and time for your table.</p>

                    <div className="field-section">
                      <div className="field-heading"><span>Date</span><span className="field-hint">All times local · CAT</span></div>
                      <div className="calendar-toolbar"><button type="button" className="calendar-arrow" onClick={() => { const next = new Date(calendarCursor); next.setDate(next.getDate() - (calendarView === 'week' ? 7 : 30)); setCalendarCursor(next) }} aria-label="Previous period"><ChevronLeft size={16} /></button><strong>{monthNames[calendarCursor.getMonth()]} {calendarCursor.getFullYear()}</strong><button type="button" className="calendar-arrow" onClick={() => { const next = new Date(calendarCursor); next.setDate(next.getDate() + (calendarView === 'week' ? 7 : 30)); setCalendarCursor(next) }} aria-label="Next period"><ChevronRight size={16} /></button></div>
                      <div className="calendar-tabs" role="tablist" aria-label="Calendar view"><button type="button" className={calendarView === 'week' ? 'active' : ''} onClick={() => setCalendarView('week')} role="tab" aria-selected={calendarView === 'week'}>Week</button><button type="button" className={calendarView === 'month' ? 'active' : ''} onClick={() => setCalendarView('month')} role="tab" aria-selected={calendarView === 'month'}>Month</button></div>
                      {calendarView === 'month' && <div className="calendar-weekdays">{weekdayNames.map((day) => <span key={day}>{day.slice(0, 2)}</span>)}</div>}
                      <div className={`date-grid ${calendarView === 'month' ? 'month-grid' : ''}`}>
                        {visibleDates.map((date, index) => date ? <button type="button" className={`date-option ${selectedDate.iso === date.iso ? 'selected' : ''} ${!date.available ? 'unavailable' : ''}`} onClick={() => { if (date.available) { setSelectedDate(date); setSelectedTime('') } }} key={date.iso} disabled={!date.available} aria-label={`${date.weekday}, ${date.month} ${date.day}${date.available ? '' : ', closed'}`} aria-pressed={selectedDate.iso === date.iso}><span>{calendarView === 'month' ? date.weekday.slice(0, 2) : date.weekday}</span><strong>{date.day}</strong><small>{calendarView === 'month' ? (date.available ? 'open' : 'closed') : date.month}</small></button> : <span className="empty-date" key={`empty-${index}`} />)}
                      </div>
                      <p className="calendar-note"><span className="open-dot" /> Open for reservations <span className="closed-dot" /> Closed Mondays</p>
                    </div>

                    <div className="field-section">
                      <div className="field-heading"><span>Party size</span><span className="field-hint">How many guests?</span></div>
                      <div className="guest-stepper">
                        <button type="button" onClick={() => { setGuests((current) => Math.max(1, current - 1)); setSelectedTime('') }} aria-label="Decrease guests"><Minus size={16} /></button>
                        <span><strong>{guests}</strong> {guests === 1 ? 'guest' : 'guests'}</span>
                        <button type="button" onClick={() => { setGuests((current) => Math.min(12, current + 1)); setSelectedTime('') }} aria-label="Increase guests"><Plus size={16} /></button>
                      </div>
                    </div>

                    <div className="field-section">
                      <div className="field-heading"><span>Available times</span><span className="field-hint">Local time · CAT</span></div>
                      <div className="time-grid">
                        {availableTimes.length ? availableTimes.map((time) => <button type="button" className={`time-option ${selectedTime === time ? 'selected' : ''}`} onClick={() => setSelectedTime(time)} key={time}>{time}</button>) : <p className="availability-message">No tables are available for this party size on this date. Please choose another day.</p>}
                      </div>
                      {availableTimes.length > 0 && <p className="availability-hint">Availability updates for {formatGuests(guests)} on {dateLabel.toLowerCase()}.</p>}
                    </div>
                  </section>
                )}

                {step === 2 && (
                  <section className="step-panel" aria-labelledby="details-heading">
                    <p className="eyebrow">Step 02 / 04</p>
                    <h2 id="details-heading">Tell us about yourself.</h2>
                    <p className="step-intro">We’ll use these details to prepare for your arrival.</p>
                    <div className="input-grid">
                      <label>First name<input value={firstName} onChange={(event) => setFirstName(event.target.value)} placeholder="[First Name]" autoComplete="given-name" /></label>
                      <label>Last name<input value={lastName} onChange={(event) => setLastName(event.target.value)} placeholder="[Last Name]" autoComplete="family-name" /></label>
                    </div>
                    <label className="full-label">Celebration or occasion <span>Optional</span><select value={occasion} onChange={(event) => setOccasion(event.target.value)}><option value="">Select an occasion</option><option>Birthday</option><option>Anniversary</option><option>Business dinner</option><option>Just because</option></select><ChevronDown className="select-icon" size={16} /></label>
                    <div className="note-box"><span className="note-icon">i</span><p>Special requests are welcome, though we cannot guarantee specific tables. Let our team know at the door.</p></div>
                  </section>
                )}

                {step === 3 && (
                  <section className="step-panel" aria-labelledby="email-heading">
                    <p className="eyebrow">Step 03 / 04</p>
                    <h2 id="email-heading">Where can we reach you?</h2>
                    <p className="step-intro">We’ll send your reservation details and a gentle reminder before your visit.</p>
                    <label className="full-label">Email address<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="[User Email]" autoComplete="email" /></label>
                    <div className="login-divider"><span>or</span></div>
                    <button type="button" className="secondary-button">Log in to your Élan account</button>
                    <p className="privacy-note">By continuing, you agree to receive reservation communications from Élan. We’ll never share your details.</p>
                  </section>
                )}

                {step === 4 && (
                  <section className="step-panel" aria-labelledby="review-heading">
                    <p className="eyebrow">Step 04 / 04</p>
                    <h2 id="review-heading">Review your reservation.</h2>
                    <p className="step-intro">One last look before we set your table.</p>
                    <div className="review-card">
                      <div className="review-row"><span>Date & time</span><strong>{dateLabel}<br />{selectedTime}</strong></div>
                      <div className="review-row"><span>Guests</span><strong>{formatGuests(guests)}</strong></div>
                      <div className="review-row"><span>Guest name</span><strong>{firstName} {lastName}</strong></div>
                      <div className="review-row"><span>Email</span><strong>{email}</strong></div>
                    </div>
                    <div className="note-box"><span className="note-icon">i</span><p>Your table will be held for 15 minutes after your reservation time. Please call us if you’re running late.</p></div>
                  </section>
                )}
              </div>

              <div className="form-footer">
                {step > 1 ? <button type="button" className="back-button" onClick={() => setStep((current) => (current - 1) as Step)}><ArrowLeft size={16} /> Back</button> : <span />}
                <button type="button" className="primary-button" onClick={continueFlow} disabled={!canContinue}>{step === 4 ? 'Confirm reservation' : 'Continue'} <ArrowRight size={16} /></button>
              </div>
            </>
          ) : (
            <section className="confirmation-panel" aria-labelledby="confirmation-heading">
              <div className="confirmation-seal"><Check size={24} /></div>
              <p className="eyebrow">Reservation confirmed</p>
              <h2 id="confirmation-heading">We’ll see you soon,<br /><em>{firstName}.</em></h2>
              <p className="step-intro">Your table is waiting. A confirmation has been sent to {email}.</p>
              <div className="confirmed-details"><strong>{dateLabel}</strong><span>{selectedTime} · {formatGuests(guests)}</span><span>Élan Kigali · KG 7 Ave</span></div>
              <div className="confirmation-actions"><button type="button" className="primary-button" onClick={startOver}>Make another reservation <ArrowRight size={16} /></button><a className="text-link" href="https://www.kozokg.com/" target="_blank" rel="noreferrer">Return to Élan Kigali</a></div>
            </section>
          )}
        </section>
      </div>

      <footer className="site-footer"><span>© 2025 Élan Kigali</span><span>Reservations are subject to availability</span></footer>
    </main>
  )
}
