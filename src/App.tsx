import React, { useState, useEffect, useMemo } from "react";
import {
  Gift,
  Sparkles,
  Heart,
  Wallet,
  Rocket,
  HeartPulse,
  Smile,
  PartyPopper,
  Sunrise,
  HeartHandshake,
  Castle,
  Home,
  Anchor,
  Gem,
  LucideProps,
} from "lucide-react";

import nhi1 from "./assets/nhi5.jpg";
import nhi2 from "./assets/nhi2.jpg";
import nhi3 from "./assets/nhi3.jpg";
import nhi4 from "./assets/nhi4.jpg";

interface ConfettiPiece {
  id: number;
  left: number;
  animationDelay: number;
  color: string;
}

const icons: { [key: string]: React.ComponentType<LucideProps> } = {
  Sunrise,
  Sparkles,
  HeartHandshake,
  Castle,
  Home,
  Anchor,
  Gem,
  Smile,
  Wallet,
  Heart,
  Rocket,
  HeartPulse,
  PartyPopper,
};

interface Wish {
  text: string;
  iconName: keyof typeof icons;
}

const WishIcon = ({
  name,
  className,
}: {
  name: keyof typeof icons;
  className: string;
}) => {
  const LucideIcon = icons[name];
  return LucideIcon ? <LucideIcon className={className} /> : null;
};

