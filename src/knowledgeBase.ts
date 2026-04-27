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
  }
];
