# tests/test_app.py

import unittest
import os

os.environ['TESTING'] = 'true'

from app import app, TimelinePost


class AppTestCase(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()

    def tearDown(self):
        # Clear out any timeline posts a test created so each test starts
        # from an empty table.
        TimelinePost.delete().execute()

    def test_home(self):
        # The root route redirects to the portfolio page.
        response = self.client.get("/")
        assert response.status_code == 302
        assert "/jane" in response.headers["Location"]

        response = self.client.get("/", follow_redirects=True)
        assert response.status_code == 200
        html = response.get_data(as_text=True)
        assert "<title>Jane Choi</title>" in html

        # The page embeds the experience, education, and project data.
        assert "META X MLH Fellowship" in html
        assert "Production Engineering Fellow" in html
        assert "University of Washington" in html
        assert "Bachelors of Science in Computer Science" in html
        assert "MICROSOFT CAPSTONE" in html
        assert "SocialMaxxing" in html

        # The hobbies page renders too.
        response = self.client.get("/jane/hobbies")
        assert response.status_code == 200
        html = response.get_data(as_text=True)
        assert "<title>Hobbies · Jane Choi</title>" in html
        assert "Petting Cats" in html

    def test_timeline(self):
        response = self.client.get("/api/timeline_post")
        assert response.status_code == 200
        assert response.is_json
        json = response.get_json()
        assert "timeline_posts" in json
        assert len(json["timeline_posts"]) == 0

        # POST a timeline post through the API and check the returned record.
        response = self.client.post("/api/timeline_post", data={
            "name": "John Doe", "email": "john@example.com", "content": "Hello world, I'm John!"})
        assert response.status_code == 200
        assert response.is_json
        post = response.get_json()
        assert post["name"] == "John Doe"
        assert post["email"] == "john@example.com"
        assert post["content"] == "Hello world, I'm John!"

        # GET should now return the post we just created.
        response = self.client.get("/api/timeline_post")
        assert response.status_code == 200
        json = response.get_json()
        assert len(json["timeline_posts"]) == 1
        assert json["timeline_posts"][0]["name"] == "John Doe"

        # A second post comes back first: GET returns newest posts first.
        response = self.client.post("/api/timeline_post", data={
            "name": "Jane Doe", "email": "jane@example.com", "content": "Hello world, I'm Jane!"})
        assert response.status_code == 200

        response = self.client.get("/api/timeline_post")
        json = response.get_json()
        assert len(json["timeline_posts"]) == 2
        assert json["timeline_posts"][0]["name"] == "Jane Doe"
        assert json["timeline_posts"][1]["name"] == "John Doe"

        # The timeline page renders with the form and posts container.
        response = self.client.get("/timeline")
        assert response.status_code == 200
        html = response.get_data(as_text=True)
        assert "<title>Timeline · Jane Choi</title>" in html
        assert 'id="timeline-form"' in html
        assert 'id="timeline-posts"' in html

    def test_malformed_timeline_post(self):
        # POST request missing name
        response = self.client.post("/api/timeline_post", data={"email": "john@example.com", "content": "Hello world, I'm John!"})
        assert response.status_code == 400
        html = response.get_data(as_text=True)
        assert "Invalid name" in html

        # POST request with empty content
        response = self.client.post("/api/timeline_post", data={"name": "John Doe", "email": "john@example.com", "content": ""})
        assert response.status_code == 400
        html = response.get_data(as_text=True)
        assert "Invalid content" in html

        # POST request with malformed email
        response = self.client.post("/api/timeline_post", data={"name": "John Doe", "email": "not-an-email", "content": "Hello world, I'm John!"})
        assert response.status_code == 400
        html = response.get_data(as_text=True)
        assert "Invalid email" in html
