/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

// type is either 'password' or 'settings'
export const submitReview = async (rating, review, tourId) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `/api/v1/reviews/`,
      data: {
        rating,
        review,
        tour: tourId,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', `Review created successfully!`);
      window.setTimeout(() => {
        location.assign('/my-reviews');
      }, 1000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
