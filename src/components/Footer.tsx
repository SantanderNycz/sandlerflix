import { useI18n } from "@/i18n/I18nContext";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-links">
          <ul>
            <li><a href="#">{t("footer-about")}</a></li>
            <li><a href="#">{t("footer-contact")}</a></li>
            <li><a href="#">{t("footer-terms")}</a></li>
            <li><a href="#">{t("footer-privacy")}</a></li>
          </ul>
        </div>
        <div className="footer-info">
          <p>
            Sandlerflix &copy; 2026. <span>{t("footer-disclaimer-1")}</span>
          </p>
          <p>{t("footer-disclaimer-2")}</p>
        </div>
      </div>
    </footer>
  );
}
