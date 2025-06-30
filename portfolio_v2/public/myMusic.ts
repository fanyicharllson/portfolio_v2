interface Track {
  id: string;
  title: string;
  artist: string;
  url: string;
  duration: number;
}

export const playlist: Track[] = [
  {
    id: "1",
    title: "Ada - Not Alone",
    artist: "Ada Music",
    url: "/music/ada.mp3",
    duration: 180,
  },
  {
    id: "2",
    title: "Ogryzek - Aura",
    artist: "Ogryzek Phonk",
    url: "/music/aura_01.mp3",
    duration: 200,
  },
  {
    id: "3",
    title: "Irokz - Funk Universo",
    artist: "Irokz - Funk",
    url: "/music/aura_02.mp3",
    duration: 240,
  },
  {
    id: "4",
    title: "Slide da Treme Melodica v2",
    artist: "Slida da Treme Phonk",
    url: "/music/aura_03.mp3",
    duration: 120,
  },
  {
    id: "5",
    title: "Jujalarism - Funk",
    artist: "Jujalarism",
    url: "/music/aura_04.mp3",
    duration: 120,
  },
  {
    id: "6",
    title: "Showa - Drill",
    artist: "SYxngsux & Odyssybeat",
    url: "/music/showa.mp3",
    duration: 120,
  },
  {
    id: "7",
    title: "Ada - I Overcame",
    artist: "Ada",
    url: "/music/ada_01.mp3",
    duration: 120,
  },
  {
    id: "8",
    title: "Ada - I Testify",
    artist: "Ada",
    url: "/music/ada_02.mp3",
    duration: 120,
  },
  {
    id: "9",
    title: "Ada - In Your Name",
    artist: "Ada",
    url: "/music/ada_03.mp3",
    duration: 120,
  },
];
