import React, { useState } from 'react';
import { X, GraduationCap, CheckCircle2, Award, ArrowRight, ArrowLeft, HelpCircle } from 'lucide-react';
import { LEARNING_MODULES } from '../data/learningPath';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOpenCase: (ticker: string) => void;
}

export const LearningPathModal: React.FC<Props> = ({ isOpen, onClose, onOpenCase }) => {
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [selectedLessonIdx, setSelectedLessonIdx] = useState<number>(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const currentModule = LEARNING_MODULES.find((m) => m.level === selectedLevel) || LEARNING_MODULES[0];
  const currentLesson = currentModule.lessons[selectedLessonIdx] || currentModule.lessons[0];

  const handleSelectQuizOption = (lessonId: string, optIdx: number) => {
    setQuizAnswers((prev) => ({ ...prev, [lessonId]: optIdx }));
  };

  const handleSubmitQuiz = (lessonId: string) => {
    setQuizSubmitted((prev) => ({ ...prev, [lessonId]: true }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-5xl bg-[#0d1322] border border-amber-500/30 rounded-2xl shadow-2xl p-6 text-slate-100 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                Learn Stock Research — 6 Levels
              </h3>
              <p className="text-xs text-slate-400">
                From complete beginner to courtroom analyst: simple, practical lessons
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Level Progression Tabs */}
        <div className="py-3 flex items-center gap-2 overflow-x-auto border-b border-slate-800 scrollbar-none">
          {LEARNING_MODULES.map((mod) => (
            <button
              key={mod.level}
              onClick={() => {
                setSelectedLevel(mod.level);
                setSelectedLessonIdx(0);
              }}
              className={`px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition flex items-center gap-2 cursor-pointer ${
                selectedLevel === mod.level
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/10'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <span>Level {mod.level}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                selectedLevel === mod.level ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-400'
              }`}>
                {mod.title}
              </span>
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto py-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column: Lesson Directory */}
          <div className="space-y-3">
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
              <div className="text-[11px] font-mono text-amber-400 uppercase tracking-wider mb-1">
                {currentModule.badge}
              </div>
              <h4 className="text-sm font-bold text-white mb-1">{currentModule.title}</h4>
              <p className="text-xs text-slate-400">{currentModule.description}</p>
            </div>

            <div className="space-y-1.5">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1">
                Lessons in this level:
              </div>
              {currentModule.lessons.map((lesson, idx) => (
                <button
                  key={lesson.id}
                  onClick={() => setSelectedLessonIdx(idx)}
                  className={`w-full text-left p-3 rounded-xl text-xs transition flex items-center justify-between cursor-pointer ${
                    selectedLessonIdx === idx
                      ? 'bg-slate-800 text-amber-300 border border-amber-500/40 font-semibold'
                      : 'bg-slate-900/60 text-slate-300 hover:bg-slate-900 border border-slate-800/80'
                  }`}
                >
                  <div className="pr-2">
                    <div className="line-clamp-1">{lesson.title}</div>
                    <div className="text-[10px] text-slate-500 font-mono mt-0.5">{lesson.duration}</div>
                  </div>
                  {quizSubmitted[lesson.id] && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column (2 cols): Lesson Detail & Quiz */}
          <div className="md:col-span-2 space-y-4">
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                  {currentLesson.duration}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Level {selectedLevel} • Lesson {selectedLessonIdx + 1}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white">{currentLesson.title}</h3>

              <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
                {currentLesson.content.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              {/* Key Takeaway */}
              <div className="p-4 bg-emerald-950/30 border border-emerald-500/30 rounded-xl space-y-1">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Award className="w-4 h-4" /> Key Takeaway
                </div>
                <p className="text-xs text-emerald-100/90 leading-relaxed font-medium">
                  {currentLesson.keyTakeaway}
                </p>
              </div>

              {/* Practical Exercise */}
              <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs space-y-1">
                <div className="text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                  💡 Practical Exercise:
                </div>
                <p className="text-slate-300">{currentLesson.practicalExercise}</p>
              </div>

              {/* Interactive Quiz Check */}
              {currentLesson.quizQuestion && (
                <div className="p-4 bg-slate-950 border border-amber-500/30 rounded-xl space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
                    <HelpCircle className="w-4 h-4" />
                    Knowledge Check
                  </div>
                  <p className="text-sm font-semibold text-white">
                    {currentLesson.quizQuestion.question}
                  </p>

                  <div className="space-y-2">
                    {currentLesson.quizQuestion.options.map((option, optIdx) => {
                      const isSelected = quizAnswers[currentLesson.id] === optIdx;
                      const isSubmitted = quizSubmitted[currentLesson.id];
                      const isCorrect = optIdx === currentLesson.quizQuestion!.correctIndex;

                      let btnStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800';
                      if (isSelected) {
                        btnStyle = 'bg-amber-500/20 border-amber-500 text-amber-200';
                      }
                      if (isSubmitted) {
                        if (isCorrect) {
                          btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-200 font-bold';
                        } else if (isSelected && !isCorrect) {
                          btnStyle = 'bg-red-500/20 border-red-500 text-red-200 line-through';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={isSubmitted}
                          onClick={() => handleSelectQuizOption(currentLesson.id, optIdx)}
                          className={`w-full text-left p-2.5 rounded-lg text-xs border transition ${btnStyle}`}
                        >
                          <span className="font-mono mr-2">{String.fromCharCode(65 + optIdx)}.</span>
                          {option}
                        </button>
                      );
                    })}
                  </div>

                  {!quizSubmitted[currentLesson.id] ? (
                    <button
                      onClick={() => handleSubmitQuiz(currentLesson.id)}
                      disabled={quizAnswers[currentLesson.id] === undefined}
                      className="px-4 py-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs rounded-lg transition"
                    >
                      Submit Answer
                    </button>
                  ) : (
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                      <div className="font-bold text-emerald-400 mb-0.5">
                        {quizAnswers[currentLesson.id] === currentLesson.quizQuestion.correctIndex
                          ? '✓ Correct!'
                          : 'Explanation:'}
                      </div>
                      <p className="text-slate-300">{currentLesson.quizQuestion.explanation}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              onOpenCase('AAPL');
            }}
            className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition font-semibold"
          >
            Practice on Demo Case: Apple Inc. →
          </button>
          <div className="flex items-center gap-2">
            {selectedLessonIdx < currentModule.lessons.length - 1 ? (
              <button
                onClick={() => setSelectedLessonIdx(selectedLessonIdx + 1)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg transition flex items-center gap-1.5"
              >
                Next Lesson <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : selectedLevel < LEARNING_MODULES.length ? (
              <button
                onClick={() => {
                  setSelectedLevel(selectedLevel + 1);
                  setSelectedLessonIdx(0);
                }}
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-xs font-bold rounded-lg transition flex items-center gap-1.5"
              >
                Advance to Level {selectedLevel + 1} <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-4 py-2 bg-emerald-500 text-slate-950 text-xs font-bold rounded-lg transition"
              >
                Complete Course
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
