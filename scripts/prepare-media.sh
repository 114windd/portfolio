#!/usr/bin/env bash
# Re-encodes the project demos and screenshots into web-friendly files under public/.
# Usage: scripts/prepare-media.sh <source-media-dir> [avatar-dir]
#   source-media-dir: folder with the original demo .mp4 and screenshot .png files, and an optional
#     portfolio-assets/{saff,kikou,meme-monitoring-system}/ subfolder from the Mac scan
#   avatar-dir: optional folder with korede.img, bnbchain.img, pudgypenguins.img, fryingpan.img
set -euo pipefail

SRC="${1:?source media dir required}"
AVATARS="${2:-}"
ASSETS="$SRC/portfolio-assets"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
VIDEOS="$ROOT/public/videos"
SHOTS="$ROOT/public/images/projects"
LOGOS="$ROOT/public/images/logos"
mkdir -p "$VIDEOS" "$SHOTS/creator-scout" "$SHOTS/review-radar" "$SHOTS/kioku" "$SHOTS/saff" "$LOGOS"

# H.264 High, yuv420p, moov atom up front (faststart), capped at 1280px wide and 30 fps.
# Pass "audio" as the third argument to keep a 96 kbps AAC track; otherwise audio is dropped.
encode() {
  local in="$1" out="$2" audio="${3:-}"
  local audio_args=(-an) fps_filter=""
  [[ "$audio" == "audio" ]] && audio_args=(-c:a aac -b:a 96k -ac 2)
  local rate
  rate=$(ffprobe -v error -select_streams v:0 -show_entries stream=r_frame_rate -of csv=p=0 "$in")
  if (( $(echo "$rate" | awk -F/ '{ print (($2 ? $1 / $2 : $1) > 30) }') )); then fps_filter=",fps=30"; fi
  ffmpeg -v error -y -i "$in" "${audio_args[@]}" \
    -vf "scale='min(1280,iw)':-2:flags=lanczos${fps_filter}" \
    -c:v libx264 -preset slow -crf 28 -profile:v high -level 4.0 -pix_fmt yuv420p \
    -movflags +faststart "$out"
}

poster() {
  local in="$1" at="$2" out="$3"
  ffmpeg -v error -y -ss "$at" -i "$in" -frames:v 1 \
    -vf "scale='min(1280,iw)':-2:flags=lanczos" -c:v libwebp -quality 82 "$out"
}

shot() {
  local in="$1" out="$2"
  ffmpeg -v error -y -i "$in" -vf "scale='min(1600,iw)':-2:flags=lanczos" -c:v libwebp -quality 82 "$out"
}

encode "$SRC/creator-scout-demo-groq.mp4" "$VIDEOS/creator-scout-demo.mp4"
poster "$SRC/creator-scout-demo-groq.mp4" 20 "$VIDEOS/creator-scout-poster.webp"
encode "$SRC/review-radar-demo.mp4" "$VIDEOS/review-radar-demo.mp4"
poster "$SRC/review-radar-demo.mp4" 65 "$VIDEOS/review-radar-poster.webp"

shot "$SRC/creator-scout-results.png" "$SHOTS/creator-scout/results.webp"
shot "$SRC/creator-scout-breakdown.png" "$SHOTS/creator-scout/breakdown.webp"
shot "$SRC/creator-scout-outreach-groq.png" "$SHOTS/creator-scout/outreach.webp"
shot "$SRC/review-radar-dashboard.png" "$SHOTS/review-radar/dashboard.webp"
shot "$SRC/review-radar-angles.png" "$SHOTS/review-radar/angles.webp"
shot "$SRC/review-radar-digest.png" "$SHOTS/review-radar/digest.webp"

if [[ -d "$ASSETS/kikou" ]]; then
  encode "$ASSETS/kikou/kioku-demo.mp4" "$VIDEOS/kioku-demo.mp4"
  poster "$ASSETS/kikou/kioku-demo.mp4" 28 "$VIDEOS/kioku-poster.webp"
  shot "$ASSETS/kikou/kioku-home.png" "$SHOTS/kioku/home.webp"
  shot "$ASSETS/kikou/kioku-trust-wallet-09-dashboard-overview.png" "$SHOTS/kioku/report.webp"
  shot "$ASSETS/kikou/kioku-live-check-chat.png" "$SHOTS/kioku/live-check.webp"
fi

if [[ -d "$ASSETS/saff" ]]; then
  encode "$ASSETS/saff/saff-core-features-demo.mp4" "$VIDEOS/saff-demo.mp4" audio
  poster "$ASSETS/saff/saff-core-features-demo.mp4" 108 "$VIDEOS/saff-poster.webp"
  shot "$ASSETS/saff/saff-landing-hero.png" "$SHOTS/saff/landing.webp"
  shot "$ASSETS/saff/saff-prayer-times.jpg" "$SHOTS/saff/prayer-times.webp"
  shot "$ASSETS/saff/saff-khutbah-reader-whisper.png" "$SHOTS/saff/khutbah-reader.webp"
  ffmpeg -v error -y -i "$ASSETS/saff/saff-icon-512.png" -vf "scale=128:128:flags=lanczos" -c:v libwebp -quality 90 "$SHOTS/saff/icon.webp"
fi

if [[ -d "$ASSETS/meme-monitoring-system" ]]; then
  MMS="$ASSETS/meme-monitoring-system"
  mkdir -p "$SHOTS/meme-market-monitor"
  encode "$MMS/mms-dashboard-demo.mp4" "$VIDEOS/meme-market-monitor-demo.mp4"
  shot "$MMS/mms-dashboard-demo-poster.png" "$VIDEOS/meme-market-monitor-poster.webp"
  shot "$MMS/mms-dashboard-demo-poster.png" "$SHOTS/meme-market-monitor/overview.webp"
  shot "$MMS/mms-dashboard-participation.png" "$SHOTS/meme-market-monitor/participation.webp"
  shot "$MMS/mms-dashboard-mechanisms-open.png" "$SHOTS/meme-market-monitor/mechanisms.webp"
fi

if [[ -n "$AVATARS" ]]; then
  ffmpeg -v error -y -i "$AVATARS/korede.img" -vf "scale=400:400:flags=lanczos" -c:v libwebp -quality 88 "$ROOT/public/images/korede.webp"
  for name in bnbchain pudgypenguins fryingpan; do
    ffmpeg -v error -y -i "$AVATARS/$name.img" -vf "scale=256:256:flags=lanczos" -c:v libwebp -quality 88 "$LOGOS/$name.webp"
  done
fi

ls -la "$VIDEOS" "$SHOTS"/* "$LOGOS"
