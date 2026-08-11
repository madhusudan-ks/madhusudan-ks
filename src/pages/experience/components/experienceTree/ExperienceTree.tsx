import React from "react";
import type { ExperienceItem, ExperienceCompany } from "./experienceData";
import { experienceGroups } from "./experienceData";
import styles from "./experienceTree.module.scss";

type ExperienceTreeProps = {
  groups?: ExperienceCompany[];
  items?: ExperienceItem[]; // fallback: will be grouped by company
  className?: string;
};

function groupByCompany(items: ExperienceItem[]): ExperienceCompany[] {
  const map = new Map<string, ExperienceCompany>();
  const order: string[] = [];
  items.forEach((it) => {
    if (!map.has(it.company)) {
      map.set(it.company, { id: it.company.toLowerCase(), company: it.company, roles: [] });
      order.push(it.company);
    }
    map.get(it.company)!.roles.push(it);
  });
  return order.map((c) => map.get(c)!);
}

const ExperienceTree: React.FC<ExperienceTreeProps> = ({
  groups,
  items,
  className,
}) => {
  const data: ExperienceCompany[] =
    groups ?? (items ? groupByCompany(items) : experienceGroups);

  return (
    <section className={`${styles["experience-tree"]} ${className ?? ""}`.trim()}>
      <ol className={styles.timeline} aria-label="Work experience timeline">
        {data.map((group, index) => {
          const isLastGroup = index === data.length - 1;
          const companyLocation = group.roles?.[0]?.location;
          const brandStr = group.brand;
          const isBrandImage = !!brandStr && /^(https?:\/\/|data:)/i.test(brandStr);
          return (
            <li key={group.id} className={styles.group}>
              <span className={styles.marker} aria-hidden>
                {isBrandImage ? (
                  <img className={styles.brandIcon} src={brandStr as string} />
                ) : (
                  (brandStr ? brandStr : group.company.charAt(0))
                )}
              </span>
              {!isLastGroup && <span className={styles.connector} aria-hidden />}
              <div className={styles.block}>
                <div className={styles.companyRow}>
                  <div className={styles.companyLine}>
                    <span className={styles.company}>{group.company}</span>
                    {companyLocation && (
                      <span className={styles.companyMeta}>
                        <span className={styles.dot}>•</span>
                        {companyLocation}
                      </span>
                    )}
                  </div>
                </div>
                <ul className={styles.roles}>
                  {group.roles.map((r) => (
                    <li
                      key={r.id}
                      className={`${styles.roleItem} ${r.muted ? styles.muted : ""}`.trim()}
                    >
                      <div className={styles.roleTitle}>
                        {r.role}  className={styles.roleTitle2}
                        {r.roleType && <span className={styles.roleKind}>{r.roleType}</span>}
                        {r.verified && <span className={styles.badgeVerified} title="Verified">✓</span>}
                        {r.featured && <span className={styles.badgeFeatured} title="Featured">★</span>}
                      </div>
                      <div className={styles.meta}>
                        <span className={styles.range}>
                          {r.start} – {r.end}
                        </span>
                        {r.employmentType && (
                          <>
                            <span className={styles.dot}>•</span>
                            <span>{r.employmentType}</span>
                          </>
                        )}
                      </div>
                      {r.bullets && r.bullets.length > 0 && (
                        <ul className={styles.bullets}>
                          {r.bullets.map((b, idx) => (
                            <li key={idx}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
};

export default ExperienceTree;
