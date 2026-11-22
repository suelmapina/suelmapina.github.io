import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

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
      "Reduced O&M costs 450K euros per year with predictive maintenance models",
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

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-12 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          custom={0}
          className="mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-3">
            <Briefcase size={24} className="text-primary" />
            <span className="text-gradient">Experience</span>
          </h2>
          <div className="w-16 h-1 bg-primary rounded-full" />
        </motion.div>

        <div className="space-y-6">
          {experience.map((exp, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i + 1}
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
      </div>
    </section>
  );
};

export default ExperienceSection;
