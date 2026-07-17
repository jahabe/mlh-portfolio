import unittest
import os

os.environ['TESTING'] = 'true'

from app import app, TimelinePost


class AppTestCase(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()

    def tearDown(self):
        # wipe timeline posts so each test starts empty
        TimelinePost.delete().execute()

    def test_home(self):
        # / redirects to /jane
        response = self.client.get("/")
        assert response.status_code == 302
        assert "/jane" in response.headers["Location"]

        response = self.client.get("/", follow_redirects=True)
        assert response.status_code == 200
        html = response.get_data(as_text=True)
        assert "<title>Jane Choi</title>" in html

        # experience, education, and project data made it onto the page
        assert "META X MLH Fellowship" in html
        assert "Production Engineering Fellow" in html
        assert "University of Washington" in html
        assert "Bachelors of Science in Computer Science" in html
        assert "MICROSOFT CAPSTONE" in html
        assert "SocialMaxxing" in html

        # hobbies page
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

        # POST a post and check the returned record
        response = self.client.post("/api/timeline_post", data={
            "name": "John Doe", "email": "john@example.com", "content": "Hello world, I'm John!"})
        assert response.status_code == 200
        assert response.is_json
        post = response.get_json()
        assert post["name"] == "John Doe"
        assert post["email"] == "john@example.com"
        assert post["content"] == "Hello world, I'm John!"

        # GET returns it
        response = self.client.get("/api/timeline_post")
        assert response.status_code == 200
        json = response.get_json()
        assert len(json["timeline_posts"]) == 1
        assert json["timeline_posts"][0]["name"] == "John Doe"

        # newest post comes back first
        response = self.client.post("/api/timeline_post", data={
            "name": "Jane Doe", "email": "jane@example.com", "content": "Hello world, I'm Jane!"})
        assert response.status_code == 200

        response = self.client.get("/api/timeline_post")
        json = response.get_json()
        assert len(json["timeline_posts"]) == 2
        assert json["timeline_posts"][0]["name"] == "Jane Doe"
        assert json["timeline_posts"][1]["name"] == "John Doe"

        # timeline page renders with the form and posts container
        response = self.client.get("/timeline")
        assert response.status_code == 200
        html = response.get_data(as_text=True)
        assert "<title>Timeline · Jane Choi</title>" in html
        assert 'id="timeline-form"' in html
        assert 'id="timeline-posts"' in html

    def test_malformed_timeline_post(self):
        # missing name
        response = self.client.post("/api/timeline_post", data={"email": "john@example.com", "content": "Hello world, I'm John!"})
        assert response.status_code == 400
        html = response.get_data(as_text=True)
        assert "Invalid name" in html

        # empty content
        response = self.client.post("/api/timeline_post", data={"name": "John Doe", "email": "john@example.com", "content": ""})
        assert response.status_code == 400
        html = response.get_data(as_text=True)
        assert "Invalid content" in html

        # malformed email
        response = self.client.post("/api/timeline_post", data={"name": "John Doe", "email": "not-an-email", "content": "Hello world, I'm John!"})
        assert response.status_code == 400
        html = response.get_data(as_text=True)
        assert "Invalid email" in html
