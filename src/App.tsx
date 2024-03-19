import { CSSProperties, useState } from 'react';
import { useInterval } from 'usehooks-ts';

const styles: { [key: string]: CSSProperties } = {
  stack: { display: 'flex', flexDirection: 'column' },
  main: { width: '100%' },
  chip: {
    gap: '5px',
    padding: '0.2rem 0.8rem',
    backgroundColor: '#f1f1f1',
    borderRadius: '200rem',
    color: '#898E96',
    wordSpacing: '-0.1rem',
    letterSpacing: '-0.01rem',
    textAlign: 'center',
    fontSize: '0.8rem',
    fontWeight: 500,
  },
  chipText: {},
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.5rem',
    alignItems: 'center',
    borderRadius: '0.5rem',
  },
  icons: {
    marginLeft: 'auto',
    display: 'flex',
    gap: '10px',
  },
  cardSection: {
    display: 'flex',
    gap: '12px',
    maxWidth: '100%',
    overflow: 'hidden',
    paddingLeft: '7.5dvw',
  },
  topText: { color: '#8795a4', fontSize: '12px' },
  centerId: { display: 'flex', gap: '10px' },
  button: {
    width: '100%',
    color: '#fff',
    backgroundColor: '#034a9f',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50px',
    borderRadius: '200px',
  },
  card: {
    gap: '12px',
    padding: '1rem 1.2rem',
    backgroundColor: '#fff',
    borderRadius: '0.8rem',
    minWidth: '75dvw',
    color: '#000',
  },
  name: {
    fontSize: '1.4rem',
    fontWeight: 500,
  },
  circle: {
    borderRadius: '50%',
    width: '0.6rem',
    height: '0.6rem',
    backgroundColor: '#fff',
  },
};

function App() {
  const param = new URLSearchParams(window.location.search);

  const [grade, setGrade] = useState(param.get('grade') || '3');
  const [name, setName] = useState(param.get('name') || '이름');
  const [studentId, setStudentId] = useState(param.get('id') || '학번');
  const [second, setSecond] = useState(30);
  const [qrImageIndex, setQrImageIndex] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);

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
          <img src="/top-logo.png" alt="" height={40} />
          <img src="/top-icons.png" height={40} />
        </div>
        <div style={styles.cardSection}>
          <div style={{ ...styles.stack, ...styles.card }}>
            <div style={styles.topText}>모바일 학생증</div>
            <div style={styles.centerId}>
              <img src="/logo.png" style={{ marginLeft: -8 }} width={80} />
              <div
                style={{
                  alignItems: 'flex-start',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '5px',
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
              <img src="/qr.png" height={33} />
            </div>
          </div>
          <div style={{ ...styles.stack, ...styles.card }}></div>
        </div>
        <div
          style={{
            display: 'flex',
            gap: 8,
            alignItems: 'center',
            width: '100%',
            justifyContent: 'center',
            margin: '8px 0',
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
            width: '100dvw',
            height: '100dvh',
            backgroundColor: '#0000008a',
            zIndex: 200,
            position: 'absolute',
            top: 0,
            display: 'flex',
            flexDirection: 'column-reverse',
          }}
        >
          <div
            style={{
              height: '88dvh',
              backgroundColor: '#F7F9FB',
              borderRadius: '1.5rem 1.5rem 0 0',
              display: 'flex',
              flexDirection: 'column',
              background: 'linear-gradient(90deg, #0B56B2 20%, #3D85DA 100%)',
            }}
          >
            <div
              style={{
                height: '40%',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                color: '#fff',
              }}
            >
              <img
                src="/hongik_uni.svg"
                style={{
                  position: 'absolute',
                  filter: '#5589CD',
                  left: -28,
                  top: -28,
                }}
                width={150}
              />
              <img
                src="/edit-icon.png"
                width={32}
                style={{
                  position: 'absolute',
                  right: 12,
                  top: 12,
                }}
                onClick={() => setModalOpened(false)}
              />
              <div
                style={{
                  backgroundColor: '#fff',
                  opacity: 0.4,
                  width: 35,
                  height: 5,
                  borderRadius: 200,
                  margin: 18,
                }}
              />
              <div style={{ fontSize: 20, fontWeight: 550, marginTop: 12 }}>
                {name} ({studentId})
              </div>
              <div
                style={{
                  fontSize: 16,
                  color: '#EDFCFF',
                  letterSpacing: -0.4,
                  wordSpacing: -1,
                  marginTop: 4,
                }}
              >
                컴퓨터공학전공, 재학 {grade}학년
              </div>
            </div>
            <div
              style={{
                height: '100%',
                backgroundColor: '#F7F9FC',
                borderRadius: '1.5rem 1.5rem 0 0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
              }}
            >
              <div
                style={{
                  backgroundColor: '#F1F5F9',
                  boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.08)',
                  marginTop: -70,
                  borderRadius: 200,
                  width: 100,
                  height: 100,
                  position: 'relative',
                }}
              >
                <img
                  src="/hongik_uni_navy.svg"
                  style={{
                    position: 'absolute',
                    width: 124,
                    left: '50%',
                    transform: 'translateX(-50%) translateY(-50%)',
                    top: '49%',
                  }}
                />
              </div>

              <img
                src={`/qr_${qrImageIndex ? 1 : 2}.png`}
                width={180}
                style={{
                  marginTop: 60,
                }}
              />

              <div
                style={{
                  display: 'flex',
                  color: '#444950',
                  marginTop: 10,
                  alignItems: 'flex-start',
                  gap: 4,
                  marginLeft: 8,
                  fontWeight: 600,
                }}
              >
                <div>{second} 초 남았습니다.</div>
                <img src="/refresh.png" onClick={refreshQr} height={26} />
              </div>
              <img
                src="/hongik_bottom.png"
                height={70}
                style={{ marginTop: 'auto', marginBottom: 44 }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
