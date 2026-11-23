import { motion } from "framer-motion";
import { ExternalLink, Github, Clock, CalendarClock, CheckCircle2, ArrowRight } from "lucide-react";

type Status = "completed" | "in-progress" | "planned";

interface Project {
  title: string;
  subtitle: string;
  problem: string;
  approach: string;
  tags: string[];
  data: string;
  result?: string;
  github?: string;
  demo?: string;
  status: Status;
}

interface UpcomingProject {
  title: string;
  focus: string;
}

// Flagship projects. Only add results here once they have been measured;
// each project ships with a repository, a written case study and a demo.
const projects: Project[] = [
  {
    title: "🧪 GrowthLab",
    subtitle: "Customer Lifetime Value & Causal Uplift Decision Engine",
    problem:
      "Retention budgets are wasted on customers who would stay anyway, or who react badly to being contacted.",
    approach:
      "Probabilistic CLV (BG/NBD + Gamma-Gamma) combined with causal uplift (X-learner) into one rule: contact only if margin × CLV × uplift exceeds the cost. Policies are scored on observed outcomes of a randomized experiment.",
    result:
      "€21.5k incremental profit in simulation vs €11.9k for top-20% CLV targeting, contacting half as many customers.",
    tags: ["Causal Inference", "PyMC-Marketing", "EconML", "LightGBM", "FastAPI", "Streamlit"],
    data: "Online Retail II (UCI) · Criteo Uplift",
    github: "https://github.com/suelmapina/growthlab",
    demo: "https://growthlab-suelmapina.streamlit.app/",
    status: "completed",
  },
  {
    title: "📦 StockWise",
    subtitle: "Probabilistic Demand Forecasting & Inventory Optimization",
    problem:
      "Point forecasts hide uncertainty, so stock policies end up either overstocked or running out.",
    approach:
      "Quantile forecasts (P10/P50/P90) feed a linear-programming model that sets order quantities under budget and capacity constraints, with a financial backtest against a moving-average policy.",
    tags: ["Time Series", "LightGBM", "StatsForecast", "PuLP", "MLflow"],
    data: "M5 Forecasting (Walmart)",
    status: "planned",
  },
  {
    title: "📜 RegLens",
    subtitle: "Agentic Compliance Assistant over EU Regulation",
    problem:
      "Answering regulatory questions requires precise, citable sources. Hallucinations are not acceptable.",
    approach:
      "Hybrid retrieval (dense + BM25) with cross-encoder reranking, an agentic workflow with human fallback on low confidence, and continuous evaluation of faithfulness, cost and latency.",
    tags: ["RAG", "LangGraph", "Qdrant", "RAGAS", "LLM Evaluation"],
    data: "EUR-Lex · EU AI Act",
    status: "planned",
  },
];

const upcoming: UpcomingProject[] = [
  { title: "Real-time fraud detection", focus: "cost-sensitive thresholds & drift monitoring" },
  { title: "Two-stage recommender", focus: "retrieval + learning-to-rank" },
  { title: "Predictive maintenance", focus: "survival analysis & maintenance scheduling" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const StatusBadge = ({ status }: { status: Status }) => {
  if (status === "completed")
    return (
      <span className="text-secondary flex items-center gap-1">
        <CheckCircle2 size={12} />
        Completed
      </span>
    );
  if (status === "in-progress")
    return (
      <span className="text-primary flex items-center gap-1">
        <Clock size={12} />
        In development
      </span>
    );
  return (
    <span className="text-muted-foreground flex items-center gap-1">
      <CalendarClock size={12} />
      Planned
    </span>
  );
};

const opendemo = (url?: string) => {
  if (url) window.open(url, "_blank", "noopener,noreferrer");
};

const ProjectCard = ({ project }: { project: Project }) => (
  <div
    onClick={() => opendemo(project.demo)}
    onKeyDown={(e) => {
      if (e.key === "Enter" && e.target === e.currentTarget) opendemo(project.demo);
    }}
    role={project.demo ? "link" : undefined}
    tabIndex={project.demo ? 0 : undefined}
    title={project.demo ? "Open the live demo" : undefined}
    className={`glass rounded-xl p-6 group hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 flex flex-col h-full ${project.demo ? "cursor-pointer" : ""}`}
  >
    <div className="flex items-center justify-between mb-3 text-xs font-mono">
      <StatusBadge status={project.status} />
    </div>

    <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors text-lg leading-snug">
      {project.title}
    </h3>
    <p className="text-xs text-secondary font-mono mb-4">{project.subtitle}</p>

    <div className="space-y-3 mb-4 flex-1">
      <p className="text-sm text-muted-foreground leading-relaxed">
        <span className="text-foreground font-medium">Problem. </span>
        {project.problem}
      </p>
      <p className="text-sm text-muted-foreground leading-relaxed">
        <span className="text-foreground font-medium">Approach. </span>
        {project.approach}
      </p>
      {project.result && (
        <p className="text-sm leading-relaxed rounded-lg border border-primary/30 bg-primary/10 px-3 py-2 text-foreground">
          <span className="text-primary font-medium">Result. </span>
          {project.result}
        </p>
      )}
    </div>

    <p className="text-[11px] font-mono text-muted-foreground mb-3">Data: {project.data}</p>

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

    <div className="flex gap-3" onClick={(e) => e.stopPropagation()}>
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
          Repository & case study coming soon
        </span>
      )}
    </div>
  </div>
);

const PortfolioSection = () => (
  <section id="portfolio" className="py-12 relative">
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

    <div className="container mx-auto px-6">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
        custom={0}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          My <span className="text-gradient">Portfolio</span>
        </h2>
        <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-4" />
        <p className="text-muted-foreground max-w-xl mx-auto">
          End-to-end projects that turn models into decisions. Each one ships with open-source
          code, a written case study and a live demo.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={i + 1}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        custom={4}
        className="glass rounded-xl p-6"
      >
        <h3 className="text-sm font-semibold text-foreground mb-4 font-mono">Next up</h3>
        <ul className="grid md:grid-cols-3 gap-4">
          {upcoming.map((item) => (
            <li key={item.title} className="flex items-start gap-2 text-sm">
              <ArrowRight size={14} className="text-primary mt-1 shrink-0" />
              <span>
                <span className="text-foreground">{item.title}</span>
                <span className="text-muted-foreground">: {item.focus}</span>
              </span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  </section>
);

export default PortfolioSection;
