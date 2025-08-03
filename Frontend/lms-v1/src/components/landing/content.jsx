
import React from 'react';
import { Link } from 'react-router-dom';
import './landing.css';

export default function Content() {
  return (
    <div className="landing-content container-fluid text-center">
      {/* Hero Section */}
      <div className="hero-section">
        <h1>Empowering Learning for Everyone</h1>
        <p>Join virtual classrooms, submit assignments, and manage your education in one place.</p>
        <div className="hero-buttons">
          <Link to="/login" className="btn btn-primary mx-2">Sign In</Link>
          <Link to="/register" className="btn btn-outline-primary mx-2">Register</Link>
        </div>
      </div>

          </button>
          <p>Don't have account? <Link to='/register'>Click to register</Link></p>
          <p><Link to='/'>Go home</Link></p>
        </form>


      {/* Features Section */}
<div className="features-section container py-5">
  <h2 className="text-center mb-5">Platform Features</h2>
  <div className="row text-center g-4">
    <div className="col-md-4">
      <div className="feature-box p-4 shadow-sm rounded">
        <i className="bi bi-laptop display-4 text-primary mb-3"></i>
        <h5>Virtual Classrooms</h5>
        <p>Connect with your peers and teachers from anywhere at any time.</p>
      </div>
    </div>
    <div className="col-md-4">
      <div className="feature-box p-4 shadow-sm rounded">
        <i className="bi bi-journal-text display-4 text-success mb-3"></i>
        <h5>Assignment Management</h5>
        <p>Submit, review, and grade assignments quickly and easily.</p>
      </div>
    </div>
    <div className="col-md-4">
      <div className="feature-box p-4 shadow-sm rounded">
        <i className="bi bi-person-lines-fill display-4 text-warning mb-3"></i>
        <h5>Role-Based Dashboards</h5>
        <p>Separate views and access for students, teachers, and admins.</p>
      </div>
    </div>
  </div>
</div>


      {/* Testimonials */}
      <div className="testimonials-section mt-5">
        <h2>What Our Users Say</h2>
        <blockquote className="blockquote">
          <p>"This platform has made learning more organized and efficient."</p>
          <footer className="blockquote-footer">– Ayesha, Student</footer>
        </blockquote>
      </div>
    </div>
  );
}
