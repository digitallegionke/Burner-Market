#!/bin/bash

# Create fonts directory if it doesn't exist
mkdir -p public/fonts

# Clone the bricolage repository
git clone https://github.com/ateliertriay/bricolage.git temp-bricolage

# Copy the font file
cp temp-bricolage/fonts/variable/BricolageGrotesque\[opsz\,wdth\,wght\].ttf public/fonts/

# Clean up
rm -rf temp-bricolage

echo "✅ Bricolage Grotesque font has been set up successfully!" 