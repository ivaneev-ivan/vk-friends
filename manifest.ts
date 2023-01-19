import packageJson from "./package.json";

const manifest: chrome.runtime.ManifestV3 = {
  manifest_version: 3,
  name: "Vk Friends",
  version: packageJson.version,
  description: packageJson.description,
  options_page: "src/pages/options/index.html",
  background: { service_worker: "src/pages/background/index.js" },
  action: {
    default_popup: "src/pages/popup/index.html",
    default_icon: "icon48.png",
  },
  icons: {
    "128": "icon128.png",
  },
  content_scripts: [
    {
      matches: ["https://vk.com/*"],
      js: ["src/pages/content/index.js"],
    },
  ],
  web_accessible_resources: [
    {
      resources: [
        "assets/js/*.js",
        "assets/css/*.css",
        "icon128.png",
        "icon48.png",
      ],
      matches: ["https://vk.com/*"],
    },
  ],
  permissions: ["storage"],
};

export default manifest;
