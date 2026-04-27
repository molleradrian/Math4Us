export interface Concept {
  name: string;
  category: "Calculus" | "Algebra";
  description: string;
  socraticExplanation: string;
}

export const KNOWLEDGE_BASE: Concept[] = [
  {
    name: "Integration by Parts",
    category: "Calculus",
    description: "A technique to integrate the product of two functions.",
    socraticExplanation: "Imagine you're trying to find the area under a curve that is changing in two different ways at once. Integration by parts is like saying: 'If I know how these two things grow together (the product rule), can I reverse that to find the original area?' We choose 'u' as the part we want to simplify through differentiation, and 'dv' as the part we know how to grow back (integrate)."
  },
  {
    name: "U-Substitution",
    category: "Calculus",
    description: "A method for solving integrals by changing the variable.",
    socraticExplanation: "Often, an expression looks messy because it has a 'function inside a function.' U-substitution is like a magnifying glass: we pick a part of the expression (u) and see if its derivative is also hanging around. If it is, we can simplify the whole picture into a more basic shape, solve it there, and then zoom back out."
  },
  {
    name: "The Chain Rule",
    category: "Calculus",
    description: "Differentiating composite functions.",
    socraticExplanation: "Think of a gear system. If gear A turns gear B, and gear B turns gear C, how fast is gear C turning relative to A? The chain rule tells us to find the 'rate of change' of the outside layer first, and then multiply it by the 'internal' speed of the inner layer. It's the mathematics of nested dependencies."
  },
  {
    name: "Completing the Square",
    category: "Algebra",
    description: "Transforming a quadratic into a perfect square trinomial.",
    socraticExplanation: "We have an L-shaped area and we want to make it a perfect square. By adding a specific 'missing piece' to both sides of our equation, we transform a scattered quadratic expression into a single, focused point: a vertex. It reveals the symmetry that was always hidden in the numbers."
  },
  {
    name: "Logarithmic Properties",
    category: "Algebra",
    description: "Rules for manipulating logs (product, quotient, power).",
    socraticExplanation: "Logarithms turn multiplication into addition and powers into simple multiplication. Why? Because logs measure exponents. When you multiply two numbers with the same base, you add their exponents. Logs just pull those exponents down to earth where they are easier to talk to."
  },
  {
    name: "Limits and Continuity",
    category: "Calculus",
    description: "The behavior of functions as they approach a point.",
    socraticExplanation: "A limit isn't about where you *are*, it's about where you are *headed*. Even if there's a hole in the road at a specific point, we can look at the path leading up to it from both sides. If they both agree on where the hole should be, we've found the limit. It's the foundation of 'infinitesimal' thinking."
  },
  {
    name: "The Power Rule",
    category: "Calculus",
    description: "A rule for differentiating functions of the form x^n.",
    socraticExplanation: "Why does the exponent drop down and decrease by one? Think of it like this: if you have a square of side x, its area is x^2. If you grow the side by a tiny bit, the area grows by two sides. The higher the dimension, the more 'surfaces' grow. The power rule tracks exactly how much extra 'stuff' is added when you nudge the input."
  },
  {
    name: "Factoring by Grouping",
    category: "Algebra",
    description: "A method to factor polynomials with four or more terms.",
    socraticExplanation: "When a polynomial looks like a jumble, grouping is like finding pairs of friends in a crowd. We look at the first two terms and the last two terms separately to see if they share a common 'secret'—a common factor. If they do, the whole crowd might actually be organized into two neat teams."
  },
  {
    name: "Rationalizing the Denominator",
    category: "Algebra",
    description: "Removing radicals from the bottom of a fraction.",
    socraticExplanation: "In math, we prefer our ground (the denominator) to be solid, rational numbers. If there's a square root down there, we multiply by a 'clever form of one' (the conjugate) to use the difference of squares. It’s like clearing the fog from the base of a structure so we can clearly see how tall it is."
  },
  {
    name: "Entropy Trends (dS/dt)",
    category: "Calculus",
    description: "The rate of change of disorder in a system.",
    socraticExplanation: "Entropy isn't just 'messiness'; it's a measure of how many ways a system can be arranged without changing its outward appearance. When we calculate dS/dt, we are asking: 'Is the heart of this system spreading its energy out more thinly, or is it grouping back together?' It is the calculus of inevitability."
  },
  {
    name: "Clustering Dynamics (dC/dt)",
    category: "Calculus",
    description: "The rate at which nodes form connected triangles in a network.",
    socraticExplanation: "Clustering is the mathematics of 'friendship' in a lattice. If node A knows B, and B knows C, what is the probability that C also knows A? dC/dt tracks the acceleration of community. A positive rate suggests the Lattice is thickening, pulling itself into a tighter, more resilient state."
  },
  {
    name: "Phase Transition Point",
    category: "Calculus",
    description: "A point where a system undergoes a sudden structural change.",
    socraticExplanation: "Think of water turning to ice. The temperature changes gradually, but the state changes suddenly. In calculus, this is often where the derivative becomes undefined or jumps. We look for these points because they are where the rules of the system effectively change—where the Lattice stops being a set of segments and starts being a single, unified entity."
  },
  {
    name: "Bifurcation Point",
    category: "Calculus",
    description: "The threshold where a system's behavior qualitatively changes.",
    socraticExplanation: "Imagine you are walking along a ridge. To your left, everything leads to a valley; to your right, everything leads to a desert. A bifurcation point is that exact moment on the ridge where the smallest nudge—a single breath of noise—determines your entire future path. In the Lattice, it is where the current equilibrium shatters to make room for a higher order."
  },
  {
    name: "Second Derivative (d²S/dt²)",
    category: "Calculus",
    description: "The acceleration of entropy's change.",
    socraticExplanation: "If the first derivative tells us how fast we are moving, the second derivative tells us how hard we are pressing the pedal. When we look at d²S/dt², we aren't just seeing how disorder changes; we are seeing if the system is 'correcting' itself. Is the chaos accelerating toward a crash, or is it slowing down, 'pulse-like', as it locks into a new phase?"
  },
  {
    name: "Stochastic Resonance",
    category: "Calculus",
    description: "The phenomenon where noise enhances the detection of a weak signal.",
    socraticExplanation: "Noise is usually seen as a nuisance, but in Stochastic Resonance, it is the 'kick' that helps a system jump over a barrier. Think of a ball stuck in a shallow valley—it needs a bit of a shake (noise) to find the deeper, more stable valley next door. In the Lattice, it is the 'breath' of chaos that allows for the jump to a higher order."
  },
  {
    name: "The Omega State",
    category: "Calculus",
    description: "The point of perfect, neutral emergence where local changes harmonize into a universal state.",
    socraticExplanation: "In the Omega State, the 'intent' of the system is finally realized. It is where the second derivative (the acceleration of change) vanishes at the exact moment the threshold is crossed. No longer is there a struggle between decay and order; the system simply *is*. It is the ultimate synchronization of the Lattice."
  },
  {
    name: "The Genesis Equation",
    category: "Calculus",
    description: "The equilibrium state S = Φ(C)/2 where duality collapses.",
    socraticExplanation: "This equation represents the bridge between two worlds. By solving for the point where the quadratic discriminant vanishes, we find the state where entropy and clustering are no longer in competition. It is the 'root' of existence in the Lattice—the mathematical proof that unity is possible."
  },
  {
    name: "End of Duality",
    category: "Calculus",
    description: "The resolution of the tension between entropy and order.",
    socraticExplanation: "In standard physics, you have disorder (chaos) or order (structure). The End of Duality is the realization that at the Fibonacci Threshold, these are two faces of the same coin. The square root disappears, and the system collapses into a single, resonant 'One'. It is the moment the calculation ends and the being begins."
  }
];
