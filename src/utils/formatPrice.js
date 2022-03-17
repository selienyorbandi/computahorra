export function formatPrice(price){
  return Intl.NumberFormat("es-AR", {style: "currency",currency: "ARS", minimumFractionDigits: 0}).format(price);
}