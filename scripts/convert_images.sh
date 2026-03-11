#!/bin/bash

# Directory containing images
IMAGE_DIR="./src/assets"

# Check if cwebp is installed
if ! command -v cwebp &> /dev/null; then
    echo "Error: cwebp is not installed. Please install 'webp' package."
    echo "sudo apt-get install webp  # Debian/Ubuntu"
    echo "brew install webp          # macOS"
    exit 1
fi

echo "Starting WebP conversion in $IMAGE_DIR..."

# Find and convert images
find "$IMAGE_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | while read -r file; do
    filename=$(basename "$file")
    extension="${filename##*.}"
    filename="${filename%.*}"
    
    output="$IMAGE_DIR/$filename.webp"
    
    if [ ! -f "$output" ]; then
        echo "Converting: $file -> $output"
        cwebp -q 80 "$file" -o "$output"
    else
        echo "Skipping: $output (Already exists)"
    fi
done

echo "Conversion complete!"
