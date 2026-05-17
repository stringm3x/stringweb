import GymLanding from "./components/GymLanding";

export const metadata = {
  title: "STRING para Gimnasios",
  description:
    "Sistema digital para gimnasios que capta, organiza y da seguimiento a cada prospecto.",
  robots: "noindex, nofollow", // página privada
};

export default function GimnasiosPage() {
  return <GymLanding />;
}
