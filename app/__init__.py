import os
import requests
from flask import Flask, render_template, url_for, redirect, jsonify, request
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)


@app.route('/')
def index():
    return redirect('/jane')


@app.route('/jane')
def jane():
    experiences = [
        {"company": "META X MLH Fellowship", "role": "Production Engineering Fellow", "duration": "June 2026 - Sep 2026", "logo": "img/company/meta.jpg", "description": ["Summer Fellowship"]},
        {"company": "DAIS Group", "role": "Undergrad Researcher", "duration": "May 2025 - Present", "logo": "img/company/deeptracer.jpg", "description": ["DeepTracer generative AI pipeline for 3D protein structure prediction."]},
        {"company": "University of Washington", "role": "CS Grader", "duration": "Jan 2026 - Jun 2026", "logo": "img/uw_logo.png", "description": ["Evaluated C++ algorithms assignments for 120+ students across two core CS courses"]},
        {"company": "Washington State Opportunity Scholarship", "role": "STEM Scholar Lead", "duration": "Oct 2024 - Present", "logo": "img/company/wsos.png", "description": ["Led a cohort of 60+ scholars, managing quarter timelines and tracking academic, career, and scholarship milestones"]},
        {"company": "Microsoft", "role": "Software Product Manager (Capstone)", "duration": "Nov 2025 - Jun 2026", "logo": "img/company/msft.webp", "description": ["Contributing to the software architecture and Windows-side system design for a Microsoft-sponsored research project focused on Surface Laptop keyboard skin detection and OS configuration."]},
        {"company": "Innovators Hub", "role": "Co-Founder (UW Branch)", "duration": "Oct 2024 - Jun 2026", "logo": "img/company/ihub.jpeg", "description": ["Student-led community for CS, design, and entrepreneurship students building real-world products, hosting technical workshops, and connecting with industry mentors"]},
        {"company": "IDEA Enterprises LLC", "role": "UX Design Intern", "duration": "Jul 2025 - Sep 2025", "logo": "img/company/idea.jpeg", "description": ["Redesigned core workflows for an AI security camera platform, reducing issue submission time through user research and a streamlined incident flow."]},
    ]

    education = [
        {"school": "University of Washington", "degree": "Bachelors of Science in Computer Science", "duration": "Expected Graduation: Winter 2027"},
    ]

    projects = [
        {"company": "MICROSOFT CAPSTONE", "role": "Surface Laptop Keyset Research", "duration": "Nov 2025 - Jun 2026", "image": "img/project/msft_surface.jpg", "link": "https://www.linkedin.com/feed/update/urn:li:activity:7475076562430734336/", "description": ["Designed Windows-side system for keyboard skin detection. Software Lead, 100% pass rate, ~3.9ms latency."]},
        {"company": "UWB HACKS 2026", "role": "SocialMaxxing", "duration": "Apr 2026", "image": "img/project/socialmaxxing.jpg", "link": "https://devpost.com/software/uwb-hacks-future", "description": ["First-person alien social etiquette simulator in Unity (C#). Even aliens need to learn manners."]},
        {"company": "UNIVERSITY OF WASHINGTON", "role": "Seattle Accessibility & Mobility Data Visualization", "duration": "Feb 2026", "image": "img/project/datathon_croi.jpg", "link": "https://vanilla-foxglove-275.notion.site/Identifying-and-Prioritizing-High-Impact-Sidewalk-Barriers-That-Disrupt-Everyday-Movement-in-Seattle-30118ef3ce6780098b85dd105821debf", "description": ["Identified high-impact sidewalk barriers across Seattle using Tableau, Python, and Harvard Dataverse GeoData."]},
        {"company": "FIGBUILD 2025", "role": "AdultReady - AI Toolkit for Real-Life Skills", "duration": "Apr 2025", "image": "img/project/adultready.jpg", "link": "https://www.youtube.com/watch?v=ijYZi1Df0zM", "description": ["AI-powered mobile app helping young adults navigate taxes, L&I, and real-world challenges. Built in 4 days."]},
    ]

    return render_template('jane.html',
                           url=os.getenv("URL"),
                           work_experiences=experiences,
                           educations=education,
                           projects=projects)

@app.route('/jane/hobbies')
def hobbies():
    hobbies = [
        {
            "name": "Watching Movies in a theater",
            "image": "img/hobby/movie/amc.jpg",
            "photos": ["img/hobby/movie/endgame.jpg", 
                       "img/hobby/movie/avatar.jpeg", 
                       "img/hobby/movie/f1.jpg"
                       ]
        },
        {
            "name": "Traveling & Outdoor Activities",
            "image": "img/hobby/outdoor/outdoor1.jpg",
            "photos": [
                "img/hobby/outdoor/outdoor1.jpg",
                "img/hobby/outdoor/outdoor2.jpg",
                "img/hobby/outdoor/outdoor3.jpg",
                "img/hobby/outdoor/outdoor4.jpg",
            ]
        },
        {
            "name": "Petting Cats",
            "description": "Life's greatest joy.",
            "image": "img/hobby/cat/cat.jpg",
            "photos": [
                "img/hobby/cat/cat.jpg",
                "img/hobby/cat/cat2.jpg",
                "img/hobby/cat/cat3.jpg",
                "img/hobby/cat/cat4.jpg",
                "img/hobby/cat/cat5.jpg",
            ]
        },
        {
            "name": "Photography",
            "description": "Landscapes & golden hour.",
            "image": "img/hobby/view/view1.jpg",
            "photos": [
                "img/hobby/view/view1.jpg",
                "img/hobby/view/view2.jpg",
                "img/hobby/view/view3.jpg",
                "img/hobby/view/view4.jpg",
                "img/hobby/view/view5.JPG",
            ]
        },
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


@app.route('/api/weather')
def weather():
    api_key = os.getenv("WEATHER_API_KEY")
    res = requests.get(f'https://api.openweathermap.org/data/2.5/weather?q=Seattle&appid={api_key}&units=imperial')
    data = res.json()
    return jsonify({
        "temp": round(data["main"]["temp"]),
        "desc": data["weather"][0]["main"]
    })