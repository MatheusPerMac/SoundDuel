// ============================================================
//  SOUNDDUEL — CONFIGURAÇÕES
//  Edite este arquivo para ativar afiliados e Google Ads
// ============================================================
const CONFIG = {

  // ----------------------------------------------------------
  //  GOOGLE ADSENSE
  //  1. Crie sua conta em: https://adsense.google.com
  //  2. Cole seu Publisher ID abaixo (ca-pub-XXXXXXXXXXXXXXXX)
  //  3. Troque enabled para true
  // ----------------------------------------------------------
  adsense: {
    enabled: false,
    publisherId: "ca-pub-XXXXXXXXXXXXXXXX",
    slots: {
      banner_top:    "XXXXXXXXXX",  // Banner topo (728x90 / responsive)
      banner_middle: "XXXXXXXXXX",  // Banner entre specs e vídeos
      banner_bottom: "XXXXXXXXXX",  // Banner rodapé
    }
  },

  // ----------------------------------------------------------
  //  LINKS DE AFILIADO
  //  Amazon:        https://afiliados.amazon.com.br
  //  Mercado Livre: https://developers.mercadolivre.com.br/pt_br/afiliados
  //  Shopee:        https://affiliate.shopee.com.br
  // ----------------------------------------------------------
  affiliate: {
    amazon: {
      enabled: false,
      tag: "seutag-20",  // Sua tag de afiliado Amazon (ex: meusite-20)
    },
    mercadolivre: {
      enabled: false,
      // Prefixo da URL de rastreamento ML
      // Ex: "https://mercadolivre.com/afiliados/SEUTAG?url="
      trackingPrefix: "",
    },
    shopee: {
      enabled: false,
      // Prefixo da URL de rastreamento Shopee
      // Ex: "https://s.shopee.com.br/SEULINK?url="
      trackingPrefix: "",
    }
  },

  // ----------------------------------------------------------
  //  SEO & SITE
  // ----------------------------------------------------------
  site: {
    name:        "SoundDuel",
    tagline:     "Compare Fones Bluetooth",
    description: "Compare fones Bluetooth lado a lado. Specs técnicas, prós, contras, vídeos e links de compra.",
    url:         "https://seusite.com.br",
  }
};
