// AUTO-GENERATED from color4_visualization.xlsx + PQE PDF. Do not hand-edit paper facts.
export type LaborType = "Executional" | "Structural" | "Meaning-Making" | "Relational";
export type SiteId = "atl-ind" | "atl-grp" | "btl-ind" | "btl-grp" | "cross";
export type Allocation = "Human Only" | "AI Only" | "HA";

export interface Paper {
  id: number; name: string; venue: string; year: number; url: string;
  site: SiteId; laborTypes: LaborType[]; human: LaborType[]; ai: LaborType[];
  allocation: Partial<Record<LaborType, Allocation>>;
  desc?: string; benefit?: string; challenge?: string; tag?: string;
}

export const PAPERS: Paper[] = [
  { id: 1, name: "Dramatron", venue: "CHI", year: 2023, url: "https://dl.acm.org/doi/10.1145/3544548.3581225", site: "atl-ind", laborTypes: ["Executional", "Structural", "Meaning-Making"], human: ["Executional", "Structural", "Meaning-Making"], ai: ["Executional", "Structural"], allocation: { "Executional": "HA", "Structural": "HA", "Meaning-Making": "Human Only" }, desc: "Interactive co-writing tool for long-form scripts via hierarchical story generation. Assists an individual screenwriter or playwright in single-user authorship (Log Line \u2192 Title \u2192 Characters \u2192 Plot \u2192 Locations \u2192 Dialogue).", benefit: "User intervenes at every level; provides inspiration, helps overcome blocks, and expands alternatives for solo creative exploration. Evaluated with industry professionals.", challenge: "Copyright & plagiarism risk; transparency and \u201cblack box\u201d issues; creative-economy and job-displacement concerns.", tag: "Most influential paper" },
  { id: 2, name: "TaleStream", venue: "UIST", year: 2023, url: "https://dl.acm.org/doi/10.1145/3586183.3606807", site: "atl-ind", laborTypes: ["Executional", "Structural", "Meaning-Making"], human: ["Executional", "Structural", "Meaning-Making"], ai: ["Executional", "Meaning-Making"], allocation: { "Executional": "HA", "Structural": "Human Only", "Meaning-Making": "HA" } },
  { id: 3, name: "ScriptViz", venue: "UIST", year: 2024, url: "https://dl.acm.org/doi/10.1145/3654777.3676402", site: "atl-ind", laborTypes: ["Executional", "Structural", "Meaning-Making"], human: ["Executional", "Structural", "Meaning-Making"], ai: ["Executional", "Structural", "Meaning-Making"], allocation: { "Executional": "HA", "Structural": "HA", "Meaning-Making": "HA" }, desc: "Provides dialogue-aligned visual references from a large movie database to support scriptwriters' scene development, mapping each dialogue line to a frame.", benefit: "Consistency plus rich variance under explicit constraints; dialogue-aligned sequencing makes scenes easier to plan.", challenge: "Requires formalizing intent into attribute rules, which adds upfront planning burden and can bias exploration.", tag: "Structural labor · example" },
  { id: 4, name: "CharacterMeet", venue: "CHI", year: 2024, url: "https://dl.acm.org/doi/10.1145/3613904.3642105", site: "atl-ind", laborTypes: ["Executional", "Meaning-Making"], human: ["Executional", "Meaning-Making"], ai: ["Executional"], allocation: { "Executional": "HA", "Meaning-Making": "Human Only" } },
  { id: 5, name: "Drawing-in-Steps", venue: "IMX", year: 2025, url: "https://dl.acm.org/doi/10.1145/3706370.3727862", site: "atl-ind", laborTypes: ["Executional", "Structural", "Meaning-Making"], human: ["Executional", "Structural", "Meaning-Making"], ai: ["Executional"], allocation: { "Executional": "HA", "Structural": "Human Only", "Meaning-Making": "Human Only" } },
  { id: 6, name: "MVPrompt", venue: "CHI", year: 2025, url: "https://dl.acm.org/doi/10.1145/3706598.3713876", site: "atl-ind", laborTypes: ["Executional", "Structural", "Meaning-Making"], human: ["Executional", "Meaning-Making"], ai: ["Executional", "Structural", "Meaning-Making"], allocation: { "Executional": "HA", "Structural": "AI Only", "Meaning-Making": "HA" } },
  { id: 7, name: "Image-Based Texture", venue: "VRST", year: 2021, url: "https://dl.acm.org/doi/10.1145/3489849.3489854", site: "btl-ind", laborTypes: ["Executional"], human: [], ai: ["Executional"], allocation: { "Executional": "AI Only" }, desc: "Automatic motion-effect authoring for 4D rides and motion platforms, styling motion from point-of-view video. Assists an individual motion-effect designer.", benefit: "Automatic motion-effect generation from video; addresses very high manual authoring cost.", challenge: "Automation still underperforms expert manual design across quality, sync, and feeling metrics.", tag: "Earliest work in the corpus" },
  { id: 8, name: "Optimization-based User Support", venue: "CHI", year: 2021, url: "https://dl.acm.org/doi/10.1145/3411764.3445568", site: "btl-ind", laborTypes: ["Executional"], human: ["Executional"], ai: ["Executional"], allocation: { "Executional": "HA" } },
  { id: 9, name: "Towards Context-aware Automatic", venue: "VRST", year: 2021, url: "https://dl.acm.org/doi/10.1145/3489849.3489887", site: "btl-ind", laborTypes: ["Executional"], human: ["Executional"], ai: ["Executional"], allocation: { "Executional": "HA" } },
  { id: 10, name: "Virtual Camera Layout Generation", venue: "CHI", year: 2021, url: "https://dl.acm.org/doi/10.1145/3411764.3445437", site: "btl-ind", laborTypes: ["Executional", "Structural", "Meaning-Making"], human: ["Structural"], ai: ["Executional", "Structural", "Meaning-Making"], allocation: { "Executional": "AI Only", "Structural": "HA", "Meaning-Making": "AI Only" }, desc: "Automatically generates a virtual camera layout from a reference video via shot-boundary detection, framing and movement classification, and rule-based motion synthesis.", benefit: "Reduces repetitive manual placement and improves efficiency for novices and professionals alike.", challenge: "Only as reliable as upstream vision/classification, and may constrain artistic variation.", tag: "AI-only allocation · example" },
  { id: 11, name: "Real-Time Cinematic Tracking", venue: "GI", year: 2021, url: "https://openreview.net/pdf?id=JpX53OXtp1r", site: "btl-ind", laborTypes: ["Executional"], human: ["Executional"], ai: ["Executional"], allocation: { "Executional": "HA" } },
  { id: 12, name: "Mix3D", venue: "SUI", year: 2022, url: "https://dl.acm.org/doi/10.1145/3565970.3567686", site: "btl-ind", laborTypes: ["Executional", "Structural"], human: ["Executional", "Structural"], ai: ["Executional", "Structural"], allocation: { "Executional": "HA", "Structural": "HA" } },
  { id: 13, name: "Haptic Effects for Articulated Bodies", venue: "CHI", year: 2023, url: "https://dl.acm.org/doi/10.1145/3544548.3580727", site: "btl-ind", laborTypes: ["Executional"], human: [], ai: ["Executional"], allocation: { "Executional": "AI Only" } },
  { id: 14, name: "CurveCrafter", venue: "UIST", year: 2023, url: "https://dl.acm.org/doi/10.1145/3586183.3606792", site: "btl-ind", laborTypes: ["Executional"], human: ["Executional"], ai: ["Executional"], allocation: { "Executional": "HA" } },
  { id: 15, name: "Wakey-Wakey", venue: "UIST", year: 2023, url: "https://dl.acm.org/doi/10.1145/3586183.3606813", site: "btl-ind", laborTypes: ["Executional", "Structural", "Meaning-Making"], human: ["Executional", "Structural"], ai: ["Executional", "Structural", "Meaning-Making"], allocation: { "Executional": "HA", "Structural": "HA", "Meaning-Making": "AI Only" } },
  { id: 16, name: "Merging Camera and Object", venue: "ISMAR", year: 2023, url: "https://ieeexplore.ieee.org/abstract/document/10316361?casa_token=1Q9j5S7SeNUAAAAA:SnnmfJ2mxiFaA-qXDc_5ck_3UC-vmX6kIesYJUmxakFacByKIE20j14cLdHWYao2RWpMy4ntd60", site: "btl-ind", laborTypes: ["Executional"], human: [], ai: ["Executional"], allocation: { "Executional": "AI Only" } },
  { id: 17, name: "Haptic Effects for General Scenes", venue: "ISMAR", year: 2024, url: "https://ieeexplore.ieee.org/abstract/document/10765446?casa_token=2njj3np5jPMAAAAA:0q7O4zhUqhDuSTKlLUfScG8iZOVv-LlFZlUcqwz77HJk1jMOuc7CZgr_6j9pG_XN_yq9busvaY0", site: "btl-ind", laborTypes: ["Executional"], human: [], ai: ["Executional"], allocation: { "Executional": "AI Only" } },
  { id: 18, name: "Sound Designer-Generative AI", venue: "CHI", year: 2024, url: "https://dl.acm.org/doi/10.1145/3613904.3642040", site: "btl-ind", laborTypes: ["Executional", "Structural", "Meaning-Making"], human: ["Executional", "Structural", "Meaning-Making"], ai: ["Executional"], allocation: { "Executional": "HA", "Structural": "Human Only", "Meaning-Making": "Human Only" } },
  { id: 19, name: "HapMotion", venue: "IEEE VR", year: 2024, url: "https://link.springer.com/article/10.1007/s10055-023-00910-z", site: "btl-ind", laborTypes: ["Executional"], human: [], ai: ["Executional"], allocation: { "Executional": "AI Only" } },
  { id: 20, name: "DeepTreeSketch", venue: "CHI", year: 2024, url: "https://dl.acm.org/doi/10.1145/3613904.3642125", site: "btl-ind", laborTypes: ["Executional", "Structural", "Meaning-Making"], human: ["Executional", "Structural", "Meaning-Making"], ai: ["Executional"], allocation: { "Executional": "HA", "Structural": "Human Only", "Meaning-Making": "Human Only" }, desc: "Infers detailed 3D branching tree structures from simple 2D freehand sketches through a learning-based interactive modeling system.", benefit: "Real-time asset creation, balance of control and realism, and lower interaction burden for novices.", challenge: "Sketch ambiguity plus species diversity; fine-grained edits may still require extra manual operations.", tag: "Executional labor · example" },
  { id: 21, name: "XCam", venue: "CHI", year: 2025, url: "https://dl.acm.org/doi/10.1145/3706598.3713305", site: "btl-ind", laborTypes: ["Executional", "Structural", "Meaning-Making"], human: ["Executional", "Structural", "Meaning-Making"], ai: ["Executional"], allocation: { "Executional": "HA", "Structural": "Human Only", "Meaning-Making": "Human Only" } },
  { id: 22, name: "GenTune", venue: "UIST", year: 2025, url: "https://dl.acm.org/doi/10.1145/3746059.3747774", site: "btl-ind", laborTypes: ["Executional", "Meaning-Making"], human: ["Executional", "Meaning-Making"], ai: ["Executional"], allocation: { "Executional": "HA", "Meaning-Making": "Human Only" }, desc: "Makes an image's visual elements traceable to specific prompt segments, so designers can explain what each part is and why it looks that way before deciding what to change.", benefit: "Clarifies the intent-to-element link and makes refinement decisions more meaning-grounded.", challenge: "Label mismatch and method-ordering burden: mixing prompt refinement with inpainting can overwrite earlier local fixes.", tag: "Meaning-making labor · example" },
  { id: 23, name: "AIdeation", venue: "CHI", year: 2025, url: "https://dl.acm.org/doi/10.1145/3706598.3714148", site: "btl-ind", laborTypes: ["Executional", "Meaning-Making"], human: ["Executional", "Meaning-Making"], ai: ["Executional"], allocation: { "Executional": "HA", "Meaning-Making": "Human Only" } },
  { id: 24, name: "KinemaFX", venue: "UIST", year: 2025, url: "https://dl.acm.org/doi/10.1145/3746059.3747734", site: "btl-ind", laborTypes: ["Executional", "Structural", "Meaning-Making"], human: ["Executional", "Structural", "Meaning-Making"], ai: ["Executional", "Structural", "Meaning-Making"], allocation: { "Executional": "HA", "Structural": "HA", "Meaning-Making": "HA" } },
  { id: 25, name: "wr-AI-ter", venue: "IMX", year: 2024, url: "https://dl.acm.org/doi/10.1145/3639701.3656325", site: "atl-grp", laborTypes: ["Executional", "Structural", "Meaning-Making"], human: ["Executional", "Structural", "Meaning-Making"], ai: ["Executional", "Structural", "Meaning-Making"], allocation: { "Executional": "HA", "Structural": "HA", "Meaning-Making": "HA" } },
  { id: 26, name: "CollageVis", venue: "CHI", year: 2024, url: "https://dl.acm.org/doi/10.1145/3613904.3642575", site: "atl-grp", laborTypes: ["Executional", "Structural", "Meaning-Making", "Relational"], human: ["Executional", "Structural", "Meaning-Making", "Relational"], ai: ["Executional"], allocation: { "Executional": "HA", "Structural": "Human Only", "Meaning-Making": "Human Only", "Relational": "Human Only" }, desc: "Video-collage-based previsualization that lets indie filmmakers rapidly prototype and communicate film scenes for early idea exploration and production planning.", benefit: "Positions AI-assisted previs as team-facing coordination: faster shared understanding and easier alignment on layout and shots.", challenge: "Cannot replace 3D previs due to limited ability to simulate lighting, which can weaken cross-role decision confidence.", tag: "Relational labor · example" },
  { id: 27, name: "CineVision", venue: "UIST", year: 2025, url: "https://dl.acm.org/doi/10.1145/3746059.3747793", site: "atl-grp", laborTypes: ["Executional", "Meaning-Making", "Relational"], human: ["Executional", "Meaning-Making", "Relational"], ai: ["Executional", "Structural", "Meaning-Making"], allocation: { "Executional": "HA", "Meaning-Making": "HA", "Relational": "Human Only" }, desc: "Interactive pre-visualization storyboard system that acts as a shared, editable boundary object for Director\u2013Cinematographer collaboration.", benefit: "Real-time visual controls reduce back-and-forth between director and cinematographer.", challenge: "Narrow scope: supports the director-cinematographer dyad only.", tag: "ATL group-level · example" },
  { id: 28, name: "AniCraft", venue: "UIST", year: 2024, url: "https://dl.acm.org/doi/10.1145/3654777.3676325", site: "btl-grp", laborTypes: ["Executional", "Structural", "Meaning-Making", "Relational"], human: ["Executional", "Structural", "Meaning-Making", "Relational"], ai: ["Executional", "Structural"], allocation: { "Executional": "HA", "Structural": "HA", "Meaning-Making": "Human Only", "Relational": "Human Only" }, desc: "Uses marker-tracked everyday objects in mixed reality to let production crafts and teams rapidly prototype and share 3D character animations for previs.", benefit: "Affordable tracking with everyday materials; faster, lower-skill previs for the whole team.", challenge: "Collaboration is framed in the walkthrough but not directly evaluated.", tag: "Labor-allocation · worked example" },
  { id: 29, name: "EditIQ", venue: "IUI", year: 2025, url: "https://dl.acm.org/doi/10.1145/3708359.3712113", site: "btl-grp", laborTypes: ["Executional", "Structural", "Meaning-Making"], human: [], ai: ["Executional", "Structural", "Meaning-Making"], allocation: { "Executional": "AI Only", "Structural": "AI Only", "Meaning-Making": "AI Only" } },
  { id: 30, name: "Paratrouper", venue: "CHI", year: 2025, url: "https://dl.acm.org/doi/10.1145/3706598.3714242", site: "cross", laborTypes: ["Executional", "Structural", "Meaning-Making"], human: ["Executional", "Structural", "Meaning-Making"], ai: ["Executional", "Structural"], allocation: { "Executional": "HA", "Structural": "HA", "Meaning-Making": "Human Only" }, desc: "Exploratory creation of character-cast visuals using generative AI, spanning ATL-individual, BTL-individual, and BTL-group sites via early reference artifacts.", benefit: "Supports cross-role alignment and coherent cast design through parallel multi-character exploration.", challenge: "Better suited to early exploration than precise downstream production, due to limited fine-grained control.", tag: "Latest, cross-site work" },
  { id: 31, name: "Understanding Creative Potential", venue: "IMX", year: 2025, url: "https://dl.acm.org/doi/10.1145/3706370.3727853", site: "cross", laborTypes: ["Executional", "Structural", "Meaning-Making"], human: ["Executional", "Structural", "Meaning-Making"], ai: ["Executional"], allocation: { "Executional": "HA", "Structural": "Human Only", "Meaning-Making": "Human Only" }, desc: "AI-generated environments for virtual film production, supporting all four labor sites with cross-department feasibility testing.", benefit: "Broadens environment inspection and previs across ATL and BTL roles, enabling faster creative judgment and shared review.", challenge: "Limited interactivity and customization can misfit different labor-site needs.", tag: "Latest, cross-site work" },
];
// ---------------------------------------------------------------------------
// Taxonomy metadata (definitions + palette sourced from the PQE deck)
// ---------------------------------------------------------------------------

