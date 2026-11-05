import { Sala1Inicio } from "@/app/components/salas/Sala1Inicio";
import { Sala2Problema } from "@/app/components/salas/Sala2Problema";
import { Sala3Caso } from "@/app/components/salas/Sala3Caso";
import { Sala4Niveles } from "@/app/components/salas/Sala4Niveles";
import { Sala5Galeria } from "@/app/components/salas/Sala5Galeria";
import { Sala6Trabajo } from "@/app/components/salas/Sala6Trabajo";
import { Sala7Continuidad } from "@/app/components/salas/Sala7Continuidad";
import { Preguntas } from "@/app/components/salas/Preguntas";
import { Cierre } from "@/app/components/salas/Cierre";
import { JsonLd } from "@/app/components/JsonLd";
import { PORTADA, metadatosPagina } from "@/app/lib/compartir";
import { servicioProfesional } from "@/app/lib/jsonld";

// Título y descripción de Google (lote 18, docs/textos.md § SEO · lote 18).
export const metadata = metadatosPagina({ titulo: PORTADA.titulo, descripcion: PORTADA.descripcion, ruta: "/" });

// La portada: siete salas, preguntas y cierre (CLAUDE.md § La portada).
const Home = () => {
  return (
    <>
      <JsonLd datos={servicioProfesional()} />
      <Sala1Inicio />
      <Sala2Problema />
      <Sala3Caso />
      <Sala4Niveles />
      <Sala5Galeria />
      <Sala6Trabajo />
      <Sala7Continuidad />
      <Preguntas />
      <Cierre />
    </>
  );
};

export default Home;
