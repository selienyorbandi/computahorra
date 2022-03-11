import categorias from "mockDb/categorias.json";

export const getCategories = new Promise((resolve, reject)=> {
  const status = "200";
  if (status === "200"){
    setTimeout(() => {
      resolve(categorias);
    }, 400);
  } else {
    reject("Error");
  }
});