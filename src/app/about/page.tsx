import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | DEATH.NEWS",
  description: "All the news that's fit to dread. We report on the inevitable.",
};

export default function About() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold text-[var(--bone)] mb-8">
        About DEATH<span className="text-[var(--crimson)]">.</span>NEWS
      </h1>

      <div className="space-y-6 text-[var(--foreground)] leading-relaxed">
        <p className="text-xl text-[var(--bone)]">
          All the news that&apos;s fit to dread.
        </p>

        <p>
          In an age of algorithmic optimism and manufactured hope, DEATH.NEWS
          stands as the last bastion of honest reporting. We don&apos;t sugarcoat.
          We don&apos;t spin. We simply tell you what&apos;s coming.
        </p>

        <p>
          Founded in the ashes of traditional journalism, our team of
          disillusioned reporters scours the globe for stories that matter—the
          ones other outlets are too afraid to print, too compromised to
          acknowledge, or too distracted to notice.
        </p>

        <p>
          From climate collapse to technological hubris, from economic
          tremors to existential threats lurking in the void of space, we
          cover it all. Not because we enjoy it. Because someone has to.
        </p>

        <div className="pt-8 border-t border-[var(--ash)]">
          <h2 className="text-xl font-bold text-[var(--bone)] mb-4">
            Our Promise
          </h2>
          <ul className="space-y-2 text-[var(--text-light)]">
            <li>• No paywalls on the apocalypse</li>
            <li>• No ads for bunkers (we take cash directly)</li>
            <li>• No false hope</li>
            <li>• No comments section (we know what you&apos;re thinking)</li>
          </ul>
        </div>

        <div className="pt-8 border-t border-[var(--ash)]">
          <h2 className="text-xl font-bold text-[var(--bone)] mb-4">
            Contact
          </h2>
          <p className="text-[var(--text-light)]">
            For tips on impending doom:{" "}
            <span className="text-[var(--crimson)]">tips@death.news</span>
          </p>
          <p className="text-[var(--text-light)]">
            For everything else:{" "}
            <span className="text-[var(--crimson)]">void@death.news</span>
          </p>
        </div>
      </div>
    </div>
  );
}
