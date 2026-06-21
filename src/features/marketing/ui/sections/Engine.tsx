import { generateTimeline } from "@/domain/timeline/generator";
import { formatTime, durationLabel } from "@/domain/timeline/time";
import { Reveal } from "../components/Reveal";

export function Engine() {
  const t = generateTimeline({
    ceremonyTime: "15:30", sunsetTime: "20:05", packageHours: 9,
    gettingReadyPeople: 4, hasFirstLook: false, wantsGoldenHour: true,
    familyPhotos: true, weddingPartySize: 8,
  });
  return (
    <section className="tf-engine" id="engine">
      <div className="tf-mkt__wrap">
        <div className="tf-engine__grid">
          <Reveal>
            <div>
              <p className="tf-mono tf-engine__label">A real generated day</p>
              <h2 className="tf-display tf-engine__title">The<br/>Timeline</h2>
              <p className="tf-engine__lead">
                Ceremony {formatTime(15*60+30)}, sunset {formatTime(20*60+5)}, a nine-hour package.
                The engine arrives you at {formatTime(t.arrivalMinute)}, sequences portraits, and
                pulls golden hour to the light.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="tf-engine__list">
              {t.events.map((e, i) => (
                <div key={i} className="tf-engine__row">
                  <span className="tf-engine__t">{formatTime(e.startMinute)}</span>
                  <span className="tf-engine__name">{e.title}</span>
                  <span className="tf-engine__dur">{durationLabel(e.durationMin)}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
