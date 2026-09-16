import { redirect } from "next/navigation";

// Temporary: the marketing landing page will live here later.
export default function Home() {
  redirect("/dashboard");
}
