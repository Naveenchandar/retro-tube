import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "Real Madrid",
    description:"Real Madrid is a spanish footbal club.",
    img: 'https://www.teahub.io/photos/full/6-69018_real-madrid-wallpaper-desktop-on-wallpaper-hd-1600.jpg',
    shortForm: 'rm'

  },
  {
    _id: uuid(),
    categoryName: "Manchester United",
    description: "Manchester United is a english football club.",
    img: 'https://wallpaper.dog/large/5561302.jpg',
    shortForm: 'mu'
  },
  {
    _id: uuid(),
    categoryName: "Juventus",
    description: "Juventus is a italian football club.",
    img: 'https://wallpaperaccess.com/full/1097799.jpg',
    shortForm: 'ju'
  },
  {
    _id: uuid(),
    categoryName: "Bayern Munich",
    description: "Bayern Munichen is a german football clun.",
    img: 'https://wallpaperaccess.com/full/2308835.jpg',
    shortForm: 'bm'
  },
];
