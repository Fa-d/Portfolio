import { useJsonData } from "./useJsonData";

export interface SiteStrings {
  FullName?: string;
  Position?: string;
  Subtitle?: string;
  AboutMeDescription?: string;
  AboutMeDescription2?: string;
  ExportTitle?: string;
}

export const DEFAULT_NAME = "MD. SADAKAT HUSSAIN FAHAD";
export const RESUME_PATH = "/assets/MD_SADAKAT_HUSSAIN_FAHAD.pdf";

export const useSiteStrings = () => useJsonData<SiteStrings>("/data/strings.json");
