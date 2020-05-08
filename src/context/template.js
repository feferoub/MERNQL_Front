import { createContext, useContext } from "react";

export const TemplateContext = createContext();

export function useTemplate() {
  return useContext(TemplateContext);
}
