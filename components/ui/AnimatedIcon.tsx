"use client";

import { motion } from "framer-motion";
import React from "react";

interface AnimatedIconProps {
    icon: React.ElementType;
    color: string;
    size?: number;
    type?: "bounce" | "spin" | "pulse" | "shake";
}

export const AnimatedIcon = ({
    icon: Icon,
    color,
    size = 20,
    type = "bounce",
}: AnimatedIconProps) => {
    const hover =
        type === "spin"
            ? { rotate: 360 }
            : type === "bounce"
                ? { y: [-4, 0], scale: [1, 1.15, 1] }
                : type === "shake"
                    ? { rotate: [-10, 10, -10, 0] }
                    : { scale: [1, 1.35, 1] };

    return (
        <motion.div whileHover={hover} transition={{ duration: 0.45, ease: "easeInOut" }}>
            <Icon size={size} color={color} strokeWidth={1.8} />
        </motion.div>
    );
};
