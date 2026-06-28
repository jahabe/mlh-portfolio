import os
from flask import Flask, render_template, url_for, redirect
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)


@app.route('/')
def index():
    return redirect('/jane')


@app.route('/jane')
def jane():
    experiences = [
        {"company": "META X MLH Fellowship", "role": "Production Engineering Fellow", "duration": "June 2026 - Sep 2026", "description": ["Summer Fellowship"]},
        {"company": "DAIS Group", "role": "Undergrad Research MLE", "duration": "May 2025 - Present", "description": [
            "Contributing to DeepTracer generative AI pipeline for 3D protein structure prediction.",
            "Debugging and stabilizing deep learning training workflows, focusing on data integrity and model convergence."
        ]},
        {"company": "University of Washington", "role": "CS Grader", "duration": "Jan 2026 - Jun 2026", "description": ["Evaluated C++ algorithms assignments for 120+ students across two core CS courses"]},
        {"company": "Washington State Opportunity Scholarship", "role": "STEM Scholar Lead", "duration": "Oct 2024 - Present", "description": ["Led a cohort of 60+ scholars, managing quarter timelines and tracking academic, career, and scholarship milestones"]},
        {"company": "Microsoft", "role": "Software Product Manager (Capstone)", "duration": "Nov 2025 - Jun 2026", "description": ["Contributing to the software architecture and Windows-side system design for a Microsoft-sponsored research project focused on Surface Laptop keyboard skin detection and OS configuration."]},
        {"company": "Innovators Hub", "role": "Co-Founder", "duration": "Oct 2024 - Jun 2026", "description": ["Student-led community for CS, design, and entrepreneurship students building real-world products, hosting technical workshops, and connecting with industry mentors | UW branch"]},
        {"company": "IDEA Enterprises LLC", "role": "UX Design Intern", "duration": "Jul 2025 - Sep 2025", "description": ["Redesigned core workflows for an AI-based security camera platform by conducting user interviews, identifying navigation bottlenecks, and building an incident flow that reduced issue submission time while delivering technical UX specifications for the engineering team."]},
    ]

    education = [
        {"school": "University of Washington", "degree": "Bachelors of Science in Computer Science", "duration": "Expected Graduation: Winter 2027"},
    ]

    projects = [
        {"company": "MICROSOFT CAPSTONE", "role": "Surface Laptop Keyset Research", "duration": "Nov 2025 - Jun 2026", "description": ["Designed Windows-side system for keyboard skin detection. Software Lead, 100% pass rate, ~3.9ms latency."]},
        {"company": "UWB HACKS 2026", "role": "SocialMaxxing", "duration": "Apr 2026", "description": ["First-person alien social etiquette simulator in Unity (C#). Even aliens need to learn manners."]},
        {"company": "UNIVERSITY OF WASHINGTON", "role": "Seattle Accessibility & Mobility Data Visualization", "duration": "Feb 2026", "description": ["Identified high-impact sidewalk barriers across Seattle using Tableau, Python, and Harvard Dataverse GeoData."]},
        {"company": "CSS 370", "role": "Discord Invite Sync Launcher", "duration": "Mar 2025 - May 2025", "description": ["Modular system syncing Steam/Epic Games with Discord for seamless multiplayer invites. 4-person team."]},
        {"company": "FIGBUILD 2025", "role": "AdultReady - AI Toolkit for Real-Life Skills", "duration": "Apr 2025", "description": ["AI-powered mobile app helping young adults navigate taxes, L&I, and real-world challenges. Built in 4 days."]},
    ]

    return render_template('jane.html',
                           url=os.getenv("URL"),
                           work_experiences=experiences,
                           educations=education,
                           projects=projects)


@app.route('/jane/hobbies')
def hobbies():
    hobbies = [
        {"name": "Watching Movies in a theater", "image": "img/jane_hobby1.jpg"},
        {"name": "Traveling & Outdoor Activities", "image": "img/jane_hobby2.jpg"},
        {"name": "Petting Cats", "description": "Life's greatest joy.", "image": "img/cat.jpg"},
        {"name": "Photography", "description": "Landscapes & golden hour.", "image": "img/nature.jpg"},
    ]

    places = [
        {"name": "South Korea",           "lat": 37.5665, "lng": 126.9780},
        {"name": "Seattle, WA",           "lat": 47.6062, "lng": -122.3321},
        {"name": "West Virginia",         "lat": 38.5976, "lng": -80.4549},
        {"name": "Washington D.C.",       "lat": 38.9072, "lng": -77.0369},
        {"name": "Las Vegas, NV",         "lat": 36.1699, "lng": -115.1398},
        {"name": "Los Angeles, CA",       "lat": 34.0522, "lng": -118.2437},
        {"name": "Orange County, CA",     "lat": 33.7175, "lng": -117.8311},
        {"name": "Oregon",                "lat": 43.8041, "lng": -120.5542},
        {"name": "Suncheon, South Korea", "lat": 34.9506, "lng": 127.4876},
        {"name": "Busan, South Korea",    "lat": 35.1796, "lng": 129.0756},
        {"name": "Yeosu, South Korea",    "lat": 34.7604, "lng": 127.6622},
        {"name": "Cheonan, South Korea",  "lat": 36.8151, "lng": 127.1139},
        {"name": "Jeonju, South Korea",   "lat": 35.8242, "lng": 127.1480},
        {"name": "Daegu, South Korea",    "lat": 35.8714, "lng": 128.6014},
        {"name": "Incheon, South Korea",  "lat": 37.4563, "lng": 126.7052},
    ]

    return render_template('hobbies.html',
                           url=os.getenv("URL"),
                           hobbies=hobbies,
                           places=places)