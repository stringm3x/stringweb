import { Sala1Inicio } from "@/app/components/salas/Sala1Inicio";
import { Sala2Problema } from "@/app/components/salas/Sala2Problema";
import { Sala3Caso } from "@/app/components/salas/Sala3Caso";
import { Sala4Niveles } from "@/app/components/salas/Sala4Niveles";
import { Sala5Galeria } from "@/app/components/salas/Sala5Galeria";
import { Sala6Trabajo } from "@/app/components/salas/Sala6Trabajo";
import { Sala7Continuidad } from "@/app/components/salas/Sala7Continuidad";
import { Preguntas } from "@/app/components/salas/Preguntas";
import { Cierre } from "@/app/components/salas/Cierre";

// La portada: siete salas, preguntas y cierre (CLAUDE.md § La portada).
const Home = () => {
  return (
    <>
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
