import { createRoot } from "react-dom/client";
import App from "@src/pages/content/components/VkFriends/app";
import refreshOnUpdate from "virtual:reload-on-update-in-view";

refreshOnUpdate("pages/content/components/VkFriends");

const wrapper = document.querySelector(".HeaderNav__item--gap");
const root = document.createElement("div");
root.className = "HeaderNav__btns";
createRoot(root).render(<App />);
wrapper.parentNode.insertBefore(root, wrapper.nextElementSibling);
