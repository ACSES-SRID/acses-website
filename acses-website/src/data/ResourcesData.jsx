// ─── SVG Icon Components ────────────────────────────────────────────────────

export const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

export const W3SchoolsIcon = () => (
  <svg viewBox="0 0 24 24" fill="#04AA6D" className="w-7 h-7">
    <path d="M3.428 0L0 24l12-3.755L24 24 20.572 0zm11.91 8.581l-.392 4.479-3.047.93 3.047.93-.443 5.069-3.5-1.29L8.5 19.989l-.443-5.069 3.047-.93-3.047-.93-.392-4.479 3.439 1.268L13.938 8.581z" />
  </svg>
);

export const VSCodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
    <path
      d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z"
      fill="#007ACC"
    />
  </svg>
);

export const SwiftIcon = () => (
  <svg viewBox="0 0 24 24" fill="#FA7343" className="w-7 h-7">
    <path d="M21.985 16.785a9.662 9.662 0 0 1-.64 1.235c-.337.54-.614.914-.83 1.118-.332.305-.687.46-1.068.47-.273 0-.602-.078-.984-.237-.384-.158-.737-.236-1.062-.236-.34 0-.703.078-1.09.236-.387.16-.699.243-.94.251-.365.016-.727-.144-1.09-.48-.234-.217-.522-.602-.863-1.155-.37-.593-.675-1.28-.914-2.065-.256-.845-.384-1.664-.384-2.457 0-.907.196-1.689.588-2.34.308-.524.718-.937 1.23-1.24.511-.302 1.063-.457 1.658-.466.29 0 .67.09 1.144.266.472.176.776.265.909.265.099 0 .435-.104 1.003-.312.537-.193 1.01-.273 1.418-.241.99.08 1.736.47 2.234 1.175-.885.537-1.323 1.289-1.314 2.252.008.75.28 1.374.813 1.868.242.23.512.408.812.534-.065.189-.134.37-.208.544zM18.04.783c0 .588-.215 1.137-.64 1.645-.515.602-1.138.95-1.815.895a1.829 1.829 0 0 1-.014-.222c0-.564.246-1.168.683-1.662.218-.25.496-.459.833-.626.336-.164.655-.255.955-.27.009.08.013.16.013.24z" />
  </svg>
);

// ─── Filter Options ──────────────────────────────────────────────────────────

export const FILTERS = [
  "All",
  "Academic Materials",
  "Tools & Platforms",
  "Career & Internships",
];

// ─── Academic Resources ──────────────────────────────────────────────────────

export const academicResources = [
  {
    id: 1,
    title: "Computer Lab Work",
    description:
      "Structured practical exercises and lab guides designed to strengthen your hands-on skills. Improve problem-solving ability and reinforce classroom concepts through real-world applications.",
    tags: ["Software Development", "Computer Networks", "AI"],
  },
  {
    id: 2,
    title: "Numerical Analysis",
    description:
      "Comprehensive study materials explaining computational methods, numerical techniques, and mathematical problem-solving approaches needed to excel in computer engineering coursework.",
    tags: ["Software Development", "Computer Networks", "AI"],
  },
  {
    id: 3,
    title: "Intro. to Python Programming",
    description:
      "A beginner-friendly resource covering programming fundamentals, logic-building, algorithms and real-world examples to help students develop strong foundational coding skills.",
    tags: ["Machine Learning", "Data Visualization", "Artificial Intelligence"],
  },
  {
    id: 4,
    title: "Java Programming",
    description:
      "Well-organized resources covering Java syntax, object-oriented principles, and application development, so that students confidently build and manage Java-based projects.",
    tags: ["Machine Learning", "Data Visualization", "Artificial Intelligence"],
  },
];

// ─── Tools & Platforms ───────────────────────────────────────────────────────

export const tools = [
  { id: 1, name: "GitHub",     Icon: GithubIcon },
  { id: 2, name: "w3Schools",  Icon: W3SchoolsIcon },
  { id: 3, name: "VS Code",    Icon: VSCodeIcon },
  { id: 4, name: "Swift Code", Icon: SwiftIcon },
];

// ─── Career Resources ────────────────────────────────────────────────────────

export const careerResources = [
  {
    id: 1,
    title: "CV Template",
    description:
      "A professionally structured CV template designed for computer science students.",
  },
  {
    id: 2,
    title: "Interview Checklist",
    description:
      "A practical guide to help you prepare for interviews in the tech industry.",
  },
  {
    id: 3,
    title: "LinkedIn Guide",
    description:
      "Practical tips to optimize your LinkedIn profile and build a strong professional network.",
  },
  {
    id: 4,
    title: "Git Fundamentals",
    description:
      "Essential guides to version control, collaboration and managing projects with Git and GitHub.",
  },
];