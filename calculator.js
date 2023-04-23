"use strict";
// Find DOM element and hold onto it, so we don't have to search for it
// every time we use it.
const calcForm = document.getElementById("calc-form");
const amountInput = document.getElementById('loan-amount');
const yearsInput = document.getElementById('loan-years');
const rateInput = document.getElementById('loan-rate');
const resultArea = document.querySelector('#calc-monthly-payment');

/** Get form values and return as `{amount, years, rate}`.
 *
 * Example output: `{"amount": 10000, "years": 10, "rate": 4.5}`.
 *
 * */

function getFormValues() {
  console.log('getFromValues invoked');

  return {
    amount: Number(amountInput.value),
    years: Number(yearsInput.value),
    rate: Number(rateInput.value),
  }
}

/**
 *  Nice to have function, to interpret between 4.5% and 0.045
 */

function decideRate(rate){
}

/** Calculate monthly payment and return exact amount. */

function calcMonthlyPayment(amount, years, rate) {
  console.log(
    `calcMonthlyPayment invoked with amount=${amount}, years=${years}, rate=${rate}`
  );

  const MONTHS_IN_YEAR = 12;
  const monthlyRate = (rate / 100) / MONTHS_IN_YEAR;
  const n = Math.floor(years * MONTHS_IN_YEAR);
  
  return (
    (monthlyRate * amount)
    / (1 - Math.pow(1 + monthlyRate, -n))
  );
}

/** Get form values, calculate, convert to 2-decimal places, and update UI. */

function getFormValuesAndDisplayResults() {
  console.log('getFormValuesAndDisplayResults invoked');
  const {amount, years, rate} = getFormValues();
  const payment = calcMonthlyPayment(amount, years, rate);
  resultArea.innerHTML = "$" + payment.toFixed(2);
}


/** Set initial form values and show initial results. Called at app start. */

function setInitialValues() {
  // use the default values in the provided screenshot
  amountInput.value = 10000;
  yearsInput.value = 10;
  rateInput.value = 4.5;
  console.log('setInitialValues has run');
}


/** Start: set form defaults & display; attach form submit event listener. */

function start() {
  setInitialValues();

  calcForm.addEventListener("submit", function (evt) {
    evt.preventDefault();
    getFormValuesAndDisplayResults();
  });
}
