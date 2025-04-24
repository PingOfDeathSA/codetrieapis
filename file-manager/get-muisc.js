exports.getMusic = function(app, path, fs) {
    app.get('/', (req, res) => {
        const musicInfoPath = path.join(__dirname, '..', 'database', 'music_info.json');

        // Ensure file exists before reading
        let music_data = [];
        if (fs.existsSync(musicInfoPath)) {
          const rawData = fs.readFileSync(musicInfoPath);
          music_data = JSON.parse(rawData);
        }
      
// getting image names from images folder
        const song_cover_images = fs.readdirSync(path.join(__dirname, '..', 'public', 'images')).filter(file =>
            file.endsWith('.jpg') || file.endsWith('.png')
          );
          
      
        console.log(music_data)
        res.status(200);
        res.render('index', {
          music_data,
          song_cover_images,
        });
      });
}