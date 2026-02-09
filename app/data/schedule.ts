export type Slot = {
  time: string;
  title: string;
  desc?: string;
};

export type Day = {
  name: string;
  range: string;
  slots: Slot[];
};

export const SCHEDULE: Day[] = [
  {
    name: "1. dan - Petek",
    range: "17:00 - 24:00",
    slots: [
      { time: "17:00 - 17:30", title: "Prihod, registracija, postavitev računalnikov" },
      { time: "17:30 - 17:40", title: "Uradna otvoritev, pozdravni govor, razlaga pravil" },
      { time: "17:40 - 19:00", title: "FIFA Mini Turnir" },
      { time: "19:00 - 19:30", title: "Odmor, prirpava na CS2 turnir, Clash Royale" },
      { time: "19:30 - 24:00", title: "CS2 - turnir" },
      { time: "24:00 - ", title: "Prosta igra, druženje, priprava na naslednji dan" },
    ],
  },
  {
    name: "2. dan - Sobota",
    range: "10:00 - 23:00",
    slots: [
      { time: "10:00 - 10:30", title: "Prihod, ponovna registracija, postavitev računalnikov" },
      { time: "10:30 - 14:00", title: "Prosta igra, priprave na Rocket League turnir, malica/kosilo" },
      { time: "14:00 - 18:00", title: "Rocket League - turnir" },
      { time: "18:00 - 20:00", title: "Odmor / priprava na Fortnite turnir" },
      { time: "20:00 - 24:00", title: "Fortnite turnir" },
      { time: "24:00 - ", title: "Prosta igra, druženje" },
    ],
  },
];
