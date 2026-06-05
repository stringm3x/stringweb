import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import OnboardingForm from "../../onboarding/components/OnboardingForm";

// Este archivo va en: app/onboarding/[slug]/page.jsx

export default async function OnboardingPage({ params }) {
  const { slug } = await params;

  const filePath = path.join(process.cwd(), "data", "clientes", `${slug}.json`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const cliente = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  return <OnboardingForm cliente={cliente} />;
}

export function generateMetadata() {
  return { robots: "noindex, nofollow" };
}
