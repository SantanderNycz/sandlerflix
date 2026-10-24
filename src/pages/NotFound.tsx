import { Link } from "react-router-dom";
import { useI18n } from "@/i18n/I18nContext";

export function NotFound() {
  const { t } = useI18n();
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
        textAlign: "center",
        padding: "0 4%",
      }}
    >
      <img src="/assets/logo.png" alt="Sandlerflix" style={{ width: 220 }} />
      <h1 style={{ fontSize: "2rem" }}>404 — {t("notfound-title")}</h1>
      <Link to="/inicio" className="btn btn-play" style={{ padding: "10px 20px" }}>
        {t("notfound-back")}
      </Link>
    </div>
  );
}
