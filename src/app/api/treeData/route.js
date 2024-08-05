import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { AVLTree, Song } from '../../components/avlTreeSongs';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const word = searchParams.get('word');

  // If the user do not type a word and it clicks on the button it is going to return a error on console and the tree wont get any data
  if (!word) {
    return NextResponse.json({ error: 'Word parameter is required' }, { status: 400 });
  }

  const tree = new AVLTree();
  // filepath has the inner path of our data set
  const filePath = path.join(process.cwd(), 'src', 'app', 'Data', 'DataSet.json');

  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    // Iterates over each item on our data set
    data.forEach((item) => {
      const { Artist, Title, Album, "Release Date": releaseDateStr, Lyrics } = item;
      const releaseDate = new Date(releaseDateStr);
      const lyrics = String(Lyrics || '');
      const song = new Song(Title, Artist, Album, releaseDate, lyrics);

      if (song.lyrics.has(word.toLowerCase())) {
        tree.insertSong(song);
      }
    });

    // Saves the data of all the values we have to send to our home page
    const bfsResult = Array.from(tree.bfs());
    const dfsResult = Array.from(tree.dfs());
    const treeData = tree.toReactD3TreeFormat();
    return NextResponse.json({treeData, bfsResult, dfsResult});
  } 
  catch (error) {
    console.error('Error processing tree data:', error);
    return NextResponse.json({ error: 'Error processing tree data' }, { status: 500 });
  }
}