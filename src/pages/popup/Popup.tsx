import logo from "@assets/img/image-menu.png";
import "@src/assets/style/Popup.css";

const Popup = () => {
  return (
    <div>
      <header>
        <p>
          <span>Перейдите в раздел рекомендуемых друзей </span>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://vk.com/friends?act=find"
          >
            https://vk.com/friends?act=find
          </a>
          <span> и найдите иконку добавления друзей вот тут</span>
        </p>
        <img src={logo} alt="Перейдите в раздел рекомендуемых друзей" />
      </header>
    </div>
  );
};

export default Popup;
