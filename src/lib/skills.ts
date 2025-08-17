import { iconPaths } from "./IconPaths";

interface Icon {
    icon: keyof typeof iconPaths;
}

interface Skill extends Icon {
    title: string;
    description: string;
    strongText: string;
}

const skills: Skill[] = [
    {
        title: "Entrevista inicial y valoración física.",
        description:
            "La valoración y el razonamiento clínico son la base de una",
        icon: "videoCamera", // Cambiado de iconName a icon
        strongText: "rehabilitación exitosa",
    },
    {
        title: "Educación en dolor y herramientas de manejo",
        description:
            "El atleta adquirirá conocimiento que le ayudará a entender su dolor y herramientas para abordarlo con autoeficacia",
        icon: "books", // Cambiado de iconName a icon
        strongText: "Generamos atletas independientes."

    },
    {
        title: "Tratamiento con ejercicio y ajustes de la programación",
        description:
            "Trabajaremos con un programa de ejercicios, un registro de datos que nos ayude en la toma de decisiones y ",
        icon: "barbell", // Cambiado de iconName a icon
        strongText: "recomendaciones para optimizar tu entrenamiento durante el proceso de rehabilitación.",
    },
    {
        title: "Contacto directo con el atleta y su entrenador",
        description:
            "El trabajo interdisciplinar es indispensable. El fisioterapeuta debe conocer las demandas de tu deporte para ",
        icon: "person", // Cambiado de iconName a icon
        strongText: "comunicarse correctamente con tu entrenador."

    },
    {
        title: "Revisiones periódicas",
        description:
            "Una hora de clínica nunca fue suficiente… ",
        icon: "strategy", // Cambiado de iconName a icon
        strongText: "Revisiones periódicas de forma semanal y contacto diario."
    }
];


export default skills;