export interface SiteMeta {
  id: SiteId;
  label: string;
  short: string;
  atl: boolean;
  group: boolean;
  accent: string;
  soft: string;
  roles: string;
  focus: string;
  count: number;
  pct: string;
}

// Site palette matches the deck's Sankey (used consistently site-wide).
export const SITES: SiteMeta[] = [
  { id: "atl-ind", label: "ATL · Individual-Level", short: "ATL Individual", atl: true, group: false, accent: "#d97c5a", soft: "#f8e9e1", roles: "Directors, Screenwriters", focus: "Narrative judgment & creative positioning", count: 6, pct: "19.4%" },
  { id: "atl-grp", label: "ATL · Group-Level", short: "ATL Group", atl: true, group: true, accent: "#6f9350", soft: "#e9f0e1", roles: "Director + Cinematographer", focus: "Shared understanding & high-level convergence", count: 3, pct: "9.7%" },
  { id: "btl-ind", label: "BTL · Individual-Level", short: "BTL Individual", atl: false, group: false, accent: "#c3a96b", soft: "#f5efe1", roles: "Camera, Sound, VFX", focus: "Operational speed & concrete outputs", count: 18, pct: "58.1%" },
  { id: "btl-grp", label: "BTL · Group-Level", short: "BTL Group", atl: false, group: true, accent: "#7196ac", soft: "#e8eef3", roles: "Gaffer, Grip, VFX team", focus: "Operational synchronization", count: 2, pct: "6.5%" },
  { id: "cross", label: "Cross-Site", short: "Cross-Site", atl: false, group: true, accent: "#8f8f8f", soft: "#eeeeee", roles: "Spanning ATL & BTL roles", focus: "Assistance spanning multiple labor sites", count: 2, pct: "6.5%" },
];

