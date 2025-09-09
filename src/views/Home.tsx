import { CardComponent } from "../components/CardComponent";

export interface Feature {
  title: string;
  shortDescription: string;
  detailedDescription: string;
  route: string;
}

export const HomeScreen = () => {
  const homeFeatures: Feature[] = [
    {
      title: "Contraseña",
      shortDescription: "Actualiza tu contraseña de forma segura.",
      detailedDescription:
        "Accede a esta sección para cambiar tu contraseña en cualquier momento. El sistema te guiará paso a paso para garantizar que tu nueva clave cumpla con los requisitos de seguridad y se actualice correctamente en tu cuenta.",
      route: "profile/password",
    },
    {
      title: "Perfil estudiantil",
      shortDescription: "Consulta y edita tu información personal.",
      detailedDescription:
        "Aquí puedes revisar tus datos registrados como nombre, correo, foto de perfil y otros detalles relevantes. También podrás actualizar tu información si es necesario para mantener tu cuenta al día.",
      route: "profile/main",
    },
    {
      title: "Calificaciones",
      shortDescription: "Visualiza tus resultados por módulo y examen.",
      detailedDescription:
        "Esta sección te permite consultar tus calificaciones obtenidas en cada módulo, ver el promedio general, y acceder a los detalles de cada examen corregido. Ideal para hacer seguimiento a tu progreso académico.",
      route: "profile/grades",
    },
    {
      title: "Conferencias",
      shortDescription: "Explora el material de estudio asignado.",
      detailedDescription:
        "Aquí encontrarás los recursos educativos disponibles para cada conferencia: documentos, presentaciones, enlaces y archivos subidos por el docente. Todo organizado para facilitar tu aprendizaje.",
      route: "modules",
    },
    {
      title: "Avisos",
      shortDescription: "Mantente informado sobre cambios y anuncios.",
      detailedDescription:
        "Consulta los avisos publicados por el equipo académico: fechas importantes, cambios en el cronograma, recordatorios y noticias relevantes. Esta sección te mantiene al tanto de todo lo que ocurre en el aula virtual.",
      route: "notices",
    },
  ];
  return (
    <div className="my-20 md:w-1/2 py-6 w-[90%] bg-white mx-auto rounded-xl">
      <h2 className="font-bold text-2xl text-secondary text-center">
        Bienvenido al aula virtual GEFPSI
      </h2>
      <img
        src="/portada.png"
        alt=""
        className="rounded-xl w-4/5 mx-auto mt-6"
      />
      <div className="grid md:grid-cols-2 gap-4 mx-4 my-5">
        {homeFeatures.map((item, index) => (
          <CardComponent key={index} item={item} />
        ))}
      </div>
    </div>
  );
};
