import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

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

const EducationSection = () => {
  return (
    <section id="education" className="py-24 relative">
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
            <GraduationCap size={24} className="text-primary" />
            Education & <span className="text-gradient">Certifications</span>
          </h2>
          <div className="w-16 h-1 bg-primary rounded-full" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {education.map((edu, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i + 1}
              className="glass rounded-xl p-5 hover:border-primary/50 transition-colors"
            >
              <p className="font-medium text-sm text-foreground mb-1">{edu.title}</p>
              <p className="text-xs text-muted-foreground">{edu.institution}</p>
              <p className="text-xs font-mono text-secondary mt-2">{edu.year}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
