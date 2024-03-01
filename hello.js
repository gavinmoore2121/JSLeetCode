const readline = require("readline")

const r_interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const solver = {
    solve: function(minutes, numSongs, songLengths) {
        let timeTaken = 0;
        while (true) {
            let shortestSongLength = Math.max();
            let shortestSongIndex = 0;
            for (let i = 0; i < numSongs; i++) {
                if (songLengths[i] < shortestSongLength) {
                    shortestSongLength = songLengths[i]
                    shortestSongIndex = i;
                }
            }

            if (timeTaken + shortestSongLength <= minutes * 60) {
                numSongs = numSongs - 1;
                songLengths.splice(shortestSongIndex, 1);
                timeTaken = timeTaken + shortestSongLength;
                shortestSongLength = Math.max()
            } else return timeTaken;
        }
    }
}

r_interface.once("line", line => {
    // collect line 1, the preamble data
    const [minutes, numSongs] = line.split('/ +/').map(Number)
    let songs;
    r_interface.on("line", line => {
        // parse lines of body data
        songs = line.split('/ +/').map(Number)
    })
        .on("close", () => {
            // all data has been read. run and print solution
            console.log(solver.solve(minutes, numSongs, songs))
        })
})