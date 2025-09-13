const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function seedData() {
  try {
    console.log('🌱 Starting to seed data...');
    console.log('📡 Connecting to database...');

    // Test database connection first
    await prisma.$connect();
    console.log('✅ Database connection successful');

    // Check if data already exists
    const existingUsers = await prisma.user.count();
    const existingStartups = await prisma.startup.count();
    console.log(`📊 Current database state: ${existingUsers} users, ${existingStartups} startups`);

    // Create properly hashed passwords
    const hashedPassword123 = await bcrypt.hash('password123', 10);
    const hashedPassword456 = await bcrypt.hash('password456', 10);
    const hashedPassword789 = await bcrypt.hash('password789', 10);
    const hashedPassword101 = await bcrypt.hash('password101', 10);
    const hashedPassword202 = await bcrypt.hash('password202', 10);

    // Create dummy users with hashed passwords
    const users = [
      {
        id: 'user1',
        name: 'John Doe',
        email: 'john@example.com',
        username: 'johndoe',
        password: hashedPassword123, // password: password123
        bio: 'Serial entrepreneur and tech enthusiast',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
      },
      {
        id: 'user2',
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        username: 'sarahj',
        password: hashedPassword456, // password: password456
        bio: 'AI researcher turned startup founder',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face'
      },
      {
        id: 'user3',
        name: 'Mike Chen',
        email: 'mike@example.com',
        username: 'mikechen',
        password: hashedPassword789, // password: password789
        bio: 'Former Google engineer, now building the future',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
      },
      {
        id: 'user4',
        name: 'Emily Davis',
        email: 'emily@example.com',
        username: 'emilyd',
        password: hashedPassword101, // password: password101
        bio: 'Product designer with 10+ years experience',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face'
      },
      {
        id: 'user5',
        name: 'Alex Rodriguez',
        email: 'alex@example.com',
        username: 'alexr',
        password: hashedPassword202, // password: password202
        bio: 'Fintech expert and blockchain enthusiast',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face'
      }
    ];

    // Insert users with individual error handling
    let usersCreated = 0;
    console.log('👤 Creating users...');
    for (const user of users) {
      try {
        await prisma.user.create({ data: user });
        console.log(`  ✅ Created user: ${user.name} (${user.email})`);
        usersCreated++;
      } catch (error) {
        if (error.code === 'P2002') {
          console.log(`  ⚠️  User ${user.name} already exists, skipping...`);
        } else {
          console.error(`  ❌ Failed to create user ${user.name}:`, error.message);
          throw error;
        }
      }
    }

    // Create startup data with markdown formatting that matches our convertMarkdownToHTML function
    const startups = [
      {
        title: 'EcoTrack',
        description: 'AI-powered carbon footprint tracking for businesses',
        category: 'Climate',
        imageLink: 'https://images.unsplash.com/photo-1569163139394-de4e4f43e4e0?w=400&h=300&fit=crop',
        pitch: `**The Problem**
Climate change is accelerating, and businesses need better tools to track and reduce their carbon footprint. Most companies struggle with manual data collection and lack real-time insights.

**Our Solution**
EcoTrack helps companies automatically track and reduce their carbon footprint using AI and IoT sensors. We make sustainability easy and measurable.

**Key Features**
- Real-time carbon footprint monitoring
- AI-powered emissions prediction
- Automated reporting for compliance
- Integration with existing business systems
- Cost-saving recommendations

**Market Opportunity**
The global carbon management software market is expected to reach **$15.8 billion by 2027**, growing at 12% annually.

**Why Now**
- New regulations requiring carbon reporting
- Increasing consumer demand for sustainable products
- Corporate ESG commitments driving adoption

**Traction**
We have **15 enterprise customers** including Fortune 500 companies, with **$200K ARR** and growing 20% month-over-month.`,
        views: 245,
        authorId: 'user1'
      },
      {
        title: 'MindfulAI',
        description: 'Mental health companion powered by conversational AI',
        category: 'Healthcare',
        imageLink: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
        pitch: `**The Mental Health Crisis**
Mental health issues affect **1 in 4 people** globally, but access to professional help is limited by cost, availability, and stigma.

**Our Solution**
MindfulAI provides 24/7 mental health support through an empathetic AI companion. Our platform offers personalized therapy sessions and mood tracking.

**Core Features**
- Conversational AI trained on therapeutic techniques
- Personalized coping strategies
- Mood tracking and analytics
- Crisis intervention protocols
- Integration with human therapists

**Competitive Advantage**
- Advanced NLP understanding emotional context
- **HIPAA-compliant** infrastructure
- Evidence-based therapeutic approaches
- Seamless handoff to human professionals

**Market Size**
The digital mental health market is **$5.6 billion** and expected to reach **$26 billion by 2030**.

**Progress**
- **50,000 active users** in beta
- **85% user retention** rate
- Partnership with 3 major healthcare systems
- FDA breakthrough device designation pending`,
        views: 189,
        authorId: 'user2'
      },
      {
        title: 'CodeMentor Pro',
        description: 'AI-powered coding mentor for developers',
        category: 'Education',
        imageLink: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=300&fit=crop',
        pitch: `**The Developer Education Gap**
**70% of developers** are self-taught, but learning to code effectively requires personalized guidance that traditional resources can't provide.

**Our Innovation**
CodeMentor Pro uses advanced AI to provide personalized coding tutorials and real-time debugging assistance for developers of all levels.

**What We Offer**
- Personalized learning paths based on skill level
- Real-time code review and suggestions
- Interactive debugging assistance
- Project-based learning modules
- Progress tracking and skill assessment

**Technology Edge**
- Large language model trained on **10 million** code repositories
- Real-time static analysis integration
- **Multi-language support** for 15+ programming languages
- Adaptive difficulty based on user progress

**Market Opportunity**
The coding education market is valued at **$13.6 billion** with 27% annual growth driven by tech job demand.

**Current Metrics**
- **25,000 developers** using our platform
- **40% improvement** in coding proficiency scores
- **$150K MRR** with 95% customer satisfaction`,
        views: 312,
        authorId: 'user3'
      },
      {
        title: 'FoodWaste Zero',
        description: 'Smart inventory management to reduce food waste',
        category: 'Food',
        imageLink: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop',
        pitch: `**The Food Waste Crisis**
**40% of food** produced globally is wasted, costing businesses billions and contributing significantly to climate change.

**Our Solution**
FoodWaste Zero helps restaurants and grocery stores predict demand and optimize inventory to reduce food waste by up to **40%**.

**How It Works**
- AI-powered demand forecasting
- Real-time inventory tracking
- Automated ordering recommendations
- Waste analytics and reporting
- Dynamic pricing for perishables

**Key Benefits**
- Reduce food waste by **30-40%**
- Increase profit margins by **15-25%**
- Improve sustainability metrics
- Streamline operations
- Reduce labor costs

**Market Impact**
Food waste costs the global economy **$1 trillion annually**. Our addressable market is **$45 billion** in the US alone.

**Success Stories**
- Partner restaurants reduced waste by **35% average**
- **$2.3 million** in cost savings generated for clients
- **150+ locations** across 12 cities
- **$500K ARR** with 18-month customer contracts`,
        views: 156,
        authorId: 'user4'
      },
      {
        title: 'CryptoSecure',
        description: 'Advanced security solutions for DeFi protocols',
        category: 'Fintech',
        imageLink: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop',
        pitch: `**The DeFi Security Problem**
**$3.8 billion** was lost to DeFi hacks in 2022 alone. Current security solutions are reactive, not preventive.

**Our Solution**
CryptoSecure provides automated smart contract auditing and real-time threat detection for DeFi protocols and crypto exchanges.

**Security Suite**
- Automated smart contract vulnerability scanning
- Real-time transaction monitoring
- AI-powered threat detection
- Compliance reporting tools
- Emergency response protocols

**Technical Innovation**
- **Static and dynamic analysis** of smart contracts
- Machine learning models trained on exploit patterns
- **Sub-second threat detection** capabilities
- Integration with major blockchain networks
- **99.9% uptime** SLA

**Market Demand**
The blockchain security market is **$1.8 billion** and growing 15% annually as DeFi adoption accelerates.

**Customer Validation**
- **25 DeFi protocols** as active customers
- Prevented **$50+ million** in potential losses
- **$1.2M ARR** with enterprise contracts
- Partnership with top 3 crypto exchanges`,
        views: 421,
        authorId: 'user5'
      },
      {
        title: 'VirtualOffice 3D',
        description: 'Immersive virtual workspaces for remote teams',
        category: 'SaaS',
        imageLink: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=400&h=300&fit=crop',
        pitch: `**The Remote Work Challenge**
**42% of workers** are now fully remote, but current tools like Zoom create meeting fatigue and lack spatial presence.

**Our Vision**
VirtualOffice 3D creates immersive virtual workspaces that make remote collaboration feel natural and engaging using VR/AR technology.

**Platform Features**
- Photorealistic 3D office environments
- Spatial audio for natural conversations
- Virtual whiteboards and collaboration tools
- Cross-platform compatibility **VR/AR/Desktop**
- Customizable office layouts

**Competitive Advantages**
- **Low-latency networking** for seamless interaction
- AI-powered gesture recognition
- Enterprise-grade security and privacy
- Integration with existing productivity tools
- **50% reduction** in meeting fatigue reported by users

**Market Timing**
The virtual collaboration market is **$6.1 billion** and expected to reach **$16.2 billion by 2028**.

**Growth Metrics**
- **5,000 companies** in pilot programs
- **85% user engagement** improvement vs traditional video calls
- **$300K ARR** with Fortune 100 customers
- **Series A funding** of $5M closed`,
        views: 298,
        authorId: 'user1'
      },
      {
        title: 'AgriDrone',
        description: 'Autonomous drones for precision agriculture',
        category: 'Agriculture',
        imageLink: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=300&fit=crop',
        pitch: `**Agriculture's Efficiency Problem**
Traditional farming methods waste **20-30%** of water and fertilizer, while manual crop monitoring is time-intensive and imprecise.

**Our Technology**
AgriDrone uses AI-powered autonomous drones to monitor crop health, optimize irrigation, and increase farm productivity by **30%**.

**Drone Capabilities**
- Multispectral imaging for crop health analysis
- Automated flight planning and execution
- Real-time data processing and alerts
- Weather-resistant hardware design
- **12-hour flight time** with quick charging

**Farmer Benefits**
- Reduce water usage by **25%**
- Optimize fertilizer application
- Early disease and pest detection
- Yield prediction and planning
- **ROI of 300%** within first year

**Market Opportunity**
Precision agriculture technology market is **$8.5 billion** growing at 12% annually as farms adopt smart technology.

**Commercial Success**
- **200+ farms** using our drones across 5 states
- **Average 28% yield increase** for customers
- **$800K revenue** in Year 1
- Partnership with John Deere for distribution`,
        views: 167,
        authorId: 'user2'
      },
      {
        title: 'SmartHome Hub',
        description: 'Universal IoT platform for smart homes',
        category: 'Hardware',
        imageLink: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
        pitch: `**The Smart Home Fragmentation Problem**
Average households have **12+ connected devices** from different brands that don't work together, creating a frustrating user experience.

**Our Solution**
SmartHome Hub connects all your IoT devices through one universal platform, making home automation simple and secure.

**Hub Features**
- **Universal compatibility** with 200+ device types
- Local processing for privacy and speed
- AI-powered automation routines
- Voice control and mobile app
- Enterprise-grade security

**Technical Specifications**
- Supports **WiFi, Zigbee, Z-Wave, Matter** protocols
- **Edge computing** capabilities
- **Military-grade encryption** for all communications
- **99.9% uptime** with automatic updates
- **Plug-and-play** setup in under 5 minutes

**Market Position**
Smart home market is **$80 billion** growing 25% annually, but fragmentation creates opportunity for universal solutions.

**Business Traction**
- **15,000 units** sold in pre-order campaign
- **4.8/5 star rating** from early adopters
- Distribution partnerships with Best Buy and Amazon
- **$2.1M pre-revenue** funding raised`,
        views: 234,
        authorId: 'user3'
      },
      {
        title: 'EduVR',
        description: 'Virtual reality learning experiences for students',
        category: 'Education',
        imageLink: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=400&h=300&fit=crop',
        pitch: `**The Engagement Crisis in Education**
**65% of students** report being disengaged in traditional classrooms, and complex subjects like science and history are particularly challenging to teach effectively.

**Our Innovation**
EduVR creates immersive virtual reality learning experiences that make complex subjects engaging and easy to understand.

**Learning Experiences**
- Virtual field trips to historical sites
- 3D molecular and cellular biology
- Interactive physics simulations
- **Collaborative virtual classrooms**
- Adaptive learning pathways

**Educational Impact**
- **40% improvement** in test scores vs traditional methods
- **85% student engagement** rates
- **60% reduction** in learning time for complex concepts
- Supports students with different learning styles
- **Measurable retention** improvement

**Market Opportunity**
EdTech market is **$89 billion** with VR education growing **15% annually** as schools modernize.

**Adoption Metrics**
- **500+ schools** piloting our platform
- **75,000 students** have used EduVR
- **$1.5M contract** with California school district
- **Partnership** with Microsoft Education`,
        views: 378,
        authorId: 'user4'
      },
      {
        title: 'GreenEnergy AI',
        description: 'AI optimization for renewable energy systems',
        category: 'Climate',
        imageLink: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=400&h=300&fit=crop',
        pitch: `**Renewable Energy Inefficiency**
Solar and wind farms operate at only **25-35%** efficiency due to unpredictable weather patterns and suboptimal energy distribution.

**Our AI Solution**
GreenEnergy AI optimizes renewable energy systems using machine learning to maximize efficiency and reduce costs for clean energy providers.

**Optimization Engine**
- Weather prediction and energy forecasting
- Real-time grid balancing algorithms
- Predictive maintenance scheduling
- **Dynamic pricing optimization**
- Energy storage management

**Performance Results**
- **25% increase** in energy output efficiency
- **$500K annual savings** per installation
- **95% uptime** with predictive maintenance
- **20% reduction** in operational costs
- **Carbon footprint reduction** of 30%

**Market Dynamics**
Renewable energy software market is **$15.6 billion** growing 22% annually driven by climate commitments.

**Commercial Progress**
- **12 utility companies** as customers
- **$3.2M ARR** with multi-year contracts
- **Series B funding** of $25M led by Google Ventures
- Expansion to **European markets** planned`,
        views: 445,
        authorId: 'user5'
      }
    ];

    // Insert startups with individual error handling
    let startupsCreated = 0;
    console.log('🚀 Creating startups...');
    for (const startup of startups) {
      try {
        await prisma.startup.create({ data: startup });
        console.log(`  ✅ Created startup: ${startup.title}`);
        startupsCreated++;
      } catch (error) {
        if (error.code === 'P2002') {
          console.log(`  ⚠️  Startup ${startup.title} already exists, skipping...`);
        } else {
          console.error(`  ❌ Failed to create startup ${startup.title}:`, error.message);
          throw error;
        }
      }
    }

    // Final verification
    const finalUsers = await prisma.user.count();
    const finalStartups = await prisma.startup.count();

    console.log('\n🎉 Seeding completed successfully!');
    console.log('📊 Summary:');
    console.log(`  👤 Users: ${usersCreated} created, ${finalUsers} total in database`);
    console.log(`  🚀 Startups: ${startupsCreated} created, ${finalStartups} total in database`);
    console.log('\n🔑 Login credentials:');
    console.log('  john@example.com : password123');
    console.log('  sarah@example.com : password456');
    console.log('  mike@example.com : password789');
    console.log('  emily@example.com : password101');
    console.log('  alex@example.com : password202');
    console.log('\n✅ Your database is ready! Check your app now.');

    return {
      success: true,
      usersCreated,
      startupsCreated,
      totalUsers: finalUsers,
      totalStartups: finalStartups
    };

  } catch (error) {
    console.error('\n❌ SEEDING FAILED!');
    console.error('Error details:', error);
    
    if (error.code === 'P1001') {
      console.error('🔌 Database connection failed. Check your DATABASE_URL.');
    } else if (error.code === 'P2002') {
      console.error('🔄 Duplicate data detected. Some records already exist.');
    } else {
      console.error('💥 Unexpected error occurred.');
    }
    
    return {
      success: false,
      error: error.message
    };
  } finally {
    await prisma.$disconnect();
    console.log('🔌 Database connection closed.');
  }
}

// Run the function and handle the result
seedData().then((result) => {
  if (result.success) {
    console.log('\n🎯 Next steps:');
    console.log('1. Check your app homepage for startups');
    console.log('2. Test login with the credentials above');
    console.log('3. Try creating new startups');
    process.exit(0);
  } else {
    console.log('\n🚨 Seeding failed. Please check the errors above.');
    process.exit(1);
  }
}).catch((error) => {
  console.error('💥 Critical error:', error);
  process.exit(1);
});