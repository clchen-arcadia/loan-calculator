it('should calculate monthly rate', function () {
  expect(calcMonthlyPayment(10000,10,0.045)).toEqual(103.63840875701705);
  //correcting setting 4.5% to 0.045 handled in getFormValues()
});
