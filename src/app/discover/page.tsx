"use client";
import { Input } from "@/components/ui/input";
import { faCompass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProfilePreview } from "./_components/profile-preview";
import type { TagList } from "../../utils/icon-mapping";

export default function DiscoverPage() {
  return (
    <div className="flex w-full flex-col gap-4 p-6 lg:p-9">
      <div className="flex flex-col gap-4 self-stretch">
        <Header />
        <SearchBar />
      </div>
      <div className="flex justify-center rounded-xl border border-solid border-primary-300 bg-white p-6 lg:p-9 ">
        <CardContainer />
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="flex flex-col justify-center gap-2">
      <div className="relative flex items-center gap-3">
        <FontAwesomeIcon
          icon={faCompass}
          className="h-10 w-10 text-secondary-400"
        />
        <div className="h2 font-bold text-primary-900">Discover</div>
        <div className="absolute right-0 h-12 w-14 items-center rounded-lg bg-primary-500 p-2 lg:hidden"></div>
      </div>
      <div className="h5 lg:h4 text-primary-700">
        Unlock a World of Possibilities: Find Friends for Every Adventure on
        HeatHub!
      </div>
    </div>
  );
}

function SearchBar() {
  return (
    <div className="hidden flex-row items-center gap-4 self-stretch lg:flex">
      <Input className="h-full p-3" placeholder="Search for friends" />
      <div className="h-12 w-14 rounded-lg bg-primary-500 p-2"></div>
    </div>
  );
}

type userProps = {
  name: string;
  age: number;
  image: string;
  rating: number;
  reviews: number;
  interests: TagList;
  about: string;
};

const mockData: userProps[] = [
  {
    name: "BowyStar",
    age: 23,
    image: "/images/discover/mock-profile/mock-1.jpg",
    rating: 4.5,
    reviews: 10,
    interests: [
      "Football",
      "Music",
      "K-pop",
      "Movie",
      "Anime",
      "Book",
      "Fashion",
      "Animal",
      "Gym",
      "Photography",
      "Gaming",
      "Coffee",
      "Arts",
      "Camping",
      "Basketball",
    ],
    about:
      "I love to travel and explore new places. I'm looking for a travel buddy to go on a road trip with me to the Grand Canyon!",
  },
  {
    name: "JaySaeliew",
    age: 21,
    image: "/images/discover/mock-profile/mock-2.png",
    rating: 5.0,
    reviews: 10,
    interests: ["Arts", "Camping", "Basketball"],
    about:
      "I love to travel and explore new places. I'm looking for a travel buddy to go on a road trip with me to the Grand Canyon!",
  },
  {
    name: "Winnie",
    age: 21,
    image: "/images/discover/mock-profile/mock-3.png",
    rating: 4.9,
    reviews: 10,
    interests: ["Arts", "Camping", "Basketball"],
    about:
      "I love to travel and explore new places. I'm looking for a travel buddy to go on a road trip with me to the Grand Canyon!",
  },
  {
    name: "BowyStar",
    age: 23,
    image: "/images/discover/mock-profile/mock-1.jpg",
    rating: 4.5,
    reviews: 10,
    interests: ["Arts", "Camping", "Basketball"],
    about:
      "I love to travel and explore new places. I'm looking for a travel buddy to go on a road trip with me to the Grand Canyon!",
  },
  {
    name: "JaySaeliew",
    age: 21,
    image: "/images/discover/mock-profile/mock-2.png",
    rating: 5.0,
    reviews: 10,
    interests: ["Arts", "Camping", "Basketball"],
    about:
      "I love to travel and explore new places. I'm looking for a travel buddy to go on a road trip with me to the Grand Canyon!",
  },
  {
    name: "Winnie",
    age: 21,
    image: "/images/discover/mock-profile/mock-3.png",
    rating: 4.9,
    reviews: 10,
    interests: ["Arts", "Camping", "Basketball"],
    about:
      "I love to travel and explore new places. I'm looking for a travel buddy to go on a road trip with me to the Grand Canyon!",
  },
];

function CardContainer() {
  return (
    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-9 2xl:grid-cols-4">
      {mockData.map((profile, index) => (
        <ProfilePreview {...profile} key={index} />
      ))}
    </div>
  );
}
