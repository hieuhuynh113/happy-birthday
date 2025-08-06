import React, { useState, useEffect, useMemo } from 'react';
import { Gift, Sparkles, Star, Heart, Wallet, Rocket, HeartPulse, Smile, PartyPopper } from 'lucide-react';
import nhi1 from './assets/nhi1.jpg';
import nhi2 from './assets/nhi2.jpg';
import nhi3 from './assets/nhi3.jpg';
import nhi4 from './assets/nhi4.jpg';

interface ConfettiPiece {
  id: number;
  left: number;
  animationDelay: number;
  color: string;
}

interface Wish {
  text: string;
  icon: React.ElementType;
}

const App: React.FC = () => {
  const [stage, setStage] = useState<'gift' | 'wishes' | 'modal' | 'wheel' | 'result'>('gift');
  const [showConfetti, setShowConfetti] = useState(false);
  const [visibleWishes, setVisibleWishes] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [selectedPrize, setSelectedPrize] = useState('');
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  const wishes: Wish[] = [
    { text: "Chúc Nhi tuổi 20 luôn tươi như hoa, đẹp như búp bê và tự tin như hoa hậu đi thi", icon: Smile },
    { text: "Ví tiền lúc nào cũng căng phồng, tiêu hoài không thấy đáy", icon: Wallet },
    { text: "Chuyện tình cảm thì suôn sẻ như phim Hàn, không drama, chỉ có ngọt ngào", icon: Heart },
    { text: "Công việc thì lên như diều gặp gió, sếp thương, đồng nghiệp quý, KPI vẫy gọi", icon: Rocket },
    { text: "Sức khỏe luôn dồi dào, ăn ngon ngủ kỹ, sáng dậy vẫn xinh", icon: HeartPulse },
    { text: "Nụ cười tỏa nắng mãi trên môi, gặp chuyện gì cũng thấy nhẹ như mây", icon: Sparkles },
    { text: "Chúc Nhi luôn hạnh phúc, được yêu thương thật nhiều – cả từ người khác và chính bản thân mình! 🎉", icon: PartyPopper },
  ];

  const prizes = ['50.000 ₫', '100.000 ₫', '150.000 ₫', '200.000 ₫'];
  const colors = useMemo(() => ['#FF6B9D', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57'], []);

  useEffect(() => {
    if (showConfetti) {
      const pieces: ConfettiPiece[] = [];
      for (let i = 0; i < 50; i++) {
        pieces.push({
          id: i,
          left: Math.random() * 100,
          animationDelay: Math.random() * 3,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
      setConfetti(pieces);
    }
  }, [showConfetti, colors]);

  const handleGiftClick = () => {
    setShowConfetti(true);
    setStage('wishes');
    
    // Show wishes one by one
    wishes.forEach((_, index) => {
      setTimeout(() => {
        setVisibleWishes(index + 1);
      }, (index + 1) * 1000);
    });

    // Show modal after all wishes
    setTimeout(() => {
      setStage('modal');
    }, wishes.length * 1000 + 6000); // Wait 10s after all wishes
  };

  const handleWantGift = () => {
    setStage('wheel');
    setShowConfetti(false);
  };

  const handleDontWant = () => {
    alert("Không sao, em vẫn là người em gái tuyệt vời nhất! 💕");
    setStage('gift');
    setShowConfetti(false);
    setVisibleWishes(0);
  };

  const spinWheel = () => {
    if (spinning) return;
    
    setSpinning(true);
    const randomIndex = Math.floor(Math.random() * prizes.length);
    const rotation = 360 * 5 + (randomIndex * (360 / prizes.length));
    
    setWheelRotation(rotation);
    
    setTimeout(() => {
      setSpinning(false);
      setSelectedPrize(prizes[randomIndex]);
      setStage('result');
    }, 3000);
  };

  const resetGame = () => {
    setStage('gift');
    setShowConfetti(false);
    setVisibleWishes(0);
    setSpinning(false);
    setWheelRotation(0);
    setSelectedPrize('');
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400">
      <img src={nhi1} alt="Nhi 1" className="absolute top-1/2 left-8 transform -translate-y-1/2 w-48 h-auto rounded-lg shadow-lg border-4 border-white rotate-[-6deg] transition-transform duration-300 hover:scale-110 z-10" />
      <img src={nhi2} alt="Nhi 2" className="absolute top-1/2 right-8 transform -translate-y-1/2 w-48 h-auto rounded-lg shadow-lg border-4 border-white rotate-[6deg] transition-transform duration-300 hover:scale-110 z-10" />
      <img src={nhi3} alt="Nhi 3" className="absolute bottom-8 left-8 w-48 h-auto rounded-lg shadow-lg border-4 border-white rotate-[8deg] transition-transform duration-300 hover:scale-110 z-10" />
      <img src={nhi4} alt="Nhi 4" className="absolute bottom-8 right-8 w-48 h-auto rounded-lg shadow-lg border-4 border-white rotate-[-8deg] transition-transform duration-300 hover:scale-110 z-10" />
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-20 h-20 bg-yellow-300 rounded-full top-10 left-10 opacity-70 animate-bounce"></div>
        <div className="absolute w-16 h-16 bg-pink-400 rounded-full top-32 right-20 opacity-60 animate-pulse"></div>
        <div className="absolute w-24 h-24 bg-blue-300 rounded-full opacity-50 bottom-20 left-20 animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute w-12 h-12 bg-green-300 rounded-full bottom-40 right-10 opacity-70 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          {confetti.map((piece) => (
            <div
              key={piece.id}
              className="absolute w-3 h-3 animate-bounce"
              style={{
                left: `${piece.left}%`,
                backgroundColor: piece.color,
                animationDelay: `${piece.animationDelay}s`,
                animationDuration: '3s',
                top: '-10px'
              }}
            />
          ))}
        </div>
      )}

      <div className="container relative z-10 px-4 py-8 mx-auto">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 font-['Poppins'] drop-shadow-lg">
            🎉 Happy Birthday Nhi! 🎉
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 font-['Inter']">
            Chúc mừng sinh nhật em gái yêu quý! 💕
          </p>
        </div>

        {/* Gift Stage */}
        {stage === 'gift' && (
          <div className="flex justify-center items-center min-h-[400px]">
            <div 
              onClick={handleGiftClick}
              className="relative transition-all duration-300 transform cursor-pointer hover:scale-110 hover:rotate-3 group"
            >
              <div className="relative w-32 h-32 shadow-2xl md:w-40 md:h-40 bg-gradient-to-br from-red-400 to-red-600 rounded-2xl">
                <div className="absolute inset-4 bg-gradient-to-br from-red-300 to-red-500 rounded-xl"></div>
                <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                  <Gift className="w-12 h-12 text-white md:w-16 md:h-16 drop-shadow-lg" />
                </div>
                <div className="absolute w-4 h-8 transform -translate-x-1/2 bg-yellow-400 rounded-t-full -top-2 left-1/2"></div>
                <div className="absolute w-12 h-4 transform -translate-x-1/2 -translate-y-1 bg-yellow-400 rounded-full -top-2 left-1/2"></div>
              </div>
              <div className="absolute transition-opacity duration-300 opacity-0 -inset-4 bg-gradient-to-r from-pink-400 to-purple-500 rounded-3xl group-hover:opacity-20"></div>
              <p className="text-white text-center mt-4 font-['Poppins'] font-semibold">Click để mở quà! 🎁</p>
            </div>
          </div>
        )}

        {/* Wishes Stage */}
        {stage === 'wishes' && (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="p-8 shadow-2xl bg-white/90 backdrop-blur-sm rounded-3xl">
              <div className="mb-6 text-center">
                <Sparkles className="w-12 h-12 mx-auto text-yellow-500 animate-spin" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-4 font-['Poppins']">
                  Lời chúc dành cho Nhi ✨
                </h2>
              </div>
              <div className="space-y-5">
                {wishes.map((wish, index) => (
                  <div
                    key={index}
                    className={`flex items-start justify-center gap-4 transition-opacity duration-1000 ${index < visibleWishes ? 'animate-fade-in-up' : 'opacity-0'}`}
                    style={{ animationDelay: `${index * 0.3}s` }}
                  >
                    <wish.icon className="mt-1 text-pink-500 w-7 h-7 shrink-0" />
                    <p className="text-left text-lg md:text-xl text-gray-800 font-['Inter'] leading-relaxed">
                      {wish.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Modal Stage */}
        {stage === 'modal' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="w-full max-w-md p-8 text-center transform bg-white shadow-2xl rounded-3xl animate-bounce-in">
              <Star className="w-16 h-16 mx-auto mb-6 text-yellow-400 animate-pulse" />
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 font-['Poppins']">
                Có muốn nhận quà hông? 🎁
              </h3>
             
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleWantGift}
                  className="bg-gradient-to-r from-green-400 to-green-600 text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform duration-200 shadow-lg font-['Poppins']"
                >
                  Muốn! 😍
                </button>
                <button
                  onClick={handleDontWant}
                  className="bg-gradient-to-r from-gray-400 to-gray-600 text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform duration-200 shadow-lg font-['Poppins']"
                >
                  Không 😅
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Lucky Wheel Stage */}
        {stage === 'wheel' && (
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
                    background: `conic-gradient(${prizes.map((_, index) => `${colors[index]} ${index * (360 / prizes.length)}deg, ${colors[index]} ${(index + 1) * (360 / prizes.length)}deg`).join(', ')})`
                  }}
                />
                {prizes.map((prize, index) => {
                  const angle = (index + 0.5) * (360 / prizes.length);
                  const radius = 110;
                  const x = Math.round(radius * Math.cos((angle - 90) * (Math.PI / 180)));
                  const y = Math.round(radius * Math.sin((angle - 90) * (Math.PI / 180)));
                  return (
                    <div
                      key={index}
                      className="absolute top-1/2 left-1/2 font-bold text-lg md:text-xl font-['Poppins'] text-gray-800"
                      style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${angle}deg)` }}
                    >
                      <span style={{ transform: `rotate(${-angle}deg)`, display: 'inline-block' }}>
                        {prize}
                      </span>
                    </div>
                  );
                })}
                <div className="absolute inset-0 border-4 border-white rounded-full"></div>
                {/* Wheel section lines */}
                {Array.from({ length: prizes.length }).map((_, index) => (
                  <div
                    key={index}
                    className="absolute top-0 w-px origin-bottom bg-white h-1/2 left-1/2"
                    style={{
                      transform: `translateX(-50%) rotate(${index * (360 / prizes.length)}deg)`
                    }}
                  />
                ))}
              </div>
              {/* Pointer */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 w-0 h-0 border-l-[20px] border-r-[20px] border-t-[40px] border-l-transparent border-r-transparent border-t-red-600 z-10"></div>
            </div>
            <button
              onClick={spinWheel}
              disabled={spinning}
              className={`mt-8 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-12 py-4 rounded-full font-bold text-xl shadow-2xl transition-all duration-200 font-['Poppins'] ${
                spinning 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:scale-105 hover:shadow-3xl'
              }`}
            >
              {spinning ? 'Đang quay...' : 'Quay ngay!'} 🎲
            </button>
          </div>
        )}

        {/* Result Stage */}
        {stage === 'result' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="w-full max-w-md p-8 text-center transform bg-white shadow-2xl rounded-3xl animate-bounce-in">
              <div className="mb-4 text-6xl">🎉</div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 font-['Poppins']">
                Xin chúc mừng!
              </h3>
              <p className="text-lg text-gray-700 mb-2 font-['Inter']">
                Nhi đã nhận được:
              </p>
              <p className="text-3xl md:text-4xl font-bold text-green-600 mb-8 font-['Poppins']">
                {selectedPrize}
              </p>
              <button
                onClick={resetGame}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform duration-200 shadow-lg font-['Poppins']"
              >
                Cho xin cái mã QR đi hic hic 😥
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Inter:wght@400;500;600&display=swap');
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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
            transform: scale(0.3) rotate(-10deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.1) rotate(5deg);
            opacity: 0.8;
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
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