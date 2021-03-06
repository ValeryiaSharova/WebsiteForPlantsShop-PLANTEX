/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';

const LogIn = () => {
  const { type } = useParams();
  const [formType, setFormType] = useState(type === 'register' ? type : 'login');
  const toggleFormType = () => {
    setFormType(prevState => (prevState === 'register' ? 'login' : 'register'));
  };
  return (
    <section className="login section container">
      <div className="login__container grid">
        <div className="login__box">
          <h2 className="section__title">
            "Happiness held is the seed
            <br />
            Happiness shared is the flower." <br />
            Let's share happiness together!
          </h2>

          <div className="login__data">
            <div className="login__information">
              {formType === 'login' ? (
                <>
                  <h3 className="login__subtitle">Don't have an account?</h3>
                  <span type="button" onClick={toggleFormType} className="login__description">
                    Sign Up
                  </span>
                </>
              ) : (
                <>
                  <h3 className="login__subtitle">Already have an account?</h3>
                  <span type="button" onClick={toggleFormType} className="login__description">
                    Sign In
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
        {formType === 'login' ? <LoginForm /> : <RegisterForm />}
      </div>
    </section>
  );
};

export default LogIn;
