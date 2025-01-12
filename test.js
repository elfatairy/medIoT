const fs = require('fs');
const path = require('path');

// Path to the parent folder containing subfolders
const parentFolder = 'assets/images';

fs.readdir(parentFolder, (err, subfolders) => {
    if (err) {
        return console.error('Error reading parent folder:', err);
    }

    subfolders.forEach(subfolder => {
        const subfolderPath = path.join(parentFolder, subfolder);

        // Check if it's a directory
        fs.stat(subfolderPath, (err, stats) => {
            if (err) {
                return console.error(`Error reading subfolder "${subfolder}":`, err);
            }

            if (stats.isDirectory()) {
                const imagePath = path.join(subfolderPath, '0.jpg');
                const newImagePath = path.join(parentFolder, `${subfolder}.jpg`);

                // Check if 0.jpg exists
                fs.access(imagePath, fs.constants.F_OK, (err) => {
                    if (err) {
                        return console.warn(`Image "0.jpg" not found in "${subfolder}"`);
                    }

                    // Move and rename the image
                    fs.rename(imagePath, newImagePath, (err) => {
                        if (err) {
                            return console.error(`Error moving image from "${subfolder}":`, err);
                        }

                        console.log(`Moved and renamed "0.jpg" from "${subfolder}" to "${newImagePath}"`);

                        // Remove the subfolder after the image is moved
                        fs.rmdir(subfolderPath, { recursive: true }, (err) => {
                            if (err) {
                                return console.error(`Error removing subfolder "${subfolder}":`, err);
                            }

                            console.log(`Removed subfolder "${subfolder}"`);
                        });
                    });
                });
            }
        });
    });
});
