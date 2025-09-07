import React, { useState, useRef, useEffect, useCallback } from "react";

export default function App() {
  const [seconds, setSeconds] = useState(60);
  const [input, setInput] = useState("");
  const [typedWords, setTypedWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testStarted, setTestStarted] = useState(false);
  const [testFinished, setTestFinished] = useState(false);
  const [startTime, setStartTime] = useState(null);

  const intervalRef = useRef(null);
  const inputRef = useRef(null);
  const wordsContainerRef = useRef(null);

  const text =
    "class force direct star an close board sample text showing typing test words here for practice purpose only keep typing until the timer stops a quick brown fox jumps over the lazy dog";
  const words = text.split(" ");

  // Focus input on load
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [testFinished]);

  // Slide words so current word stays at ~45% of container
  useEffect(() => {
    if (wordsContainerRef.current) {
      const containerWidth =
        wordsContainerRef.current.parentElement.offsetWidth;
      let scroll = 0;
      for (let i = 0; i < currentIndex; i++) {
        scroll += wordsContainerRef.current.children[i].offsetWidth + 8; // margin
      }
      const offset = containerWidth * 0.45;
      wordsContainerRef.current.style.transform = `translateX(${
        offset - scroll
      }px)`;
    }
  }, [currentIndex, input]);

  // Start timer
  const startTimer = () => {
    if (intervalRef.current || testFinished) return;
    setTestStarted(true);
    setStartTime(Date.now());
    intervalRef.current = setInterval(() => {
      setSeconds((prev) => {
        if (prev > 1) return prev - 1;
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setTestFinished(true);
        return 0;
      });
    }, 1000);
  };

  // Handle input change
  const handleInputChange = (e) => {
    if (!testStarted) startTimer();
    if (testFinished) return;

    let inputValue = e.target.value;

    // Ignore multiple spaces at start
    if (inputValue === " ") {
      setInput("");
      return;
    }

    setInput(inputValue);

    if (inputValue.endsWith(" ")) {
      const typed = inputValue.trim();
      const status = typed === words[currentIndex] ? "correct" : "incorrect";

      // Only count if user typed something
      if (typed.length > 0) {
        setTypedWords((prev) => [
          ...prev,
          { word: words[currentIndex], typed, status },
        ]);
        setCurrentIndex((prev) => prev + 1);
      }
      setInput("");
    }
  };

  // Reset test
  const resetTest = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setSeconds(60);
    setInput("");
    setTypedWords([]);
    setCurrentIndex(0);
    setTestStarted(false);
    setTestFinished(false);
    setStartTime(null);
  };

  // Stats calculation based on actual typing time
  const elapsedMinutes =
    startTime && typedWords.length > 0
      ? Math.max((Date.now() - startTime) / 60000, 0.01)
      : 1;

  const totalTypedChars = typedWords.reduce(
    (sum, item) => sum + item.typed.length,
    0
  );
  const correctWords = typedWords.filter((w) => w.status === "correct").length;

  const wpm = Math.round(totalTypedChars / 5 / elapsedMinutes);
  const charsPerMinute = Math.round(totalTypedChars / elapsedMinutes);
  const accuracy =
    typedWords.length > 0
      ? Math.round((correctWords / typedWords.length) * 100)
      : 100;

  // Render characters with colored overlay
  const renderCharacters = useCallback(
    (word, index) => {
      return word.split("").map((char, charIdx) => {
        let colorClass = "text-gray-400"; // untyped
        if (index < currentIndex) {
          colorClass =
            typedWords[index]?.status === "correct"
              ? "text-gray-800 opacity-60"
              : "text-red-500 opacity-60";
        } else if (index === currentIndex) {
          if (charIdx < input.length) {
            colorClass =
              input[charIdx] === char ? "text-gray-800" : "text-red-500";
          }
        }
        return (
          <span key={charIdx} className={`${colorClass} text-2xl`}>
            {char}
          </span>
        );
      });
    },
    [currentIndex, typedWords, input]
  );

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800 flex-col items-center justify-center font-sans p-4">
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-center mt-8">
          Test your typing skills
        </h1>
        <p className="text-gray-500 uppercase text-lg font-semibold tracking-widest text-center mt-2 mb-10">
          Typing Speed Test
        </p>

        {/* Stats Section */}
        <div className="flex flex-col sm:flex-row items-center justify-center sm:gap-12 lg:gap-20 mb-10 w-full">
          <div className="flex flex-col items-center p-4">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-yellow-400 flex flex-col items-center justify-center text-gray-800">
              <span className="text-3xl font-bold">{seconds}</span>
              <span className="text-xs text-gray-600">seconds</span>
            </div>
          </div>
          <div className="flex flex-col items-center p-4">
            <span className="text-3xl font-bold">{wpm}</span>
            <p className="text-gray-500 text-sm">words/min</p>
          </div>
          <div className="flex flex-col items-center p-4">
            <span className="text-3xl font-bold">{charsPerMinute}</span>
            <p className="text-gray-500 text-sm">chars/min</p>
          </div>
          <div className="flex flex-col items-center p-4">
            <span className="text-3xl font-bold">{accuracy}%</span>
            <p className="text-gray-500 text-sm">accuracy</p>
          </div>
        </div>

        {/* Typing Box */}
        <div className="w-full max-w-4xl bg-white shadow-xl rounded-xl p-6 text-2xl relative overflow-hidden flex flex-col items-center justify-center">
          {!testStarted && (
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black text-base font-semibold px-6 py-2 rounded shadow-md select-none z-20">
              Start typing
            </div>
          )}
          {testFinished && (
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-base font-semibold px-6 py-2 rounded shadow-md select-none z-20">
              Test complete!
            </div>
          )}

          <div className="relative w-full h-24 my-6 overflow-hidden flex items-center">
            <div
              ref={wordsContainerRef}
              className="flex whitespace-nowrap leading-relaxed transition-transform duration-200"
            >
              {words.map((word, idx) => (
                <span
                  key={idx}
                  className={`mx-1 ${idx === currentIndex ? "font-bold" : ""}`}
                >
                  {renderCharacters(word, idx)}
                </span>
              ))}
            </div>

            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-text z-30"
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              disabled={testFinished}
            />
          </div>
        </div>

        <button
          onClick={resetTest}
          className="mt-8 px-8 py-3 bg-blue-500 text-white font-bold rounded-full shadow-lg hover:bg-blue-600 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Reset Test
        </button>
      </div>
    </div>
  );
}
