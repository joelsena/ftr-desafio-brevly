import {
  CheckCircleIcon,
  InfoIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react";
import { twMerge } from "tailwind-merge";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

import { useToast, type Toast } from "../context/toast";

export function Toast(props: Toast) {
  const [seconds, setSeconds] = useState(0);

  const { removeToast } = useToast();

  const icons = {
    error: WarningCircleIcon,
    info: InfoIcon,
    success: CheckCircleIcon,
  };

  const Icon = icons[props.type];

  const styleByType = {
    error: "text-danger bg-[color-mix(in_srgb,#B12C4D_30%,white)]",
    info: "text-blue-500 bg-[color-mix(in_srgb,var(--color-blue-300)_30%,white)]",
    success: "text-green-800 bg-[color-mix(in_srgb,#016630_30%,white)]",
  };

  useEffect(() => {
    if (seconds === 6) {
      removeToast(props.id);
      return;
    }

    const interval = setInterval(() => setSeconds((old) => old + 1), 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <motion.div
      className={twMerge(
        "flex items-center rounded-lg p-4 gap-2 transition-opacity duration-300 opacity-0 shadow",
        styleByType[props.type],
      )}
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: 20,
      }}
      transition={{
        duration: 0.3,
      }}
    >
      <Icon className="flex-none" size={20} weight="fill" />

      <div className="flex flex-col text-md">
        <p className="font-bold">{props.title}</p>
        <p>{props.detail}</p>
      </div>
    </motion.div>
  );
}
