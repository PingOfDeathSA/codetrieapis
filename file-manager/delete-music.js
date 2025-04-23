exports.deleteMusic = function(app, path, fs) {
    app.post('/delete-music', (req, res) => {
        const indexToDelete = parseInt(req.body.index);
        const musicInfoPath = path.join(__dirname, '..', 'database', 'music_info.json');
        const musicDir = path.join(__dirname, '..', 'public'); 

        if (fs.existsSync(musicInfoPath)) {
            const rawData = fs.readFileSync(musicInfoPath);
            let musicData = JSON.parse(rawData);

            if (indexToDelete >= 0 && indexToDelete < musicData.length) {
                const songToDelete = musicData[indexToDelete];

                musicData.splice(indexToDelete, 1);

                // Updating the music_info.json with the remaining songs
                fs.writeFileSync(musicInfoPath, JSON.stringify(musicData, null, 2));

                // Deleting the associated MP3 file from the music directory
                const songFileName = songToDelete.song_url.replace('/music/', '');
                const songFilePath = path.join(musicDir, songFileName);
                console.log( 'path is ',songFilePath)
                if (fs.existsSync(songFilePath)) {
                    fs.unlinkSync(songFilePath); 
                    console.log(`Deleted: ${songFilePath}`);
                } else {
                    console.log(`File not found: ${songFilePath}`);
                }
            }
        }

        res.redirect('/');
    });
};
