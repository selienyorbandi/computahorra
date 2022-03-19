import products from "mockDb/productos.json";

export const getItems = new Promise((resolve, reject)=> {
  const status = "200";
  if (status === "200"){
    setTimeout(() => {
      resolve(products);
    }, 400);
  } else {
    reject("Error");
  }
});