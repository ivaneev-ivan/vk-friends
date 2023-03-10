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

  const clickUsers = () => {
    const is_started_local = Boolean(Number(localStorage.getItem("isStarted")));
    if (!is_started_local) {
      localStorage.setItem("done_users", "0");
      removeAllTimeouts();
      return;
    }
    const error_message = document.querySelector(
      ".popup_box_container > div > div.box_body"
    );
    if (error_message !== undefined && error_message !== null) {
      const i_want_set = Number(localStorage.getItem("i_want_set"));
      const newtimeouts = [];
      for (let i = i_want_set; i < Number(data.countClick); i++) {
        newtimeouts.push(
          setTimeout(
            clickUsers,
            getRndInteger(
              Number(data.startDayLimit) * 1000 * i,
              Number(data.stopDayLimit) * 1000 * i
            )
          )
        );
      }
      removeAllTimeouts();
      localStorage.setItem("timeouts", JSON.stringify(newtimeouts));
      document.querySelector("div.box_x_button").dispatchEvent(clickEvent);
      return;
    } else {
      localStorage.setItem("done_users", String(done + 1));
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
    }
  };

  const clicking = async () => {
    const timeout = [];
    let set_error = false;
    for (const item of Object.keys(data)) {
      if (isNaN(Number(data[item])) || data[item] === " ") {
        setError("?????????????? ???????????? ?????????? ??????????");
        set_error = true;
        setTimeout(() => {
          setError(null);
        }, 3000);
        setIsStarted(false);
        localStorage.setItem("isStarted", "0");
      }
    }
    if (
      window.location.href !== "https://vk.com/friends?act=find" &&
      !set_error
    ) {
      setError("?????????????????? ???? ???????????? ????????????");
      setTimeout(() => {
        setError(null);
      }, 3000);
      setIsStarted(false);
      localStorage.setItem("isStarted", "0");
    } else if (!set_error) {
      for (let i = 1; i !== Number(data.countClick) + 1; i++) {
        if (i !== Number(data.countClick)) {
          // await sleep(1000).then(() => {
          //   console.log("ok"  );
          // });
          timeout.push(
            setTimeout(
              clickUsers,
              getRndInteger(
                Number(data.startDelay) * 1000 * i,
                Number(data.stopDelay) * 1000 * i
              )
            )
          );
        } else {
          console.log(i);
          timeout.push(
            setTimeout(() => {
              clickUsers();
              removeAllTimeouts();
              setIsStarted(false);
              localStorage.setItem("isStarted", "0");
            }, getRndInteger(Number(data.startDelay) * 1000 * i * 1.5, Number(data.stopDelay) * 1000 * i * 1.5))
          );
        }
      }
      localStorage.setItem("timeouts", JSON.stringify(timeout));
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
          <h3>?????????? ?????????? ????????????????</h3>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <input
                style={{ width: "50px" }}
                type="text"
                placeholder="????"
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
                placeholder="????"
                value={data.stopDelay}
                onChange={(ev) =>
                  setData({ ...data, stopDelay: ev.target.value })
                }
              />
            </div>
          </div>
        </div>
        <div>
          <h3>?????????? ?????? ???????????????????? ????????????</h3>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <input
                style={{ width: "50px" }}
                type="text"
                placeholder="????"
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
                placeholder="????"
                value={data.stopDayLimit}
                onChange={(ev) =>
                  setData({ ...data, stopDayLimit: ev.target.value })
                }
              />
            </div>
          </div>
        </div>
        <div>
          <h3>?????????????? ???????????? ????????????????????</h3>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <input
              style={{ width: "50px" }}
              type="text"
              value={data.countClick}
              onChange={(ev) =>
                setData({ ...data, countClick: ev.target.value })
              }
            />
            <span>???????????????????? ????????????: {done}</span>
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
            {isStarted ? "????????" : "????????????"}
          </button>
        </div>
        {error && (
          <h3 style={{ color: "red", textAlign: "center" }}>
            {error === "?????????????? ???????????? ?????????? ??????????" ? (
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
