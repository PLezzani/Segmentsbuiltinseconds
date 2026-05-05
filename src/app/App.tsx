import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import svgPaths from '../imports/AskAnything/svg-23s735pzkf';

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="bg-[#0ba5ec] px-[23.633px] py-[14.18px] rounded-bl-[28.36px] rounded-br-[28.36px] rounded-tr-[28.36px] w-fit drop-shadow-[0px_0px_0.591px_rgba(0,0,0,0.24),0px_2.363px_2.363px_rgba(0,0,0,0.16),0px_-1.182px_0.591px_rgba(0,0,0,0.08)]"
    >
      <div className="flex gap-[6px]">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-[8px] h-[8px] bg-white/60 rounded-full"
            animate={{
              y: [0, -8, 0],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

function TypedText({ text, delay = 0, onComplete }: { text: string; delay?: number; onComplete?: () => void }) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
          if (onComplete) {
            onComplete();
          }
        }
      }, 20);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay, onComplete]);

  return <>{displayedText}</>;
}

function ActionButtons() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="flex gap-[3.078px] items-center w-full"
    >
      <button className="bg-[#f9fafb] flex h-[18.47px] items-center justify-center px-[6.157px] py-[3.078px] rounded-[7694.905px]">
        <div className="relative size-[12.313px]">
          <div className="absolute inset-[8.33%]">
            <div className="absolute inset-[-7.5%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.8 11.8">
                <path d={svgPaths.p2b90d100} stroke="#344054" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.53913" />
              </svg>
            </div>
          </div>
        </div>
      </button>
      <button className="bg-[#f9fafb] flex gap-[3.078px] h-[18.47px] items-center justify-center px-[6.157px] py-[3.078px] rounded-[7694.905px]">
        <div className="relative size-[12.313px]">
          <div className="absolute inset-[8.33%_10.4%_8.33%_8.33%]">
            <div className="absolute inset-[-7.5%_-7.69%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.5456 11.8">
                <path d={svgPaths.p3523980} stroke="#344054" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.53913" />
              </svg>
            </div>
          </div>
        </div>
      </button>
      <button className="bg-[#f9fafb] flex gap-[3.078px] h-[18.47px] items-center justify-center px-[6.157px] py-[3.078px] rounded-[7694.905px]">
        <div className="relative size-[12.313px]">
          <div className="absolute inset-[8.33%_8.33%_8.33%_10.59%]">
            <div className="absolute inset-[-7.5%_-7.71%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.522 11.8">
                <path d={svgPaths.p21e6dec0} stroke="#344054" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.53913" />
              </svg>
            </div>
          </div>
        </div>
      </button>
    </motion.div>
  );
}

