'use server';

class Song{
    constructor(title, artist, album, releaseDate, lyrics){
        this.title = title || 'Unknown Title';
        this.artist = artist || 'Unknown Artist';
        this.album = album || 'Unknown Album';
        this.releaseDate = releaseDate instanceof Date ? releaseDate : new Date(0);
        this.lyrics = this.processLyrics(lyrics);
    }

    processLyrics(lyrics) {
        if (typeof lyrics !== 'string'){
            console.warn(`Lyrics is not a string: ${lyrics}. Using empty string instead.`);
            lyrics = '';
        }
        const lyricsMap = new Map();
        const wordsArray = lyrics.split(' ');
        wordsArray.forEach(word => {
            word = word.toLowerCase();
            if(lyricsMap.has(word)){
            lyricsMap.set(word, lyricsMap.get(word) + 1);
            } 
            else{
            lyricsMap.set(word, 1);
            }
        });
        return lyricsMap;
    }
}
  
class AVLNode{
    constructor(song){
        this.song = song;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}
  
class AVLTree{
    constructor(){
        this.root = null;
    }
  
    // Gets the height of the node
    getHeight(node){
        if(node === null){
            return 0;
        }
        return node.height;
    }

    // Gets the balance of the tree
    getBalance(node){
        if(node === null){
            return 0;
        }
        return this.getHeight(node.left) - this.getHeight(node.right);
    }
  
    // Gets the maximum of two numbers
    getMax(a, b){
        return a > b ? a : b;
    }
  
    // Rotates right the node
    rightRotate(y){
        const x = y.left;
        const T2 = x.right;
    
        x.right = y;
        y.left = T2;
    
        y.height = this.getMax(this.getHeight(y.left), this.getHeight(y.right)) + 1;
        x.height = this.getMax(this.getHeight(x.left), this.getHeight(x.right)) + 1;
    
        return x;
    }
  
    // Rotates left the node
    leftRotate(x){
        const y = x.right;
        const T2 = y.left;
    
        y.left = x;
        x.right = T2;
    
        x.height = this.getMax(this.getHeight(x.left), this.getHeight(x.right)) + 1;
        y.height = this.getMax(this.getHeight(y.left), this.getHeight(y.right)) + 1;
    
        return y;
    }
  
    // Inserts a new node recursively and then balances the tree
    insert(node, song){

        if(node === null){
            return new AVLNode(song);
        } 
  
        if(song.title < node.song.title){
            node.left = this.insert(node.left, song);
        } 
        else if(song.title > node.song.title){
            node.right = this.insert(node.right, song);
        } 
        else{
            return node;
        }
  
        node.height = 1 + this.getMax(this.getHeight(node.left), this.getHeight(node.right));
    
        const balance = this.getBalance(node);
    
        if(balance > 1 && song.title < node.left.song.title){
            return this.rightRotate(node);
        } 

        if(balance < -1 && song.title > node.right.song.title){
            return this.leftRotate(node);
        }
        if(balance > 1 && song.title > node.left.song.title){
            node.left = this.leftRotate(node.left);
            return this.rightRotate(node);
        }
        if(balance < -1 && song.title < node.right.song.title){
            node.right = this.rightRotate(node.right);
            return this.leftRotate(node);
        }
    
        return node;
    }
  
    // Inserts a node with the song object passed, calls the insert method
    insertSong(song){
        this.root = this.insert(this.root, song);
    }
    
    // Traverse the tree using the BFS search
    bfs() {
        const result = new Set();
        const queue = [];

        if (this.root !== null) {
            queue.push(this.root);
        }

        while (queue.length > 0) {
            const node = queue.shift();
            result.add(`${node.song.title} by ${node.song.artist}`);

            if (node.left !== null) {
            queue.push(node.left);
            }

            if (node.right !== null) {
            queue.push(node.right);
            }
        }

        return result;
    }

    // Traverse the tree using the DFS search
    dfs() {
        const result = new Set();
        this.dfsUtil(this.root, result);
        return result;
    }

    dfsUtil(node, result) {
        if (node !== null) {
            result.add(`${node.song.title} by ${node.song.artist}`);
            this.dfsUtil(node.left, result);
            this.dfsUtil(node.right, result);
        }
    }

    // Converts each node to D3 format that it is used to display the tree
    toReactD3TreeFormat() {
        const convertNode = (node) => {
            if (!node) return null;
            return {
                name: node.song.title,
                attributes: {
                artist: node.song.artist,
                album: node.song.album,
                releaseDate: node.song.releaseDate.toISOString().split('T')[0]
                },
                children: [
                    convertNode(node.left),
                    convertNode(node.right)
                ].filter(Boolean)
            };
        };
    
        return convertNode(this.root);
      }
}

module.exports = {AVLTree, Song}