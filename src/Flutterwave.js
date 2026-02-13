export const makePayment = (config) => {
  if (!window.FlutterwaveCheckout) {
    alert("Flutterwave not loaded");
    return;
  }

  window.FlutterwaveCheckout(config);
};
