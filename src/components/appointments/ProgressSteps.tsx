"use client";

import { Check, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const PROGRESS_STEPS = ["Dentist Selection", "Time Selection", "Final Review"];

function ProgressSteps({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center gap-2 md:gap-4">
      {PROGRESS_STEPS.map((stepName, index) => {
        const stepNumber = index + 1;
        const isActive = currentStep === stepNumber;
        const isCompleted = currentStep > stepNumber;

        return (
          <div key={stepNumber} className="flex items-center gap-2 md:gap-4">
            <div className="flex items-center gap-2 group">
              <motion.div
                initial={false}
                animate={{
                  backgroundColor: isCompleted ? "var(--primary)" : isActive ? "var(--primary)" : "transparent",
                  borderColor: isCompleted || isActive ? "var(--primary)" : "rgba(var(--primary), 0.2)",
                  scale: isActive ? 1.1 : 1,
                }}
                className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 shadow-lg`}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5 text-primary-foreground" />
                ) : (
                  <span className={`text-sm font-bold ${isActive ? "text-primary-foreground" : "text-muted-foreground"}`}>
                    {stepNumber}
                  </span>
                )}
              </motion.div>

              <div className="hidden sm:block">
                <p className={`text-[10px] font-bold uppercase tracking-widest leading-none ${isActive ? "text-primary" : "text-muted-foreground/60"}`}>
                  Step 0{stepNumber}
                </p>
                <p className={`text-sm font-bold truncate max-w-[120px] ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                  {stepName}
                </p>
              </div>
            </div>

            {stepNumber < PROGRESS_STEPS.length && (
              <ChevronRight className="w-4 h-4 text-muted-foreground/30" />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ProgressSteps;