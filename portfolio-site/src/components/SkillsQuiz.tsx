'use client'

import { useState, useEffect } from 'react'
import { Trophy, Clock, Star, Zap, Target } from 'lucide-react'

const quizQuestions = [
  {
    question: "Which Azure service is primarily used for ETL processes?",
    options: ["Azure Functions", "Azure Data Factory", "Azure Logic Apps", "Azure Storage"],
    correct: 1,
    category: "Azure"
  },
  {
    question: "What does ETL stand for?",
    options: ["Extract, Transform, Load", "Execute, Test, Launch", "Evaluate, Track, Log", "Export, Transfer, Link"],
    correct: 0,
    category: "Data Engineering"
  },
  {
    question: "Which tool is used for job scheduling in enterprise environments?",
    options: ["Jenkins", "Control-M", "Docker", "Kubernetes"],
    correct: 1,
    category: "Automation"
  },
  {
    question: "What is the primary purpose of Power BI?",
    options: ["Database Management", "Data Visualization", "Code Development", "Server Monitoring"],
    correct: 1,
    category: "Analytics"
  },
  {
    question: "Which AWS service is equivalent to Azure Data Lake?",
    options: ["EC2", "S3", "Lambda", "RDS"],
    correct: 1,
    category: "Cloud"
  }
]

export default function SkillsQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [timeLeft, setTimeLeft] = useState(15)
  const [gameStarted, setGameStarted] = useState(false)
  const [showFinalScore, setShowFinalScore] = useState(false)

  useEffect(() => {
    if (gameStarted && timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !showResult) {
      handleAnswer(-1)
    }
  }, [timeLeft, gameStarted, showResult])

  const startGame = () => {
    setGameStarted(true)
    setCurrentQuestion(0)
    setScore(0)
    setShowFinalScore(false)
    setTimeLeft(15)
  }

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    setShowResult(true)
    
    if (answerIndex === quizQuestions[currentQuestion].correct) {
      setScore(score + 1)
    }

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setShowResult(false)
        setTimeLeft(15)
      } else {
        setShowFinalScore(true)
      }
    }, 2000)
  }

  const resetGame = () => {
    setGameStarted(false)
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setShowFinalScore(false)
    setTimeLeft(15)
  }

  const getScoreMessage = () => {
    const percentage = (score / quizQuestions.length) * 100
    if (percentage >= 80) return { message: "🚀 Data Engineering Expert!", color: "text-green-500" }
    if (percentage >= 60) return { message: "💪 Good Knowledge!", color: "text-blue-500" }
    if (percentage >= 40) return { message: "📚 Keep Learning!", color: "text-yellow-500" }
    return { message: "🎯 Practice More!", color: "text-red-500" }
  }

  if (!gameStarted) {
    return (
      <section className="section-padding bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 animate-neon-glow">
              🎮 Skills Challenge
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Test your data engineering knowledge with this fun interactive quiz!
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="card glass-morphism text-center animate-float-up">
              <div className="mb-8">
                <Trophy className="w-24 h-24 mx-auto text-yellow-500 animate-bounce-gentle mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Ready to Test Your Skills?
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <Target className="w-8 h-8 mx-auto text-blue-500 mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">5 Questions</p>
                  </div>
                  <div className="text-center">
                    <Clock className="w-8 h-8 mx-auto text-green-500 mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">15s Each</p>
                  </div>
                  <div className="text-center">
                    <Star className="w-8 h-8 mx-auto text-yellow-500 mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">Score Points</p>
                  </div>
                  <div className="text-center">
                    <Zap className="w-8 h-8 mx-auto text-purple-500 mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">Quick Fire</p>
                  </div>
                </div>
              </div>
              <button
                onClick={startGame}
                className="btn-primary text-xl px-8 py-4 animate-pulse"
              >
                🚀 Start Challenge
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (showFinalScore) {
    const scoreData = getScoreMessage()
    return (
      <section className="section-padding bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20">
        <div className="container-max">
          <div className="max-w-2xl mx-auto">
            <div className="card glass-morphism text-center animate-float-up">
              <Trophy className="w-32 h-32 mx-auto text-yellow-500 animate-bounce mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Challenge Complete!
              </h2>
              <div className="text-6xl font-bold mb-4">
                <span className={scoreData.color}>{score}</span>
                <span className="text-gray-400">/{quizQuestions.length}</span>
              </div>
              <p className={`text-2xl font-bold mb-6 ${scoreData.color}`}>
                {scoreData.message}
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={resetGame}
                  className="btn-primary"
                >
                  🔄 Play Again
                </button>
                <button
                  onClick={() => setGameStarted(false)}
                  className="btn-secondary"
                >
                  📊 View Skills
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section-padding bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20">
      <div className="container-max">
        <div className="max-w-3xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Question {currentQuestion + 1} of {quizQuestions.length}
              </span>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-red-500" />
                <span className={`text-lg font-bold ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-gray-600 dark:text-gray-400'}`}>
                  {timeLeft}s
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question Card */}
          <div className="card glass-morphism animate-float-up">
            <div className="mb-6">
              <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm font-medium">
                {quizQuestions[currentQuestion].category}
              </span>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              {quizQuestions[currentQuestion].question}
            </h3>

            <div className="grid gap-4">
              {quizQuestions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !showResult && handleAnswer(index)}
                  disabled={showResult}
                  className={`p-4 rounded-xl text-left transition-all duration-300 transform hover:scale-105 ${
                    showResult
                      ? index === quizQuestions[currentQuestion].correct
                        ? 'bg-green-500 text-white animate-pulse'
                        : index === selectedAnswer
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                      : 'bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500'
                  }`}
                >
                  <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
                </button>
              ))}
            </div>

            {showResult && (
              <div className="mt-6 text-center">
                <p className={`text-lg font-bold ${
                  selectedAnswer === quizQuestions[currentQuestion].correct 
                    ? 'text-green-500' 
                    : 'text-red-500'
                }`}>
                  {selectedAnswer === quizQuestions[currentQuestion].correct 
                    ? '🎉 Correct!' 
                    : selectedAnswer === -1 
                    ? '⏰ Time\'s up!' 
                    : '❌ Wrong answer!'}
                </p>
              </div>
            )}
          </div>

          {/* Score Display */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full font-bold">
              <Star className="w-5 h-5" />
              Score: {score}/{quizQuestions.length}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}