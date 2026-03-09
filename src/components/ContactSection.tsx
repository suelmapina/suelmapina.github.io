import { motion } from "framer-motion";
import { Mail, Linkedin, Github } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />

      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Let's <span className="text-gradient">Collaborate</span>
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-muted-foreground max-w-md mx-auto mb-12">
            Open to remote-first roles and data science collaborations across global teams.
          </p>

          <div className="flex justify-center gap-6 mb-16">
            <a
              href="mailto:suelmapina@gmail.com"
              className="glass rounded-xl p-6 flex flex-col items-center gap-3 hover:border-primary/50 transition-all hover:-translate-y-1 min-w-[120px]"
            >
              <Mail size={28} className="text-primary" />
              <span className="text-sm text-muted-foreground">Email</span>
            </a>
            <a
              href="http://www.linkedin.com/in/suelma-pina-senior-data-scientist-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="glass rounded-xl p-6 flex flex-col items-center gap-3 hover:border-primary/50 transition-all hover:-translate-y-1 min-w-[120px]"
            >
              <Linkedin size={28} className="text-primary" />
              <span className="text-sm text-muted-foreground">LinkedIn</span>
            </a>
            <a
              href="https://github.com/suelmapina"
              target="_blank"
              rel="noopener noreferrer"
              className="glass rounded-xl p-6 flex flex-col items-center gap-3 hover:border-primary/50 transition-all hover:-translate-y-1 min-w-[120px]"
            >
              <Github size={28} className="text-primary" />
              <span className="text-sm text-muted-foreground">GitHub</span>
            </a>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="border-t border-border pt-8">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Suelma Pina. Built with React & Three.js
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
