import type { ReactNode } from "react";

// Corner registration brackets — the motif shared by both references.
export function Frame({ children, className = "" }: { children?: ReactNode; className?: string }) {
  return (
    <span className={`tf-frame ${className}`}>
      <span className="tf-frame__c tf-frame__c--tl" />
      <span className="tf-frame__c tf-frame__c--tr" />
      <span className="tf-frame__c tf-frame__c--bl" />
      <span className="tf-frame__c tf-frame__c--br" />
      {children}
    </span>
  );
}
