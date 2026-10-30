import { useEffect, useState } from "react";
import "./App.css";

const API = "http://localhost:5000/api";
const BRAND = "Sharp Cut Studio"; // yahan apna naam likh sakte ho
const ICONS = ["✂️", "🧔", "💈", "🪒", "💆"];

const emptyForm = {
  customerName: "",
  customerPhone: "",
  service: "",
  barber: "",
  date: "",
  time: "",
};

function App() {
  const [services, setServices] = useState([]);
  const [barbers, setBarbers] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`${API}/services`)
      .then((res) => res.json())
      .then((data) => setServices(data));

    fetch(`${API}/barbers`)
      .then((res) => res.json())
      .then((data) => setBarbers(data));
  }, []);

  const goToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  const chooseService = (id) => {
    setForm({ ...form, service: id });
    goToBooking();
  };

  const chooseBarber = (id) => {
    setForm({ ...form, barber: id });
    goToBooking();
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const res = await fetch(`${API}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        setMessage({ type: "success", text: "Booking confirmed! Aapko time par milte hain." });
        setForm(emptyForm);
      } else {
        setMessage({ type: "error", text: data.message });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Server se connect nahi ho paya" });
    }
    setLoading(false);
  };

  const today = new Date().toISOString().split("T")[0];
  const selectedService = services.find((s) => s._id === form.service);

  return (
    <>
      <nav className="navbar">
        <div className="nav-inner">
          <a href="#top" className="logo">
            💈 {BRAND}
          </a>
          <div className="nav-links">
            <a href="#services">Services</a>
            <a href="#barbers">Barbers</a>
            <a href="#how">How it works</a>
            <button className="btn btn-small" onClick={goToBooking}>
              Book Now
            </button>
          </div>
        </div>
      </nav>

      <header className="hero" id="top">
        <div className="hero-inner">
          <p className="tag">Online Barber Booking</p>
          <h1>
            Look Sharp.
            <br />
            <span className="gold">Feel Confident.</span>
          </h1>
          <p className="hero-text">
            Apna barber chuno, time chuno aur slot book karo. Na line, na
            intezaar.
          </p>
          <div className="hero-buttons">
            <button className="btn" onClick={goToBooking}>
              Book Appointment
            </button>
            <a href="#services" className="btn btn-outline">
              View Services
            </a>
          </div>
        </div>
      </header>

      <section className="section" id="services">
        <h2 className="section-title">
          Our <span className="gold">Services</span>
        </h2>
        <p className="section-sub">Har service ke saath professional grooming</p>
        <div className="grid">
          {services.map((s, i) => (
            <div className="card service-card" key={s._id}>
              <div className="icon">{ICONS[i % ICONS.length]}</div>
              <h3>{s.name}</h3>
              <p className="muted">{s.durationMinutes} minutes</p>
              <p className="price">₹{s.price}</p>
              <button className="btn btn-outline btn-small" onClick={() => chooseService(s._id)}>
                Book this
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="section alt" id="barbers">
        <h2 className="section-title">
          Meet Our <span className="gold">Barbers</span>
        </h2>
        <p className="section-sub">Experienced hands, clean finish</p>
        <div className="grid">
          {barbers.map((b) => (
            <div className="card barber-card" key={b._id}>
              <div className="avatar">{b.name.charAt(0).toUpperCase()}</div>
              <h3>{b.name}</h3>
              <p className="muted">{b.experienceYears} years experience</p>
              <p className="muted">
                🕒 {b.workStart} - {b.workEnd}
              </p>
              <button className="btn btn-outline btn-small" onClick={() => chooseBarber(b._id)}>
                Book with {b.name}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="how">
        <h2 className="section-title">
          How It <span className="gold">Works</span>
        </h2>
        <p className="section-sub">Sirf teen simple steps</p>
        <div className="grid steps">
          <div className="step">
            <span className="step-number">1</span>
            <h3>Service chuno</h3>
            <p className="muted">Haircut, beard ya dono, jo chahiye.</p>
          </div>
          <div className="step">
            <span className="step-number">2</span>
            <h3>Barber chuno</h3>
            <p className="muted">Apne pasandida barber ke saath book karo.</p>
          </div>
          <div className="step">
            <span className="step-number">3</span>
            <h3>Time chuno</h3>
            <p className="muted">Date aur time dalo, booking confirm.</p>
          </div>
        </div>
      </section>

      <section className="section alt" id="booking">
        <h2 className="section-title">
          Book Your <span className="gold">Appointment</span>
        </h2>
        <p className="section-sub">Form bharo, baaki hum sambhal lenge</p>

        <form className="form" onSubmit={handleSubmit}>
          <div className="row">
            <input
              type="text"
              name="customerName"
              placeholder="Your name"
              value={form.customerName}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="customerPhone"
              placeholder="Phone number"
              value={form.customerPhone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="row">
            <select name="service" value={form.service} onChange={handleChange} required>
              <option value="">Select service</option>
              {services.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name} - ₹{s.price}
                </option>
              ))}
            </select>

            <select name="barber" value={form.barber} onChange={handleChange} required>
              <option value="">Select barber</option>
              {barbers.map((b) => (
                <option key={b._id} value={b._id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          <div className="row">
            <input
              type="date"
              name="date"
              min={today}
              value={form.date}
              onChange={handleChange}
              required
            />
            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              required
            />
          </div>

          {selectedService && (
            <p className="summary">
              Selected: <strong>{selectedService.name}</strong> · ₹
              {selectedService.price} · {selectedService.durationMinutes} min
            </p>
          )}

          <button type="submit" className="btn btn-full" disabled={loading}>
            {loading ? "Booking..." : "Confirm Booking"}
          </button>

          {message && <p className={`message ${message.type}`}>{message.text}</p>}
        </form>
      </section>

      <footer className="footer">
        <p>© 2026 {BRAND}. All rights reserved.</p>
      </footer>
    </>
  );
}

export default App;