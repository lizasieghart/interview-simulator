import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="bg-navy-900 text-white px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="text-lg font-bold tracking-tight">InterviewPro</span>
          <Link href="/interview" className="text-sm text-blue-300 hover:text-white transition-colors">
            Start Practice &rarr;
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-2xl text-center">
          <div className="inline-block mb-6 px-4 py-1.5 bg-blue-50 text-blue-700 text-sm font-medium rounded-full">
            AI-Powered Interview Practice
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-navy-900 leading-tight mb-6">
            Ace your next interview with{" "}
            <span className="text-blue-600">personalized AI coaching</span>
          </h1>
          <p className="text-lg text-gray-600 mb-10 max-w-xl mx-auto">
            Practice behavioral, case, and situational questions tailored to your
            industry. Get instant STAR-framework feedback on every answer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/interview" className="btn-primary text-lg px-8 py-4">
              Start Practicing
            </Link>
            <a href="#features" className="btn-secondary text-lg px-8 py-4">
              Learn More
            </a>
          </div>
        </div>
      </main>

      {/* Features */}
      <section id="features" className="bg-white py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-navy-900 mb-12">
            Everything you need to prepare
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🎯",
                title: "Tailored Questions",
                desc: "Paste a job description and get questions specific to the role, or choose from behavioral, case, and situational categories.",
              },
              {
                icon: "💡",
                title: "STAR Framework Feedback",
                desc: "Get detailed analysis of your answers — strengths, areas for improvement, and component-by-component STAR scoring.",
              },
              {
                icon: "📊",
                title: "Track Your Progress",
                desc: "Review all your answers and scores in a comprehensive summary. See patterns and focus your practice.",
              },
            ].map((f) => (
              <div key={f.title} className="card text-center">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-semibold text-navy-900 mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-900 text-gray-400 text-center py-6 text-sm">
        Built with Next.js &amp; Claude &mdash; InterviewPro
      </footer>
    </div>
  );
}
