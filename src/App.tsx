import Router from "@/router";
import { HelmetProvider } from "react-helmet-async";

export default function App() {
  return (
    <HelmetProvider>
      <Router />
    </HelmetProvider>
  );
}
