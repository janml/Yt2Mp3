import os
import sys
import webview
import userpaths
from typing import Callable
from threading import Thread
from yt_dlp import YoutubeDL
from yt_dlp.utils import DownloadError


if hasattr(sys, "frozen"):
    BASE_DIR = sys._MEIPASS
    DEBUG = False
else:
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))
    DEBUG = True


ASSETS_DIR = os.path.join(BASE_DIR, "assets")

DOWNLOAD_DIR = os.path.join(userpaths.get_downloads(), "Yt2Mp3_Downloads")
os.makedirs(DOWNLOAD_DIR, exist_ok=True)


webview_window: webview.Window


def update_status_label(s: str):
    webview_window.evaluate_js(f"update_status_label('{s}')")


def download_youtube_video_as_mp3(video_url: str, on_progress: Callable):
    downloader = YoutubeDL({
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
        "outtmpl": os.path.join(DOWNLOAD_DIR, "%(title)s.%(ext)s"),
        "windowsfilenames": True

    })
    try:
        downloader.download(url_list=[video_url])
    except DownloadError:
        update_status_label("This video cannot be downloaded❗")


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

webview.start(debug=DEBUG)
