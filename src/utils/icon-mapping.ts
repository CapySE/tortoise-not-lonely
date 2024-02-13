import {
  faBasketball,
  faBook,
  faCamera,
  faDumbbell,
  faFilm,
  faFutbol,
  faGamepad,
  faMugHot,
  faMusic,
  faPalette,
  faPaw,
  faShirt,
  faTents,
} from "@fortawesome/free-solid-svg-icons";

export const tagList = {
  Football: faFutbol,
  Music: faMusic,
  "K-pop": faMusic,
  Movie: faFilm,
  Anime: faFilm,
  Book: faBook,
  Fashion: faShirt,
  Animal: faPaw,
  Gym: faDumbbell,
  Photography: faCamera,
  Gaming: faGamepad,
  Coffee: faMugHot,
  Arts: faPalette,
  Camping: faTents,
  Basketball: faBasketball,
} as const;

export type Tag = keyof typeof tagList;
export type TagList = Tag[];