export const siteById = (id: SiteId): SiteMeta => SITES.find((s) => s.id === id)!;

export interface TypeMeta {
  id: LaborType;
  color: string;
  soft: string;
  definition: string;
  actions: string;
  evolution: string;
}

export const TYPES: TypeMeta[] = [
  { id: "Executional", color: "#c75b39", soft: "rgba(199,91,57,0.14)", definition: "Content-level actions that directly change the artifact's material state.", actions: "Generate, edit, transform, render / export", evolution: "The stable core — always in scope, and the easiest labor to operationalize, prototype, and evaluate." },
  { id: "Structural", color: "#6e9c75", soft: "rgba(110,156,117,0.14)", definition: "Process-level actions that organize and constrain production.", actions: "Plan workflows, sequence tasks, set rules, manage dependencies", evolution: "Expanded as the field matured — from isolated generation toward sequencing and coherence." },
  { id: "Meaning-Making", color: "#4d6cbb", soft: "rgba(77,108,187,0.14)", definition: "Intent-level actions that shape what the artifact means.", actions: "Articulate goals, revise theme / tone, compare alternatives", evolution: "Grew feasible with GenAI & LLMs, positioning AI as a creative partner — yet humans stay the final meaning-makers." },
  { id: "Relational", color: "#7b68ae", soft: "rgba(123,104,174,0.14)", definition: "Collaboration-level actions that maintain coordination among roles.", actions: "Communicate, align, hand off, coordinate via shared artifacts", evolution: "Remained limited: multi-actor coordination and trust are hard to operationalize. Appears only at group sites." },
];

