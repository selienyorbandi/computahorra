import { createPortal } from "react-dom";

function ReactPortal({ children }: { children: JSX.Element }) {
  return createPortal(children, document.getElementById("portal-root") as HTMLElement);
}
export default ReactPortal;
