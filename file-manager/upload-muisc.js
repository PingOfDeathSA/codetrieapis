exports.uploadMusic = function(app, path, fs) {
    app.post('/music-upload', (req, res) => {
        if (!req.files || !req.files.musicFile) {
            return res.status(400).send('No music file uploaded');
        }

        const musicFile = req.files.musicFile;
        const fileName =  musicFile.name;
        const musicDir = path.join(__dirname, '../public/music');
        const dbDir = path.join(__dirname, '../database');
        const dbPath = path.join(dbDir, 'music_info.json');

        // checking if public/music folder exists, if not create it
        if (!fs.existsSync(musicDir)) fs.mkdirSync(musicDir, { recursive: true });

        // checking if database folder exists, if not create it
        if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });

        const savePath = path.join(musicDir, fileName);

        // checking if the file already exists in the directory
        if (fs.existsSync(savePath)) {
            return res.status(400).send('This music file has already been uploaded');
        }

        musicFile.mv(savePath, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Failed to upload music');
            }

            const newSongInfo = {
                song_name: req.body.song_name || 'Untitled',
                artist: req.body.artist || 'Unknown',
                song_url: 'music/' + fileName,
                image_url: 'images/' + (req.body.song_cover || 'muic_image.jpg')
            };

            let musicData = [];

            if (fs.existsSync(dbPath)) {
                musicData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
            }

            musicData.push(newSongInfo);

            fs.writeFileSync(dbPath, JSON.stringify(musicData, null, 2));
            res.status(200);
            res.redirect('/');
        });
    });
};
