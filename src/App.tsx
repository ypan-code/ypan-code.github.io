import { useState, useEffect, type ReactNode } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Moon, Sun, ExternalLink, ArrowRight, Mail } from 'lucide-react';
import { InlineMath } from 'react-katex';

const MathText = ({ text }: { text: string }) => {
  if (!text || !text.includes('$')) return <>{text}</>;
  
  const parts = text.split('$');
  return (
    <>
      {parts.map((part, i) => (
        i % 2 === 0 ? <span key={i}>{part}</span> : <InlineMath key={i} math={part} settings={{ macros: { '\\C': '\\mathbb{C}' } }} />
      ))}
    </>
  );
};

const projects = [
  {
    title: "Pseudo-Anosov Reeb flows and contact structures",
    category: "Preprint",
    date: "Dec. 2025",
    collaborators: ["with Julian Chaidez"],
    description: "We introduce the notion of a pseudo-Anosov contact structure, which admits a type of singular contact form with pseudo-Anosov Reeb flow. We prove that contact homology detects the free homotopy classes of closed orbits of any pseudo-Anosov Reeb flow and that any pseudo-Anosov contact structure is universally tight and torsion free. Many applications are given, including new cases of the Finiteness Conjecture for transitive pseudo-Anosov flows. Our proofs use a flavor of contact homology graded by a free homotopy class of loops, defined for any contact manifold. We establish several properties of this type of contact homology that may be of independent interest.",
    link: "https://arxiv.org/abs/2512.12698",
  },
  {
    title: "Polytopal counterexamples to the equality case of Viterbo's conjecture",
    category: "Preprint",
    date: "Oct. 2026",
    collaborators: ["with Osagie Osayande and Henry Riley"],
    description: "Viterbo's conjecture predicted that a convex body in $\\mathbb{R}^{2n}$ has systolic ratio at most 1, with equality only when its interior is symplectomorphic to a ball. Haim-Kislev and Ostrover disproved the inequality, and their argument also gives smooth counterexamples to the equality case. We show that the equality case fails already for polytopes. We construct explicit Lagrangian products of two convex polygons in $\\mathbb{R}^4$ that have systolic ratio exactly 1 but whose interiors are not symplectomorphic to a ball. Our main tool is a criterion, checkable from the normal fans of the two polygons, which guarantees that at most one systole passes through each boundary point.",
    link: null,
  },
  {
    title: "On the gluing formula of the Bauer-Furuta invariant",
    category: "In Progress",
    date: null,
    collaborators: ["with Baran Çetin"],
    description: "We present another proof of the gluing formula of the Bauer-Furuta map following Takumi Maegawa's construction using six functor formalism. ",
    link: null,
  },
  {
    title: "Symplectic TQFT for stable Hamiltonian structures",
    category: "Goals",
    date: null,
    collaborators: ["with Michael Huang"],
    description: "",
    link: null,
  },
];

const notes = [
  {
    title: "K-theory and the Brouwer fixed point theorem",
    date: "Nov. 2023",
    description: "Final project for an algebraic topology course with Joseph Helfer. A proof of the Brouwer fixed point theorem using topological K-theory.",
    link: "./notes/K_theory_Brouwer.pdf"
  },
  {
    title: "Atiyah–Hirzebruch's counterexample to the integral Hodge conjecture",
    date: "Nov. 2023",
    description: "Final project for a course on Hodge theory with Joseph Helfer. An exposition of Atiyah and Hirzebruch's counterexample to the integral Hodge conjecture.",
    link: "./notes/Atiyah_Hirzebruch_s_Counterexample_to_the_Integral_Hodge_Conjecture (1).pdf"
  },
  {
    title: "Representations of $\\mathfrak{sp}_4(\\mathbb{C})$",
    date: "Dec. 2024",
    description: "Final project for a course on representation theory with Cris Negron. Classification of the finite-dimensional irreducible representations of $\\mathfrak{sp}_4(\\mathbb{C})$.",
    link: "./notes/Representations_of_sp_4C.pdf"
  },
  {
    title: "USC Topology Seminar on Symplectic Field Theory",
    date: "Fall 2026",
    description: "Co-organized with Louis-Simon Cyr and Michael Huang. A semester-long reading seminar on symplectic field theory following Wendl's lectures; I spoke on pseudo-holomorphic curves and somewhere injectivity.",
    link: "https://michael-huang2001.github.io/sft-seminar/",
    linkLabel: "Seminar Page"
  }
];