export const typeById = (id: LaborType): TypeMeta => TYPES.find((t) => t.id === id)!;

// Allocation palette matches the deck's Sankey (human-only brown, AI-only gray,
// human–AI collaboration purple) so every allocation view is consistent.
export const ALLOCATIONS = [
  { id: "Human Only" as Allocation, label: "Human-Only", color: "#8c7346" },
  { id: "HA" as Allocation, label: "Human–AI Collaboration", color: "#7c6199" },
  { id: "AI Only" as Allocation, label: "AI-Only", color: "#9a9a9a" },
];

export const LAYERS = [
  { n: 1, id: "sites", title: "Labor Sites", rq: "RQ1", question: "Where — and whose work?", def: "Specify where AI assistance is positioned in the film-production hierarchy and whose work it is designed to assist, defined by assistance context (individual vs. group) and production position (ATL vs. BTL)." },
  { n: 2, id: "types", title: "Labor Types", rq: "RQ2", question: "What kind of labor?", def: "Describe the forms of filmmaking labor a system brings into scope during use: executional, structural, meaning-making, and relational labor." },
  { n: 3, id: "allocation", title: "Human–AI Labor Allocation", rq: "RQ3", question: "How is it allocated?", def: "Characterize how each involved labor type is allocated between human creators and AI systems during use — captured as human-only, AI-only, or human–AI collaboration." },
];

