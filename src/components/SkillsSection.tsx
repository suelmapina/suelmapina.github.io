import { motion } from "framer-motion";
import { Code, Globe } from "lucide-react";

const skills = [
  { name: "Python & Data Ecosystem", level: 95, label: "Expert" },
  { name: "Machine Learning & Deep Learning", level: 92, label: "Expert" },
  { name: "MLOps (MLflow, Kedro, CI/CD)", level: 90, label: "Expert" },
  { name: "Generative AI (LLMs, RAG, LangChain)", level: 55, label: "Intermediate" },
  { name: "Explainable AI (SHAP, LIME)", level: 88, label: "Expert" },
  { name: "SQL / PostgreSQL / PySpark", level: 90, label: "Expert" },
  { name: "Docker / AWS SageMaker", level: 60, label: "Intermediate" },
  { name: "Data Visualization (Tableau, Power BI, Dash)", level: 85, label: "Expert" },
  { name: "Time-Series Forecasting", level: 85, label: "Expert" },
  { name: "Feature Engineering & Data Wrangling", level: 90, label: "Expert" },
];

const languages = [
  { name: "Portuguese", level: 100, label: "Native" },
  { name: "Cape Verdean Creole", level: 100, label: "Native" },
  { name: "English", level: 85, label: "Professional" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
};

const SkillBar = ({ name, level, label, index }: { name: string; level: number; label: string; index: number }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={fadeUp}
    custom={index}
    className="mb-5"
  >
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm font-medium text-foreground uppercase tracking-wide">{name}</span>
      <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30">
        {label}
      </span>
    </div>
    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: index * 0.08, ease: "easeOut" }}
      />
    </div>
  </motion.div>
);

const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          custom={0}
          className="mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-3">
            <Code size={24} className="text-primary" />
            Skills & <span className="text-gradient">Languages</span>
          </h2>
          <div className="w-16 h-1 bg-primary rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Technical Skills */}
          <div>
            <motion.h3
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
              className="text-2xl font-bold mb-8 flex items-center gap-3"
            >
              <Code size={24} className="text-primary" />
              Technical Skills
            </motion.h3>
            {skills.map((skill, i) => (
              <SkillBar key={skill.name} {...skill} index={i + 1} />
            ))}
          </div>

          {/* Languages */}
          <div>
            <motion.h3
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
              className="text-2xl font-bold mb-8 flex items-center gap-3"
            >
              <Globe size={24} className="text-primary" />
              Languages
            </motion.h3>
            {languages.map((lang, i) => (
              <SkillBar key={lang.name} {...lang} index={i + 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
