/* eslint-disable react/prop-types */
import React from 'react';
import Alert from '@mui/material/Alert';

export const isPasswordValid = (value) => {
  if (value.length < 6) {
    return {
      status: false,
      message: 'Password must be at least 6 characters long',
    };
  }

  if (typeof value === 'number') {
    return {
      status: false,
      message: 'The password must contain at least one letter.',
    };
  }

  return {
    status: true,
    message: '',
  };
};

export function ErrorAlert({ errorMsg }) {
  if (errorMsg) {
    return (
      <Alert severity="error" sx={{ mb: 2, textTransform: 'capitalize' }}>
        {errorMsg}
      </Alert>
    );
  }
}

export function SuccessAlert({ successMsg }) {
  if (successMsg) {
    return (
      <Alert severity="success" sx={{ mb: 2, textTransform: 'capitalize' }}>
        {successMsg}
      </Alert>
    );
  }
}

export const formatDate = (inputDate) => {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = new Date(inputDate).toLocaleDateString(
    'id-ID',
    options,
  );
  return formattedDate;
};

export const formatDateWithTime = (inputDate) => {
  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  const formattedDate = new Date(inputDate).toLocaleDateString(
    'id-ID',
    options,
  );
  return formattedDate;
};
