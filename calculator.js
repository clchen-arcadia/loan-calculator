"use strict";
// Find DOM element and hold onto it, so we don't have to search for it
// every time we use it.
const calcForm = document.getElementById("calc-form");
const formAmount = document.getElementById('loan-amount');
const formYears = document.getElementById('loan-years');
const formRate = document.getElementById('loan-rate');

/** Get form values and return as `{amount, years, rate}`.
 *
 * Example output: `{"amount": 10000, "years": 10, "rate": 4.5}`.
 *
 * */

function getFormValues() {
  console.log('getFromValues');

  let output = new Object();
  output.amount = formAmount.value;
  output.years = formYears.value;
  let inputRate = decideRate(formRate.value);

  if (inputRate < 1 && inputRate > 0) {
    output.rate = inputRate;
  }

  //where to put this??
  //call decideRate()
  // '%' is forcing, etc
  //who is the person responsible for deciding? etc

  else if (inputRate > 1 && inputRate < 100) {
    output.rate = inputRate / 100;
  }
  if (output.rate === undefined) {
    throw new Error('Could not parse loan rate');
  }
  console.log('getFormValues returns ', output);
  return output;
}

function decideRate(rate){
  if ()
}

/** Calculate monthly payment and return exact amount. */

function calcMonthlyPayment(amount, years, rate) {
  console.log('calcMonthlyPayment', amount, years, rate);
  return amount * rate / 12 / (1 - (1 + rate / 12) ** (-1 * years * 12));
}


/** Get form values, calculate, convert to 2-decimal places, and update UI. */

function getFormValuesAndDisplayResults() {
  console.log('getFormValuesAndDisplayResults');
  let values = getFormValues();
  let amount = calcMonthlyPayment(values.amount, values.years, values.rate);
  document.querySelector('#calc-monthly-payment').innerHTML = amount.toFixed(2);
}


/** Set initial form values and show initial results. Called at app start. */

function setInitialValues() {
  // use the default values in the provided screenshot
  calcForm.querySelector('#loan-amount').value = 10000;
  calcForm.querySelector('#loan-years').value = 10;
  calcForm.querySelector('#loan-rate').value = 4.5;
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
