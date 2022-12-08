/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

// type is either 'password' or 'settings'
export const editReview = async (rating, review, reviewId) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/reviews/${reviewId}`,
      data: {
        rating,
        review,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', `Review updated successfully!`);
      window.setTimeout(() => {
        location.assign('/my-reviews');
      }, 1000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
