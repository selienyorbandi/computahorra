export function countTotalQuantity(arrayOfObjects) {
  let total = 0;
  if(arrayOfObjects.length > 0) {
    arrayOfObjects.forEach(element => {
      total += element.quantity;    
    });
  }
  return total;
}