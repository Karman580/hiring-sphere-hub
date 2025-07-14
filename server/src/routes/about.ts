import express from 'express';

const router = express.Router();

// Get about us information
router.get('/', (req, res) => {
  try {
    const aboutInfo = {
      company: {
        name: "JobPortal",
        tagline: "Connecting talent with opportunities",
        description: "JobPortal is a leading job search platform that connects talented professionals with their dream careers. We believe that finding the right job should be simple, efficient, and rewarding for both job seekers and employers.",
        founded: "2024",
        headquarters: "San Francisco, CA"
      },
      mission: "To revolutionize the way people find jobs and companies find talent by creating meaningful connections through innovative technology and personalized experiences.",
      vision: "To become the world's most trusted platform for career advancement and talent acquisition.",
      values: [
        {
          title: "Innovation",
          description: "We continuously evolve our platform with cutting-edge technology to provide the best user experience."
        },
        {
          title: "Transparency",
          description: "We believe in honest communication and transparent processes for all our users."
        },
        {
          title: "Diversity & Inclusion",
          description: "We promote equal opportunities and celebrate diversity in all its forms."
        },
        {
          title: "Excellence",
          description: "We strive for excellence in everything we do, from our platform to our customer service."
        }
      ],
      team: [
        {
          name: "Sarah Johnson",
          position: "CEO & Founder",
          bio: "Sarah has over 15 years of experience in HR technology and is passionate about connecting people with their dream careers.",
          image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400"
        },
        {
          name: "Michael Chen",
          position: "CTO",
          bio: "Michael leads our technical team with expertise in scalable web applications and machine learning.",
          image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400"
        },
        {
          name: "Emily Rodriguez",
          position: "Head of Product",
          bio: "Emily focuses on creating intuitive user experiences that make job searching and hiring seamless.",
          image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400"
        },
        {
          name: "David Kim",
          position: "Head of Marketing",
          bio: "David drives our growth strategy and helps connect our platform with job seekers and employers worldwide.",
          image: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400"
        }
      ],
      stats: {
        jobsPosted: "10,000+",
        companiesRegistered: "2,500+",
        successfulPlacements: "15,000+",
        activeUsers: "50,000+"
      },
      features: [
        {
          title: "Smart Job Matching",
          description: "Our AI-powered algorithm matches candidates with the most relevant job opportunities based on their skills, experience, and preferences."
        },
        {
          title: "Company Insights",
          description: "Get detailed information about companies, including culture, benefits, and employee reviews to make informed decisions."
        },
        {
          title: "Application Tracking",
          description: "Track your job applications in real-time and receive updates on your application status."
        },
        {
          title: "Career Resources",
          description: "Access resume builders, interview tips, salary guides, and career advice from industry experts."
        },
        {
          title: "Employer Tools",
          description: "Comprehensive hiring tools for employers including applicant tracking, candidate screening, and analytics."
        },
        {
          title: "Mobile Experience",
          description: "Search and apply for jobs on-the-go with our fully responsive mobile platform."
        }
      ],
      contact: {
        email: "hello@jobportal.com",
        phone: "+1 (555) 123-4567",
        address: "123 Innovation Drive, San Francisco, CA 94105",
        socialMedia: {
          linkedin: "https://linkedin.com/company/jobportal",
          twitter: "https://twitter.com/jobportal",
          facebook: "https://facebook.com/jobportal"
        }
      }
    };

    res.json(aboutInfo);
  } catch (error) {
    console.error('Error fetching about information:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get company statistics
router.get('/stats', (req, res) => {
  try {
    const stats = {
      jobsPosted: "10,000+",
      companiesRegistered: "2,500+",
      successfulPlacements: "15,000+",
      activeUsers: "50,000+",
      averageTimeToHire: "14 days",
      satisfactionRate: "96%"
    };

    res.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get team information
router.get('/team', (req, res) => {
  try {
    const team = [
      {
        id: "1",
        name: "Sarah Johnson",
        position: "CEO & Founder",
        bio: "Sarah has over 15 years of experience in HR technology and is passionate about connecting people with their dream careers. She previously worked at leading tech companies and holds an MBA from Stanford.",
        image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
        linkedin: "https://linkedin.com/in/sarahjohnson",
        email: "sarah@jobportal.com"
      },
      {
        id: "2",
        name: "Michael Chen",
        position: "CTO",
        bio: "Michael leads our technical team with expertise in scalable web applications and machine learning. He has a PhD in Computer Science and has built systems serving millions of users.",
        image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
        linkedin: "https://linkedin.com/in/michaelchen",
        email: "michael@jobportal.com"
      },
      {
        id: "3",
        name: "Emily Rodriguez",
        position: "Head of Product",
        bio: "Emily focuses on creating intuitive user experiences that make job searching and hiring seamless. She has a background in UX design and product management at Fortune 500 companies.",
        image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
        linkedin: "https://linkedin.com/in/emilyrodriguez",
        email: "emily@jobportal.com"
      },
      {
        id: "4",
        name: "David Kim",
        position: "Head of Marketing",
        bio: "David drives our growth strategy and helps connect our platform with job seekers and employers worldwide. He has extensive experience in digital marketing and brand building.",
        image: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400",
        linkedin: "https://linkedin.com/in/davidkim",
        email: "david@jobportal.com"
      }
    ];

    res.json({ team });
  } catch (error) {
    console.error('Error fetching team information:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;