const talks = [
  {
    title: "Pseudo-Anosov Reeb flows and contact structures",
    event: "AMS Fall Eastern Sectional Meeting, Special Session on Recent Developments at the Interface of Hyperbolic Dynamics and Geometric Structures",
    location: "George Washington University, Washington, DC",
    date: "Oct. 2026",
    link: "https://www.ams.org/meetings/sectional/2332_progfull.html"
  },
  {
    title: "Crash course in analysis: pseudo-holomorphic curves and somewhere injectivity",
    event: "USC Topology Seminar on Symplectic Field Theory",
    location: "University of Southern California",
    date: "Sep. 2026",
    link: "https://michael-huang2001.github.io/sft-seminar/"
  }
];

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(
    () => window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-black/80 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-6 h-16 flex justify-between items-center">
          <a href="#" className="font-semibold text-lg hover:opacity-70 transition-opacity">Yijie Pan</a>
          
          <div className="flex items-center gap-8">
            <div className="hidden sm:flex gap-6">
              <a href="#research" className="nav-link">Research</a>
              <a href="#notes" className="nav-link">Notes</a>
              <a href="#talks" className="nav-link">Talks</a>
              <a href="#contact" className="nav-link">Contact</a>
            </div>
            
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        {/* Header / Hero */}
        <section className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl mb-8">
              Yijie Pan
            </h1>
            <div className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed space-y-4">
              <p>I'm a PhD student in mathematics at the University of Southern California, advised by Julian Chaidez.</p>
              <p>I work in symplectic and contact topology and gauge theory.</p>
              <p>Before USC, I studied at UC Santa Barbara and then UCLA.</p>
            </div>
          </motion.div>
        </section>

        {/* Research / Papers */}
        <section id="research" className="section-container">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-12">
            Papers
          </h2>
          
          <div className="space-y-4">
            {projects.map((paper, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="paper-card"
              >
                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                  <div className="flex-1">
                    <span className="text-xs font-mono opacity-40 mb-2 block uppercase tracking-wider">
                      {paper.category}{paper.date && <> &middot; {paper.date}</>}
                    </span>
                    <h3 className="text-2xl mb-3 font-semibold tracking-tight">
                      <MathText text={paper.title} />
                    </h3>
                    
                    {paper.collaborators && paper.collaborators.length > 0 && (
                      <div className="text-xs font-medium text-gray-400 dark:text-gray-500 mb-4 italic">
                        {paper.collaborators.join(', ')}
                      </div>
                    )}

                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed font-light mb-6">
                      <MathText text={paper.description} />
                    </p>
                    
                    {paper.link ? (
                      <a 
                        href={paper.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium border-b border-accent/30 hover:border-accent transition-all pb-0.5"
                      >
                        Read Paper <ExternalLink size={14} />
                      </a>
                    ) : (
                      <span className="text-sm font-light opacity-30 italic">
                        Link not yet available
                      </span>
                    )}
                  </div>
                  <div className="shrink-0">
                     <ArrowRight size={16} className="opacity-10 dark:opacity-20" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Course Notes and Projects */}
        <section id="notes" className="section-container border-t border-gray-100 dark:border-gray-800">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-12">
            Notes and seminars
          </h2>
          
          <div className="space-y-12">
            {notes.map((note, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className={`text-xl font-medium ${!note.link ? 'opacity-60' : ''}`}>
                    <MathText text={note.title} />
                  </h3>
                  <span className="text-xs font-mono opacity-30 whitespace-nowrap">{note.date}</span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed font-light max-w-2xl">
                  <MathText text={note.description} />
                </p>
                {note.link ? (
                  <a 
                    href={note.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-xs font-medium opacity-60 hover:opacity-100 transition-opacity"
                  >
                    <span className="uppercase tracking-widest">{note.linkLabel ?? "Read Note"}</span>
                    <ArrowRight size={12} />
                  </a>
                ) : (
                  <div className="mt-4 text-xs font-light opacity-20 italic">
                    Note coming soon
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Talks */}
        <section id="talks" className="section-container border-t border-gray-100 dark:border-gray-800">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-12">
            Talks
          </h2>

          <div className="space-y-12">
            {talks.map((talk, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <div className="flex justify-between items-start gap-4 mb-2">
                  <h3 className="text-xl font-medium">
                    <MathText text={talk.title} />
                  </h3>
                  <span className="text-xs font-mono opacity-30 whitespace-nowrap">{talk.date}</span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed font-light max-w-2xl">
                  {talk.link ? (
                    <a
                      href={talk.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-b border-gray-300 dark:border-gray-600 hover:border-accent transition-colors"
                    >
                      {talk.event}
                    </a>
                  ) : talk.event}
                  {talk.location && <>, {talk.location}</>}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="section-container border-t border-gray-100 dark:border-gray-800">
          <div className="max-w-xl">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-8">
              Contact
            </h2>
            <h3 className="text-3xl mb-8">Let's discuss mathematics.</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-12">
              For academic enquiries, please reach out via email.
            </p>
            <a 
              href="mailto:yijiepan@usc.edu" 
              className="inline-flex items-center gap-3 text-2xl font-medium border-b-2 border-accent/20 hover:border-accent transition-all py-2"
            >
              yijiepan@usc.edu
              <ArrowRight size={24} className="opacity-40" />
            </a>
            
            <div className="mt-16 text-sm text-gray-400">
              <p>University of Southern California</p>
              <p>338C Kaprielian Hall, Los Angeles, CA</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-6 flex justify-between items-center text-xs uppercase tracking-widest opacity-30">
          <span>&copy; 2026 Yijie Pan</span>
          <span>Mathematics @ USC</span>
        </div>
      </footer>
    </div>
  );
}
