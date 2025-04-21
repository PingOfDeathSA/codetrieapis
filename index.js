
const htttp = require('node:http');
const movie =require('./data/movies.js');
const music = require('./data/songs.js');
const series = require('./data/series.js');



// post, get, put, delete
function contentType (res) {
    res.setHeader('Content-Type', 'application/json');
}

function resfulAPIs (req, res, data_list_name, update_data,_contentType) {
        if (req.method === 'GET') {
            // getting data list
            _contentType
       
            res.end(JSON.stringify( 
                
                {status:'sucess returned all data',            
                    data_list: data_list_name},
                            
                ));
        } else if (req.method === 'POST') {
            // updating data to list
            _contentType
            data_list_name.push(update_data)
            res.end(JSON.stringify(  
                               
         { status:'sucess returned updated data',
            added_data:data_list_name }              
                ));
            
        } else if (req.method === 'PUT') {      
            // updating data to list
            data_list_name[0] =  update_data;
              _contentType
            res.end(JSON.stringify(
                {
                    status:'sucess returned updated data',
                    updated_data:data_list_name }
            ))
    } else if (req.method === 'DELETE') {
        // deleting data from list
        data_list_name.splice(0, 1);
        _contentType
        res.end(JSON.stringify(
            {
                status:'sucess returned deleted data',
                deleted_data:data_list_name }
        ))
    } else {
        res.statusCode = 404;
        _contentType
        res.end(JSON.stringify({
            error: 'Route not found'
        }));
    }



}

const app = htttp.createServer((req, res) => {
    //console.log(req.url);
    if (req.url === '/') {
        res.statusCode = 200;
        contentType(res)
        res.end('Welcome to my Resful APIs for movies,series and songs');
    } else if (req.url === '/mvies') {
        resfulAPIs(req, res,movie.Movie_List ,
            {id:  7,
            name: 'The Matrix',
            year: 1999,
            genre: 'Action',
            rating: 8.7},
            contentType(res)
            ) 
    } else if (req.url === '/songs') {
        resfulAPIs(req, res,music.Song_list,
            {
                id: 5,
                song_name: "Dance Monkey",
                artist: "Tones and I",
                album: "Dance Monkey",
                year: 2019
            },
            contentType(res)
            )
   
   
        } else if (req.url === '/series') {
        resfulAPIs(req, res,series.Series_list,
            {
                id: 5,
                name: "The Dark Knight",
                year: 2008,
                genre: "Action",
                rating: 9.0
            },
            contentType(res)
            )
    } else {
        res.statusCode = 404;
        contentType(res)
        res.end(JSON.stringify({
            error: 'Route not found'
        }));
    }
})

// localhost:port
const hostName = '127.0.0.1'

app.listen(3000,hostName, () => {
    console.log('Server app listening on port 3000!')
})
