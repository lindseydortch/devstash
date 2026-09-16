/**
 * Short date for item cards, e.g. "Jan 15".
 *
 * Formatted in UTC so the server and client agree on the day.
 */
export function formatShortDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