// Derived aggregates -------------------------------------------------------
export const YEARS = [2021, 2022, 2023, 2024, 2025];

export function typeCountByYear(type: LaborType) {
  return YEARS.map((y) => PAPERS.filter((p) => p.year <= y && p.laborTypes.includes(type)).length);
}

export function allocationCounts(type: LaborType) {
  const c = { "Human Only": 0, HA: 0, "AI Only": 0 } as Record<Allocation, number>;
  PAPERS.forEach((p) => { const a = p.allocation[type]; if (a) c[a] += 1; });
  return c;
}

// Sites -> Types flow (paper counts) for the synthesis diagram
export function siteTypeFlows() {
  const flows: { site: SiteId; type: LaborType; count: number }[] = [];
  SITES.forEach((s) => TYPES.forEach((t) => {
    const count = PAPERS.filter((p) => p.site === s.id && p.laborTypes.includes(t.id)).length;
    if (count > 0) flows.push({ site: s.id, type: t.id, count });
  }));
  return flows;
}

// Types -> Allocation flow
export function typeAllocFlows() {
  const flows: { type: LaborType; alloc: Allocation; count: number }[] = [];
  TYPES.forEach((t) => (["Human Only", "HA", "AI Only"] as Allocation[]).forEach((a) => {
    const count = PAPERS.filter((p) => p.allocation[t.id] === a).length;
    if (count > 0) flows.push({ type: t.id, alloc: a, count });
  }));
  return flows;
}

export const CORPUS = { total: PAPERS.length, venues: "CHI & UIST", span: "through 2025", peak: "2024–2025" };

// ---------------------------------------------------------------------------
// System screenshots extracted from the PQE deck (public/figures/*.jpg)
// ---------------------------------------------------------------------------
export const PAPER_IMAGES: Record<number, string> = {
  3: "/figures/scriptviz.jpg",
  22: "/figures/gentune.jpg",
  26: "/figures/collagevis.jpg",
  27: "/figures/cinevision.jpg",
  28: "/figures/anicraft.jpg",
  30: "/figures/paratrouper.jpg",
  31: "/figures/understanding.jpg",
};
export const paperImage = (id: number): string | undefined => PAPER_IMAGES[id];
