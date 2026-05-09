export type OrganizationSource = {
  id: string;
  title: string;
  kind: "pdf" | "web";
  authority: string;
  imageUrl?: string;
  logoUrl?: string;
  url?: string;
  localPath?: string;
  validFrom?: string;
  validTo?: string;
  capturedAt: string;
  facts: string[];
};

export const organizationSources: OrganizationSource[] = [
  {
    id: "public-lodz-logo",
    title: "Logo Miasta Łodzi",
    kind: "web",
    authority: "City of Lodz / Wikimedia Commons",
    url: "https://commons.wikimedia.org/wiki/File:Logo_of_%C5%81%C3%B3d%C5%BA_05.svg",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/22/Logo_of_%C5%81%C3%B3d%C5%BA_05.svg",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/88/UM_Lodz.jpg",
    capturedAt: "2026-04-27",
    facts: [
      "Wikimedia wskazuje źródło logo jako oficjalną stronę Miasta Łodzi.",
      "Logo jest oznaczone jako public domain / simple geometry z informacją o możliwej ochronie znaku towarowego.",
      "Zdjęcie UM Łódź w demo pochodzi z Wikimedia Commons i opisuje Pałac Heinzla przy ul. Piotrkowskiej 104.",
    ],
  },
  {
    id: "public-invest-lodz",
    title: "Invest in Łódź",
    kind: "web",
    authority: "Official Invest in Łódź website",
    url: "https://invest.lodz.pl/",
    logoUrl: "https://invest.lodz.pl/typo3conf/ext/invest_in_lodz/Resources/Public/Images/logos/invest_poziom.jpg",
    imageUrl: "https://invest.lodz.pl/files/public/_processed_/6/5/csm_Ul._Piotrkowska_Plac_Wolnosci_ul._Legionow_dron_fotZydowicz_28-03-24__2__7d9cad9a5c.jpg",
    capturedAt: "2026-04-27",
    facts: [
      "Oficjalny serwis Invest in Łódź publikuje logo oraz zdjęcia miasta używane w publicznym profilu źródła.",
      "Źródło służy w demo do pokazania wzbogacania organizacji o publiczny kontekst i link.",
      "Dane kontaktowe w CRM pozostają fikcyjne; publiczne są tylko assety i linki organizacji.",
    ],
  },
  {
    id: "public-zlm",
    title: "Zarząd Lokali Miejskich",
    kind: "web",
    authority: "Official ZLM website",
    url: "https://zlm.lodz.pl/",
    logoUrl: "https://zlm.lodz.pl/files/zlm/public/logo-ZLM.png",
    imageUrl: "https://zlm.lodz.pl/files/public/_processed_/6/7/csm_1_kamienica_i_kwiaty_a30c7edf3b.jpg",
    capturedAt: "2026-04-27",
    facts: [
      "Oficjalny serwis ZLM publikuje logo Zarządu Lokali Miejskich i zdjęcia związane z miejskimi lokalami.",
      "W demo ZLM jest przykładem organizacji, przy której Relora pokazuje realny link, logo i zdjęcie źródłowe.",
      "To publiczny profil organizacji, nie prywatny rekord z uploadu użytkownika.",
    ],
  },
];
