import React, { useState, useEffect, useRef } from "react";
import { 
  BookOpen, 
  Gamepad2, 
  Award, 
  Sparkles, 
  HelpCircle, 
  Heart, 
  CheckCircle, 
  XCircle, 
  Volume2, 
  VolumeX, 
  RotateCw, 
  ArrowRight, 
  Check, 
  Bookmark, 
  TrendingUp, 
  User, 
  Smile, 
  FileText, 
  AlertCircle,
  Lightbulb,
  Search,
  BookMarked,
  Layers,
  Undo2,
  Trash2,
  Printer
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { 
  TheoryChapters, 
  SpanishVerbsData, 
  Game1Data, 
  Game2Data, 
  Game3Data, 
  Game4Data, 
  Game5Data, 
  Game6Data, 
  FullDialogue,
  TheoryChapter,
  VerbDetail,
  GameQuestion
} from "./data";

// Simple custom synthesizer for game audio feedbacks
class AudioEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  constructor() {
    // Lazy initialized on first user interaction
  }

  private init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  playCorrect() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = "sine";
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      // Happy upbeat arpeggio
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
      osc.frequency.setValueAtTime(1046.50, now + 0.24); // C6
      
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
      
      osc.start(now);
      osc.stop(now + 0.4);
    } catch (e) {
      console.warn("Audio Context blocked or failed:", e);
    }
  }

  playIncorrect() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = "sawtooth";
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      // Low buzz warning
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.linearRampToValueAtTime(140, now + 0.25);
      
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
      
      osc.start(now);
      osc.stop(now + 0.25);
    } catch (e) {}
  }

  playLevelComplete() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = "triangle";
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      // Glorious climb
      const notes = [392.00, 523.25, 659.25, 783.99, 1046.50, 1318.51]; // G4, C5, E5, G5, C6, E6
      notes.forEach((freq, idx) => {
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
      });
      
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
      
      osc.start(now);
      osc.stop(now + 0.6);
    } catch (e) {}
  }

  playTap() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = "sine";
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.frequency.setValueAtTime(600, now);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
      
      osc.start(now);
      osc.stop(now + 0.05);
    } catch (e) {}
  }
}

const audio = new AudioEngine();

