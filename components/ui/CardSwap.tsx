import React, { Children, cloneElement, forwardRef, isValidElement, useEffect, useMemo, useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './CardSwap.css';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  customClass?: string;
  children?: ReactNode;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({ customClass, children, ...rest }, ref) => (
  <div ref={ref} {...rest} className={`card ${customClass ?? ''} ${rest.className ?? ''}`.trim()}>
    {children}
  </div>
));
Card.displayName = 'Card';

interface CardSwapProps {
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (index: number) => void;
  skewAmount?: number;
  easing?: string;
  children: ReactNode;
}

const CardSwap = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = 'elastic',
  children
}: CardSwapProps) => {
  const childArr = useMemo(() => Children.toArray(children), [children]);
  const total = childArr.length;
  
  // order array keeps the indices of the children. 
  // index 0 is the front card, index total-1 is the back card.
  const [order, setOrder] = useState<number[]>(Array.from({ length: total }, (_, i) => i));
  const [isHovered, setIsHovered] = useState(false);
  const [animatingOut, setAnimatingOut] = useState<number | null>(null);

  useEffect(() => {
    if (total < 2) return;
    if (pauseOnHover && isHovered) return;

    const interval = setInterval(() => {
      const frontCard = order[0];
      setAnimatingOut(frontCard);
      
      // Wait for drop animation before moving it to the back
      setTimeout(() => {
        setOrder(prev => {
            const newOrder = [...prev];
            const shifted = newOrder.shift();
            if (shifted !== undefined) newOrder.push(shifted);
            return newOrder;
        });
        setAnimatingOut(null);
      }, 600); // Wait 600ms for drop

    }, delay);

    return () => clearInterval(interval);
  }, [order, delay, pauseOnHover, isHovered, total]);

  return (
    <div 
      className="card-swap-container relative" 
      style={{ width, height, perspective: '1000px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {childArr.map((child, originalIndex) => {
          if (!isValidElement(child)) return child;
          
          const currentPosIndex = order.indexOf(originalIndex);
          const isAnimatingOut = animatingOut === originalIndex;
          
          // Calculate target position based on position in stack
          const xPos = currentPosIndex * cardDistance;
          const yPos = -currentPosIndex * verticalDistance;
          const zPos = -currentPosIndex * cardDistance * 1.5;
          const zIndex = total - currentPosIndex;

          return (
            <motion.div
              key={originalIndex}
              layout
              initial={false}
              animate={isAnimatingOut ? {
                y: 500, // Drop down
                opacity: 0,
                zIndex: zIndex
              } : {
                x: xPos,
                y: yPos,
                z: zPos,
                skewY: skewAmount,
                opacity: 1,
                zIndex: zIndex
              }}
              transition={{
                type: easing === 'elastic' ? 'spring' : 'tween',
                stiffness: easing === 'elastic' ? 100 : undefined,
                damping: easing === 'elastic' ? 15 : undefined,
                duration: easing === 'elastic' ? undefined : 0.8,
                ease: easing === 'elastic' ? undefined : 'easeInOut'
              }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                x: '-50%',
                y: '-50%',
                transformOrigin: 'center center',
                width,
                height,
                pointerEvents: currentPosIndex === 0 ? 'auto' : 'none'
              }}
              onClick={(e) => {
                if (currentPosIndex === 0) {
                    child.props.onClick?.(e);
                    onCardClick?.(originalIndex);
                }
              }}
            >
              {cloneElement(child as any, {
                style: { width: '100%', height: '100%', ...((child.props as any).style ?? {}) }
              })}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default CardSwap;
