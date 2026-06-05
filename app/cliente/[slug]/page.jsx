// app/cliente/[slug]/page.jsx
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import ClienteDashboard from "../../cliente/components/ClienteDashboard";

export default async function ClientePage({ params }) {
  const { slug } = await params;
  const filePath = path.join(
    process.cwd(),
    "data",
    "proyectos",
    `${slug}.json`
  );

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const proyecto = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  return <ClienteDashboard proyecto={proyecto} />;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const filePath = path.join(
    process.cwd(),
    "data",
    "proyectos",
    `${slug}.json`
  );

  if (!fs.existsSync(filePath)) {
    return { title: "Dashboard | STRING" };
  }

  const proyecto = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  return {
    title: `${proyecto.nombre_negocio} — Avance del proyecto | STRING`,
    description: `Sigue el avance de ${proyecto.sistema_contratado} en tiempo real.`,
    robots: "noindex, nofollow",
  };
}
