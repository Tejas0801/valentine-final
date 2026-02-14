import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function ValentineApp() {
  const [stage, setStage] = useState("envelope");
  const [noCount, setNoCount] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const noRef = useRef(null);

  const noTexts = [
    "No 😒",
    "Seriously Ramyuuu 🥺",
    "Rakshahsiii 😢",
    "idhi intlo chupistha 💔",
    "😭",
    "Yes click chey bey😤",
  ];

  useEffect(() => {
    createHearts();
  }, []);

  const createHearts = () => {
    const container = document.getElementById("hearts");

    setInterval(() => {
      if (!container) return;

      const heart = document.createElement("div");
      heart.innerHTML = "❤️";

      heart.style.position = "absolute";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.fontSize = Math.random() * 20 + 10 + "px";
      heart.style.animation = "float 6s linear";

      container.appendChild(heart);

      setTimeout(() => heart.remove(), 6000);
    }, 500);
  };

  const handleYes = () => {
    confetti({
      particleCount: 300,
      spread: 150,
    });

    setStage("yes");
  };

  const handleNo = () => {
  const newCount = noCount + 1;
  setNoCount(newCount);

  if (newCount >= 3) {
    setShowVideo(true);
  }

  if (noRef.current) {
    const maxX = window.innerWidth * 0.3;
    const maxY = window.innerHeight * 0.2;

    const x = Math.random() * maxX - maxX / 2;
    const y = Math.random() * maxY - maxY / 2;

    noRef.current.style.transform = `translate(${x}px, ${y}px)`;
  }
};


  return (
    <div style={styles.container}>
      <div id="hearts"></div>

      {/* Small Video Box */}
      {showVideo && (
  <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    style={styles.videoBox}
  >
    {/* CLOSE BUTTON */}
    <button
      onClick={() => setShowVideo(false)}
      style={styles.closeButton}
    >
      ✕
    </button>

    <video
      width="100%"
      controls
      autoPlay
      style={{ borderRadius: "8px" }}
    >
      <source src="./valentine.mp4" type="video/mp4" />
    </video>

    <p style={{ marginTop: "8px", fontSize: "14px" }}>
      I'll show this in you're home 😈
    </p>
  </motion.div>
)}


      {/* Envelope */}
      {stage === "envelope" && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          style={styles.center}
        >
          <div style={styles.envelope}>💌</div>

          <button
            style={styles.button}
            onClick={() => setStage("question")}
          >
            Open Letter ❤️
          </button>
        </motion.div>
      )}

      {/* Question */}
      {stage === "question" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={styles.center}
        >
          <h1 style={styles.title}>
            Will you be my Valentine? ❤️
          </h1>

          <div style={styles.row}>
            <button style={styles.yes} onClick={handleYes}>
              Yes 💖
            </button>

            <button
              ref={noRef}
              style={styles.no}
              onClick={handleNo}
            >
              {noTexts[Math.min(noCount, noTexts.length - 1)]}
            </button>
          </div>
        </motion.div>
      )}

      {/* Yes Screen */}
      {stage === "yes" && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          style={styles.center}
        >
          <h1 style={styles.title}>
            You made me the happiest person alive ❤️

            Happy Valentine's Day Ramyuu!
          </h1>
        </motion.div>
      )}

      <style>
        {`
        @keyframes float {
          from {
            transform: translateY(100vh);
            opacity: 1;
          }
          to {
            transform: translateY(-10vh);
            opacity: 0;
          }
        }
        `}
      </style>
    </div>
  );
}

const styles = {
  container: {
    height: "100dvh",
    width: "100%",
    background: "linear-gradient(to bottom right, #ffdde1, #ee9ca7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    position: "relative",
    padding: "20px",
    boxSizing: "border-box",
  },

  center: {
    textAlign: "center",
    maxWidth: "90%",
  },

  envelope: {
    fontSize: "clamp(60px, 15vw, 100px)",
    marginBottom: "20px",
  },

  title: {
    fontSize: "clamp(24px, 6vw, 42px)",
    marginBottom: "20px",
    lineHeight: "1.2",
  },

  row: {
    display: "flex",
    gap: "15px",
    justifyContent: "center",
    flexWrap: "wrap",
  },

  button: {
    padding: "12px 24px",
    fontSize: "clamp(14px, 4vw, 18px)",
    borderRadius: "10px",
    border: "none",
    background: "#ff4d6d",
    color: "white",
    cursor: "pointer",
  },

  yes: {
    padding: "12px 24px",
    fontSize: "clamp(14px, 4vw, 18px)",
    borderRadius: "10px",
    border: "none",
    background: "#28a745",
    color: "white",
    cursor: "pointer",
  },

  no: {
    padding: "12px 24px",
    fontSize: "clamp(14px, 4vw, 18px)",
    borderRadius: "10px",
    border: "none",
    background: "#6c757d",
    color: "white",
    cursor: "pointer",
    position: "relative",
  },

  closeButton: {
  position: "absolute",
  top: "-10px",
  right: "-10px",
  background: "red",
  color: "white",
  border: "none",
  borderRadius: "50%",
  width: "28px",
  height: "28px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold",
},
videoBox: {
  position: "fixed",
  bottom: "15px",
  right: "15px",
  width: "min(300px, 80vw)",
  background: "white",
  padding: "10px",
  borderRadius: "12px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
  textAlign: "center",
  zIndex: 1000,
},



};

