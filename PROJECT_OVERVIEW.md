# Portfolio Site

- An interactive, top-down pixel-art portfolio built with Flask. 
- Inspiration: Stardew Valley

Link: http://janechoi.duckdns.org:5000/jane

## About This Project

The homepage ([jane.html](app/templates/jane.html)) is an HTML5 `<canvas>` game rendered and driven entirely by [app/static/scripts/game.js](app/static/scripts/game.js):

- A tile-based map (`TILE = 48px`, 30×25 grid) 
  - tile types: grass, a walkable dirt path, and a tiles.
- The character sprite is generated with [PixelLab.ai](https://www.pixellab.ai/) and rendered from pre-baked directional frames.
- Arrow keys move the character around the map
- pressing Enter opens a pixel-styled popup for that section. 
- Flask injects the resume data (work experience, education, projects) as JSON directly into the page via Jinja. 
- The [Hobbies](app/templates/hobbies.html) contains photo-gallery grid + map API pinning places visited 
- The [Timeline](app/templates/timeline.html) is a small guestbook, written to a MySQL table (`TimelinePost`, via the [peewee](http://docs.peewee-orm.com/) ORM in `__init__.py` and displayed in a feed.
- A `/api/weather` endpoint calls the OpenWeatherMap API to show live Seattle weather on the site.
- 

#### Fonts

- `Press Start 2P` for headers/labels
- `VT323` for body text

From Google Fonts

## Project Structure

```
mlh-portfolio/
├── app/
│   ├── __init__.py          # Flask app: routes, TimelinePost model (peewee/MySQL), weather API
│   ├── static/
│   │   ├── img/
│   │   │   ├── character/   
│   │   │   ├── company/     
│   │   │   ├── hobby/       
│   │   │   ├── landmark/    
│   │   │   ├── project/     
│   │   │   └── ...          
│   │   ├── scripts/
│   │   │   └── game.js      # canvas game loop, tilemap, movement, popups
│   │   └── styles/
│   │       ├── game.css     # home page / pixel-art game styling
│   │       ├── hobbies.css
│   │       └── timeline.css
│   └── templates/
│       ├── jane.html        # home page - the game canvas
│       ├── hobbies.html     # hobby galleries + Leaflet travel map
│       └── timeline.html    # guestbook-style timeline (MySQL-backed)
├── requirements.txt
├── example.env               
├── redeploy-site.sh         # server-side pull + restart script (tmux + flask run)
├── curl-test.sh             # example curl calls against the timeline API
├── README.md
└── PROJECT_OVERVIEW.md
```
