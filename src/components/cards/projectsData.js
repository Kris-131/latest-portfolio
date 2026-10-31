// Single source of truth for the Projects carousel.
// Order matters: 7 personal projects first, then the 3 internship projects.
// `details` is optional, project-specific content rendered under the key features.

export const projects = [
  {
    id: 'prompt-man',
    title: 'Prompt-Man',
    category: 'AI PLATFORM',
    internship: false,
    description:
      'An AI-powered prompt engineering platform that transforms visual references and raw ideas into structured, optimized, and reusable prompts for different AI workflows. It supports reverse prompt engineering, raw idea-to-master-prompt generation, and prompt customization.',
    technologies: ['React', 'FastAPI', 'Python', 'OpenRouter API', 'Prompt Engineering', 'AI Integration'],
    features: [
      'Reverse Prompt Engineering',
      'Image-to-Prompt Generation',
      'Raw Idea-to-Master-Prompt Generation',
      'Prompt Customization',
      'Structured AI Workflow Prompts'
    ]
  },
  {
    id: 'whatsapp-automation',
    title: 'WhatsApp Automation',
    category: 'AI AUTOMATION',
    internship: false,
    description:
      'An AI-powered WhatsApp Business automation system designed to automate customer communication and business interactions. It integrates an AI agent with business knowledge retrieval to provide context-aware responses to customer queries.',
    technologies: ['Python', 'FastAPI', 'LangGraph', 'ChromaDB', 'WhatsApp Business API', 'RAG', 'Webhooks'],
    features: [
      'Automated WhatsApp Responses',
      'AI-Powered Customer Support',
      'Business Knowledge Retrieval',
      'Context-Aware Conversations',
      'Webhook Integration'
    ]
  },
  {
    id: 'text-to-video',
    title: 'Text-to-Video Generation Tool',
    category: 'GENERATIVE AI',
    internship: false,
    description:
      'An AI-based text-to-video generation project designed to transform textual descriptions into video-generation workflows. The system focuses on converting user ideas into structured prompts that can be used by generative video models.',
    technologies: ['Python', 'FastAPI', 'React', 'Generative AI', 'Prompt Engineering', 'AI Model Integration'],
    features: [
      'Text-Based Video Generation Workflow',
      'Prompt Processing',
      'Structured Video Descriptions',
      'AI Model Integration',
      'User Input Management'
    ]
  },
  {
    id: 'module-designer',
    title: 'Module Designer',
    category: 'AI / ML SYSTEMS',
    internship: false,
    description:
      'An intelligent project planning and resource analysis system that combines three AI-powered modules: Phase Breaker, Sub-Phase Breaker, and Skill Predictor. It helps transform project requirements into structured phases and sub-phases while identifying the skills required for project execution.',
    technologies: ['Python', 'Machine Learning', 'NLP', 'PyTorch', 'BGE Embeddings', 'FastAPI', 'AI Classification'],
    features: [
      'Automated Project Phase Prediction',
      'Sub-Phase Classification',
      'Skill Prediction',
      'NLP-Based Text Analysis',
      'AI-Powered Project Structuring'
    ],
    details: {
      label: 'Integrated Modules',
      items: [
        { key: 'A', name: 'Phase Breaker', text: 'predicts project phases from project and task text with a trained NLP classifier' },
        { key: 'B', name: 'Sub-Phase Breaker', text: 'predicts detailed sub-phases within each project phase' },
        { key: 'C', name: 'Skill Predictor', text: 'identifies the technical skills a project and its tasks require' }
      ]
    }
  },
  {
    id: 'database-management',
    title: 'Database Management System',
    category: 'DATABASE MANAGEMENT',
    internship: false,
    description:
      'A database management project focused on organizing, storing, retrieving, and managing structured application data. It emphasizes database architecture, efficient data handling, and backend integration for reliable application workflows.',
    technologies: ['SQL', 'PostgreSQL', 'Database Design', 'Database Management', 'Backend Integration'],
    features: [
      'Structured Data Management',
      'Database Schema Design',
      'Data Storage and Retrieval',
      'Query Management',
      'Backend Database Integration'
    ]
  },
  {
    id: 'traffic-management',
    title: 'Traffic Management System',
    category: 'INTELLIGENT SYSTEM',
    internship: false,
    description:
      'An intelligent traffic management project focused on improving traffic monitoring and management through data-driven approaches. The project explores the use of technology and intelligent processing to support better traffic analysis and coordination.',
    technologies: ['Python', 'Machine Learning', 'Data Processing', 'AI Integration'],
    features: [
      'Traffic Data Analysis',
      'Intelligent Traffic Monitoring',
      'Data-Driven Management',
      'Traffic Information Processing'
    ]
  },
  {
    id: 'text-to-3d',
    title: 'Text-to-3D Model Generation',
    category: '3D GENERATIVE AI',
    internship: false,
    description:
      'An AI-based text-to-3D generation project that explores converting natural language descriptions into structured instructions for generating three-dimensional objects. It focuses on connecting prompt engineering with AI-powered 3D generation workflows.',
    technologies: ['Python', 'Generative AI', 'Prompt Engineering', '3D Modeling', 'AI Model Integration'],
    features: [
      'Text-Based 3D Generation Workflow',
      'Natural Language Processing',
      '3D Object Descriptions',
      'AI Prompt Processing',
      'Generative 3D Integration'
    ]
  },
  {
    id: 'skill-matching-engine',
    title: 'Skill-Matching Engine',
    category: 'AI RESOURCE MANAGEMENT',
    internship: true,
    description:
      'An intelligent employee-to-task matching and resource balancing engine designed to recommend suitable employees for project tasks. It combines semantic skill matching with employee availability and workload analysis to generate optimized resource allocation recommendations.',
    technologies: ['React', 'FastAPI', 'Python', 'Supabase', 'BGE Embeddings', 'XGBoost Ranker', 'Machine Learning'],
    features: [
      'Employee Skill Matching',
      'Task-to-Employee Recommendations',
      'Resource Balancing',
      'Workload Calculation',
      'Employee Availability Analysis',
      'Intelligent Task Allocation'
    ],
    details: {
      label: 'System Logic',
      items: [
        { key: '70%', name: 'Skill matching', text: 'share of the final score' },
        { key: '30%', name: 'Resource balancing', text: 'share of the final score' },
        { key: '=', name: 'Balance score', text: '50% availability + 50% inverse workload' },
        { key: '=', name: 'Workload', text: '30% active-task load + 70% hour utilization' }
      ]
    }
  },
  {
    id: 'we3vision-chatbot',
    title: 'We3Vision AI Chatbot',
    category: 'AI CHATBOT',
    internship: true,
    description:
      'An AI-powered company knowledge assistant designed to answer business-related questions using company-specific information. The system uses retrieval-based AI workflows to provide relevant answers and supports structured data operations, including Excel export.',
    technologies: ['Python', 'LangGraph', 'FastAPI', 'RAG', 'LLM Integration', 'Excel Integration'],
    features: [
      'Company Knowledge Assistant',
      'AI-Powered Question Answering',
      'Context-Aware Responses',
      'Retrieval-Augmented Generation',
      'Excel Data Export',
      'Business Information Retrieval'
    ]
  },
  {
    id: 'admin-panel',
    title: 'Admin Panel',
    category: 'ADMIN DASHBOARD',
    internship: true,
    description:
      'An administrative management system designed to provide authentication, API-key management, and monitoring of API credit usage. It focuses on helping administrators manage API credentials and identify exhausted API credits through notification workflows.',
    technologies: ['React', 'FastAPI', 'Python', 'REST APIs', 'API Integration', 'Nodemailer'],
    features: [
      'Admin Authentication',
      'API-Key Management',
      'API Credit Monitoring',
      'API Credit Exhaustion Alerts',
      'Email Notifications',
      'Administrative Dashboard'
    ]
  }
];

export default projects;
