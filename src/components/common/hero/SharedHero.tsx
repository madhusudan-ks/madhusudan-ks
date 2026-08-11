import { useRef, useLayoutEffect } from "react";
import { Box, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import gsap from "gsap";
import styles from "./sharedHero.module.scss";

interface SharedHeroProps {
  title: string;
  titlePrefix?: string;
  titleSuffix?: string;
  subtitle: string;
  icon?: string;
  children?: React.ReactNode;
}

const SharedHero: React.FC<SharedHeroProps> = ({
  title,
  titlePrefix,
  titleSuffix,
  subtitle,
  icon,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const childrenRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const heroTl = gsap.timeline({ delay: 0.1 });

      // Ambient background entry
      if (decorRef.current) {
        heroTl.fromTo(
          decorRef.current.querySelectorAll(`.${styles.blob}`),
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 1.5, stagger: 0.2, ease: "power2.out" },
          0
        );
      }

      // Title entry
      if (titleRef.current) {
        heroTl.fromTo(
          titleRef.current,
          { opacity: 0, y: 40, filter: "blur(10px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power3.out" },
          0.2
        );
      }

      // Subtitle entry
      if (subtitleRef.current) {
        heroTl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20, filter: "blur(5px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power3.out" },
          0.4
        );
      }

      // Children (CTA) entry
      if (childrenRef.current && childrenRef.current.children.length > 0) {
        heroTl.fromTo(
          childrenRef.current.children,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "back.out(1.5)" },
          0.6
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box ref={containerRef} className={styles.sharedHero}>
      {/* Animated Background */}
      <Box ref={decorRef} className={styles.heroDecor}>
        <Box className={`${styles.blob} ${styles.blob1}`} />
        <Box className={`${styles.blob} ${styles.blob2}`} />
        <Box className={`${styles.blob} ${styles.blob3}`} />
        <Box className={styles.glassOverlay} />
      </Box>

      <Box className={styles.heroContent}>
        <Typography ref={titleRef} variant="h1" component="h1" className={styles.heroTitle}>
          {titlePrefix && <span className={styles.titlePrefix}>{titlePrefix}</span>}
          {icon && <Icon icon={icon} className={styles.titleIcon} />}
          <span className={styles.titleMain}>{title}</span>
          {titleSuffix && <span className={styles.titleSuffix}>{titleSuffix}</span>}
        </Typography>

        <Typography ref={subtitleRef} variant="body1" className={styles.heroSubtitle}>
          {subtitle}
        </Typography>

        {children && (
          <Box ref={childrenRef} className={styles.heroActions}>
            {children}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SharedHero;
