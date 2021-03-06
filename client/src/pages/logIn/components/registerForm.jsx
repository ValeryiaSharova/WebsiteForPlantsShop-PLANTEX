/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import TextField from '../../../sharedComponents/form/textField';
import { getAuthError, signUp } from '../../../store/user';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const loginError = useSelector(getAuthError());
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const validateScheme = yup.object().shape({
    password: yup
      .string()
      .required('Password is required')
      .matches(/(?=.*[0-9])/, 'Password must consist a number')
      .min(8, 'Password must be at least 8 characters long'),
    email: yup.string().required('Email is required').email('Email entered incorrectly'),
    mobileNumber: yup
      .string()
      .required('Mobile is required')
      .matches(/^[0-9]+$/, 'Mobile number entered incorrectly')
      .max(15, 'Mobile number must be maximum 15 characters long')
      .min(7, 'Mobile number must be at least 7 characters long'),
    lastName: yup
      .string()
      .required('Last name is required')
      .min(3, 'Last name must be at least 3 characters long'),
    firstName: yup
      .string()
      .required('First name is required')
      .min(2, 'First name must be at least 2 characters long'),
  });

  const validate = () => {
    validateScheme
      .validate(data)
      .then(() => setErrors({}))
      .catch(err => setErrors({ [err.path]: err.message }));
    return Object.keys(errors).length === 0;
  };

  const handleChange = target => {
    setData(prevState => ({ ...prevState, [target.name]: target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    dispatch(signUp(data));
  };

  useEffect(() => {
    validate();
  }, [data]);

  return (
    <form className="login__form" onSubmit={handleSubmit}>
      <div className="login__inputs">
        <TextField
          label="First name"
          name="firstName"
          value={data.firstName}
          onChange={handleChange}
          error={errors.firstName}
        />
        <TextField
          label="Last name"
          name="lastName"
          value={data.lastName}
          onChange={handleChange}
          error={errors.lastName}
        />
        <TextField
          label="Mobile number"
          name="mobileNumber"
          value={data.mobileNumber}
          onChange={handleChange}
          error={errors.mobileNumber}
        />
        <TextField
          label="Email"
          name="email"
          value={data.email}
          onChange={handleChange}
          error={errors.email}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={data.password}
          onChange={handleChange}
          error={errors.password}
        />
      </div>
      {loginError && (
        <div className="login__checked-error">
          <span className="login__error-message">{loginError}</span>
        </div>
      )}
      <button className="button button--flex" type="submit">
        Sign Up
        <i className="ri-arrow-right-up-line button__icon" />
      </button>
    </form>
  );
};

export default RegisterForm;
