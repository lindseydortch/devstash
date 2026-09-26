import { cache } from "react";

import { prisma } from "@/lib/db";

/** Seeded demo account the dashboard reads from until sign-in exists. */
const DEMO_USER_EMAIL = "demo@devstash.io";

/**
 * Id of the user whose data the app shows, or null if the demo user hasn't
 * been seeded. Cached so every query in a request shares one lookup.
 */
export const getCurrentUserId = cache(async (): Promise<string | null> => {
  const user = await prisma.user.findUnique({
    where: { email: DEMO_USER_EMAIL },
    select: { id: true },
  });

  return user?.id ?? null;
});
