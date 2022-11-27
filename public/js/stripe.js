/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51M6KnfArdCDhrA6362g7THqTRuvGbcwawaZDJJjvjx1fYYLuDwzXawZprtYP6Uj6bMTmlBiJtGSaDe3H9x6KOhBE00b7oaa4hd'
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get session from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );

    console.log(session.data.session.id);

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
