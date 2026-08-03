// Initial Mock Data for Volunteer Disaster Relief System

export const initialDisasters = [
  {
    id: 1,
    title: "Kerala Severe Flash Floods",
    description: "Heavy torrential rainfall resulting in rivers overflowing and flooding low-lying coastal areas.",
    location: "Wayanad, Kerala",
    severityLevel: "CRITICAL",
    status: "ACTIVE",
    reportedAt: "2026-08-01T09:30:00"
  },
  {
    id: 2,
    title: "Eastern Coastal Cyclone Storm",
    description: "Category 3 Cyclone approaching the eastern coast requiring urgent coastal evacuation.",
    location: "Visakhapatnam, Andhra Pradesh",
    severityLevel: "HIGH",
    status: "ACTIVE",
    reportedAt: "2026-08-02T14:15:00"
  },
  {
    id: 3,
    title: "Himalayan Foothill Landslide",
    description: "Landslide blocking critical connectivity highway and stranding mountain villagers.",
    location: "Chamoli, Uttarakhand",
    severityLevel: "MEDIUM",
    status: "UNDER_CONTROL",
    reportedAt: "2026-07-29T11:00:00"
  },
  {
    id: 4,
    title: "Western Ghats Forest Wildfire",
    description: "Dry season wildfire threatening wildlife sanctuary buffer zones and nearby settlements.",
    location: "Bandipur, Karnataka",
    severityLevel: "MEDIUM",
    status: "RESOLVED",
    reportedAt: "2026-07-20T16:45:00"
  }
];

export const initialVolunteers = [
  {
    id: 1,
    name: "Dr. Rajesh Sharma",
    email: "rajesh.sharma@reliefnet.org",
    phoneNumber: "+91 98765 43210",
    skills: "Medical Triage, Trauma Care",
    availabilityStatus: "AVAILABLE",
    location: "Kochi, Kerala",
    experienceYears: 7
  },
  {
    id: 2,
    name: "Priya Sundaram",
    email: "priya.s@disasterhelp.org",
    phoneNumber: "+91 98123 45678",
    skills: "Logistics, Emergency Supply Chain",
    availabilityStatus: "ON_TASK",
    location: "Chennai, Tamil Nadu",
    experienceYears: 4
  },
  {
    id: 3,
    name: "Amitabh Verma",
    email: "a.verma@rescueteam.in",
    phoneNumber: "+91 97654 32109",
    skills: "Search & Rescue, Drone Mapping",
    availabilityStatus: "AVAILABLE",
    location: "Dehradun, Uttarakhand",
    experienceYears: 5
  },
  {
    id: 4,
    name: "Ananya Deshmukh",
    email: "ananya.d@sheltercare.org",
    phoneNumber: "+91 99887 76655",
    skills: "Shelter Management, Counseling",
    availabilityStatus: "OFFLINE",
    location: "Mumbai, Maharashtra",
    experienceYears: 3
  }
];

export const initialShelters = [
  {
    id: 1,
    name: "Central St. Mary Relief Camp",
    location: "Kalpetta Town, Wayanad",
    capacity: 500,
    currentOccupancy: 340,
    contactNumber: "+91 4936 202100",
    status: "OPEN"
  },
  {
    id: 2,
    name: "Coastal Community Sports Complex",
    location: "Visakhapatnam Port District",
    capacity: 800,
    currentOccupancy: 120,
    contactNumber: "+91 891 2554321",
    status: "OPEN"
  },
  {
    id: 3,
    name: "Government High School Hall",
    location: "Joshimath, Uttarakhand",
    capacity: 250,
    currentOccupancy: 245,
    contactNumber: "+91 1389 222111",
    status: "FULL"
  },
  {
    id: 4,
    name: "Nilgiri Relief Transit Hub",
    location: "Ooty, Tamil Nadu",
    capacity: 300,
    currentOccupancy: 0,
    contactNumber: "+91 423 2445566",
    status: "STANDBY"
  }
];

export const initialDonations = [
  {
    id: 1,
    donorName: "Apex Tech Relief Foundation",
    donationType: "MONEY",
    amountOrQuantity: 500000,
    disasterId: 1,
    donatedAt: "2026-08-01T15:20:00"
  },
  {
    id: 2,
    donorName: "Green Cross Medical Supplies",
    donationType: "MEDICAL_KITS",
    amountOrQuantity: 1200,
    disasterId: 1,
    donatedAt: "2026-08-02T10:00:00"
  },
  {
    id: 3,
    donorName: "Rotary Club Visakhapatnam",
    donationType: "FOOD_PACKS",
    amountOrQuantity: 3500,
    disasterId: 2,
    donatedAt: "2026-08-03T08:45:00"
  },
  {
    id: 4,
    donorName: "Global Care Alliance",
    donationType: "MONEY",
    amountOrQuantity: 250000,
    disasterId: 3,
    donatedAt: "2026-07-30T12:30:00"
  }
];

export const initialTasks = [
  {
    id: 1,
    title: "Deploy Medical Triage Unit at Camp A",
    description: "Setup mobile diagnostic clinic and distribute basic trauma medicine kits.",
    status: "IN_PROGRESS",
    assignedVolunteerId: 1,
    disasterId: 1,
    createdAt: "2026-08-01T11:00:00"
  },
  {
    id: 2,
    title: "Coordinate 2,000 Water Ration Packs",
    description: "Receive truck shipment from state depot and organize distribution tents.",
    status: "COMPLETED",
    assignedVolunteerId: 2,
    disasterId: 1,
    createdAt: "2026-08-01T14:30:00"
  },
  {
    id: 3,
    title: "Drone Reconnaissance of Coastal Roads",
    description: "Identify submerged road sections for amphibious rescue vehicle routes.",
    status: "PENDING",
    assignedVolunteerId: 3,
    disasterId: 2,
    createdAt: "2026-08-02T16:00:00"
  },
  {
    id: 4,
    title: "Manage Evacuee Registration Desk",
    description: "Register incoming families at Central St. Mary Relief Camp.",
    status: "IN_PROGRESS",
    assignedVolunteerId: 4,
    disasterId: 1,
    createdAt: "2026-08-02T09:15:00"
  }
];

export const initialActivities = [
  {
    id: 1,
    title: "New Disaster Incident Reported",
    subtitle: "Kerala Severe Flash Floods tagged as CRITICAL",
    time: "2 hours ago",
    type: "disaster"
  },
  {
    id: 2,
    title: "Volunteer Deployed",
    subtitle: "Priya Sundaram assigned to Water Ration Supply Task",
    time: "4 hours ago",
    type: "volunteer"
  },
  {
    id: 3,
    title: "Major Donation Received",
    subtitle: "₹5,00,000 received from Apex Tech Relief Foundation",
    time: "6 hours ago",
    type: "donation"
  },
  {
    id: 4,
    title: "Shelter Reached Capacity",
    subtitle: "Government High School Hall marked as FULL",
    time: "1 day ago",
    type: "shelter"
  }
];
