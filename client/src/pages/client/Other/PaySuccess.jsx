function PaySuccess() {
  return (
    <>
      <div class="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div
          class="w-full max-w-2xl p-12 mx-4 text-center transition-all transform bg-white shadow-lg rounded-xl hover:shadow-xl">
          <div class="flex items-center justify-center w-24 h-24 mx-auto mb-8 bg-green-100 rounded-full">
            <svg class="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>

          <h1 class="mb-6 text-4xl font-extrabold text-green-600">
            Payment Successful!
          </h1>

          <p class="mb-8 text-xl text-gray-700">
            Thank you for your booking.
          </p>

          <div class="mt-12">
            <a href="/"
              class="inline-block px-8 py-4 text-lg font-semibold text-white transition-colors duration-200 bg-green-600 rounded-lg hover:bg-green-700">
              Return to Dashboard
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default PaySuccess;