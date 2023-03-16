import { FC, useEffect, useRef, useState } from "react";

interface IData {
  startDelay: string;
  stopDelay: string;
  startDayLimit: string;
  stopDayLimit: string;
  countClick: string;
}

const clickEvent = new MouseEvent("click", {
  view: window,
  bubbles: true,
  cancelable: false,
});

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function checkVisible(elm, threshold, mode) {
  threshold = threshold || 0;
  mode = mode || "visible";

  const rect = elm.getBoundingClientRect();
  const viewHeight = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight
  );
  const above = rect.bottom - threshold < 0;
  const below = rect.top - viewHeight + threshold >= 0;

  return mode === "above" ? above : mode === "below" ? below : !above && !below;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const SideBar: FC<{ show: boolean }> = ({ show }) => {
  const [data, setData] = useState<IData>({} as IData);
  const [error, setError] = useState<string | null>(null);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [done, setDone] = useState(0);
  const helperRef = useRef(0);

  useEffect(() => {
    const sidebar_data_sleep = localStorage.getItem("sidebar_data_sleep");
    if (sidebar_data_sleep !== null) {
      setData(JSON.parse(sidebar_data_sleep));
    }
    localStorage.setItem("done_users", String(1));
  }, []);

  useEffect(() => {
    localStorage.setItem("sidebar_data_sleep", JSON.stringify(data));
  }, [data]);

  const removeAllTimeouts = () => {
    const timeouts = JSON.parse(localStorage.getItem("timeouts"));
    for (const timeout of timeouts) {
      clearTimeout(timeout);
    }
  };

  useEffect(() => {
    if (!isStarted) {
      helperRef.current = 0;
      setDone(0);
    }
  }, [isStarted]);

  const clickUsers = async () => {
    const is_started_local = Boolean(Number(localStorage.getItem("isStarted")));
    if (!is_started_local) {
      localStorage.setItem("done_users", "0");
      return "stoped";
    }
    const error_message = document.querySelector(
      ".popup_box_container > div > div.box_body"
    );
    if (error_message !== undefined && error_message !== null) {
      document.querySelector("div.box_x_button").dispatchEvent(clickEvent);
      return "time_limit";
    } else {
      localStorage.setItem("done_users", String(done + 1));
      if (window.location.href === "https://vk.com/friends?act=find") {
        const users = document.querySelectorAll(
          "div.friends_find_user.clear_fix:not(.touched)"
        );
        if (!checkVisible(users[0], 160, "visible")) {
          users[0].scrollIntoView();
        }
        users[0]
          .querySelector("a.friends_find_user_add")
          .dispatchEvent(clickEvent);
        helperRef.current += 1;
        setDone(helperRef.current);
      } else {
        const users = document.querySelectorAll(
          'button.search_sub_button[style=""]'
        );
        if (users.length === 0) {
          try {
            document.getElementById("ui_search_load_more"), "this is element";
            document
              .getElementById("ui_search_load_more")
              .dispatchEvent(clickEvent);
          } catch (e) {
            console.log(e);
          }
          const a = document.querySelectorAll(
            'button.search_sub_button[style="display: none;"]'
          );
          a[a.length - 1].scrollIntoView();
          await sleep(getRndInteger(1 * 1000, 2 * 1000));
          return await clickUsers();
        }
        if (!checkVisible(users[0], 50, "visible")) {
          users[0].scrollIntoView();
        }
        users[0].dispatchEvent(clickEvent);
        helperRef.current += 1;
        setDone(helperRef.current);
      }
      return "ok";
    }
  };
  const clicking = async () => {
    let set_error = false;
    for (const item of Object.keys(data)) {
      if (isNaN(Number(data[item])) || data[item] === " ") {
        setError("Вводите только целые цифры");
        set_error = true;
        setTimeout(() => {
          setError(null);
        }, 3000);
        setIsStarted(false);
        localStorage.setItem("isStarted", "0");
      }
    }
    if (
      !window.location.href.includes("https://vk.com/friends?act=find") &&
      !set_error
    ) {
      setError("Перейдите по данной ссылке");
      setTimeout(() => {
        setError(null);
      }, 3000);
      setIsStarted(false);
      localStorage.setItem("isStarted", "0");
    } else if (!set_error) {
      let stope = false;
      for (let i = 1; i !== Number(data.countClick) + 1; i++) {
        if (stope) {
          setIsStarted(false);
          localStorage.setItem("isStarted", "0");
          break;
        }
        await sleep(
          getRndInteger(
            Number(data.startDelay) * 1000,
            Number(data.stopDelay) * 1000
          )
        ).then(async () => {
          const click_result = await clickUsers();
          if (click_result === "stoped") {
            stope = true;
          } else if (click_result === "time_limit") {
            console.log("Time limit");
            await sleep(
              getRndInteger(
                Number(data.startDayLimit) * 1000,
                Number(data.stopDayLimit) * 1000
              )
            ).then(() => {
              console.log("continue");
            });
          }
        });
      }
      setIsStarted(false);
      localStorage.setItem("isStarted", "0");
    }
  };

  const startClick = async () => {
    setIsStarted(!isStarted);
    localStorage.setItem("isStarted", String(Number(!isStarted)));
    if (!isStarted) {
      clicking();
    } else {
      helperRef.current = 0;
      setDone(helperRef.current);
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        width: "200px",
        top: "50px",
        left: "-1px",
        padding: "10px",
        opacity: Number(show),
        overflow: show ? "visible" : "hidden",
        background: "var(--modal_card_background)",
        zIndex: "1000",
        border: "1px solid var(--separator_common)",
        borderTop: "none",
        borderRadius:
          "0 0 var(--vkui--size_border_radius_paper--regular, 8px) var(--vkui--size_border_radius_paper--regular, 8px)",
        WebkitBoxShadow: "0 20px 40px 0 rgb(0 0 0 / 30%)",
        boxShadow: "0 20px 40px 0 rgb(0 0 0 / 30%)",
        WebkitTransition:
          "opacity 100ms linear,top 100ms linear,visibility 100ms linear",
        transition:
          "opacity 100ms linear,top 100ms linear,visibility 100ms linear",
        cursor: "default",
        pointerEvents: show ? "auto" : "none",
      }}
    >
      <div className="wall_module ui_scroll_container ui_scroll_default_theme">
        <h2>
          <a
            href="https://admin1.ru/vkmanagerpro/"
            target="_blank"
            rel="noreferrer"
          >
            VK Manager PRO
          </a>
        </h2>
        <div>
          <h3>Пауза между анкетами</h3>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <input
                style={{ width: "50px" }}
                type="text"
                placeholder="От"
                value={data.startDelay}
                onChange={(ev) =>
                  setData({ ...data, startDelay: ev.target.value })
                }
              />
            </div>
            <span style={{ fontWeight: "bold" }}>---</span>
            <div>
              <input
                style={{ width: "50px" }}
                type="text"
                placeholder="До"
                value={data.stopDelay}
                onChange={(ev) =>
                  setData({ ...data, stopDelay: ev.target.value })
                }
              />
            </div>
          </div>
        </div>
        <div>
          <h3>Пауза при достижении лимита</h3>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <input
                style={{ width: "50px" }}
                type="text"
                placeholder="От"
                value={data.startDayLimit}
                onChange={(ev) =>
                  setData({ ...data, startDayLimit: ev.target.value })
                }
              />
            </div>
            <span style={{ fontWeight: "bold" }}>---</span>
            <div>
              <input
                style={{ width: "50px" }}
                type="text"
                placeholder="До"
                value={data.stopDayLimit}
                onChange={(ev) =>
                  setData({ ...data, stopDayLimit: ev.target.value })
                }
              />
            </div>
          </div>
        </div>
        <div>
          <h3>Сколько друзей пригласить</h3>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <input
              style={{ width: "50px" }}
              type="text"
              value={data.countClick}
              onChange={(ev) =>
                setData({ ...data, countClick: ev.target.value })
              }
            />
            <span>Приглашено друзей: {done}</span>
          </div>
        </div>
        <div
          style={{
            marginTop: "15px",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <button
            className="FlatButton FlatButton--primary FlatButton--size-m"
            onClick={startClick}
          >
            {isStarted ? "Стоп" : "Начать"}
          </button>
        </div>
        {error && (
          <h3 style={{ color: "red", textAlign: "center" }}>
            {error === "Вводите только целые цифры" ? (
              error
            ) : (
              <>
                <p>{error}</p>
                <a href="https://vk.com/friends?act=find">
                  https://vk.com/friends?act=find
                </a>
              </>
            )}
          </h3>
        )}
      </div>
    </div>
  );
};

export default SideBar;
