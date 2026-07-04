'use client'

import { Star, Award, Download, ExternalLink } from 'lucide-react'

interface Achievement {
  id: string
  title: string
  description: string
  date: string
  file?: string
  url?: string
}

interface AchievementsProps {
  achievements: Achievement[]
}

export default function Achievements({ achievements }: AchievementsProps) {
  console.log('Achievements data:', achievements);
  return (
    <section className="section-padding bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 dark:from-yellow-900/20 dark:via-orange-900/20 dark:to-red-900/20">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            🏆 Achievements & Awards
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Recognition for outstanding performance and contributions
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-orange-600 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {achievements.map((achievement, index) => (
            <div 
              key={achievement.id} 
              className="card-tech group animate-slide-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex-shrink-0 animate-bounce-gentle">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                    {achievement.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    {achievement.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500">
                    <Award size={14} />
                    <span>{achievement.date}</span>
                  </div>
                </div>
              </div>

              {(achievement.file || achievement.url) && (
                <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  {achievement.file && (
                    <a
                      href={achievement.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 hover:bg-yellow-200 dark:hover:bg-yellow-900/30 px-3 py-2 rounded-lg transition-colors font-medium"
                    >
                      <Download size={14} />
                      Download Certificate
                    </a>
                  )}
                  {achievement.url && !achievement.file && (
                    <a
                      href={achievement.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
                    >
                      <ExternalLink size={14} />
                      View Details
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {achievements.length === 0 && (
          <div className="text-center py-12">
            <Star className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              No achievements added yet. Use the admin panel to add your awards and recognitions.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}