/* eslint-disable */
import '@babel/polyfill';
import { login, logout } from './login';
import { signup } from './signup';
import { updateSettings } from './updateSettings';
import { displayMap } from './mapbox';
import { bookTour } from './stripe';
import { showAlert } from './alerts';
import { editReview } from './editReview';
import { submitReview } from './submitReview';

// DOM ElEMENTS
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const logoutBtn = document.querySelector('.nav__el--logout');
const signupForm = document.querySelector('.form--signup');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const bookBtn = document.getElementById('book-tour');

// Elements for edit review form
const editReviewBtnArray = document.querySelectorAll('.btn--edit');
const closeModalBtnArray = document.querySelectorAll('.close-modal');
const reviewFormModalArray = document.querySelectorAll('.review-form__modal');
const editReviewFormArray = document.querySelectorAll('.form--edit-review');

// Elements for create review form
const createReviewBtn = document.getElementById('leave-review');
const closeModalBtn = document.querySelector('.close-modal');
const reviewFormModal = document.querySelector('.review-form__modal');
const createReviewForm = document.querySelector('.form--create-review');

// DELEGATION
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (logoutBtn) logoutBtn.addEventListener('click', logout);

if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;

    signup(name, email, password, passwordConfirm);
  });
}

if (userDataForm) {
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);

    updateSettings(form, 'settings');
  });
}

if (userPasswordForm) {
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );

    document.querySelector('.btn--save-password').textContent = 'Save password';

    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });
}

if (bookBtn) {
  bookBtn.addEventListener('click', (e) => {
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });
}

const alertMessage = document.querySelector('body').dataset.alert;
if (alertMessage) showAlert('success', alertMessage, 15);

// For My Reviews page
if (editReviewBtnArray) {
  editReviewBtnArray.forEach((btn) =>
    btn.addEventListener('click', (e) => {
      const editReviewModal = document.getElementById(`${btn.id}-modal`);
      editReviewModal.classList.remove('hidden');
    })
  );
}

if (closeModalBtnArray) {
  closeModalBtnArray.forEach((btn) =>
    btn.addEventListener('click', (e) => {
      btn.parentElement.parentElement.classList.add('hidden');
    })
  );
}

if (reviewFormModalArray) {
  reviewFormModalArray.forEach((el) =>
    el.addEventListener('click', (e) => {
      if (e.target === el) {
        el.classList.add('hidden');
      }
    })
  );
}

if (editReviewFormArray) {
  editReviewFormArray.forEach((el) =>
    el.addEventListener('submit', async (e) => {
      e.preventDefault();
      const id = el.parentElement.id.split('-')[0];
      const rating = document.getElementById(`${id}-rating`).value;
      const review = document.getElementById(`${id}-review`).value;

      await editReview(rating, review, id);
    })
  );
}

// Add review on Tour page
if (createReviewBtn) {
  createReviewBtn.addEventListener('click', (e) => {
    reviewFormModal.classList.remove('hidden');
  });
}

if (closeModalBtn) {
  closeModalBtn.addEventListener('click', (e) => {
    closeModalBtn.parentElement.parentElement.classList.add('hidden');
  });
}

if (reviewFormModal) {
  reviewFormModal.addEventListener('click', (e) => {
    if (e.target === reviewFormModal) {
      reviewFormModal.classList.add('hidden');
    }
  });
}

if (createReviewForm) {
  createReviewForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const rating = document.getElementById('review-rating').value;
    const review = document.getElementById('review-content').value;
    const { tourId } = e.target.dataset;

    await submitReview(rating, review, tourId);
  });
}
