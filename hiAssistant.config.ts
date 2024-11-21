interface assistantConfig {
  title: string;
  model: string;
  role: "user";
}
export const assistantConfig: assistantConfig = {
  title: "Hi Assistant",
  model: "gpt-4o-mini",
  role: "user",
};
