import { motion } from "framer-motion";
import profileImg from "@/assets/profile.png";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

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
        {/* Header with Download CV */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          custom={0}
          className="flex items-center justify-between mb-16"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              About <span className="text-gradient">Me</span>
            </h2>
            <div className="w-16 h-1 bg-primary rounded-full" />
          </div>
          <Button asChild variant="outline" className="gap-2">
            <a href="/Suelma_Pina_Senior_Data_Scientist.pdf" download>
              <Download size={16} />
              Download CV
            </a>
          </Button>
        </motion.div>

        {/* Profile Image + Story side by side */}
        <div className="grid md:grid-cols-[300px_1fr] gap-10 items-stretch">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
          >
            <div className="relative h-full">
              <div className="absolute -inset-3 bg-gradient-to-br from-primary to-secondary rounded-2xl opacity-30 blur-lg" />
              <img
                src={profileImg}
                alt="Suelma Pina"
                className="relative w-full h-full object-cover rounded-2xl"
              />
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={2}
            className="space-y-5 flex flex-col justify-center"
          >
            <p className="text-base text-muted-foreground leading-relaxed text-justify">
              At 8 years old, I ran my first "business": buying candy and reselling it at school,
              even hiring my cousin as my first employee. My mother shut it down quickly, but the
              entrepreneurial seed was planted.
            </p>

            <p className="text-base text-muted-foreground leading-relaxed text-justify">
              Years later, a rejected university transfer (missed by just 0.10 points) redirected
              me from Economics to Statistics. What felt like failure was actually destiny. That
              redirection led me to discover Data Science, and it has been love ever since.
            </p>

            <p className="text-base text-muted-foreground leading-relaxed text-justify">
              Today, with 9+ years of experience across telecom, energy, retail, and the public
              sector, I turn data into decisions that matter. I have reduced O&amp;M costs by 450K
              euros per year through predictive maintenance, delivered fraud detection models with
              F1 = 0.95, and built MLOps pipelines that cut release cycles by 50% and boosted team
              productivity by 70%.
            </p>

            <p className="text-base text-muted-foreground leading-relaxed text-justify">
              I specialize in end-to-end ML solutions, from raw data to production, with deep
              expertise in Python, MLflow, Kedro, and Explainable AI. Currently expanding into
              Generative AI, LLMs, and RAG pipelines.
            </p>

            <p className="text-base text-foreground leading-relaxed font-medium text-justify">
              What drives me is not just the technology. It is the impact. The ability to make data
              reveal its hidden truths, and use those truths to improve people's lives, is what makes
              me fall in love with this profession every single day.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
