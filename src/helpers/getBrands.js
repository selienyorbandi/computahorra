import brands from "mockDb/marcas.json";

export const getBrands = new Promise((resolve, reject)=> {
  const status = "200";
  if (status === "200"){
    setTimeout(() => {
      resolve(brands);
    }, 400);
  } else {
    reject("Error");
  }
});