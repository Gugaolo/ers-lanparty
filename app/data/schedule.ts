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
    range: "15:00 - 24:00",
    slots: [
      { time: "15:00 - 17:00", title: "Prihod, registracija, postavitev računalnikov" },
      { time: "17:00 - 17:30", title: "Uradna otvoritev, pozdravni govor, razlaga pravil" },
      { time: "17:30 - 24:00", title: "CS2 - skupinski del tekem" },
    ],
  },
  {
    name: "2. dan - Sobota",
    range: "10:00 - 23:00",
    slots: [
      { time: "10:00 - 13:00", title: "CS2 - nadaljevanje (skupinski del in izločilni boji)" },
      { time: "13:00 - 14:00", title: "Odmor za kosilo" },
      { time: "14:00 - 18:00", title: "CS2 - polfinale in finale" },
      { time: "18:00 - 19:00", title: "Odmor / priprava na večerne igre" },
      { time: "19:00 - 23:00", title: "Turnirji Fortnite & Rocket League", desc: "Tekmovalne in zabavne igre" },
    ],
  },
  {
    name: "3. dan - Nedelja",
    range: "10:00 - 17:00",
    slots: [
      { time: "10:00 - 13:00", title: "Finala Fortnite & Rocket League" },
      { time: "13:00 - 14:00", title: "Odmor" },
      { time: "14:00 - 15:00", title: "Podelitev nagrad in razglasitev zmagovalcev" },
      { time: "15:00 - 17:00", title: "Pospravljanje opreme, prosta igra, zaključek dogodka" },
    ],
  },
];
