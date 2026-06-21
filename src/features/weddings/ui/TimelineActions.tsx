"use client";
import { useState, useTransition } from "react";
import { Button } from "@/shared/ui/Button/Button";
import { generateTimelineAction, publishTimelineAction } from "../actions";
import styles from "./WeddingDetailScreen.module.scss";

export function GenerateButton({ weddingId, hasIntake }: { weddingId: string; hasIntake: boolean }) {
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  return (
    <div>
      <Button
        disabled={!hasIntake || pending}
        onClick={() =>
          start(async () => {
            const res = await generateTimelineAction(weddingId);
            setError(res.success ? null : res.error.message);
          })
        }
      >
        {pending ? "Generating…" : "Generate timeline"}
      </Button>
      {!hasIntake && <p className={styles.hint}>Waiting on the couple&apos;s intake.</p>}
      {error && <p className={styles.hint}>{error}</p>}
    </div>
  );
}

export function PublishButton({ weddingId, timelineId, published }: { weddingId: string; timelineId: string; published: boolean }) {
  const [pending, start] = useTransition();
  return (
    <Button
      variant={published ? "outline" : "primary"}
      disabled={pending}
      onClick={() => start(async () => { await publishTimelineAction(weddingId, timelineId); })}
    >
      {published ? "Published ✓ — re-publish" : pending ? "Publishing…" : "Publish to couple portal"}
    </Button>
  );
}
