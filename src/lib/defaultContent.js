// Default site content. Used as the seed for the database and as the
// fallback when running without a backend configured (demo mode).
export const defaultContent = {
  profile: {
    brand: 'DS.',
    greeting: "Hello, I'm",
    first_name: 'Dhruv',
    last_name: 'Shrivastava.',
    role: 'Computer Science Engineer',
    tag: 'AI/ML Enthusiast',
    bio: 'I build immersive digital experiences and intelligent systems that solve real-world problems. Passionate about 3D, Interaction, and Innovation.',
    availability: 'Available for Freelance Projects',
    resume_url: '#',
    photo_url: '/dhruv.jpeg',
    github: 'https://github.com/',
    linkedin: 'https://linkedin.com/',
    twitter: 'https://twitter.com/',
    instagram: 'https://instagram.com/',
    email: 'dhruvshrivastava.18032006@gmail.com',
  },
  stats: [
    { id: 1, value: '2+', label: 'Years Experience', sort: 1 },
    { id: 2, value: '15+', label: 'Projects Completed', sort: 2 },
    { id: 3, value: '10+', label: 'Technologies', sort: 3 },
    { id: 4, value: '5★', label: 'Client Reviews', sort: 4 },
  ],
  about:
    "I'm a Computer Science Engineer who loves turning ambitious ideas into polished products. My focus spans full-stack web development, 3D/interactive interfaces, and applied machine learning. I care deeply about clean design, smooth interaction, and code that lasts.",
  skills: [
    { id: 1, name: 'React & Next.js', level: 92, sort: 1 },
    { id: 2, name: 'Python & ML', level: 88, sort: 2 },
    { id: 3, name: 'Three.js / WebGL', level: 80, sort: 3 },
    { id: 4, name: 'Node & APIs', level: 85, sort: 4 },
    { id: 5, name: 'UI / UX Design', level: 83, sort: 5 },
    { id: 6, name: 'Cloud & DevOps', level: 76, sort: 6 },
  ],
  projects: [
    { id: 1, title: 'Neural Vision', desc: 'Real-time object detection dashboard powered by a custom CNN.', tags: 'Python, PyTorch, React', link: '#', sort: 1 },
    { id: 2, title: 'Orbit 3D', desc: 'Interactive 3D product configurator built with Three.js.', tags: 'Three.js, R3F, GLSL', link: '#', sort: 2 },
    { id: 3, title: 'FinFlow', desc: 'Full-stack personal finance tracker with insights.', tags: 'Next.js, Postgres, Charts', link: '#', sort: 3 },
  ],
  experience: [
    { id: 1, role: 'Freelance Full-Stack Developer', org: 'Self-employed', period: '2024 — Present', desc: 'Building web apps and interactive experiences for clients worldwide.', sort: 1 },
    { id: 2, role: 'ML Research Intern', org: 'Tech Lab', period: '2023 — 2024', desc: 'Worked on computer-vision models and data pipelines.', sort: 2 },
  ],
  certificates: [
    { id: 1, title: 'Machine Learning Specialization', issuer: 'Coursera', year: '2024', desc: 'Supervised & unsupervised learning, neural networks.', link: '', sort: 1 },
    { id: 2, title: 'Full-Stack Web Development', issuer: 'freeCodeCamp', year: '2023', desc: 'Responsive design, APIs, and databases.', link: '', sort: 2 },
    { id: 3, title: 'Hackathon Winner', issuer: 'College Tech Fest', year: '2024', desc: '1st place — built an AI-powered study assistant.', link: '', sort: 3 },
  ],
}