const App: React.FC = () => {
  const [stage, setStage] = useState<"gift" | "wishes" | "wheel" | "result">(
    "gift"
  );
  const [showConfetti, setShowConfetti] = useState(false);
  const [visibleWishes, setVisibleWishes] = useState(0);
  {/* const [showNextStepButton, setShowNextStepButton] = useState(false); */}
  const [spinning, setSpinning] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [selectedPrize, setSelectedPrize] = useState("");
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const mobileWishes: Wish[] = [
    {
      text: "Chúc bé Kim Tuien có một sinh nhật thật rực rỡ 🎂",
      iconName: "Sparkles",
    },
    { text: "Chúc bé iu tuổi mới sẽ luôn luôn xinh đẹp ✨", iconName: "Heart" },
    { text: "Nhiều sức khoẻ, học thật giỏi 💪", iconName: "HeartPulse" },
    {
      text: "Gặp nhiều may mắn và niềm vui trong cuộc sống 🍀",
      iconName: "Clover",
    },
    {
      text: "Chúc bé iu luôn hạnh phúc bên cạnh anh bé yêu thương của mình nữa nha ❤️",
      iconName: "HeartHandshake",
    },
  ];

  const desktopWishes: Wish[] = [
    {
      text: "Chúc bé Kim Tuien có một sinh nhật thật rực rỡ 🎂",
      iconName: "Sparkles",
    },
    { text: "Chúc bé iu tuổi mới sẽ luôn luôn xinh đẹp ✨", iconName: "Heart" },
    { text: "Nhiều sức khoẻ, học thật giỏi 💪", iconName: "HeartPulse" },
    {
      text: "Gặp nhiều may mắn và niềm vui trong cuộc sống 🍀",
      iconName: "Clover",
    },
    {
      text: "Chúc bé iu luôn hạnh phúc bên cạnh anh bé yêu thương của mình nữa nha ❤️",
      iconName: "HeartHandshake",
    },
  ];

  const wishes = isMobile ? mobileWishes : desktopWishes;

  const prizes = ["10k", "20k", "30k", "40k", "50k"];
  const colors = useMemo(
    () => ["#FF6B9D", "#4ECDC4", "#45B7D1", "#96CEB4", "#FECA57"],
    []
  );

  useEffect(() => {
    if (showConfetti) {
      const pieces: ConfettiPiece[] = [];
      for (let i = 0; i < 50; i++) {
        pieces.push({
          id: i,
          left: Math.random() * 100,
          animationDelay: Math.random() * 3,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
      setConfetti(pieces);
    }
  }, [showConfetti, colors]);

  const handleGiftClick = () => {
    setShowConfetti(true);
    setStage("wishes");
    // Hiển thị tất cả câu chúc cùng lúc
    setVisibleWishes(wishes.length);

    {/* setTimeout(() => {
      setShowNextStepButton(true);
    }, 2000); // Đợi 2 giây trước khi hiển thị nút tiếp theo */}
  };

  {/* const handleGoToWheel = () => {
    setStage("wheel");
    setShowConfetti(false);
  }; */}

  const spinWheel = () => {
    if (spinning) return;

    setSpinning(true);
    const randomIndex = Math.floor(Math.random() * prizes.length);
    const rotation = 360 * 5 + randomIndex * (360 / prizes.length);

    setWheelRotation(rotation);

    setTimeout(() => {
      setSpinning(false);
      setSelectedPrize(prizes[randomIndex]);
      setStage("result");
    }, 3000);
  };

  const resetGame = () => {
    setStage("gift");
    setShowConfetti(false);
    setVisibleWishes(0);
    {/* setShowNextStepButton(false); */}
    setWheelRotation(0);
    setSelectedPrize("");
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-4 overflow-hidden font-sans bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400">
      {/* Images */}
      {stage !== "wheel" && (
        <>
          {/* Mobile Images */}
          <div className="md:hidden">
            <img
              src={nhi2}
              alt="Nhi 2"
              className="absolute top-5 left-4 w-24 h-32 rounded-lg shadow-lg border-2 border-white -rotate-[15deg] transition-transform duration-300 hover:scale-110 z-10 object-cover"
            />
            <img
              src={nhi4}
              alt="Nhi 4"
              className="absolute top-5 right-4 w-24 h-32 rounded-lg shadow-lg border-2 border-white rotate-[15deg] transition-transform duration-300 hover:scale-110 z-10 object-cover"
            />
            <img
              src={nhi1}
              alt="Nhi 1"
              className="absolute bottom-5 left-4 w-24 h-32 rounded-lg shadow-lg border-2 border-white rotate-[15deg] transition-transform duration-300 hover:scale-110 z-10 object-cover"
            />
            <img
              src={nhi3}
              alt="Nhi 3"
              className="absolute bottom-5 right-4 w-24 h-32 rounded-lg shadow-lg border-2 border-white -rotate-[15deg] transition-transform duration-300 hover:scale-110 z-10 object-cover"
            />
          </div>
          {/* Desktop Images */}
          <div className="hidden md:block">
            <img
              src={nhi2}
              alt="Nhi 2"
              className="absolute top-16 left-32 w-48 h-auto rounded-lg shadow-2xl border-4 border-white -rotate-[10deg] transition-transform duration-300 hover:scale-110 z-10"
            />
            <img
              src={nhi4}
              alt="Nhi 4"
              className="absolute top-16 right-32 w-48 h-auto rounded-lg shadow-2xl border-4 border-white rotate-[10deg] transition-transform duration-300 hover:scale-110 z-10"
            />
            <img
              src={nhi1}
              alt="Nhi 1"
              className="absolute bottom-16 left-32 w-48 h-auto rounded-lg shadow-2xl border-4 border-white rotate-[10deg] transition-transform duration-300 hover:scale-110 z-10"
            />
            <img
              src={nhi3}
              alt="Nhi 3"
              className="absolute bottom-16 right-32 w-48 h-auto rounded-lg shadow-2xl border-4 border-white -rotate-[10deg] transition-transform duration-300 hover:scale-110 z-10"
            />
          </div>
        </>
      )}

      {showConfetti && (
        <div className="absolute inset-0 z-0">
          {confetti.map((piece) => (
            <div
              key={piece.id}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${piece.left}%`,
                backgroundColor: piece.color,
                animation: `fall 3s linear ${piece.animationDelay}s infinite`,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 flex flex-col items-center justify-center w-full">
        {stage === "gift" && (
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-['Poppins']">
              Gửi bé iu của anh!
            </h1>
            <p className="text-lg md:text-2xl text-white/90 mb-8 font-['Inter']">
              Hôm nay là sinh nhật của bé nên anh có mấy lời muốn gửi đến bé nè
            </p>
            <button onClick={handleGiftClick} className="animate-bounce">
              <Gift className="w-32 h-32 text-white md:w-48 md:h-48 drop-shadow-2xl" />
            </button>
          </div>
        )}

        {stage === "wishes" && (
          <div className="w-full max-w-lg text-center">
            <div className="p-6 shadow-2xl bg-white/10 backdrop-blur-sm rounded-3xl">
              <div className="flex flex-col items-center gap-4">
                {wishes.slice(0, visibleWishes).map((wish, index) => (
                  <div
                    key={index}
                    className="flex items-center w-full max-w-md gap-4 p-4 shadow-lg bg-white/20 rounded-2xl animate-fade-in"
                  >
                    <WishIcon
                      name={wish.iconName}
                      className="w-8 h-8 text-white"
                    />
                    <p className="text-white text-lg md:text-xl font-semibold font-['Inter']">
                      {wish.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* {showNextStepButton && (
              <button
                onClick={handleGoToWheel}
                className="mt-8 bg-gradient-to-r from-green-400 to-blue-500 text-white px-8 py-4 rounded-full font-bold text-xl shadow-2xl transition-all duration-200 hover:scale-105 hover:shadow-3xl animate-fade-in font-['Poppins']"
              >
                Đến bước nhận quà nào! ✨
              </button>
            )} */}
          </div>
        )}

        {stage === "wheel" && (
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 font-['Poppins']">
              🎰 Vòng Quay May Mắn 🎰
            </h2>
            <div className="relative inline-block">
              <div
                className="w-80 h-80 md:w-96 md:h-96 rounded-full border-8 border-white shadow-2xl relative overflow-hidden transition-transform duration-[3000ms] ease-out"
                style={{ transform: `rotate(${wheelRotation}deg)` }}
              >
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `conic-gradient(${prizes
                      .map(
                        (_, index) =>
                          `${colors[index]} ${
                            index * (360 / prizes.length)
                          }deg, ${colors[index]} ${
                            (index + 1) * (360 / prizes.length)
                          }deg`
                      )
                      .join(", ")})`,
                  }}
                />
                {prizes.map((prize, index) => {
                  const angle = (index + 0.5) * (360 / prizes.length);
                  const radius = isMobile ? 110 : 130;
                  const x = Math.round(
                    radius * Math.cos((angle - 90) * (Math.PI / 180))
                  );
                  const y = Math.round(
                    radius * Math.sin((angle - 90) * (Math.PI / 180))
                  );
                  return (
                    <div
                      key={index}
                      className="absolute top-1/2 left-1/2 font-bold text-lg md:text-xl font-['Poppins'] text-gray-800"
                      style={{
                        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${angle}deg)`,
                      }}
                    >
                      <span
                        style={{
                          transform: `rotate(${-angle}deg)`,
                          display: "inline-block",
                        }}
                      >
                        {prize}
                      </span>
                    </div>
                  );
                })}
                <div className="absolute inset-0 border-4 border-white rounded-full"></div>
                {Array.from({ length: prizes.length }).map((_, index) => (
                  <div
                    key={index}
                    className="absolute top-0 w-px origin-bottom bg-white h-1/2 left-1/2"
                    style={{
                      transform: `translateX(-50%) rotate(${
                        index * (360 / prizes.length)
                      }deg)`,
                    }}
                  />
                ))}
              </div>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 w-0 h-0 border-l-[20px] border-r-[20px] border-t-[40px] border-l-transparent border-r-transparent border-t-red-600 z-10"></div>
            </div>
            <button
              onClick={spinWheel}
              disabled={spinning}
              className={`mt-8 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-12 py-4 rounded-full font-bold text-xl shadow-2xl transition-all duration-200 font-['Poppins'] ${
                spinning
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:scale-105 hover:shadow-3xl"
              }`}
            >
              {spinning ? "Đang quay..." : "Quay ngay!"} 🎲
            </button>
          </div>
        )}

        {stage === "result" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="w-full max-w-md p-8 text-center transform bg-white shadow-2xl rounded-3xl animate-bounce-in">
              <div className="mb-4 text-6xl">🎉</div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 font-['Poppins']">
                Xin chúc mừng!
              </h3>
              <p className="text-lg text-gray-700 mb-2 font-['Inter']">
                Vk đã nhận được:
              </p>
              <p className="text-3xl md:text-4xl font-bold text-green-600 mb-8 font-['Poppins']">
                {selectedPrize}
              </p>
              <button
                onClick={resetGame}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform duration-200 shadow-lg font-['Poppins']"
              >
                Đọc số tk cho ck 😘
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Inter:wght@400;500;600&display=swap');
        
        @keyframes fall {
          from {
            transform: translateY(-10vh) rotate(0deg);
            opacity: 1;
          }
          to {
            transform: translateY(110vh) rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-in {
          0% {
            transform: scale(0.5);
            opacity: 0;
          }
          80% {
            transform: scale(1.1);
            opacity: 1;
          }
          100% {
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
          opacity: 0;
        }

        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
