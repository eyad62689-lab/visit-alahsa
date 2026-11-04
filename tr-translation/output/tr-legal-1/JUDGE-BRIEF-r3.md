# Judge brief — batch `tr-legal-1`, round 3 (closing addendum)

Same paths, rules, units and output shape as `JUDGE-BRIEF-r1.md`. Your input is your `stages\07-judge.r2.json`; write
`stages\07-judge.r3.json` (round 3, `changes` = every edit vs 07-judge.r2.json) and run the checker with `--prev` set
to 07-judge.r2.json. This round is **narrow**: fix what the proof and the threshold name, nothing else.

New evidence on the page as built from your r2 text:
1. **Independent proof of your r2 edits** — `BATCH\stages\05d-proof-of-judge-r2.md` (11 findings; cite R<n>). Rule
   each in `proof_rulings`. The heaviest:
   - `legal.sec.2.sub.1.list.3`: the access scope fault (Q2) is back — «siteye erişimdeki» stands before all three
     nouns again. Only the interruption is «in access»; make the scope unmistakable (two clauses, or the
     interruption first with its own qualifier).
   - **«official» dropped in six keys** (contactPre, sec.0.sub.3.after.0, sec.4.sub.2.before.0, sec.4.sub.3.before.0,
     sec.5.sub.1.before.0, the Google add-on). The English and the Arabic («الرسمي/الرسمية») say it; this is an
     owner-approved legal text, so a qualifier is not dropped silently. LG1-r2 was about the reader's misreading of
     «resmî» next to «not a government body», and «kendi» was heard as filler (one reader each). Find a Turkish word
     for the site's *designated/official* channels and address that keeps the meaning without suggesting a state
     body (e.g. «sitenin resmî e-posta adresi» is ordinary Turkish for a company's own official address — weigh it
     against the r1 reader; or another attested qualifier), print it in all six, and supersede LG1-r2 with the
     reason. The Google add-on: the English «Google's official … add-on» — say Google's official add-on.
   - «tali zarar» for «consequential» (R2, and the fresh reader P3.38 «stiff»): attest the Turkish legal rendering of
     «consequential damages» (Turkish contract law / terms pages: e.g. «dolaylı zararlar» covering both, or a
     specific term) — keep three members only if Turkish legal usage has a third word for it; otherwise say so in
     `notes` and choose the attested pair/triple with the reason.
   - The rest on merit.
2. **A third blind reader** — `BATCH\stages\06-blind-reader.on-r2.md` (61 items; cite P3.<n>). Rule all 61 in one line
   each; most repeat source content you already classed.

## The three-reader threshold is reached on two points
- **H1 vs footer** (P1.1, P2.1, P3.1): three readers thought the footer link «Politikalar ve kullanım koşulları»
  leads to another page or only to section Two. The threshold applies even against LG5. Choose one fix: either the
  H1 takes a form the footer link matches, or the published footer label `ui.foot.l.privacy` is revised (the
  Arabic and English footers say «السياسات والشروط» / «Policies & Terms» — a short form of the document title,
  e.g. «Politikalar ve koşullar»), in which case write the new footer label under `ui_changes: { "foot.l.privacy":
  "<new>" }` in your output — it is applied with the published-key tool, and it changes the footer on every Turkish
  page. Rule it as LG5-r2 with the three reader items as evidence.
- **«Visit Al-Ahsa» brand vs «El-Ahsa» place** (P1.2, P2.2, P3.2): the brand stays Latin by the site's identity rule
  (`og:site_name` «Visit Al-Ahsa» in Latin scripts) and the place name by the termbase — neither may change. The
  threshold obliges you to address the stumble inside the text: e.g. the first sentence may make it explicit that
  «Visit Al-Ahsa» is the site's name (the brand) and «El-Ahsa» the oasis, without adding a fact. Record it as
  `frame` with what you did.

Every clause, hedge, exception and actor of the English/Arabic stays; nothing is added. Report back as in r1.
