import os
import webview
from typing import Callable
from threading import Thread
from yt_dlp import YoutubeDL


BASE_DIR = os.path.abspath(os.path.dirname(__file__))

ASSETS_DIR = os.path.join(BASE_DIR, "assets")


webview_window: webview.Window


def update_status_label(s: str):
    webview_window.evaluate_js(f"update_status_label('{s}')")


def download_youtube_video_as_mp3(video_url: str, on_progress: Callable):
    YoutubeDL({
        "no_color": True,  # Remove ansi escape sequences from progress messages.
        "format": "bestaudio/best",
        "progress_hooks": [on_progress],
        "ffmpeg_location": BASE_DIR,  # TODO: Adjust the path to point to MEIPASS, when building with pyinstaller.
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '192',
        }],
        "postprocessor_hooks": [on_progress],

    }).download(url_list=[video_url])


def on_download_progress(progress):
    if postprocessor := progress.get("postprocessor"):
        if postprocessor == "MoveFiles" and progress["status"] == "finished":  # This is the last step.
            progress_label = "Download finished 🤗"
        else:
            progress_label = "Converting to Mp3 🔄"
        update_status_label(progress_label)
        return

    update_status_label(f"Downloading {progress['_percent_str']} / {progress['_total_bytes_str']} ({progress['_speed_str']})")


class JsApi:
    def __init__(self):
        pass

    def download_youtube_video_as_mp3(self, video_url: str):
        Thread(
            target=download_youtube_video_as_mp3,
            args=(video_url, on_download_progress),
            daemon=True
        ).start()

        update_status_label("Loading video information ⌛")


webview_window = webview.create_window(
    title="Yt2Mp3",
    url=os.path.join(ASSETS_DIR, "gui.html"),
    js_api=JsApi(),
    width=500,
    height=220,
    resizable=False,
)

webview.start(debug=True)
