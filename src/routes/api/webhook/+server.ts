import type Stripe from "stripe";
import { db } from "$lib/db.server";
import { STRIPE_WEBHOOK } from "$env/static/private";
import { stripe } from "$lib/stripe";
import { json } from "@sveltejs/kit";

export const POST = async ({ request }) => {
	const body = await request.text();
	const signature = request.headers.get("Stripe-Signature") as string;

	let event: Stripe.Event;

	try {
		event = stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK);
		// rome-ignore lint/suspicious/noExplicitAny: <explanation>
	} catch (err: any) {
		console.log(err);
		return json({ error: err.message }, { status: 400 });
	}

	const session = event.data.object as Stripe.Checkout.Session;
	const email = session?.metadata?.email;
	const credits_to_purchase = session?.metadata?.credits_to_purchase;

	if (event.type === "checkout.session.completed") {
		if (!email || !credits_to_purchase) {
			return json(
				{ error: "No user data provided" },
				{
					status: 400,
				},
			);
		}

		await db.user.update({
			where: {
				email,
			},
			data: {
				credits: {
					increment: Number(credits_to_purchase),
				},
			},
		});
		console.log(`User ${email} purchased ${credits_to_purchase} credits`);
	} else {
		return json({ error: `Invalid event type ${event.type}` }, { status: 200 });
	}

	return json({ received: true }, { status: 200 });
};
