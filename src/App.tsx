import { CSSProperties, useEffect, useState } from "react";
import { useInterval } from "usehooks-ts";

const styles: { [key: string]: CSSProperties } = {
  stack: {
    display: "flex",
    flexDirection: "column",
  },
  main: { width: "100%" },
  chip: {
    color: "#dbdded",
    wordSpacing: "-0.1rem",
    letterSpacing: "-0.01rem",
    textAlign: "center",
    fontFamily: "IBM Plex Sans KR",
    fontWeight: 400,
    fontSize: "0.85rem",
  },
  chipText: {},
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0.6rem 1.2rem 1.5rem 1.2rem",
    alignItems: "center",
    borderRadius: "0.5rem",
  },
  icons: {
    marginLeft: "auto",
    display: "flex",
    gap: "10px",
  },
  cardSection: {
    display: "flex",
    gap: "12px",
    maxWidth: "100%",
    justifyContent: "center",
  },
  topText: { color: "#fefeff", fontSize: "13px" },
  centerId: {
    display: "flex",
    gap: "25px",
    alignItems: "center",
  },
  button: {
    width: "100%",
    color: "#fff",
    backgroundColor: "#334ada",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "55px",
    borderRadius: "1rem",
    marginTop: 4,
  },
  card: {
    gap: "25px",
    padding: "30px",
    backgroundColor: "#1c37d6",
    borderRadius: "1rem",
    minWidth: "75dvw",
    color: "#000",
  },
  name: {
    fontSize: "1.35rem",
    fontWeight: 700,
    color: "#fefeff",
  },
  circle: {
    borderRadius: "50%",
    width: "0.6rem",
    height: "0.6rem",
    backgroundColor: "#fff",
  },
};

function App() {
  const param = new URLSearchParams(window.location.search);

  const [grade, setGrade] = useState(param.get("grade") || "3");
  const [name, setName] = useState(
    param.get("name") || window.localStorage.getItem("name") || "이름"
  );
  const [studentId, setStudentId] = useState(
    param.get("id") || window.localStorage.getItem("sid") || "학번"
  );
  const [second, setSecond] = useState(30);
  const [qrImageIndex, setQrImageIndex] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);

  useEffect(() => {
    window.localStorage.setItem("name", name);
  }, [name]);

  useEffect(() => {
    window.localStorage.setItem("sid", studentId);
  }, [studentId]);

  const refreshQr = () => {
    setQrImageIndex(!qrImageIndex);
    setSecond(30);
  };

  useInterval(
    () => {
      // Your custom logic here
      if (second === 0) {
        refreshQr();
      } else setSecond(second - 1);
    },
    // Delay in milliseconds or null to stop it
    1000
  );

  return (
    <>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      />
      <meta name="apple-mobile-web-app-capable" content="yes"></meta>

      <div style={{ ...styles.stack, ...styles.main }}>
        <div style={styles.topBar}>
          <img src="/hongik_logo.png" alt="" height={17} />
          <img src="/top-icons.png" height={38} />
        </div>
        <div style={styles.cardSection}>
          <div style={{ ...styles.stack, ...styles.card }}>
            <div style={styles.topText}>모바일 학생증</div>
            <div style={styles.centerId}>
              <div
                style={{
                  width: 65,
                  height: 65,
                  borderRadius: 65,
                  backgroundColor: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img src="/hongik_emblem_black.png" style={{}} width={55} />
              </div>
              <div
                style={{
                  alignItems: "flex-start",
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: -8,
                }}
              >
                <div style={styles.chip}>컴퓨터공학전공, 재학 {grade}학년</div>
                <div style={styles.name}>
                  {name} ({studentId})
                </div>
              </div>
            </div>
            <div style={styles.button} onClick={() => setModalOpened(true)}>
              <img src="/qr.png" height={35} />
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
            width: "100%",
            justifyContent: "center",
            margin: "8px 0",
          }}
        >
          <div style={styles.circle} />
          <div style={{ ...styles.circle, opacity: 0.3 }} />
        </div>
        <div style={{ marginTop: 80 }}>
          <div>
            학년 :
            <input value={grade} onChange={(e) => setGrade(e.target.value)} />
          </div>
          <div>
            이름 :
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            학번 :
            <input
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            />
          </div>
        </div>
      </div>
      {modalOpened && (
        <div
          style={{
            width: "100dvw",
            height: "100dvh",
            backgroundColor: "#00000078",
            zIndex: 200,
            position: "absolute",
            top: 0,
            display: "flex",
            flexDirection: "column-reverse",
          }}
        >
          <div
            style={{
              height: "88dvh",
              backgroundColor: "#F7F9FB",
              borderRadius: "1.2rem 1.2rem 0 0",
              display: "flex",
              flexDirection: "column",
              background: "linear-gradient(90deg, #1d38d5 40%, #2d4cc7 100%)",
            }}
          >
            <div
              style={{
                height: "50%",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                color: "#fff",
              }}
            >
              <img
                src="/hongik_logo_circle.png"
                style={{
                  position: "absolute",
                  top: 3,
                  left: 3,
                }}
                width={95}
              />

              <img
                src="/edit-icon.png"
                width={28}
                style={{
                  position: "absolute",
                  right: 12,
                  top: 12,
                }}
                onClick={() => setModalOpened(false)}
              />
              <div
                style={{
                  backgroundColor: "#fff",
                  opacity: 0.4,
                  width: 44,
                  height: 7,
                  borderRadius: 200,
                  margin: 22,
                }}
              />
              <div style={{ fontSize: 20, fontWeight: 550, marginTop: 12 }}>
                {name} ({studentId})
              </div>
              <div
                style={{
                  fontSize: 16,
                  fontFamily: "IBM Plex Sans KR",
                  color: "#fff",
                  letterSpacing: -0.4,
                  wordSpacing: -1,
                  // marginTop: 2,
                }}
              >
                컴퓨터공학전공 ,재학 {grade}학년
              </div>
            </div>
            <div
              style={{
                height: "100%",
                backgroundColor: "#f1f3f8",
                borderRadius: "1.5rem 1.5rem 0 0",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
              }}
            >
              <div
                style={{
                  backgroundColor: "#F1F5F9",
                  boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.08)",
                  marginTop: -61,
                  borderRadius: 200,
                  width: 89,
                  height: 89,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src="/hongik_emblem_black.png"
                  style={{
                    width: 74,
                  }}
                />
              </div>

              <img
                src={`/qr_${qrImageIndex ? 1 : 2}.png`}
                width={150}
                style={{
                  marginTop: 60,
                }}
              />

              <div
                style={{
                  display: "flex",
                  color: "#444950",
                  marginTop: 10,
                  alignItems: "flex-start",
                  gap: 4,
                  marginLeft: 8,
                  fontWeight: 600,
                }}
              >
                <div>{second} 초 남았습니다.</div>
                <img
                  src="/refresh.png"
                  onClick={refreshQr}
                  height={23}
                  width={23}
                />
              </div>
              <img
                src="/hongik_logo.png"
                height={25}
                style={{ marginTop: "auto", marginBottom: 78 }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
