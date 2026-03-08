import { motion } from "framer-motion";
import profileImg from "@/assets/profile.png";
import { Download, Briefcase, GraduationCap } from "lucide-react";

const skills = [
  "Python", "R", "SQL", "PySpark", "scikit-learn", "TensorFlow", "PyTorch",
  "MLflow", "Kedro", "Docker", "AWS SageMaker", "CI/CD",
  "SHAP", "LIME", "Tableau", "Power BI", "Dash",
  "LangChain", "RAG", "OpenCV", "YOLO",
];

const experience = [
  {
    role: "Senior Data Scientist & ML Specialist",
    company: "Digital Transformation CoLab (DTx)",
    period: "Oct 2020 – Present",
    highlights: [
      "Boosted team productivity 70% and cut release cycles 50% with Kedro, MLflow, CI/CD",
      "AutoML fraud detection with F1 = 0.95, AUC = 0.935",
      "Integrated Explainable AI (SHAP, LIME) reducing review time 40%",
    ],
  },
  {
    role: "International Data Scientist",
    company: "Prewind (INEGI)",
    period: "Jun 2017 – Jun 2019",
    highlights: [
      "Reduced O&M costs €450K/year with predictive maintenance models",
      "Prevented 28% of weather-related shutdowns",
    ],
  },
  {
    role: "Government Statistical Analyst",
    company: "Statistics Portugal (INE)",
    period: "Jan 2017 – Dec 2017",
    highlights: [
      "Improved land-use estimates 12% with EBLUP/SEBLUP models",
      "Achieved >95% data consistency across 50K+ records",
    ],
  },
];

const education = [
  { title: "NLP Training (378h)", institution: "Data Science Academy", year: "ongoing" },
  { title: "ML Engineer Training (344h)", institution: "Data Science Academy", year: "2025" },
  { title: "Data Scientist Training (482h)", institution: "Data Science Academy", year: "2023" },
  { title: "PG Diploma in BI & Analytics", institution: "Porto Business School", year: "2020" },
  { title: "M.Sc. in Statistics", institution: "University of Minho", year: "2017" },
  { title: "B.Sc. in Applied Statistics", institution: "University of Minho", year: "2015" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const AboutSection = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          custom={0}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        {/* Profile + Summary */}
        <div className="grid md:grid-cols-[300px_1fr] gap-12 mb-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
            className="flex flex-col items-center"
          >
            <div className="relative mb-6">
              <div className="absolute -inset-2 bg-gradient-to-br from-primary to-secondary rounded-2xl opacity-30 blur-lg" />
              <img
                src={profileImg}
                alt="Suelma Pina"
                className="relative w-60 h-60 object-cover rounded-2xl"
              />
            </div>
            <a
              href="/Suelma_Pina_Senior_Data_Scientist.pdf"
              download
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity glow-primary text-sm"
            >
              <Download size={16} />
              Download CV
            </a>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={2}
          >
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Senior Data Scientist with 8+ years of experience delivering end-to-end machine learning
              and statistical modeling solutions across telecom, energy, retail, mobility, and public sector.
              Expert in Python, MLflow, and Kedro for scalable MLOps pipelines, model deployment, and CI/CD
              automation. Currently expanding expertise in Generative AI and LLM pipelines (LangChain, RAG, LoRA).
            </p>

            {/* Skills */}
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 text-xs font-mono rounded-full bg-muted text-muted-foreground border border-border hover:border-primary hover:text-foreground transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Experience */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={3}
          className="mb-20"
        >
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <Briefcase size={24} className="text-primary" />
            Experience
          </h3>
          <div className="space-y-6">
            {experience.map((exp, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i + 4}
                className="glass rounded-xl p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-foreground">{exp.role}</h4>
                    <p className="text-sm text-secondary">{exp.company}</p>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground mt-1 md:mt-0">
                    {exp.period}
                  </span>
                </div>
                <ul className="space-y-1.5">
                  {exp.highlights.map((h, j) => (
                    <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">▹</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Education & Certifications */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={7}
        >
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <GraduationCap size={24} className="text-primary" />
            Education & Certifications
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {education.map((edu, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i + 8}
                className="glass rounded-xl p-5 hover:border-primary/50 transition-colors"
              >
                <p className="font-medium text-sm text-foreground mb-1">{edu.title}</p>
                <p className="text-xs text-muted-foreground">{edu.institution}</p>
                <p className="text-xs font-mono text-secondary mt-2">{edu.year}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
