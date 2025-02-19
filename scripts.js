// scripts.js
document.addEventListener('DOMContentLoaded', function () {
    const stripe = Stripe('pk_test_TU_STRIPE_PUBLIC_KEY'); // Reemplaza con tu clave pública de Stripe

    const buyButtons = document.querySelectorAll('.buy-button');
    buyButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const productId = button.getAttribute('data-product-id');

            try {
                const response = await fetch('/create-checkout-session', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ productId }),
                });

                const session = await response.json();
                const result = await stripe.redirectToCheckout({ sessionId: session.id });

                if (result.error) {
                    alert(result.error.message);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    });
});