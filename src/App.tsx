import { Route, Routes } from "react-router-dom";
import { AdminLinksPage } from "./pages/AdminLinksPage";
import { InvitationPage } from "./pages/InvitationPage";

export default function App() {
  return (
    <Routes>
      <Route path="/panel-invitados" element={<AdminLinksPage />} />
      <Route path="/:codigo" element={<InvitationPage />} />
      <Route path="*" element={<InvitationPage />} />
    </Routes>
  );
}
