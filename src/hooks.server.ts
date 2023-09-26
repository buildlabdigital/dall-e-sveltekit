import { SvelteKitAuth } from '@auth/sveltekit';
import Google from '@auth/core/providers/google';
import GitHub from '@auth/core/providers/github';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { db } from '$lib/db.server';
import { GOOGLE_SECRET, GOOGLE_ID, GITHUB_SECRET, GITHUB_ID } from '$env/static/private';
import type { Adapter } from '@auth/core/adapters';


export const handle = SvelteKitAuth({
	adapter: PrismaAdapter(db) as Adapter,
	session: {
		strategy: "database",
		generateSessionToken: () => {
			return crypto.randomUUID();
		}
	},
	providers: [
		GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET }),
		Google({ clientId: GOOGLE_ID, clientSecret: GOOGLE_SECRET })
	],
});
