import { motion } from "framer-motion";
import { ExternalLink, Github, Clock } from "lucide-react";

interface Project {
  title: string;
  description: string;
  tags: string[];
  github?: string;
  demo?: string;
  status: "completed" | "in-progress";
}

const projects: Project[] = [
  {
    title: "Personalized Medicine: Redefining Cancer Treatment",
    description:
      "ML pipeline classifying genetic mutations to predict personalized cancer treatments using NLP and ensemble methods.",
    tags: ["Python", "NLP", "scikit-learn", "XGBoost"],
    status: "in-progress",
  },
  {
    title: "Predictive Modeling in IoT: Energy Consumption Forecasting",
    description:
      "Time-series forecasting models for IoT sensor data, predicting energy consumption patterns with 99%+ accuracy.",
    tags: ["Python", "Prophet", "PySpark", "IoT"],
    status: "in-progress",
  },
  {
    title: "Predicting Macroeconomic Trends",
    description:
      "Econometric and ML models to forecast macroeconomic indicators using historical data and feature engineering.",
    tags: ["R", "ARIMA", "Python", "Econometrics"],
    status: "in-progress",
  },
  {
    title: "Market Basket Analysis",
    description:
      "Association rule mining and recommendation systems for retail transaction data to optimize cross-selling strategies.",
    tags: ["Python", "Apriori", "NetworkX", "Retail"],
    status: "in-progress",
  },
  {
    title: "Business Plan Based on Predictive Models",
    description:
      "End-to-end business planning framework leveraging predictive analytics for revenue forecasting and risk assessment.",
    tags: ["Python", "Tableau", "ML", "Business Analytics"],
    status: "in-progress",
  },
  {
    title: "Architecture Design for IoT Analytics Projects",
    description:
      "Scalable data architecture design for IoT analytics pipelines, from edge ingestion to cloud-based ML inference.",
    tags: ["AWS", "Docker", "Kedro", "MLflow"],
    status: "in-progress",
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

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="py-24 relative">
      {/* Subtle gradient separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          custom={0}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="text-gradient">Portfolio</span>
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-4" />
          <p className="text-muted-foreground max-w-lg mx-auto">
            Data science projects showcasing ML, predictive modeling, and scalable analytics solutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i + 1}
              className="glass rounded-xl p-6 group hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              {/* Status badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1.5 text-xs font-mono">
                  {project.status === "completed" ? (
                    <span className="text-green-400">● Completed</span>
                  ) : (
                    <span className="text-yellow-400 flex items-center gap-1">
                      <Clock size={12} />
                      In Progress
                    </span>
                  )}
                </div>
              </div>

              <h3 className="font-semibold text-foreground mb-3 group-hover:text-primary transition-colors leading-snug">
                {project.title}
              </h3>

              <p className="text-sm text-muted-foreground mb-4 flex-1 leading-relaxed">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-[10px] font-mono rounded bg-muted text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-secondary hover:text-foreground transition-colors"
                  >
                    <ExternalLink size={14} />
                    Live Demo
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Github size={14} />
                    Source Code
                  </a>
                )}
                {!project.demo && !project.github && (
                  <span className="text-xs text-muted-foreground/50 italic">
                    Links coming soon
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
