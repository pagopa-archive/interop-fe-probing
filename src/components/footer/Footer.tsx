import {
  Footer,
  FooterLinksType,
  Languages,
  PreLoginFooterLinksType,
} from "@pagopa/mui-italia";

const lngs: Languages = {
  it: {
    it: "Italiano",
    en: "Inglese",
    fr: "Francese",
  },
  en: {
    it: "Italian",
    en: "English",
    fr: "French",
  },
  fr: {
    it: "Italien",
    en: "Anglais",
    fr: "Français",
  },
};

const pagoPALink = {
  href: "https://www.pagopa.it/",
  ariaLabel: "Link: vai al sito di PagoPA S.p.A.",
};
const postLoginLinks: FooterLinksType[] = [
  {
    label: "Informativa Privacy",
    href: "#informativa-privacy",
    ariaLabel: "Vai al link: Informativa Privacy",
    linkType: "internal",
  },
  {
    label: "Diritto alla protezione dei dati personali",
    href: "#diritto-allaprotezionedipersonalidati",
    ariaLabel: "Vai al link: Diritto alla protezione dei dati personali",
    linkType: "internal",
  },
  {
    label: "Termini e condizioni",
    href: "#terms-conditions",
    ariaLabel: "Vai al link: Termini e condizioni",
    linkType: "internal",
  },
  {
    label: "Accessibilità",
    href: "#accessibility",
    ariaLabel: "Vai al link: Accessibilità",
    linkType: "internal",
  },
];

const preLoginLinks: PreLoginFooterLinksType = {
  // First column
  aboutUs: {
    title: undefined,
    links: [
      {
        label: "Chi siamo",
        href: "https://www.pagopa.it/it/societa/chi-siamo/",
        ariaLabel: "Vai al link: Chi siamo",
        linkType: "internal",
      },
      {
        label: "PNRR",
        href: "https://www.pagopa.it/it/opportunita/pnrr/progetti/",
        ariaLabel: "Vai al link: PNRR",
        linkType: "internal",
      },
      {
        label: "Media",
        href: "https://www.pagopa.it/it/media/",
        ariaLabel: "Vai al link: Media",
        linkType: "internal",
      },
      {
        label: "Lavora con noi",
        href: "https://www.pagopa.it/it/lavora-con-noi/",
        ariaLabel: "Vai al link: Lavora con noi",
        linkType: "internal",
      },
    ],
  },
  // Third column
  resources: {
    title: "Risorse",
    links: [
      {
        label: "Informativa Privacy",
        href: "https://www.pagopa.it/it/privacy-policy/",
        ariaLabel: "Vai al link: Informativa Privacy",
        linkType: "internal",
      },
      {
        label: "Certificazioni",
        href: "https://www.pagopa.it/it/",
        ariaLabel: "Vai al link: Certificazioni",
        linkType: "internal",
      },
      {
        label: "Sicurezza delle informazioni",
        href: "https://www.pagopa.it/static/781646994f1f8ddad2d95af3aaedac3d/Sicurezza-delle-informazioni_PagoPA-S.p.A..pdf",
        ariaLabel: "Vai al link: Sicurezza delle informazioni",
        linkType: "internal",
      },
      {
        label: "Diritto alla protezione dei dati personali",
        href: "https://privacyportal-de.onetrust.com/webform/77f17844-04c3-4969-a11d-462ee77acbe1/9ab6533d-be4a-482e-929a-0d8d2ab29df8",
        ariaLabel: "Vai al link: Diritto alla protezione dei dati personali",
        linkType: "internal",
      },
      {
        label: "Preferenze Cookie",
        href: "https://pagopa.portaleamministrazionetrasparente.it/pagina811_cookie-policy.html",
        ariaLabel: "Vai al link: Preferenze Cookie",
        linkType: "internal",
      },
      {
        label: "Termini e Condizioni",
        href: "https://www.pagopa.it/it/termini-e-condizioni-di-utilizzo-del-sito/",
        ariaLabel: "Vai al link: Termini e Condizioni",
        linkType: "internal",
      },
      {
        label: "Società trasparente",
        href: "https://pagopa.portaleamministrazionetrasparente.it/pagina746_altri-contenuti.html",
        ariaLabel: "Vai al link: Società trasparente",
        linkType: "internal",
      },
      {
        label: "Responsible Disclosure Policy",
        href: "https://www.pagopa.it/it/responsible-disclosure-policy/",
        ariaLabel: "Vai al link: Responsible Disclosure Policy",
        linkType: "internal",
      },
      {
        label: "Modello 321",
        href: "https://pagopa.portaleamministrazionetrasparente.it/pagina746_altri-contenuti.htmls",
        ariaLabel: "Vai al link: Modello 321",
        linkType: "internal",
      },
    ],
  },
  // Fourth column
  followUs: {
    title: "Seguici su",
    socialLinks: [
      {
        icon: "linkedin",
        title: "LinkedIn",
        href: "https://www.linkedin.com/company/pagopa/",
        ariaLabel: "Link: vai al sito LinkedIn di PagoPA S.p.A.",
      },
      {
        title: "Twitter",
        icon: "twitter",
        href: "https://twitter.com/pagopa",
        ariaLabel: "Link: vai al sito Twitter di PagoPA S.p.A.",
      },
      {
        icon: "instagram",
        title: "Instagram",
        href: "https://www.instagram.com/pagopa/",
        ariaLabel: "Link: vai al sito Instagram di PagoPA S.p.A.",
      },
      {
        icon: "medium",
        title: "Medium",
        href: "https://medium.com/pagopa",
        ariaLabel: "Link: vai al sito Medium di PagoPA S.p.A.",
      },
    ],
    links: [
      {
        label: "Accessibilità",
        href: "https://form.agid.gov.it/view/eca3487c-f3cb-40be-a590-212eafc70058/",
        ariaLabel: "Vai al link: Accessibilità",
        linkType: "internal",
      },
    ],
  },
};

const AppFooter = () => {
  return (
    <footer>
      <Footer
        loggedUser={false}
        languages={lngs}
        onLanguageChanged={() => {}}
        companyLink={pagoPALink}
        postLoginLinks={postLoginLinks}
        preLoginLinks={preLoginLinks}
        currentLangCode="it"
        onExit={(exitAction) => {
          console.log("Executing exit Action");
          exitAction();
        }}
        productsJsonUrl="https://dev.selfcare.pagopa.it/assets/products.json"
        hideProductsColumn={false}
        legalInfo={
          <span>
            <strong>PagoPA S.p.A.</strong> - Società per azioni con socio unico
            - Capitale sociale di euro 1,000,000 interamente versato - Sede
            legale in Roma, Piazza Colonna 370, CAP 00187 - N. di iscrizione a
            Registro Imprese di Roma, CF e P.IVA 15376371009
          </span>
        }
      />
    </footer>
  );
};
export default AppFooter;
