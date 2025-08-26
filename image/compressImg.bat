@echo off
for %%f in (*.jpg *.png) do magick "%%f" -auto-orient "%%f"
for %%f in (*.jpg *.png) do cwebp "%%f" -o "%%~nf.webp"
for %%f in (*.gif) do gif2webp "%%f" -o "%%~nf.webp"
pause