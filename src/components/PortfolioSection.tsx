import { motion } from "framer-motion";
import { ExternalLink, Github, Clock, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useRef, useState, useEffect } from "react";

interface Project {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  github?: string;
  demo?: string;
  status: "completed" | "in-progress";
  featured?: boolean;
}

const featuredProjects: Project[] = [
  {
    title: "⚡ PowerCast EU",
    subtitle: "Energy Load Forecasting & Anomaly Detection",
    description:
      "24h–14d load/price forecasting with anomaly detection and explainability. Rolling backtest, drift monitoring, and data contracts for Europe's energy grid.",
    tags: ["Python", "MLflow", "FastAPI", "Time Series", "MLOps"],
    status: "in-progress",
    featured: true,
  },
  {
    title: "🧪 GrowthLab",
    subtitle: "A/B Testing & Causal Inference Toolkit",
    description:
      "Toolkit for A/B testing, CUPED, DiD, and uplift modeling with automated decision memos. Power analysis, SRM checks, and guardrails built in.",
    tags: ["Python", "statsmodels", "EconML", "DoWhy", "Streamlit"],
    status: "in-progress",
    featured: true,
  },
  {
    title: "🔍 ProcureGuard",
    subtitle: "Public Procurement Risk Scoring",
    description:
      "Risk/anomaly scoring per entity and contract with explainable ML. Entity resolution, network features, and interpretable rules for EU public spending.",
    tags: ["Python", "Polars", "Graph Analytics", "dbt", "Dashboard"],
    status: "in-progress",
    featured: true,
  },
  {
    title: "⚖️ FairCredit",
    subtitle: "Responsible Lending with Fairness Auditing",
    description:
      "Credit scoring model with fairness constraints, SHAP explanations, stress tests, and policy simulator. Model cards and data quality gates included.",
    tags: ["LightGBM", "SHAP", "Great Expectations", "FastAPI"],
    status: "in-progress",
    featured: true,
  },
];

const otherProjects: Project[] = [
  {
    title: "📜 RegLens",
    subtitle: "Regulatory QA Engine with Verified Citations",
    description:
      "RAG-powered QA engine over EUR-Lex with verified citations and anti-hallucination evaluation. Aligned with AI Act transparency requirements.",
    tags: ["RAG", "Vector DB", "FastAPI", "LLM Eval"],
    status: "in-progress",
  },
  {
    title: "🎯 RankForge",
    subtitle: "Learning-to-Rank Search Pipeline",
    description:
      "Industrial LTR benchmark with training/serving pipeline, NDCG@K evaluation, ablation studies, and lightweight feature store.",
    tags: ["Python", "LightGBM Ranker", "FastAPI", "MLflow"],
    status: "in-progress",
  },
  {
    title: "💡 RecEngine",
    subtitle: "Hybrid Recommender System",
    description:
      "From-zero-to-product hybrid recommender with collaborative filtering, content-based signals, cold-start handling, and fairness metrics.",
    tags: ["Python", "LightFM", "FastAPI", "Dashboard"],
    status: "in-progress",
  },
  {
    title: "🌍 AirPulse EU",
    subtitle: "Air Quality Nowcasting & Alerts",
    description:
      "Spatio-temporal nowcast/forecast with explainable alerts for pollution episodes. Drift detection and region-level validation for EU cities.",
    tags: ["Geo/Time Series", "FastAPI", "Dashboard", "ESG"],
    status: "in-progress",
  },
  {
    title: "🏭 DefectEye",
    subtitle: "Industrial Visual Anomaly Detection",
    description:
      "Pixel-level defect detection with segmentation masks and latency profiling. Threshold tuning for recall vs. false alarm trade-offs.",
    tags: ["PyTorch", "Anomalib", "ONNX", "FastAPI"],
    status: "in-progress",
  },
  {
    title: "⚙️ LifeSpan",
    subtitle: "Predictive Maintenance & RUL Forecasting",
    description:
      "Remaining Useful Life prediction with backtesting, calibration analysis, and operational alarm logic for industrial assets.",
    tags: ["Python", "Seq Models", "MLflow", "Dashboard"],
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

const ProjectCard = ({ project, isFeatured = false }: { project: Project; isFeatured?: boolean }) => (
  <div
    className={`glass rounded-xl p-6 group hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 flex flex-col h-full ${
      isFeatured ? "border-primary/20" : ""
    }`}
  >
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-1.5 text-xs font-mono">
        {project.status === "completed" ? (
          <span className="text-secondary">● Completed</span>
        ) : (
          <span className="text-muted-foreground flex items-center gap-1">
            <Clock size={12} />
            In Progress
          </span>
        )}
      </div>
      {isFeatured && (
        <span className="flex items-center gap-1 text-[10px] font-mono text-primary">
          <Star size={10} className="fill-primary" />
          Featured
        </span>
      )}
    </div>

    <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors text-lg leading-snug">
      {project.title}
    </h3>
    <p className="text-xs text-secondary font-mono mb-3">{project.subtitle}</p>

    <p className="text-sm text-muted-foreground mb-4 flex-1 leading-relaxed">
      {project.description}
    </p>

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
  </div>
);

const PortfolioSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section id="portfolio" className="py-12 relative">
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

        {/* Featured Projects */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={1}
          className="mb-4"
        >
          <h3 className="text-lg font-semibold text-foreground mb-1 flex items-center gap-2">
            <Star size={16} className="text-primary fill-primary" />
            Featured Projects
          </h3>
          <p className="text-xs text-muted-foreground mb-6">
            High-impact projects aligned with Swiss market needs — finance, energy, compliance & experimentation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {featuredProjects.map((project, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i + 2}
            >
              <ProjectCard project={project} isFeatured />
            </motion.div>
          ))}
        </div>

        {/* Other Projects — Carousel */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={6}
          className="mb-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-1">More Projects</h3>
              <p className="text-xs text-muted-foreground">
                Explore additional data science & ML projects.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className="p-2 rounded-full border border-border bg-card hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous projects"
              >
                <ChevronLeft size={18} className="text-foreground" />
              </button>
              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className="p-2 rounded-full border border-border bg-card hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Next projects"
              >
                <ChevronRight size={18} className="text-foreground" />
              </button>
            </div>
          </div>
        </motion.div>

        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {otherProjects.map((project, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i + 7}
                className="min-w-[300px] md:min-w-[360px] snap-start flex-shrink-0"
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>

          {/* Fade edges */}
          {canScrollLeft && (
            <div className="absolute left-0 top-0 bottom-4 w-12 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          )}
          {canScrollRight && (
            <div className="absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-background to-transparent pointer-events-none" />
          )}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
