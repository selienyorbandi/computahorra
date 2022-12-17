import imgPlaceholder from "../assets/img/white-placeholder.png";
export interface IItem {
  id: string;
  brandId: string;
  categoryId: string;
  description: string;
  img: string;
  price: number;
  stock: number;
  title: string;
  thumbnail: string;
  trending: boolean;
}

export const itemPlaceholder = {
  id: " ",
  brandId: " ",
  categoryId: " ",
  description: " ",
  img: imgPlaceholder,
  price: 0,
  stock: 0,
  title: " ",
  thumbnail: imgPlaceholder,
  trending: true,
};
