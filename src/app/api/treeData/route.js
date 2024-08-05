import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { AVLTree, Song } from '../../components/avlTreeSongs';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const word = searchParams.get('word');

  // If the user does not type a word and clicks on the button, it returns an error
  if (!word) {
    return NextResponse.json({ error: 'Word parameter is required' }, { status: 400 });
  }

  const tree = new AVLTree();
  // filepath has the inner path of our dataset
  const filePath = path.join(process.cwd(), 'src', 'app', 'Data', 'DataSet.json');

  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Iterates over each item in our dataset
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

    // Logging to debug findHighestOccurrence function
    console.log('Tree before finding highest occurrence:', tree);
    const highestOccurrence = tree.findHighestOccurrence(word);
    const lowestOccurrence = tree.findLowestOccurrence(word);
    const artistWithHighestOccurrences = tree.findArtistWithHighestOccurrences(word);
    console.log('Highest occurrence:', highestOccurrence);

    const treeData = tree.toReactD3TreeFormat();
    return NextResponse.json({ treeData, bfsResult, dfsResult, highestOccurrence, lowestOccurrence, artistWithHighestOccurrences});
  } catch (error) {
    console.error('Error processing tree data:', error);
    return NextResponse.json({ error: 'Error processing tree data' }, { status: 500 });
  }
}