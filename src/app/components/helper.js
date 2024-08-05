const fs = require('fs');
const { AVLTree, Song } = require('./avlTreeSongs');


async function createTree(filename, songsTree, word) {
    const data = JSON.parse(fs.readFileSync(filename, 'utf8'));
  
    data.forEach((item, index) => {

        try{
            const { Artist, Title, Album, "Release Date": releaseDateStr, Lyrics } = item;
            const releaseDate = new Date(releaseDateStr);

            const lyrics = String(Lyrics || '');

            const song = new Song(Title, Artist, Album, releaseDate, lyrics);

            if(song.lyrics.has(word.toLowerCase())){
                songsTree.insertSong(song);
            }
        } 
        catch(error){
            console.error(`Error processing song at index ${index}:`, error.message);
            console.error('Song data:', JSON.stringify(item, null, 2));
        }
    });
}

createTree(filePath, tree, word)
    .then(() => {
        console.log('All songs have been inserted into the AVL Tree.');
        const bfsSongs = tree.bfs();
        const dfsSongs = tree.dfs();
        console.log("BFS Songs:", bfsSongs);
        console.log("DFS Songs:", dfsSongs);
    })
    .catch(err => {
        console.error('Error reading JSON file:', err);
    });

module.exports = { createTree };
