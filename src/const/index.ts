import { GameText, Profession } from "../types";

export const professions: { profession: Profession; description: string }[] = [
  {
    profession: "programmer",
    description: "**Code wizards** who bring ideas to life through software.",
  },
  {
    profession: "technicalWriter",
    description: "Masters of *clear* and *concise* technical documentation.",
  },
  {
    profession: "designer",
    description:
      "Creative minds shaping *visual* and *interactive* experiences.",
  },
  {
    profession: "dataScientist",
    description: "Experts in *analyzing* and *interpreting* complex data sets.",
  },
  {
    profession: "productManager",
    description: "Visionaries who guide products from *concept* to *market*.",
  },
];

export const gameTexts: GameText[] = [
  // Others
  {
    profession: "others",
    level: "beginner",
    duration: "short",
    text: [
      "Identify a simple task or goal you want to accomplish and outline the steps needed to complete it. Consider a personal project that you have been putting off and write down the first three steps to get started. Think about a daily routine you want to improve and list the actions required to make that change. This exercise will help you clarify your objectives and create a roadmap for achieving them, making it easier to stay focused and motivated.",
    ],
  },
  {
    profession: "others",
    level: "beginner",
    duration: "long",
    text: [
      "Develop a structured plan to achieve a medium-term goal, breaking it down into actionable steps and setting deadlines. Create a timeline for a project you want to undertake, detailing each phase and the resources needed. Outline a strategy for learning a new skill over the next few months, including milestones and evaluation points. This structured approach will not only help you stay organized but also allow you to track your progress effectively, ensuring that you remain on target to meet your objectives.",
    ],
  },
  {
    profession: "others",
    level: "intermediate",
    duration: "short",
    text: [
      "Tackle a complex project by identifying the overarching objective. Break it into smaller, manageable tasks. Collaborate with others, if needed, to gather insights or share responsibilities. Monitor progress regularly and adjust the plan as necessary to achieve the desired outcome.",
    ],
  },
  {
    profession: "others",
    level: "intermediate",
    duration: "long",
    text: [
      "When managing a large project, it is crucial to establish clear communication channels among team members to ensure everyone is aligned with the project's goals and timelines. Consider the importance of feedback loops in project management, where regular check-ins can help identify potential roadblocks early on and allow for timely adjustments to the plan. This proactive approach can significantly enhance the likelihood of project success.",
    ],
  },
  {
    profession: "others",
    level: "advanced",
    duration: "short",
    text: [
      "Create a detailed project proposal that outlines the objectives, scope, and deliverables. Include a risk assessment and mitigation strategies to address potential challenges. This proposal will serve as a guiding document throughout the project lifecycle.",
    ],
  },
  {
    profession: "others",
    level: "advanced",
    duration: "long",
    text: [
      "Conduct a thorough analysis of the project's impact on stakeholders. Gather feedback from team members and clients to refine the project plan. Use this feedback to make informed decisions and adjustments, ensuring that the project aligns with stakeholder expectations and delivers value.",
    ],
  },

  // Programmer
  {
    profession: "programmer",
    level: "beginner",
    duration: "short",
    text: [
      'function greet(name) { console.log("Hello, " + name + "!"); } This simple function takes a name as an argument and prints a greeting message to the console. It demonstrates the basic structure of a function in JavaScript, including the use of parameters and the console.log method for output.',
    ],
  },
  {
    profession: "programmer",
    level: "beginner",
    duration: "long",
    text: [
      "const sum = (a, b) => a + b; const nums = [1, 2, 3]; console.log(nums.map(sum)); This code snippet demonstrates the use of arrow functions and the map method in JavaScript. The sum function takes two parameters and returns their sum. The nums array contains a list of numbers, and the map method applies the sum function to each element in the array, effectively doubling each number.",
    ],
  },
  {
    profession: "programmer",
    level: "intermediate",
    duration: "short",
    text: [
      "class Stack { constructor() { this.items = []; } push(element) { this.items.push(element); } pop() { if (this.items.length) return this.items.pop(); else return null; } } This code defines a Stack class that implements a basic stack data structure.",
    ],
  },
  {
    profession: "programmer",
    level: "intermediate",
    duration: "long",
    text: [
      "const myStack = new Stack(); myStack.push(10); myStack.push(20); console.log(myStack.pop()); This example demonstrates how to create an instance of the Stack class, add elements to it, and retrieve the last added element. Understanding data structures like stacks is crucial for efficient algorithm design and problem-solving in programming.",
    ],
  },
  {
    profession: "programmer",
    level: "advanced",
    duration: "short",
    text: [
      "function quickSort(arr) { if (arr.length <= 1) return arr; const pivot = arr[arr.length - 1]; const left = arr.slice(0, -1).filter(x => x < pivot); const right = arr.slice(0, -1).filter(x => x >= pivot); return [...quickSort(left), pivot, ...quickSort(right)]; } This function implements the quicksort algorithm.",
    ],
  },
  {
    profession: "programmer",
    level: "advanced",
    duration: "long",
    text: [
      "const fibonacci = (n) => { if (n <= 1) return n; return fibonacci(n - 1) + fibonacci(n - 2); }; console.log(fibonacci(6)); This code defines a recursive function to calculate Fibonacci numbers, illustrating the concept of recursion in programming.",
    ],
  },

  // Technical Writer
  {
    profession: "technicalWriter",
    level: "beginner",
    duration: "short",
    text: [
      "Draft a one-paragraph introduction to explain an application’s main feature. This introduction should clearly articulate the purpose of the application and highlight its key functionalities.",
    ],
  },
  {
    profession: "technicalWriter",
    level: "beginner",
    duration: "long",
    text: [
      "Aim to provide enough context for the reader to understand what the application does and how it can benefit them. A well-crafted introduction sets the tone for the rest of the documentation and engages the reader's interest.",
    ],
  },
  {
    profession: "technicalWriter",
    level: "intermediate",
    duration: "short",
    text: [
      "Write step-by-step instructions for installing and configuring software on Windows and Mac. Ensure that the instructions are clear and concise, using bullet points or numbered lists for easy readability.",
    ],
  },
  {
    profession: "technicalWriter",
    level: "intermediate",
    duration: "long",
    text: [
      "Include screenshots where necessary to illustrate key steps in the installation process. Additionally, provide troubleshooting tips for common issues that users may encounter during installation.",
    ],
  },
  {
    profession: "technicalWriter",
    level: "advanced",
    duration: "short",
    text: [
      "Create a comprehensive API documentation guide. Include an overview of the API's functionality, sample request and response payloads, and detailed error handling with examples.",
    ],
  },
  {
    profession: "technicalWriter",
    level: "advanced",
    duration: "long",
    text: [
      "This documentation should serve as a complete reference for developers who will be integrating with the API. Clear and thorough documentation is essential for ensuring that users can effectively utilize the API and understand its capabilities.",
    ],
  },

  // Designer
  {
    profession: "designer",
    level: "beginner",
    duration: "short",
    text: [
      "Design a simple login screen with fields for username and password. The design should be user-friendly and visually appealing, ensuring that users can easily understand how to input their credentials.",
    ],
  },
  {
    profession: "designer",
    level: "beginner",
    duration: "long",
    text: [
      "Consider the placement of elements, color schemes, and typography to create an inviting interface. A well-designed login screen is crucial for providing a positive first impression of the application.",
    ],
  },
  {
    profession: "designer",
    level: "intermediate",
    duration: "short",
    text: [
      "Create a mockup for an e-commerce product page with a focus on accessibility and responsiveness. The design should include product images, descriptions, pricing, and an add-to-cart button.",
    ],
  },
  {
    profession: "designer",
    level: "intermediate",
    duration: "long",
    text: [
      "Ensure that the layout adapts well to different screen sizes and is easy to navigate. Accessibility features, such as alt text for images and keyboard navigation, should also be incorporated to ensure that all users can interact with the page effectively.",
    ],
  },
  {
    profession: "designer",
    level: "advanced",
    duration: "short",
    text: [
      "Design a full prototype for a mobile application. Include the home screen layout, user onboarding experience with animations, and interactive navigation between screens.",
    ],
  },
  {
    profession: "designer",
    level: "advanced",
    duration: "long",
    text: [
      "This prototype should provide a comprehensive view of the application's user interface and user experience. Pay attention to the flow of interactions and ensure that the design is intuitive and engaging.",
    ],
  },

  // Data Scientist
  {
    profession: "dataScientist",
    level: "beginner",
    duration: "short",
    text: [
      "Calculate the average and standard deviation of a small dataset manually. This exercise will help you understand the basic concepts of descriptive statistics and how to interpret these metrics.",
    ],
  },
  {
    profession: "dataScientist",
    level: "beginner",
    duration: "long",
    text: [
      "Knowing how to compute these values is essential for analyzing data and drawing meaningful conclusions from it. Practice with different datasets to reinforce your understanding of these statistical measures.",
    ],
  },
  {
    profession: "dataScientist",
    level: "intermediate",
    duration: "short",
    text: [
      "Create a scatter plot in Python using Matplotlib to visualize the correlation between two variables. This visualization will help you identify patterns and relationships in the data.",
    ],
  },
  {
    profession: "dataScientist",
    level: "intermediate",
    duration: "long",
    text: [
      "Ensure that you label the axes clearly and provide a legend if necessary. Visualizing data is a crucial step in exploratory data analysis, as it allows you to gain insights and communicate findings effectively.",
    ],
  },
  {
    profession: "dataScientist",
    level: "advanced",
    duration: "short",
    text: [
      "Write a Python script to load a large dataset using pandas. Clean the data by handling missing values and outliers.",
    ],
  },
  {
    profession: "dataScientist",
    level: "advanced",
    duration: "long",
    text: [
      "Perform exploratory data analysis (EDA) with visualizations, such as histograms and box plots. Build a predictive model using scikit-learn and evaluate its performance.",
    ],
  },

  // Product Manager
  {
    profession: "productManager",
    level: "beginner",
    duration: "short",
    text: [
      "Draft a simple user story for a new feature: 'As a user, I want to reset my password.' This user story should clearly articulate the user's need and the value it provides.",
    ],
  },
  {
    profession: "productManager",
    level: "beginner",
    duration: "long",
    text: [
      "Writing effective user stories is a key skill for product managers, as it helps to ensure that the development team understands the requirements and can deliver features that meet user expectations.",
    ],
  },
  {
    profession: "productManager",
    level: "intermediate",
    duration: "short",
    text: [
      "Create a prioritized feature list for the next quarter, with a brief justification for each priority. This list should take into account user feedback, market trends, and business goals.",
    ],
  },
  {
    profession: "productManager",
    level: "intermediate",
    duration: "long",
    text: [
      "Prioritization is crucial for effective product management, as it helps to focus resources on the most impactful features. Consider using frameworks like MoSCoW or RICE to guide your prioritization process.",
    ],
  },
  {
    profession: "productManager",
    level: "advanced",
    duration: "short",
    text: [
      "Facilitate a workshop to identify customer pain points using data-driven insights. Define the problem scope and success metrics.",
    ],
  },
  {
    profession: "productManager",
    level: "advanced",
    duration: "long",
    text: [
      "Collaborate with stakeholders to align on a product roadmap. Present a high-level plan to leadership for feedback and approval.",
    ],
  },

  // Additional Professions
  // Marketing Specialist
  {
    profession: "marketingSpecialist",
    level: "beginner",
    duration: "short",
    text: [
      "Write a catchy tagline for a new product launch. A good tagline should be memorable and encapsulate the essence of the product.",
    ],
  },
  {
    profession: "marketingSpecialist",
    level: "beginner",
    duration: "long",
    text: [
      "It serves as a key element in marketing campaigns, helping to attract attention and generate interest among potential customers. Consider the target audience and the unique selling proposition of the product when crafting your tagline.",
    ],
  },
  {
    profession: "marketingSpecialist",
    level: "intermediate",
    duration: "short",
    text: [
      "Develop a social media strategy for promoting a new service, including target audience and key messages. This strategy should outline the platforms to be used, the type of content to be created, and the frequency of posts.",
    ],
  },
  {
    profession: "marketingSpecialist",
    level: "intermediate",
    duration: "long",
    text: [
      "A well-defined social media strategy is essential for maximizing engagement and reaching potential customers effectively. Consider incorporating analytics to measure the success of your campaigns and adjust your strategy accordingly.",
    ],
  },
  {
    profession: "marketingSpecialist",
    level: "advanced",
    duration: "short",
    text: [
      "Create a comprehensive marketing plan that includes market analysis and target audience identification. Outline the marketing channels and tactics to be used.",
    ],
  },
  {
    profession: "marketingSpecialist",
    level: "advanced",
    duration: "long",
    text: [
      "Define metrics for measuring success and adjustments to be made based on performance. This plan should serve as a roadmap for your marketing efforts, ensuring that all activities are aligned with business objectives.",
    ],
  },
];
