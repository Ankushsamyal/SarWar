import axios from "axios";
import { NA } from "../constant/appConstant";
import { Character } from "../types/Character";
import BeruWhitesunLars from "../assets/character/Beru_Whitesun_lars.svg";
import BiggsDarklighter from "../assets/character/Biggs_Darklighter.svg";
import C3PO from "../assets/character/C-3PO.svg";
import DarthVader from "../assets/character/Darth_Vader.svg";
import LeiaOrgana from "../assets/character/Leia_Organa.svg";
import LukeSkywalke from "../assets/character/Luke_Skywalke.svg";
import ObiWanKenobi from "../assets/character/Obi-Wan_Kenobi.svg";
import OwenLars from "../assets/character/Owen_Lars.svg";
import R2D2 from "../assets/character/R2-D2.svg";
import R5D4 from "../assets/character/R5-D4.svg";
export const FormatAllCharacter = async (
  swapiResults: any[]
): Promise<Character[]> => {
  return Promise.all(
    swapiResults.map(async (char: any) => {
      const id = parseInt(char.url.split("/").filter(Boolean).pop() || "0", 10);
      const speciesData = await getApiFetch(char.species);
      const homeworldData = await getApiFetch(char.homeworld);
      const filmsData = await Promise.all(
        char.films.map(async (filmUrl: string) => {
          const filmData = await getApiFetch(filmUrl);
          return filmData.title;
        })
      );
      return {
        id,
        name: char.name,
        height: char.height,
        mass: char.mass,
        hair_color: char.hair_color,
        skin_color: char.skin_color,
        eye_color: char.eye_color,
        birth_year: char.birth_year,
        gender: char.gender,
        homeworld: getEmpty(homeworldData || homeworldData),
        films: filmsData,
        species: getEmpty(speciesData?.name || speciesData),
        vehicles: char.vehicles,
        starships: char.starships,
        created: formatDateForUI(char.created),
      };
    })
  );
};

export function formatDateForUI(isoDate: string | Date) {
  if (!isoDate) return "";
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function getEmpty(value: any) {
  if (!value) return NA;
  if (Array.isArray(value)) {
    return value.length > 0 ? value.join(", ") : NA;
  }
  if (typeof value === "string" && value.trim() === "") return NA;
  return value;
}

async function getApiFetch(path: any): Promise<any> {
  if (!path) return NA;
  if (!path || (Array.isArray(path) && path.length === 0)) {
    return NA;
  }
  try {
    const response = await axios.get(path);
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return NA;
  }
}

const starWarImages = [
  { name: "Beru Whitesun Lars", image: BeruWhitesunLars },
  { name: "Biggs Darklighter", image: BiggsDarklighter },
  { name: "C-3PO", image: C3PO },
  { name: "Darth Vader", image: DarthVader },
  { name: "Leia Organa", image: LeiaOrgana },
  { name: "Luke Skywalker", image: LukeSkywalke },
  { name: "Obi-Wan Kenobi", image: ObiWanKenobi },
  { name: "Owen Lars", image: OwenLars },
  { name: "R2-D2", image: R2D2 },
  { name: "R5-D4", image: R5D4 },
];

export function getCharacterImageByName(name: string) {
  name = name.toLowerCase();
  const character = starWarImages.find(
    (char) => char.name.toLowerCase() === name
  );
  return character ? character.image : null;
}

export function getBgColorBySpecies(species: any) {
  switch (species.toLowerCase()) {
    case "human":
      return "bg-yellow-600";
    case "droid":
      return "bg-gray-800";
    case "wookiee":
      return "bg-red-700";
    case "rodian":
      return "bg-green-600";
    default:
      return "bg-blue-900";
  }
}
