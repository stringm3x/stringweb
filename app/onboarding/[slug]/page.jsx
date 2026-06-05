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

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), "data", "clientes", `${slug}.json`);

  if (!fs.existsSync(filePath)) {
    return { title: "Onboarding | STRING" };
  }

  const cliente = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  return {
    title: `Estudio de Procesos — ${cliente.nombre_negocio} | STRING`,
    description: `Fase 3 del proyecto ${cliente.sistema_contratado} para ${cliente.nombre_negocio}.`,
    robots: "noindex, nofollow",
  };
}