export default function App() {
  const [stage, setStage] = useState(0);
  const [typingComplete, setTypingComplete] = useState(false);

  useEffect(() => {
    const timings = [
      1000,  // Stage 1: User message appears
      2000,  // Stage 2: Show typing indicator
      3500,  // Stage 3: First AI response
      2000,  // Stage 4: Second response
      600,  // Stage 5: Final follow-up
    ];

    const timeout = setTimeout(() => {
      if (stage < 5) {
        setStage(stage + 1);
      } else {
        // Loop back to start
        setTimeout(() => {
          setStage(0);
          setTypingComplete(false);
        }, 3000);
      }
    }, timings[stage] || 1000);

    return () => clearTimeout(timeout);
  }, [stage]);

  return (
    <div className="size-full bg-gradient-to-b from-white to-[#f3f5f7] flex items-center justify-center p-[32px]">
      <div className="w-[500px] h-[500px] flex flex-col gap-[16px] bg-gradient-to-t from-[#F3F5F7] to-[#FFFFFF] p-[24px] shadow-lg justify-start">

        {/* User Message */}
        <AnimatePresence mode="popLayout">
          {stage >= 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              className="flex justify-end w-full"
              layout
            >
              <div className="bg-[#07388a] drop-shadow-[0px_0px_0.587px_rgba(0,0,0,0.24),0px_2.348px_2.348px_rgba(0,0,0,0.16),0px_-1.174px_0.587px_rgba(0,0,0,0.08)] px-[23.483px] py-[14.09px] rounded-bl-[28.18px] rounded-br-[28.18px] rounded-tl-[28.18px] max-w-[85%]">
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24.626px] text-[18.47px] text-right text-white">
                  Create an audience with dormant player
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* AI Typing Indicator */}
        <AnimatePresence mode="popLayout">
          {stage === 2 && (
            <div className="flex justify-start w-full">
              <TypingIndicator />
            </div>
          )}
        </AnimatePresence>

        {/* AI First Response */}
        <AnimatePresence mode="popLayout">
          {stage >= 3 && !typingComplete && (
            <motion.div
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.95 }}
              className="flex justify-start w-full"
              layout
            >
              <div className="bg-[#0ba5ec] px-[23.633px] py-[14.18px] rounded-bl-[28.36px] rounded-br-[28.36px] rounded-tr-[28.36px] max-w-[85%] drop-shadow-[0px_0px_0.591px_rgba(0,0,0,0.24),0px_2.363px_2.363px_rgba(0,0,0,0.16),0px_-1.182px_0.591px_rgba(0,0,0,0.08)]">
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24.626px] text-[18.47px] text-white">
                  <TypedText
                    text="Building your dormant player audience now..."
                    onComplete={() => setTimeout(() => setTypingComplete(true), 800)}
                  />
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* AI Detailed Response */}
        <AnimatePresence mode="popLayout">
          {stage >= 4 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-start w-full"
              layout
            >
              <div className="bg-white rounded-[12px] p-[18px] w-full shadow-[0px_2px_8px_rgba(0,0,0,0.08)]">
                <div className="flex flex-col gap-[12px]">
                  {/* Widget */}
                  <div className="bg-white drop-shadow-[0px_0.386px_0.386px_rgba(16,24,40,0.05)] flex gap-[12px] p-[12px] rounded-[8px] border border-[#eaecf0]">
                    <div className="flex flex-col gap-[6.175px] flex-1">
                      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[10px] text-[#101828]">
                        Dormant Players Found
                      </p>
                      <div className="flex gap-[6px] items-end">
                        <p className="font-['Inter:Regular',sans-serif] font-normal text-[24px] text-[#101828] tracking-[-0.5px]">
                          1,247
                        </p>
                        <div className="bg-[#f0f9ff] flex gap-[4px] items-center px-[6px] py-[2px] rounded-full border border-[#0ba5ec]/20">
                          <p className="font-['Inter:Regular',sans-serif] font-normal text-[10px] text-[#0ba5ec]">
                            Ready
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="w-[120px] h-[60px] relative hidden">
                      <svg className="w-full h-full" viewBox="0 0 120 60" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="churnGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#0ba5ec" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#0ba5ec" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M 0 20 L 20 22 L 40 28 L 60 35 L 80 38 L 100 40 L 120 42 L 120 60 L 0 60 Z"
                          fill="url(#churnGradient)"
                        />
                        <path
                          d="M 0 20 L 20 22 L 40 28 L 60 35 L 80 38 L 100 40 L 120 42"
                          stroke="#0ba5ec"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Text content */}
                  <div className="font-['Inter:Regular',sans-serif] text-[13px] leading-[20px] text-[#101828]">
                    <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold mb-[8px]">
                      Audience Created Successfully
                    </p>
                    <p className="text-[12px]">
                      Found 1,247 players with no activity in the last 30+ days. This audience is now ready for your re-engagement campaign.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Follow-up Question */}
        <AnimatePresence mode="popLayout">
          {stage >= 5 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start w-full"
              layout
            >
              <div className="flex flex-col gap-[12px] w-full">
                <div className="flex flex-col gap-[8px] mr-[40px]">
                  <button className="bg-white hover:bg-[#f9fafb] border border-[#d0d5dd] text-[#344054] px-[16px] py-[10px] rounded-[8px] text-[14px] font-['Inter:Semi_Bold',sans-serif] font-semibold transition-colors text-left flex items-center justify-between">
                    <span>View audience "Dormant players"</span>
                    <ArrowRight className="w-[16px] h-[16px]" />
                  </button>
                  <button className="bg-white hover:bg-[#f9fafb] border border-[#d0d5dd] text-[#344054] px-[16px] py-[10px] rounded-[8px] text-[14px] font-['Inter:Semi_Bold',sans-serif] font-semibold transition-colors text-left flex items-center justify-between">
                    <span>Create campaign for this audience</span>
                    <ArrowRight className="w-[16px] h-[16px]" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
