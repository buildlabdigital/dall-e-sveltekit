import type { Session } from "@auth/core/types";
import { writable } from "svelte/store";

export const userSession = writable<Session | null>(null);