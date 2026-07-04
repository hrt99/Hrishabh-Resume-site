'use client'

import { Award, TrendingUp, Users, Clock, CheckCircle, Star } from 'lucide-react'

const highlights = [
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: "Performance Impact",
    value: "25%",
    description: "System performance improvement achieved at DXC Technology",
    color: "from-green-500 to-emerald-600"
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Automation Efficiency",
    value: "90%",
    description: "Manual effort reduction through PowerShell & VBA automation",
    color: "from-blue-500 to-cyan-600"
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: "Certifications",
    value: "9+",
    description: "Professional certifications in Azure, AWS, and Power BI",
    color: "from-purple-500 to-pink-600"
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Experience",
    value: "3+",
    description: "Years of hands-on data engineering experience",
    color: "from-orange-500 to-red-600"
  }
]

const keyStrengths = [
  "✅ Immediate Impact: Proven track record of 25% performance improvements",
  "✅ Cloud Expertise: Certified in Azure & AWS with hands-on experience",
  "✅ Automation Skills: 90% manual effort reduction through smart automation",
  "✅ Enterprise Tools: Proficient in Tidal, Control-M, Oracle DB, Power BI",
  "✅ Problem Solver: Experience in Production, Integration & Development environments",
  "✅ Team Player: Collaborated across multiple departments and stakeholders"
]

export default function RecruiterHighlights() {
  return (
    <section className="section-padding bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 dark:from-indigo-900/20 dark:via-blue-900/20 dark:to-cyan-900/20">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            🎯 Why Hire Me?
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto font-medium">
            Proven results, certified expertise, and immediate value for your data engineering team
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-cyan-600 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className="card text-center animate-float-up group hover:scale-105"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${highlight.color} rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                {highlight.icon}
              </div>
              <div className={`text-4xl font-bold mb-2 bg-gradient-to-r ${highlight.color} bg-clip-text text-transparent`}>
                {highlight.value}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {highlight.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed text-justify hyphens-auto">
                {highlight.description}
              </p>
            </div>
          ))}
        </div>

        {/* Key Strengths */}
        <div className="max-w-4xl mx-auto">
          <div className="card">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              🚀 Key Strengths for Recruiters
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {keyStrengths.map((strength, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-800 dark:text-gray-200 font-medium">
                    {strength.replace('✅ ', '')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="card max-w-2xl mx-auto">
            <Star className="w-16 h-16 mx-auto text-yellow-500 mb-4 animate-bounce-gentle" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Make an Impact
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">
              Looking for a data engineer who can deliver immediate results? 
              Let's discuss how I can contribute to your team's success.
            </p>
            <div className="flex justify-center">
              <a
                href="#contact"
                className="btn-primary text-lg px-8 py-4"
              >
                📧 Schedule Interview
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}