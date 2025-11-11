const addons = [
  {
    id: 1,
    name: "Perkedel",
    price: 5000,
    image: require("../images/addons/perkedel.jpg"),
    categories: ["meat", "chicken"], // bisa muncul di dua kategori
  },
  {
    id: 2,
    name: "Sayur Nangka",
    price: 5000,
    image: require("../images/addons/sayur_nangka.webp"),
    categories: ["chicken"],
  },
  {
    id: 3,
    name: "Sambal Ijo",
    price: 5000,
    image: require("../images/addons/sambal_ijo.jpg"),
    categories: ["fish", "meat", "chicken"],
  },
  {
    id: 4,
    name: "Extra Ice",
    price: 3000,
    image: require("../images/addons/ice.webp"),
    categories: ["drink"],
  },
  {
    id: 5,
    name: "Extra Rice",
    price: 4000,
    image: require("../images/addons/rice.jpg"),
    categories: ["meat", "chicken", "fish"], // addon universal antar makanan
  },
];

export default addons;
