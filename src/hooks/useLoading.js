import { useContext } from "react";
import { LoadingContext } from "../context/LoadingContext.jsx";

export default function useLoading() {
  return useContext(LoadingContext);
}
