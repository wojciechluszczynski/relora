export type OrganizationSource = {
  id: string;
  title: string;
  kind: "pdf" | "web";
  authority: string;
  url?: string;
  localPath?: string;
  validFrom?: string;
  validTo?: string;
  capturedAt: string;
  facts: string[];
};

export const organizationSources: OrganizationSource[] = [
  {
    id: "uml-ou-schemat-20260101-20260102",
    title: "Schemat organizacyjny Urzędu Miasta Łodzi",
    kind: "pdf",
    authority: "Urząd Miasta Łodzi",
    localPath: "/Users/wojciech/Downloads/OU_schemat_20260101_20260102.pdf",
    validFrom: "2026-01-01",
    validTo: "2026-01-02",
    capturedAt: "2026-04-27",
    facts: [
      "Załącznik do zarządzenia Nr 2675/2025 Prezydenta Miasta Łodzi.",
      "Schemat obejmuje Prezydenta Miasta Łodzi, wiceprezydentów, Sekretarza, Skarbnika i departamenty UMŁ.",
      "W schemacie występują m.in. Departament Prezydenta, Departament Planowania i Rozwoju Gospodarczego, Departament Pracy, Edukacji i Kultury, Departament Zdrowia, Sportu i Spraw Społecznych, Departament Strategii i Promocji, Departament Organizacji Urzędu i Obsługi Mieszkańców oraz Departament Finansów Publicznych.",
    ],
  },
  {
    id: "uml-prezydent-wiceprezydenci",
    title: "Prezydent i wiceprezydenci",
    kind: "web",
    authority: "Urząd Miasta Łodzi",
    url: "https://uml.lodz.pl/urzad-miasta-lodzi/prezydent-i-wiceprezydenci/",
    capturedAt: "2026-04-27",
    facts: [
      "Strona UML wskazuje Hannę Zdanowską jako Prezydent Miasta Łodzi.",
      "Strona UML wskazuje wiceprezydentów: Adam Pustelnik, Małgorzata Moskwa-Wodnicka, Tomasz Piotrowski i Adam Wieczorek.",
      "Strona linkuje do struktury UMŁ w BIP jako źródła organizacyjnego.",
    ],
  },
];
