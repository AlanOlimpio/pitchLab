type SiteConfig = {
  site_domain: string;
  site_name: string;
  site_description: string;
};

export const siteConfig: SiteConfig = {
  site_name: "PitchLab — Desafio Técnico Fullstack Pleno",
  site_description:
    "Miniaplicação de ideação colaborativa com chat em tempo real, ideias votáveis e assistente de IA (via Groq) para resumo, tags e pitch gerados a partir da conversa.",
  site_domain: process.env.APP_URL!,
};
