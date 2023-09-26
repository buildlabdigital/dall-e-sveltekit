import { json } from '@sveltejs/kit';
import { stripe } from '$lib/stripe';
import type Stripe from 'stripe';
export const POST = async ({ request }) => {
	const { userData, credits_to_purchase } = await request.json();

	console.log(userData, credits_to_purchase)


	if (!userData) {
		return json(
			{ error: 'No user data provided' },
			{
				status: 400
			}
		);
	}
	if (!credits_to_purchase) {
		return json(
			{ error: 'No credits to purchase provided' },
			{
				status: 400
			}
		);
	}

	const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
		{
			quantity: credits_to_purchase,
			price: 'price_1NubN4SCfqOX4bzkyG8syveO'
		}
	];

	// console.log(line_items)

	const session = await stripe.checkout.sessions.create({
		payment_method_types: ['card'],
		line_items,
		mode: 'payment',
		success_url: `${request.headers.get('origin')}/?success=true`,
		cancel_url: `${request.headers.get('origin')}/?canceled=true`,
		customer_email: userData.email,
		metadata: {
			email: userData.email,
			credits_to_purchase
		}
	});
	return json({ url: session.url });
};