export default function App() {
  // Theme state default color slate/indigo
  const [soundOn, setSoundOn] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<"theory" | "playground" | "games" | "exam">("theory");
  
  // Scoring and Progress stats (Persisted in localStorage)
  const [totalScore, setTotalScore] = useState<number>(() => {
    return Number(localStorage.getItem("gustar_total_score")) || 0;
  });
  const [starsProgress, setStarsProgress] = useState<Record<string, number>>(() => {
    try {
      return JSON.parse(localStorage.getItem("gustar_stars_per_game") || "{}");
    } catch {
      return {};
    }
  });
  const [completedChapters, setCompletedChapters] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("gustar_completed_chapters") || "[]");
    } catch {
      return [];
    }
  });

  // Certificate settings
  const [userName, setUserName] = useState<string>(() => {
    return localStorage.getItem("gustar_user_name") || "";
  });
  const [unlockedCertificate, setUnlockedCertificate] = useState<boolean>(() => {
    return localStorage.getItem("gustar_cert_unlocked") === "true";
  });

  // Theory Search
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedChapterId, setSelectedChapterId] = useState<string>("chap-1");

  // Conjugation Simulator Playground State
  const [simPronoun, setSimPronoun] = useState<string>("A mí");
  const [simClitic, setSimClitic] = useState<string>("me");
  const [simVerb, setSimVerb] = useState<string>("gustar");
  const [simObject, setSimObject] = useState<string>("el café");

  // Game UI selection & play states
  const [activeGameIndex, setActiveGameIndex] = useState<number | null>(null);
  const [gameLevel, setGameLevel] = useState<number>(0);
  const [gameLives, setGameLives] = useState<number>(3);
  const [gameScore, setGameScore] = useState<number>(0);
  const [gameFinished, setGameFinished] = useState<boolean>(false);
  const [selectedWordIndex, setSelectedWordIndex] = useState<number | null>(null);
  const [sentenceBuilderAnswer, setSentenceBuilderAnswer] = useState<string[]>([]);
  const [gameErrorCounter, setGameErrorCounter] = useState<number>(0);
  const [showExplanationModal, setShowExplanationModal] = useState<boolean>(false);
  const [lastAnswerIsCorrect, setLastAnswerIsCorrect] = useState<boolean | null>(null);
  const [activeGameData, setActiveGameData] = useState<GameQuestion[]>([]);

  // Exam States
  const [examActive, setExamActive] = useState<boolean>(false);
  const [examQuestionIndex, setExamQuestionIndex] = useState<number>(0);
  const [examScore, setExamScore] = useState<number>(0);
  const [examFinished, setExamFinished] = useState<boolean>(false);
  const [examQuestionsList, setExamQuestionsList] = useState<GameQuestion[]>([]);
  const [examAnswered, setExamAnswered] = useState<boolean>(false);
  const [examSelectedOption, setExamSelectedOption] = useState<string>("");
  const [examIsCorrect, setExamIsCorrect] = useState<boolean>(false);

  // Confetti particles local effect
  const [confettiActive, setConfettiActive] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Sync sound engine enabled state
  useEffect(() => {
    audio.enabled = soundOn;
  }, [soundOn]);

  // Persists scores & credentials to LocalStorage
  useEffect(() => {
    localStorage.setItem("gustar_total_score", String(totalScore));
    localStorage.setItem("gustar_stars_per_game", JSON.stringify(starsProgress));
    localStorage.setItem("gustar_completed_chapters", JSON.stringify(completedChapters));
    localStorage.setItem("gustar_user_name", userName);
    localStorage.setItem("gustar_cert_unlocked", String(unlockedCertificate));
  }, [totalScore, starsProgress, completedChapters, userName, unlockedCertificate]);

  // Canvas particle Confetti explosion
  useEffect(() => {
    if (!confettiActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
    canvas.height = canvas.parentElement?.clientHeight || 600;

    const particles: any[] = [];
    const colors = ["#f59e0b", "#10b981", "#3b82f6", "#ec4899", "#8b5cf6", "#ef4444"];

    for (let i = 0; i < 150; i++) {
      particles.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 50,
        y: canvas.height / 2 + (Math.random() - 0.5) * 50,
        vx: (Math.random() - 0.5) * 15,
        vy: (Math.random() - 0.8) * 15 - 5,
        radius: Math.random() * 6 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rSpeed: (Math.random() - 0.5) * 10,
        alpha: 1,
        life: 1
      });
    }

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      particles.forEach((p) => {
        p.vx *= 0.98;
        p.vy += 0.25; // gravity
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rSpeed;
        p.life -= 0.008;

        if (p.life > 0) {
          alive = true;
          ctx.save();
          ctx.globalAlpha = p.life;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.rect(-p.radius, -p.radius, p.radius * 2, p.radius * 2);
          ctx.fill();
          ctx.restore();
        }
      });

      if (alive) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        setConfettiActive(false);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [confettiActive]);

  const triggerConfetti = () => {
    setConfettiActive(true);
    audio.playLevelComplete();
  };

  const handleSoundTap = () => {
    audio.playTap();
  };

  // Switch tab safely
  const handleTabChange = (tab: "theory" | "playground" | "games" | "exam") => {
    audio.playTap();
    setActiveTab(tab);
    setActiveGameIndex(null);
    setExamActive(false);
  };

  // Playground Conjugation Simulator engine
  // Calculates live if selected Pronoun, Clitic, Verb, and Noun forms matches grammar rule
  const checkPlaygroundAlignment = () => {
    // 1. Is Pronoun connected to Clitic correctly?
    const alignmentMap: Record<string, string> = {
      "A mí": "me",
      "A ti": "te",
      "A él / ella": "le",
      "A nosotros / nosotras": "nos",
      "A vosotros / vosotras": "os",
      "A ellos / ellas / ustedes": "les"
    };

    const isEmp = alignmentMap[simPronoun] !== undefined;
    const requiredClitic = alignmentMap[simPronoun];
    
    let pronounCorrect = true;
    let pronounFeedback = "";

    if (isEmp && simClitic !== requiredClitic) {
      pronounCorrect = false;
      pronounFeedback = `⚠️ Անհամապատասխանություն. «${simPronoun}» շեշտված դերանվան հետ պետք է օգտագործել «${requiredClitic}» կարճ դերանունը, ոչ թե «${simClitic}»-ը։`;
    }

    // 2. Is Verb pluralized correctly based on Object?
    let baseVerbName = simVerb;
    let expectedVerbForm = "";
    const isPluralObject = ["los libros", "las piernas", "las flores"].includes(simObject);
    const isVerbInfinitive = ["viajar"].includes(simObject);

    if (simVerb === "gustar") {
      expectedVerbForm = isPluralObject ? "gustan" : "gusta";
    } else if (simVerb === "encantar") {
      expectedVerbForm = isPluralObject ? "encantan" : "encanta";
    } else if (simVerb === "interesar") {
      expectedVerbForm = isPluralObject ? "interesan" : "interesa";
    } else if (simVerb === "doler") {
      expectedVerbForm = isPluralObject ? "duelen" : "duele";
    } else if (simVerb === "molestar") {
      expectedVerbForm = isPluralObject ? "molestan" : "molesta";
    } else if (simVerb === "preocupar") {
      expectedVerbForm = isPluralObject ? "preocupan" : "preocupa";
    }

    // Assemble Spanish sentence
    const fullSentence = `${simPronoun ? simPronoun + " " : ""}${simClitic} ${expectedVerbForm} ${simObject}.`;

    // Dynamic translation dictionary
    const getLiveTranslationAndTips = () => {
      let subjectArm = "";
      let clitArm = "";
      let verbArm = "";

      // Companion descriptive texts
      const clitMapArm: Record<string, string> = {
        me: "ինձ", te: "քեզ", le: "նրան/Ձեզ", nos: "մեզ", os: "ձեզ", les: "նրանց/Ձեզ"
      };
      clitArm = clitMapArm[simClitic];

      const pronounEmphasisArm: Record<string, string> = {
        "A mí": "հենց ինձ", "A ti": "հենց քեզ", "A él / ella": "հենց նրան", "A nosotros / nosotras": "հենց մեզ", "A vosotros / vosotras": "հենց ձեզ", "A ellos / ellas / ustedes": "հենց նրանց"
      };

      let emphasisText = simPronoun !== "Առանց լրացուցիչ շեշտման" ? ` (${pronounEmphasisArm[simPronoun]} շեշտադրմամբ)` : "";

      const objArmMap: Record<string, string> = {
        "el café": "սուրճը", "los libros": "գրքերը", "viajar": "ճանապարհորդելը", "la cabeza": "գլուխը", "las piernas": "ոտքերը", "las flores": "ծաղիկները"
      };
      
      const verbArmMapSingular: Record<string, string> = {
        gustar: "դուր է գալիս", encantar: "չափազանց շատ է դուր գալիս (պաշտում է)", interesar: "հետաքրքրում է", doler: "ցավում է (ցավ է պատճառում)", molestar: "խանգարում է / նյարդայնացնում է", preocupar: "անհանգստացնում է"
      };

      const verbArmMapPlural: Record<string, string> = {
        gustar: "դուր են գալիս", encantar: "չափազանց շատ են դուր գալիս (պաշտում է)", interesar: "հետաքրքրում են", doler: "ցավում են (ցավ են պատճառում)", molestar: "խանգարում են / նյարդայնացնում են", preocupar: "անհանգստացնում են"
      };

      verbArm = isPluralObject ? verbArmMapPlural[simVerb] : verbArmMapSingular[simVerb];

      // Reconstruct natural Armenian translation
      let mainPhrase = "";
      if (simVerb === "doler") {
        // e.g. "Nos duele la cabeza" -> "Մեր գլուխը ցավում է"
        // "Me duelen las piernas" -> "Իմ ոտքերը ցավում են"
        const possessive: Record<string, string> = {
          me: "Իմ", te: "Քո", le: "Նրա", nos: "Մեր", os: "Ձեր", les: "Նրանց"
        };
        mainPhrase = `${possessive[simClitic]} ${objArmMap[simObject]} ${verbArm}։`;
      } else if (simVerb === "preocupar" || simVerb === "interesar") {
        mainPhrase = `${clitArm.charAt(0).toUpperCase() + clitArm.slice(1)} ${verbArm} ${objArmMap[simObject]}։`;
      } else {
        mainPhrase = `${clitArm.charAt(0).toUpperCase() + clitArm.slice(1)} ${verbArm} ${objArmMap[simObject]}։`;
      }

      // Special helper tips
      let ruleTip = "";
      if (isVerbInfinitive) {
        ruleTip = `💡 Քանի որ «${simObject}»-ը անորոշ բայ է (infinitivo), բայը միշտ օգտագործվում է եզակի ձևով՝ «${expectedVerbForm}»։`;
      } else if (isPluralObject) {
        ruleTip = `💡 Քանի որ «${simObject}»-ը հոգնակի գոյական է, բայը պարտադիր խոնարհվում է հոգնակիով՝ «${expectedVerbForm}»։`;
      } else {
        ruleTip = `💡 Քանի որ «${simObject}»-ը եզակի գոյական է, բայը խոնարհվում է եզակի ձևով՝ «${expectedVerbForm}»։`;
      }

      return {
        sentence: fullSentence,
        verbUsed: expectedVerbForm,
        pronounCorrect,
        pronounFeedback,
        translation: mainPhrase + emphasisText,
        ruleTip
      };
    };

    return getLiveTranslationAndTips();
  };

  const simVerdict = checkPlaygroundAlignment();

  // Mark Chapter as studied/completed
  const toggleChapterCompleted = (id: string) => {
    audio.playTap();
    if (completedChapters.includes(id)) {
      setCompletedChapters(completedChapters.filter(x => x !== id));
    } else {
      setCompletedChapters([...completedChapters, id]);
      setTotalScore(prev => prev + 15);
      // If we finished all lessons, trigger confetti!
      if (completedChapters.length + 1 === TheoryChapters.length) {
        triggerConfetti();
      }
    }
  };

  // Launching educational game
  const startGame = (index: number) => {
    audio.playTap();
    setActiveGameIndex(index);
    setGameLevel(0);
    setGameLives(3);
    setGameScore(0);
    setGameFinished(false);
    setGameErrorCounter(0);
    setSentenceBuilderAnswer([]);
    setLastAnswerIsCorrect(null);
    setShowExplanationModal(false);

    // Load static game data from variables
    const datasets = [Game1Data, Game2Data, Game3Data, Game4Data, Game5Data, Game6Data];
    const dataset = datasets[index];
    setActiveGameData(dataset);

    // If game index is 2 (sentence builder), shuffle the active word options
    if (index === 2 && dataset[0]?.scrambledWords) {
      setSentenceBuilderAnswer([]);
    }
  };

  // Selecting answers inside active Games
  const selectGameAnswer = (answer: string) => {
    const currentQuestion = activeGameData[gameLevel];
    if (!currentQuestion) return;

    const isCorrect = answer.toLowerCase().trim() === currentQuestion.correct.toLowerCase().trim();
    
    if (isCorrect) {
      audio.playCorrect();
      setLastAnswerIsCorrect(true);
      setGameScore(prev => prev + 10);
      setTotalScore(prev => prev + 10);
    } else {
      audio.playIncorrect();
      setLastAnswerIsCorrect(false);
      setGameLives(prev => Math.max(0, prev - 1));
      setGameErrorCounter(prev => prev + 1);
    }

    setShowExplanationModal(true);
  };

  // Sentence Builder selection helpers
  const handleWordBlockClick = (word: string, index: number) => {
    audio.playTap();
    setSentenceBuilderAnswer([...sentenceBuilderAnswer, word]);
  };

  const removeWordFromAnswer = (idx: number) => {
    audio.playTap();
    const copy = [...sentenceBuilderAnswer];
    copy.splice(idx, 1);
    setSentenceBuilderAnswer(copy);
  };

  const submitSentenceBuilder = () => {
    const currentQuestion = activeGameData[gameLevel];
    if (!currentQuestion) return;

    const combinedAnswer = sentenceBuilderAnswer.join(" ");
    
    // Normalization cleaner to prevent space or punctuation issues
    const norm = (s: string) => s.toLowerCase().trim().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?¿]/g, "");
    
    const isCorrect = norm(combinedAnswer) === norm(currentQuestion.correct);

    if (isCorrect) {
      audio.playCorrect();
      setLastAnswerIsCorrect(true);
      setGameScore(prev => prev + 15);
      setTotalScore(prev => prev + 15);
    } else {
      audio.playIncorrect();
      setLastAnswerIsCorrect(false);
      setGameLives(prev => Math.max(0, prev - 1));
      setGameErrorCounter(prev => prev + 1);
    }

    setShowExplanationModal(true);
  };

  const nextGameLevel = () => {
    audio.playTap();
    setShowExplanationModal(false);
    setLastAnswerIsCorrect(null);
    setSentenceBuilderAnswer([]);

    const nextLvl = gameLevel + 1;
    // Condition to check if game completed or user ran out of lives
    if (nextLvl >= activeGameData.length || gameLives <= 0) {
      // Calculate final stars (3 stars for 0 mistakes, 2 stars for 1 mistake, 1 star for 2 mistakes, else 0/1 depending on completion)
      let earnedStars = 0;
      if (gameLives > 0) {
        if (gameErrorCounter === 0) earnedStars = 3;
        else if (gameErrorCounter === 1) earnedStars = 2;
        else earnedStars = 1;
      }

      // Update game stats in progress object
      const gameKey = `game_${activeGameIndex}`;
      const bestStars = Math.max(starsProgress[gameKey] || 0, earnedStars);
      
      const newStarsProgress = { ...starsProgress, [gameKey]: bestStars };
      setStarsProgress(newStarsProgress);

      // Check if certificate should be unlocked
      // Criteria: Finished at least 4 games with at least 1 star each
      const starsArray = Object.keys(newStarsProgress).map(k => newStarsProgress[k]);
      const finishedGamesCount = starsArray.filter(s => s > 0).length;
      if (finishedGamesCount >= 4) {
        setUnlockedCertificate(true);
      }

      setGameFinished(true);
      triggerConfetti();
    } else {
      setGameLevel(nextLvl);
    }
  };

  // Exam Logic - builds 10 random questions out of all games lists
  const generateExam = () => {
    audio.playTap();
    const aggregate = [...Game1Data, ...Game2Data, ...Game3Data, ...Game4Data, ...Game5Data, ...Game6Data];
    
    // Shuffle and pick 10 questions
    const shuffled = [...aggregate].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);

    setExamQuestionsList(selected);
    setExamActive(true);
    setExamQuestionIndex(0);
    setExamScore(0);
    setExamFinished(false);
    setExamAnswered(false);
    setExamSelectedOption("");
  };

  const submitExamAnswer = (option: string) => {
    if (examAnswered) return;
    setExamSelectedOption(option);
    
    const curQuestion = examQuestionsList[examQuestionIndex];
    const isCorrect = option.toLowerCase().trim() === curQuestion.correct.toLowerCase().trim();
    
    setExamIsCorrect(isCorrect);
    setExamAnswered(true);

    if (isCorrect) {
      audio.playCorrect();
      setExamScore(prev => prev + 1);
    } else {
      audio.playIncorrect();
    }
  };

  const nextExamQuestion = () => {
    audio.playTap();
    setExamAnswered(false);
    setExamSelectedOption("");
    
    const nextIdx = examQuestionIndex + 1;
    if (nextIdx >= examQuestionsList.length) {
      setExamFinished(true);
      setTotalScore(prev => prev + examScore * 15);
      if (examScore >= 8) {
        setUnlockedCertificate(true);
        triggerConfetti();
      }
    } else {
      setExamQuestionIndex(nextIdx);
    }
  };

  // Search filtered theory topics
  const getFilteredChapters = () => {
    if (!searchQuery.toLowerCase().trim()) return TheoryChapters;
    return TheoryChapters.filter(ch => 
      ch.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      ch.highlightText?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      JSON.stringify(ch.sections).toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredChapters = getFilteredChapters();

  // Print function helper
  const handlePrintCertificate = () => {
    window.print();
  };

  // Reset progress helper
  const resetAllProgress = () => {
    if (confirm("Վստա՞հ եք, որ ցանկանում եք զրոյացնել ամբողջ առաջընթացը և բոլոր միավորները։")) {
      audio.playIncorrect();
      setTotalScore(0);
      setStarsProgress({});
      setCompletedChapters([]);
      setUserName("");
      setUnlockedCertificate(false);
      setActiveGameIndex(null);
      setExamActive(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] text-slate-900 font-sans flex flex-col justify-between antialiased transition-colors duration-300">
      
      {/* Confetti canvas wrapper */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-50 w-full h-full" />

      {/* Main Header / Top Dashboard layout */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm print:hidden p-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Main Logo & Language badges */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={handleSoundTap}>
            <div className="w-10 h-10 bg-red-650 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-red-200 shrink-0">ES</div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">Gustar և նման բայեր</h1>
              <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold flex items-center gap-1.5 font-sans pt-0.5">
                Իսպաներենի ինտերակտիվ դասընթաց 
                <span className="bg-red-50 text-red-650 text-[9px] px-1.5 py-0.2 rounded font-bold uppercase">ES</span>
                <span className="bg-indigo-50 text-indigo-600 text-[9px] px-1.5 py-0.2 rounded font-bold uppercase">AM</span>
              </p>
            </div>
          </div>

          {/* Upper Info controls (Score, Star trackers, sound modifier) */}
          <div className="flex items-center flex-wrap gap-2.5">
            <div className="bg-slate-50 border border-slate-200 rounded-full px-4 py-2 flex items-center gap-2 shadow-xs">
              <span className="text-xs font-semibold text-slate-500">Միավորներ՝</span>
              <span className="font-mono text-sm font-bold text-slate-900">{totalScore}</span>
            </div>

            <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-4 py-2 rounded-full text-amber-800 shadow-xs">
              <span className="text-xs font-bold font-sans">Աստղեր՝</span>
              <span className="font-mono text-sm font-black flex items-center gap-0.5">
                {(Object.values(starsProgress) as number[]).reduce((a, b) => a + b, 0)}
                <span className="text-amber-500 animate-pulse">★</span>
              </span>
            </div>

            {/* Sound Controls */}
            <button 
              onClick={() => {
                setSoundOn(!soundOn);
                audio.playTap();
              }}
              className={`p-2.5 rounded-full border transition-all cursor-pointer ${
                soundOn 
                  ? "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:scale-105" 
                  : "bg-red-50 border-red-200 text-red-500 hover:bg-red-100"
              }`}
              title={soundOn ? "Ձայնը միացված է" : "Ձայնն անջատված է"}
            >
              {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Global tab Switcher bar */}
        <div className="max-w-7xl mx-auto mt-4 pt-4 border-t border-slate-150">
          <nav className="flex flex-wrap gap-2" aria-label="Tabs">
            <button
              onClick={() => handleTabChange("theory")}
              className={`flex items-center gap-2 px-4 py-2 text-xs md:text-sm font-medium rounded-full transition-all border cursor-pointer ${
                activeTab === "theory"
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100 font-semibold"
                  : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200/50"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Տեսություն
            </button>

            <button
              onClick={() => handleTabChange("playground")}
              className={`flex items-center gap-2 px-4 py-2 text-xs md:text-sm font-medium rounded-full transition-all border cursor-pointer ${
                activeTab === "playground"
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100 font-semibold"
                  : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200/50"
              }`}
            >
              <Layers className="w-4 h-4" />
              Խոնարհման Լաբ
            </button>

            <button
              onClick={() => handleTabChange("games")}
              className={`flex items-center gap-2 px-4 py-2 text-xs md:text-sm font-medium rounded-full transition-all border cursor-pointer ${
                activeTab === "games"
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100 font-semibold"
                  : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200/50"
              }`}
            >
              <Gamepad2 className="w-4 h-4" />
              Խաղեր (6)
            </button>

            <button
              onClick={() => handleTabChange("exam")}
              className={`flex items-center gap-2 px-4 py-2 text-xs md:text-sm font-medium rounded-full transition-all border cursor-pointer ${
                activeTab === "exam"
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100 font-semibold"
                  : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200/50"
              }`}
            >
              <FileText className="w-4 h-4" />
              Քննություն
            </button>
          </nav>
        </div>
      </header>

      {/* Main Container workspace */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 print:py-0 print:px-0">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: Theory Chapters */}
          {activeTab === "theory" && (
            <motion.div
              key="theory"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 print:hidden"
            >
              
              {/* Left sidebar: Chapters selector */}
              <div className="lg:col-span-4 space-y-4">
                
                {/* Search Bar */}
                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm shadow-slate-150/50">
                  <span className="text-xs font-bold text-slate-400 block mb-2 uppercase tracking-wider">Դասերի Որոնում</span>
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Գրիր կանոն կամ բանալի..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 text-xs md:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                {/* Chapters list container */}
                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm shadow-slate-150/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Դասացուցակ</span>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-mono font-bold">
                      {completedChapters.length}/{TheoryChapters.length} ավարտված
                    </span>
                  </div>

                  <div className="space-y-1.5 max-h-[440px] overflow-y-auto pr-1">
                    {filteredChapters.map((ch) => {
                      const isSelected = ch.id === selectedChapterId;
                      const isDone = completedChapters.includes(ch.id);
                      return (
                        <button
                          key={ch.id}
                          onClick={() => {
                            setSelectedChapterId(ch.id);
                            audio.playTap();
                          }}
                          className={`w-full text-left p-3 rounded-2xl transition-all border flex items-center justify-between gap-3 cursor-pointer ${
                            isSelected 
                              ? "bg-indigo-650 border-indigo-650 text-white shadow-sm font-medium" 
                              : "bg-slate-50 hover:bg-slate-105/80 border-slate-150 text-slate-700"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                              isSelected ? "bg-white/20 text-white" : "bg-slate-200/80 text-slate-600"
                            }`}>
                              {ch.number}
                            </span>
                            <span className="truncate text-xs md:text-sm font-sans">{ch.title}</span>
                          </div>

                          <div 
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleChapterCompleted(ch.id);
                            }}
                            className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 cursor-pointer transition-all ${
                              isDone 
                                ? isSelected ? "bg-white border-white text-indigo-600" : "bg-emerald-500 border-emerald-500 text-white"
                                : isSelected ? "border-white/50 hover:border-white text-transparent" : "border-slate-300 hover:border-indigo-400 text-transparent"
                            }`}
                          >
                            <Check className="w-3.5 h-3.5 stroke-[3px]" />
                          </div>
                        </button>
                      );
                    })}

                    {filteredChapters.length === 0 && (
                      <div className="text-center py-6 text-slate-400 text-xs">
                        Ոչինչ չի գտնվել փնտրման պայմանով:
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Verb cheat-sheet widget in custom Dark Bento styling like Rule #2 */}
                <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl p-5 shadow-xl overflow-hidden relative">
                  <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs mb-4 uppercase tracking-tighter">
                    <BookMarked className="w-4 h-4 text-indigo-400" />
                    <span>Ամենակարճ հիշելու ձևը</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="p-2.5 bg-white/5 rounded-xl border border-white/5">
                      <span className="block font-bold text-indigo-300 text-[11px] uppercase tracking-wide">Եզակի կամ Բայ (Gusta)</span>
                      <p className="text-xs text-slate-300 font-mono mt-0.5">Me gusta el café. | Me gusta viajar.</p>
                    </div>
                    <div className="p-2.5 bg-white/5 rounded-xl border border-white/5">
                      <span className="block font-bold text-rose-300 text-[11px] uppercase tracking-wide">Հոգնակի (Gustan)</span>
                      <p className="text-xs text-slate-300 font-mono mt-0.5">Me gustan los libros.</p>
                    </div>
                    <div className="p-2.5 bg-white/5 rounded-xl border border-white/5">
                      <span className="block font-bold text-amber-300 text-[11px] uppercase tracking-wide">Ժխտման ձևավորում</span>
                      <p className="text-xs text-slate-300 font-mono mt-0.5">No me gustan los perros.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Panel: Content Reader */}
              <div className="lg:col-span-8">
                {(() => {
                  const activeChapter = TheoryChapters.find(c => c.id === selectedChapterId);
                  if (!activeChapter) return null;
                  const isDone = completedChapters.includes(activeChapter.id);

                  return (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                      className="bg-white rounded-3xl border border-slate-200 shadow-sm shadow-slate-100/50 p-6 sm:p-8 space-y-6"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="bg-indigo-50 text-indigo-700 text-[10px] uppercase font-bold px-2.5 py-1 rounded-full">դաս {activeChapter.number}</span>
                          </div>
                          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">{activeChapter.title}</h2>
                        </div>

                        {/* Completion switcher */}
                        <button
                          onClick={() => toggleChapterCompleted(activeChapter.id)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                            isDone 
                              ? "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100/50" 
                              : "bg-slate-100 hover:bg-indigo-50 hover:text-indigo-705 hover:border-indigo-200 text-slate-700 border-slate-200"
                          }`}
                        >
                          <CheckCircle className={`w-4 h-4 ${isDone ? "text-emerald-500 animate-bounce" : ""}`} />
                          {isDone ? "ԱՎԱՐՏՎԱԾ Է" : "ՆՇԵԼ ԱՎԱՐՏՎԱԾ"}
                        </button>
                      </div>

                      {/* Header Highlight Banner like Rule #1 the Formula */}
                      {activeChapter.highlightText && (
                        <div className="bg-slate-50 p-5 rounded-2xl border-l-4 border-indigo-500 italic text-base leading-relaxed text-slate-800 font-sans">
                          {activeChapter.highlightText}
                        </div>
                      )}

                      {/* Sections map */}
                      <div className="space-y-6 text-slate-700 font-sans leading-relaxed text-sm">
                        {activeChapter.sections.map((sec, sIdx) => (
                          <div key={sIdx} className="space-y-3">
                            <h3 className="text-base font-bold text-slate-900 border-l-4 border-indigo-550 pl-3">
                              {sec.title}
                            </h3>
                            {sec.description && (
                              <p className="text-slate-600 pl-4">{sec.description}</p>
                            )}

                            {/* Optional structured points */}
                            {sec.points && (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-4">
                                {sec.points.map((pt, pIdx) => (
                                  <div key={pIdx} className="bg-white border border-slate-200 p-4 rounded-2xl space-y-1.5 shadow-xs">
                                    <h4 className="font-bold text-slate-850 text-xs sm:text-sm">{pt.title}</h4>
                                    <p className="text-xs text-slate-500 leading-normal">{pt.desc}</p>
                                    {pt.examples && (
                                      <div className="mt-2 pt-1 border-t border-slate-200/60 space-y-1">
                                        {pt.examples.map((ex, eIdx) => (
                                          <div key={eIdx} className="text-xs font-mono">
                                            <span className={`${ex.isCorrect === false ? "text-red-500 line-through" : "text-indigo-600 font-bold"}`}>{ex.es}</span>
                                            <span className="text-slate-400"> - {ex.arm}</span>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Render Table if exists */}
                            {sec.tableRows && sec.tableHeaders && (
                              <div className="overflow-x-auto pl-4 border border-slate-200 rounded-2xl bg-white shadow-xs">
                                <table className="min-w-full text-xs font-sans">
                                  <thead>
                                    <tr className="bg-slate-100 border-b border-slate-200">
                                      {sec.tableHeaders.map((h, hIdx) => (
                                        <th key={hIdx} className="font-bold text-slate-600 px-3 py-2 text-left">{h}</th>
                                      ))}
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-slate-100">
                                    {sec.tableRows.map((row, rIdx) => (
                                      <tr key={rIdx} className="hover:bg-slate-50/50">
                                        {row.map((cell, cIdx) => (
                                          <td key={cIdx} className={`px-3 py-2.5 ${cIdx === 1 ? "font-mono font-bold text-indigo-600 text-sm" : cIdx === 2 ? "font-mono font-semibold" : ""}`}>{cell}</td>
                                        ))}
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            )}

                            {/* Render Section Examples list */}
                            {sec.examples && (
                              <div className="space-y-2 pl-4">
                                {sec.examples.map((ex, eIdx) => (
                                  <div 
                                    key={eIdx} 
                                    onClick={handleSoundTap}
                                    className={`p-3.5 rounded-2xl border flex items-start gap-2.5 cursor-pointer hover:border-indigo-300 hover:bg-indigo-50/10 transition-all ${
                                      ex.isCorrect === false ? "border-red-150 bg-red-50/10 text-red-700" : "border-slate-200 bg-white shadow-xs"
                                    }`}
                                  >
                                    <span className="text-indigo-400 text-xs shrink-0 select-none mt-0.5">💬</span>
                                    <div>
                                      <p className={`font-mono text-xs sm:text-sm ${ex.isCorrect === false ? "line-through text-slate-400" : "font-bold text-slate-900"}`}>
                                        {ex.es}
                                      </p>
                                      <p className="text-xs text-slate-500 pt-0.5">{ex.arm}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Pagination navigation helper */}
                      <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
                        <span className="text-xs text-slate-400 font-medium">Դասընթաց Իսպաներեն հայերենով</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              const currNum = activeChapter.number;
                              if (currNum > 1) {
                                const prevCh = TheoryChapters.find(c => c.number === currNum - 1);
                                if (prevCh) setSelectedChapterId(prevCh.id);
                              }
                              audio.playTap();
                            }}
                            disabled={activeChapter.number === 1}
                            className="px-4 py-2 rounded-full border border-slate-200 text-xs font-semibold hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                          >
                            Հետ
                          </button>
                          <button
                            onClick={() => {
                              const currNum = activeChapter.number;
                              if (currNum < TheoryChapters.length) {
                                const nextCh = TheoryChapters.find(c => c.number === currNum + 1);
                                if (nextCh) setSelectedChapterId(nextCh.id);
                              }
                              audio.playTap();
                            }}
                            disabled={activeChapter.number === TheoryChapters.length}
                            className="px-4 py-2 bg-indigo-600 hover:bg-slate-900 text-white font-bold text-xs rounded-full cursor-pointer shadow-sm disabled:opacity-30 disabled:hover:bg-indigo-650"
                          >
                            Առաջ
                          </button>
                        </div>
                      </div>

                    </motion.div>
                  );
                })()}
              </div>

            </motion.div>
          )}
          {/* TAB 2: Conjugation Simulator Playground */}
          {activeTab === "playground" && (
            <motion.div
              key="playground"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="max-w-4xl mx-auto space-y-6"
            >
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm shadow-slate-100/50 space-y-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-base">🎛️</span>
                    Ինտերակտիվ Խոնարհման Լաբորատորիա (Playground)
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 pt-1">
                    Փորձարկիր դերանունների, բայերի և իմաստային առարկաների համադրումը։ Մեր լաբորատորիան ակնթարթորեն կստուգի համապատասխանությունը և կթարգմանի հայերեն։
                  </p>
                </div>

                {/* Grid controls */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-150">
                  
                  {/* 1. Pronoun Selector */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">1. Շեշտված դերանուն (a...)</label>
                    <div className="space-y-1 max-h-48 overflow-y-auto pr-0.5">
                      {["A mí", "A ti", "A él / ella", "A nosotros / nosotras", "A vosotros / vosotras", "A ellos / ellas / ustedes", "Առանց լրացուցիչ շեշտման"].map(x => (
                        <button
                          key={x}
                          onClick={() => {setSimPronoun(x); audio.playTap();}}
                          className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                            simPronoun === x 
                              ? "bg-slate-905 bg-slate-900 text-white font-bold" 
                              : "bg-white hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200/60"
                          }`}
                        >
                          {x}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 2. Clitic Pronoun (me, te...) */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">2. Կարճ դերանուն</label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {["me", "te", "le", "nos", "os", "les"].map(x => (
                        <button
                          key={x}
                          onClick={() => {setSimClitic(x); audio.playTap();}}
                          className={`px-2 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                            simClitic === x 
                              ? "bg-indigo-600 text-white shadow-sm shadow-indigo-100" 
                              : "bg-white border border-slate-200/60 hover:bg-slate-200 text-slate-700"
                          }`}
                        >
                          {x}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 3. Spanish Verbs */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">3. Բայի արմատ</label>
                    <div className="space-y-1 max-h-48 overflow-y-auto pr-0.5">
                      {["gustar", "encantar", "interesar", "doler", "molestar", "preocupar"].map(x => (
                        <button
                          key={x}
                          onClick={() => {setSimVerb(x); audio.playTap();}}
                          className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                            simVerb === x 
                              ? "bg-slate-900 text-white font-bold" 
                              : "bg-white hover:bg-slate-200 text-slate-700 border border-slate-200/60"
                          }`}
                        >
                          {x}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 4. Semantic Object Noun/verb */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">4. Ի՞նչն է դուր գալիս/ցավում</label>
                    <div className="space-y-1 max-h-48 overflow-y-auto pr-0.5">
                      {[
                        { text: "el café", desc: "սուրճը (եզակի)" },
                        { text: "los libros", desc: "գրքերը (հոգնակի)" },
                        { text: "viajar", desc: "ճանապարհորդելը (բայ)" },
                        { text: "la cabeza", desc: "գլուխը (եզակի)" },
                        { text: "las piernas", desc: "ոտքերը (հոգնակի)" },
                        { text: "las flores", desc: "ծաղիկները (հոգնակի)" }
                      ].map(x => (
                        <button
                          key={x.text}
                          onClick={() => {setSimObject(x.text); audio.playTap();}}
                          className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                            simObject === x.text 
                              ? "bg-indigo-650 text-white font-bold" 
                              : "bg-white hover:bg-slate-200 text-slate-700 border border-slate-200/60"
                          }`}
                        >
                          <div className="font-bold font-mono">{x.text}</div>
                          <div className="text-[9px] opacity-75">{x.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Sim Sentence output Display */}
                <div className="space-y-4">
                  <div className="bg-slate-900 text-white rounded-3xl p-6 space-y-4 shadow-xl border border-slate-850 relative overflow-hidden">
                    <div className="absolute top-3 right-3 bg-white/10 px-2 py-0.5 rounded text-[9px] uppercase font-mono tracking-wider text-slate-300">
                      Live Output Simulator
                    </div>

                    {/* Spanish Built String */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold text-indigo-400 block uppercase tracking-widest font-mono">Իսպաներեն Написание՝</span>
                      <div className="text-lg sm:text-2xl font-mono font-black tracking-wide text-white">
                        {simPronoun !== "Առանց լրացուցիչ շեշտման" && (
                          <span className="text-slate-400">{simPronoun} </span>
                        )}
                        <span className="text-indigo-400">{simClitic}</span>{" "}
                        <span className="text-emerald-450 text-emerald-400 underline">{simVerdict.verbUsed}</span>{" "}
                        <span className="text-white">{simObject}</span>.
                      </div>
                    </div>

                    {/* Armenian Live translation */}
                    <div className="space-y-1.5 pt-2 border-t border-white/10">
                      <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-widest font-mono">Հայերեն Թարգմանություն՝</span>
                      <div className="text-xs sm:text-sm text-slate-100 font-semibold font-sans leading-relaxed">
                        {simVerdict.translation}
                      </div>
                    </div>
                  </div>

                  {/* Verdict and Grammar notifications */}
                  <div className="space-y-2.5">
                    
                    {simVerdict.pronounCorrect ? (
                      <div className="bg-emerald-50 border border-emerald-205 p-4 rounded-2xl flex items-start gap-2.5 text-emerald-850">
                        <CheckCircle className="w-5 h-5 text-emerald-500 fill-emerald-100 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold font-sans">Դերանունների ճիշտ համապատասխանություն (Correct alignment!)</p>
                          <p className="text-[11px] text-emerald-700 pt-0.5 leading-relaxed">շեշտված ձևը «{simPronoun}» և կարճ դերանունը «{simClitic}» կազմում են կատարյալ քերականական զույգ։</p>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-rose-50 border border-rose-205 p-4 rounded-2xl flex items-start gap-2.5 text-red-900">
                        <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                        <div className="text-xs border-none p-0 bg-transparent">
                          <p className="font-bold font-sans">Քերականական սխալ (Incorrect combination!)</p>
                          <p className="pt-1 text-red-750 leading-normal font-sans">{simVerdict.pronounFeedback}</p>
                        </div>
                      </div>
                    )}

                    {/* Tip of singular plural rule conjugation */}
                    <div className="bg-amber-50 border border-amber-205 p-4 rounded-2xl flex items-start gap-2.5 text-amber-900">
                      <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                      <div className="text-xs bg-transparent border-none p-0">
                        <p className="font-bold font-sans">Բայաձևի խոնարհման կանոնը (Conjugation Rule)</p>
                        <p className="pt-0.5 text-amber-800 leading-relaxed font-sans">{simVerdict.ruleTip}</p>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* TAB 3: 6 Games Dashboard / Active Game Interface */}
          {activeTab === "games" && (
            <motion.div
              key="games"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              
              {/* Games selector view */}
              {activeGameIndex === null ? (
                <div className="space-y-6">
                  
                  {/* Beautiful intro block */}
                  <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm shadow-slate-100/50 text-center max-w-3xl mx-auto space-y-2">
                    <span className="text-indigo-600 text-3xl font-black block">🎮</span>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Իսպաներենի 6 Զվարճալի Խաղեր</h2>
                    <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
                      Յուրաքանչյուր խաղ ունի յուրահատուկ ձևաչափ՝ գուշակում, բայերի ընտրություն, նախադասության կառուցում և դիալոգի լրացում։ Զարգացրու հմտություններդ և հավաքիր բոլոր 18 աստղերը։
                    </p>
                  </div>

                  {/* Bento Grid standard cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
                    {[
                      { index: 0, title: "1. Գուշակիր դերանունը", desc: "A mí, a ti... շեշտված դերանունների համապատասխանեցնելը կարճ me, te, le ձևերին:", difficulty: "Հեշտ", type: "Multiple choice" },
                      { index: 1, title: "2. Gusta թե՞ Gustan", desc: "Սորվիր տարբերել եզակի գոյականների, անորոշ բայերի և հոգնակի գոյականների դեպքերը:", difficulty: "Միջին", type: "Quick check" },
                      { index: 2, title: "3. Կառուցիր նախադասությունը", desc: "Ինտերակտիվ բառախաղ։ Դասավորիր խառը տրված բառերը իսպաներեն ճիշտ հերթականությամբ։", difficulty: "Դժվար", type: "Interactive blocks" },
                      { index: 3, title: "4. Մարդկային 「Gustar」", desc: "Բացահայտիր yo gusto, tú gustas, me gustas, le gusto a Carlos ձևերի տարբերությունը:", difficulty: "Միջին", type: "Dialogue translation" },
                      { index: 4, title: "5. Նմանատիպ այլ բայեր", desc: "Encantar, doler, apetecer, molestar... Իմացիր նրանց իսկական իմաստները և բառացի թարգմանությունները։", difficulty: "Հեշտ", type: "Translation quiz" },
                      { index: 5, title: "6. Դերախաղ-Դիալոգ", desc: "Լրացրու Լուսիայի և Կառլոսի զրույցի բոլոր բաց թողնված տողերը բալային ճիշտ ձևերով։", difficulty: "Դժվար", type: "Interactive context" }
                    ].map((g) => {
                      const starKey = `game_${g.index}`;
                      const stars = starsProgress[starKey] || 0;

                      return (
                        <div 
                          key={g.index} 
                          className="bg-white rounded-3xl border border-slate-250 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-50/50 transition-all duration-300 p-6 flex flex-col justify-between gap-5 group"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                g.difficulty === "Հեշտ" ? "bg-emerald-50 text-emerald-700" : g.difficulty === "Միջին" ? "bg-amber-50 text-amber-700" : "bg-red-50 text-red-700"
                              }`}>
                                {g.difficulty}
                              </span>
                              
                              {/* Rendering stars for each card */}
                              <div className="flex gap-0.5 text-amber-400">
                                {[1, 2, 3].map((s) => (
                                  <span key={s} className="text-sm">
                                    {s <= stars ? "★" : "☆"}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mt-2">{g.title}</h3>
                            <p className="text-xs text-slate-500 leading-normal">{g.desc}</p>
                          </div>

                          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                            <span className="text-[10px] font-mono text-slate-400 bg-slate-50 px-2 py-0.5 rounded uppercase tracking-wider">{g.type}</span>
                            <button
                              onClick={() => startGame(g.index)}
                              className="px-4 py-1.5 rounded-full bg-slate-900 group-hover:bg-indigo-600 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                            >
                              ԽԱՂԱԼ <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Reset indicators */}
                  <div className="text-center pt-4">
                    <button
                      onClick={resetAllProgress}
                      className="text-xs text-slate-405 hover:text-red-500 hover:underline transition-all font-semibold font-mono cursor-pointer"
                    >
                      ☠ ԶՐՈՅԱՑՆԵԼ ԱՄԲՈՂՋ ԱՌԱՋԸՆԹԱՑԸ
                    </button>
                  </div>

                </div>
              ) : (
                
                /* Active Game Workspace window */
                <div className="max-w-2xl mx-auto font-sans">
                  {(() => {
                    const currentQuestion = activeGameData[gameLevel];
                    const gameCompletedPercent = activeGameData.length > 0 ? (gameLevel / activeGameData.length) * 100 : 0;
                    
                    return (
                      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm shadow-slate-100/50 space-y-6">
                        
                        {/* Upper info (exit, hearts, score) */}
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                          <button
                            onClick={() => {
                              audio.playTap();
                              setActiveGameIndex(null);
                            }}
                            className="text-xs font-bold text-slate-400 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
                          >
                            ← վերադառնալ
                          </button>

                          <div className="flex items-center gap-4">
                            {/* Score Tracker */}
                            <span className="font-mono text-xs font-bold bg-slate-100 px-2.5 py-1 rounded-md text-slate-600">
                              Միավոր՝ <strong className="text-slate-950">{gameScore}</strong>
                            </span>

                            {/* Hearts / Remaining lives */}
                            <div className="flex items-center gap-1 text-red-550">
                              {[1, 2, 3].map((h) => (
                                <Heart 
                                  key={h} 
                                  className={`w-5 h-5 ${h <= gameLives ? "fill-red-500 text-red-500" : "opacity-25 text-slate-300"}`} 
                                />
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Game Progress Indicator bar */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] uppercase font-mono font-bold text-slate-400">
                            <span>Հարց {gameLevel + 1} / {activeGameData.length}</span>
                            <span>{Math.round(gameCompletedPercent)}% Լրացված</span>
                          </div>
                          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-indigo-600 transition-all duration-300 rounded-full"
                              style={{ width: `${gameCompletedPercent}%` }}
                            />
                          </div>
                        </div>

                        {/* Interactive Main Question View Area */}
                        {!gameFinished && currentQuestion ? (
                          <div className="space-y-6 font-sans">
                            
                            {/* Instruction bubble */}
                            <div className="space-y-1 bg-slate-50 border border-slate-200 p-4 rounded-2xl">
                              <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest block font-sans">Ինստրուկցիա (Առաջադրանք)</span>
                              <p className="text-xs md:text-sm text-slate-800 font-bold">{currentQuestion.instructionArm}</p>
                            </div>

                            {/* Central Display Card (Spanish snippet + Armenian prompt) */}
                            <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl text-center shadow-lg space-y-4 relative overflow-hidden border border-slate-800">
                              <div className="absolute top-2 right-2 flex gap-1">
                                <span className="bg-white/10 text-white/70 text-[8px] font-mono uppercase px-1.5 py-0.5 rounded">Game-{activeGameIndex + 1}</span>
                              </div>

                              <div className="space-y-1.5">
                                <span className="text-[10px] font-bold text-indigo-400 block uppercase tracking-wider font-mono">Իսպաներեն Նախադասություն՝</span>
                                <div className="text-xl sm:text-2xl font-mono font-bold tracking-wide">
                                  {currentQuestion.prompt}
                                </div>
                              </div>

                              <div className="space-y-1 border-t border-white/10 pt-3">
                                <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider font-mono">Հայերեն Իմաստը՝</span>
                                <div className="text-sm text-slate-200 italic font-semibold">
                                  {currentQuestion.translationArm}
                                </div>
                              </div>
                            </div>

                            {/* INPUT ANSWERS CONTROLS */}
                            {activeGameIndex === 2 ? (
                              
                              /* Game 3: Sentence builder interactive interface */
                              <div className="space-y-4">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Դասավորիր խմբերը (սեղմելով բառերի վրա բաց թողնված տեղերի համար)</span>
                                
                                {/* Slot area */}
                                <div className="min-h-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-3 flex flex-wrap gap-2 items-center">
                                  {sentenceBuilderAnswer.map((w, idx) => (
                                    <button
                                      key={idx}
                                      onClick={() => removeWordFromAnswer(idx)}
                                      className="bg-indigo-50 hover:bg-red-50 hover:text-red-650 hover:border-red-200 border border-indigo-150 text-indigo-805 font-mono text-xs sm:text-sm px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 shadow-2xs font-bold cursor-pointer transition-all"
                                    >
                                      {w} <span className="text-[9px] opacity-60 font-sans">×</span>
                                    </button>
                                  ))}

                                  {sentenceBuilderAnswer.length === 0 && (
                                    <span className="text-xs text-slate-400 text-center w-full">Սեղմեք ներքևի բառերի վրա՝ նախադասությունը կազմելու համար։</span>
                                  )}
                                </div>

                                {/* Scrambled elements options */}
                                <div className="flex flex-wrap gap-2 justify-center py-2">
                                  {currentQuestion.scrambledWords?.map((w, sIdx) => {
                                    // Calculate how many times this word has been selected vs its occurrence in scrambled to allow repeating words if necessary
                                    const occurInSelected = sentenceBuilderAnswer.filter(x => x === w).length;
                                    const occurInScrambled = currentQuestion.scrambledWords?.filter(x => x === w).length || 0;
                                    const isUsedUp = occurInSelected >= occurInScrambled;

                                    return (
                                      <button
                                        key={sIdx}
                                        disabled={isUsedUp}
                                        onClick={() => handleWordBlockClick(w, sIdx)}
                                        className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-mono font-bold border transition-all ${
                                          isUsedUp 
                                            ? "bg-slate-100 border-slate-100 text-slate-300 cursor-not-allowed" 
                                            : "bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-800 border-slate-200 shadow-2xs cursor-pointer active:scale-95"
                                        }`}
                                      >
                                        {w}
                                      </button>
                                    );
                                  })}
                                </div>

                                {/* Reset & Submit action row */}
                                <div className="flex items-center gap-2 pt-1 justify-end">
                                  {sentenceBuilderAnswer.length > 0 && (
                                    <button
                                      onClick={() => {
                                        setSentenceBuilderAnswer([]);
                                        audio.playTap();
                                      }}
                                      className="p-2 px-3 rounded-full border border-slate-200 hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-all text-xs flex items-center gap-1.5 font-bold cursor-pointer"
                                      title="Մաքրել բոլորը"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                      Մաքրել
                                    </button>
                                  )}

                                  <button
                                    onClick={submitSentenceBuilder}
                                    disabled={sentenceBuilderAnswer.length === 0}
                                    className="px-6 py-2 rounded-full bg-slate-900 hover:bg-indigo-600 text-white text-xs font-bold transition-all disabled:opacity-40 cursor-pointer"
                                  >
                                    ՍՏՈՒԳԵԼ
                                  </button>
                                </div>

                              </div>

                            ) : (
                              
                              /* Simple selection option multiple choice games */
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                                {currentQuestion.options.map((opt, oIdx) => (
                                  <button
                                    key={oIdx}
                                    onClick={() => selectGameAnswer(opt)}
                                    className="scale-98 active:scale-95 text-left p-4 rounded-2xl border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/10 transition-all cursor-pointer shadow-xs font-mono font-bold text-slate-800 text-sm sm:text-base flex items-center justify-between"
                                  >
                                    <span>{opt}</span>
                                    <span className="text-[10px] bg-slate-50 text-slate-400 font-sans font-bold px-2 py-0.5 rounded-full uppercase">ընտրել</span>
                                  </button>
                                ))}
                              </div>

                            )}

                          </div>
                        ) : (
                          
                          /* Case Game lives ran out (0 lives) */
                          gameLives <= 0 && (
                            <div className="text-center py-6 space-y-4 font-sans">
                              <span className="text-red-500 text-5xl transform hover:scale-110 transition-all block">☠</span>
                              <h3 className="text-xl font-bold text-slate-900">Խաղն ավարտվեց (Կյանքերը սպառվեցին)</h3>
                              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                                Դուք սխալվեցիք 3 անգամ և սպառեցիք բոլոր թույլատրելի կյանքերը։ Մի՛ անհանգստացեք, կարող եք կրկին փորձել ցանկացած պահի։
                              </p>
                              
                              <div className="pt-2 flex justify-center gap-3">
                                <button
                                  onClick={() => startGame(activeGameIndex)}
                                  className="px-5 py-2.5 rounded-full bg-indigo-650 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow cursor-pointer"
                                >
                                  <RotateCw className="w-4 h-4 animate-spin-slow" />
                                  ԿՐԿԻՆ ՓՈՐՁԵԼ
                                </button>
                                <button
                                  onClick={() => setActiveGameIndex(null)}
                                  className="px-5 py-2.5 rounded-full border border-slate-350 text-slate-600 text-xs font-semibold hover:bg-slate-50 cursor-pointer"
                                >
                                  ԴԵՊԻ ՑՈՒՑԱԿ
                                </button>
                              </div>
                            </div>
                          )
                        )}

                        {/* Complete Game Finish display block */}
                        {gameFinished && (
                          <div className="text-center py-8 space-y-5 font-sans">
                            <span className="text-amber-500 text-5xl block animate-bounce">🏆</span>
                            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">Շնորհավորո՜ւմ ենք</h3>
                            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                              Դուք հաջողությամբ ավարտեցիք <strong>«{(() => {
                                const names = [
                                  "Գուշակիր դերանունը",
                                  "Gusta թե՞ Gustan",
                                  "Կառուցիր նախադասությունը",
                                  "Մարդկային 「Gustar」",
                                  "Նմանատիպ այլ բայեր",
                                  "Դերախաղ-Դիալոգ"
                                ];
                                return names[activeGameIndex];
                              })()}»</strong> խաղը <strong>{gameScore}</strong> միավորով։
                            </p>

                            {/* Render earned stars rating */}
                            <div className="flex flex-col items-center justify-center p-4 bg-indigo-50/50 border border-indigo-100 rounded-2xl max-w-xs mx-auto space-y-1">
                              <span className="text-[10px] font-bold uppercase text-indigo-700 tracking-wider">Ստացված աստղեր՝</span>
                              <div className="flex gap-1.5 text-2xl text-amber-400">
                                {[1, 2, 3].map((star) => (
                                  <span key={star}>
                                    {star <= (starsProgress[`game_${activeGameIndex}`] || 0) ? "★" : "☆"}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="pt-4 flex justify-center gap-3">
                              <button
                                onClick={() => startGame(activeGameIndex)}
                                className="px-5 py-2.5 rounded-full border border-slate-300 hover:bg-slate-50 text-slate-600 text-sm font-semibold flex items-center gap-1.5 cursor-pointer"
                              >
                                <RotateCw className="w-4 h-4" />
                                Կրկին խաղալ
                              </button>
                              <button
                                onClick={() => {
                                  audio.playTap();
                                  setActiveGameIndex(null);
                                }}
                                className="px-5 py-2.5 rounded-full bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 cursor-pointer"
                              >
                                Հաջորդ խաղը
                              </button>
                            </div>
                          </div>
                        )}

                      </div>
                    );
                  })()}
                </div>

              )}

              {/* Game popup answer/explanation modal standard overlay */}
              {showExplanationModal && activeGameData[gameLevel] && (
                <div className="fixed inset-0 z-50 bg-slate-905 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
                  <div className="bg-white rounded-3xl max-w-md w-full border border-slate-205 p-6 sm:p-7 shadow-xl space-y-4 animate-scaleUp font-sans">
                    
                    <div className="text-center space-y-2">
                      {lastAnswerIsCorrect ? (
                        <div className="flex flex-col items-center gap-1 text-emerald-600">
                          <CheckCircle className="w-12 h-12 stroke-[2.5px]" />
                          <h4 className="text-lg font-bold text-emerald-800">ՃԻՇՏ Է (¡Correcto!)</h4>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-1 text-red-500">
                          <XCircle className="w-12 h-12 stroke-[2.5px]" />
                          <h4 className="text-lg font-bold text-red-700">ՍԽԱԼ Է (¡Incorrecto!)</h4>
                        </div>
                      )}
                    </div>

                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 text-xs sm:text-sm space-y-3 leading-relaxed">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 block uppercase font-mono">Ճիշտ պատասխանը՝</span>
                        <p className="font-mono font-bold text-indigo-600 text-sm pt-0.5">
                          {activeGameData[gameLevel].correct}
                        </p>
                      </div>

                      <div className="border-t border-slate-200 pt-2.5">
                        <span className="text-[10px] font-bold text-indigo-500 block uppercase font-mono">Բացատրություն (Explanation)՝</span>
                        <p className="text-slate-600 pt-0.5 text-xs">
                          {activeGameData[gameLevel].extraExplanation}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={nextGameLevel}
                      className="w-full py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-md shadow-indigo-100"
                    >
                      ՇԱՐՈՒՆԱԿԵԼ
                    </button>

                  </div>
                </div>
              )}

            </motion.div>
          )}
                  {/* TAB 4: Exam Station & Printable Certificate */}
          {activeTab === "exam" && (
            <motion.div
              key="exam"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="max-w-4xl mx-auto space-y-6"
            >
              
              {!examActive && !examFinished && (
                <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm shadow-slate-100/50 space-y-6 font-sans print:hidden">
                  <span className="text-indigo-600 text-4xl font-black block text-center">📝</span>
                  <h2 className="text-2xl font-bold text-slate-900 text-center">Գիտելիքի Ստուգման Քննություն</h2>
                  <p className="text-xs sm:text-sm text-slate-600 text-center leading-relaxed">
                    Քննությունը բաղկացած է 10 պատահականորեն ընտրված հարցերից, որոնք ընդգրկում են իսպաներենի «Gustar» և նմանատիպ 10 այլ բայերի բոլոր տեխնիկական և շեշտված դեմքերով կանոնները։
                  </p>

                  <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-3">
                    <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider block">Քննության Պայմաններն ու Ակնկալիքները՝</span>
                    <ul className="space-y-2 text-xs text-slate-700 leading-relaxed font-sans">
                      <li className="flex items-center gap-2">
                        <span className="text-emerald-500 font-bold">✔</span>
                        <span>10 հարց (Բազմակի ընտրությամբ)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-emerald-500 font-bold">✔</span>
                        <span>80% կամ ավելի անցողիկ շեմ՝ քննությունը հաջող հանձնելու համար</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-emerald-500 font-bold">✔</span>
                        <span>Յուրաքանչյուր ճիշտ պատասխանը տալիս է +15 միավոր</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-2 flex justify-center">
                    <button
                      onClick={generateExam}
                      className="px-8 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-100 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-105"
                    >
                      ՍԿՍԵԼ ՔՆՆՈՒԹՅՈՒՆԸ
                    </button>
                  </div>
                </div>
              )}

              {/* Active Exam Frame */}
              {examActive && !examFinished && examQuestionsList[examQuestionIndex] && (
                <div className="max-w-xl mx-auto bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm shadow-slate-100/50 space-y-6 print:hidden">
                  
                  {/* Exam progress header */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 font-sans">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Գիտելիքի Քննություն</span>
                    <span className="text-xs font-bold bg-slate-50 text-slate-600 px-3 py-1 border border-slate-150 rounded-md font-mono">
                      Հարց {examQuestionIndex + 1} / 10
                    </span>
                  </div>

                  {/* Active Question Panel */}
                  <div className="space-y-5 font-sans">
                    <div className="space-y-1.5 bg-slate-50 border border-slate-200 p-4 rounded-2xl">
                      <span className="text-[10px] font-bold uppercase text-indigo-600 tracking-wider">Քննական Հարց՝</span>
                      <p className="text-base font-bold text-slate-900 font-mono">
                        {examQuestionsList[examQuestionIndex].prompt}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Հայերեն թարգմանությունը՝</span>
                      <p className="text-xs italic text-slate-600 font-semibold pl-1.5">{examQuestionsList[examQuestionIndex].translationArm}</p>
                    </div>

                    {/* Multiple choice options */}
                    <div className="grid grid-cols-1 gap-2.5 pt-1">
                      {examQuestionsList[examQuestionIndex].options.map((opt, oIdx) => {
                        const isSelected = examSelectedOption === opt;
                        const isCorrectAnswer = opt.toLowerCase().trim() === examQuestionsList[examQuestionIndex].correct.toLowerCase().trim();
                        
                        let btnStyle = "border-slate-200 hover:border-indigo-400 bg-white text-slate-800";
                        if (examAnswered) {
                          if (isCorrectAnswer) {
                            btnStyle = "border-emerald-300 bg-emerald-50 text-emerald-800";
                          } else if (isSelected) {
                            btnStyle = "border-red-300 bg-red-50 text-red-805";
                          } else {
                            btnStyle = "border-slate-105 bg-slate-50 text-slate-400";
                          }
                        }

                        return (
                          <button
                            key={oIdx}
                            disabled={examAnswered}
                            onClick={() => submitExamAnswer(opt)}
                            className={`w-full text-left p-3.5 rounded-2xl border transition-all text-xs sm:text-sm font-mono font-bold flex items-center justify-between cursor-pointer ${btnStyle}`}
                          >
                            <span>{opt}</span>
                            {examAnswered && isCorrectAnswer && (
                              <span className="text-[10px] text-emerald-600 font-bold font-sans uppercase">Ճիշտ է</span>
                            )}
                            {examAnswered && isSelected && !isCorrectAnswer && (
                              <span className="text-[10px] text-red-600 font-bold font-sans uppercase font-black">Սխալ է</span>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Answer explanation indicator and Next trigger */}
                    {examAnswered && (
                      <div className="space-y-4 pt-2">
                        <div className="bg-amber-50 border border-amber-150 p-4 rounded-2xl text-xs space-y-1">
                          <span className="font-bold text-amber-800 flex items-center gap-1 leading-none">
                            <Lightbulb className="w-4 h-4 shrink-0" />
                            <span>Մանրամասն պարզաբանում՝</span>
                          </span>
                          <p className="text-amber-950 pt-0.5 leading-relaxed">{examQuestionsList[examQuestionIndex].extraExplanation}</p>
                        </div>

                        <button
                          onClick={nextExamQuestion}
                          className="w-full py-3 rounded-full bg-slate-900 hover:bg-indigo-650 text-white font-bold text-xs cursor-pointer shadow-md"
                        >
                          {examQuestionIndex === 9 ? "ԱՎԱՐՏԵԼ ՔՆՆՈՒԹՅՈՒՆԸ" : "ՀԱՋՈՐԴ ՀԱՐՑԸ"}
                        </button>
                      </div>
                    )}

                  </div>

                </div>
              )}

              {/* Exam finished recap view */}
              {examFinished && (
                <div className="max-w-xl mx-auto bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm shadow-slate-100/50 text-center space-y-5 font-sans print:hidden">
                  <span className="text-4xl">🎓</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">Քննությունն Ավարտվեց</h3>
                  <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
                    Դուք պատասխանեցիք 10 հարցից <strong>{examScore}</strong>-ին ճիշտ։
                  </p>

                  <div className="py-4 max-w-xs mx-auto">
                    {examScore >= 8 ? (
                      <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl text-xs space-y-1">
                        <p className="font-bold">🎉 Շնորհավորո՜ւմ ենք, Դուք հաջողությամբ հանձնեցիք քննությունը:</p>
                        <p>Դուք հիանալի տիրապետում եք իսպաներենի «Gustar» բայական կազմերի քերականությանը:</p>
                      </div>
                    ) : (
                      <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-2xl text-xs space-y-1">
                        <p className="font-bold">⚠️ Անցողիկ շեմը չհաղթահարվեց (պահանջվում է առնվազն 8 ճիշտ պատասխան)։</p>
                        <p>Կրկնե՛ք տեսությունը և փորձե՛ք կրկին հանձնել քննությունը:</p>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 flex justify-center gap-3">
                    <button
                      onClick={generateExam}
                      className="px-5 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
                    >
                      <RotateCw className="w-4 h-4" />
                      ՆՈՐԻՑ ՓՈՐՃԵԼ
                    </button>
                    <button
                      onClick={() => setExamActive(false)}
                      className="px-5 py-2 rounded-full border border-slate-350 text-slate-600 text-xs font-semibold hover:bg-slate-50 cursor-pointer"
                    >
                      ԴԵՊԻ ԳԼԽԱՎՈՐ
                    </button>
                  </div>
                </div>
              )}

              {/* Printable Certificate layout card removed */}

            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Footer credits and reset controls (hidden during print) */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-8 text-center text-slate-400 text-xs font-sans print:hidden">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-medium">
            © {new Date().getFullYear()} Իսպաներեն Gustar Բայը - Ինտերակտիվ Ուսեցում
          </p>
          <div className="flex items-center gap-3.5">
            <span className="text-[10px] bg-slate-50 border border-slate-200 text-slate-500 font-mono font-bold px-2 py-0.5 rounded uppercase">
              VITE SPA
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}

// Simple internal check visualizer SVG components
function CheckClassName({ className }: { className: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
