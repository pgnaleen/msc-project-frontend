export interface LangModel {
  tenantId: number;
  supportedLanguage: string;
  languageItems: Map<string, Map<string, string>>;
}
