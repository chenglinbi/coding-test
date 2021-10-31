const express = require('express')

const app = express()
const sharksList = [
    'https://founded.media/hiring/photos/sharks/11261840124_dc9ac72bbe_b.jpg',
    'https://founded.media/hiring/photos/sharks/513197047_2f861d56cb_b.jpg',
    'https://founded.media/hiring/photos/sharks/2989909952_b59500107e_o.jpg',
    'https://founded.media/hiring/photos/sharks/4107884442_3baf8985f2_b.jpg',
    'https://founded.media/hiring/photos/sharks/3822452418_ffa66da89d_o.jpg',
    'https://founded.media/hiring/photos/sharks/3800013954_20fea3a9c9_b.jpg',
    'https://founded.media/hiring/photos/sharks/7109693941_250fc6b246_k.jpg',
    'https://founded.media/hiring/photos/sharks/8592704407_75c3c7ff53_h.jpg',
    'https://founded.media/hiring/photos/sharks/14730744390_cebc28aa86_k.jpg',
    'https://founded.media/hiring/photos/sharks/4936728723_91da549b05_b.jpg',
   ];

const catsList = [
    'https://founded.media/hiring/photos/cats/14157413946_fea785b4d6_k.jpg',
    'https://founded.media/hiring/photos/cats/16175483119_bd7374d8a8_h.jpg',
    'https://founded.media/hiring/photos/cats/13901304865_a444cf4d34_k.jpg',
    'https://founded.media/hiring/photos/cats/8311701653_49ed80202c_k.jpg',
    'https://founded.media/hiring/photos/cats/13336301695_3c06dd41cc_k.jpg',
    'https://founded.media/hiring/photos/cats/38679744435_66279af67c_k.jpg',
    'https://founded.media/hiring/photos/cats/6393395037_9cda69da1a_b.jpg',
    'https://founded.media/hiring/photos/cats/6977309082_44102ddf51_b.jpg',
    'https://founded.media/hiring/photos/cats/11477923503_bbdf86387d_b.jpg',
    'https://founded.media/hiring/photos/cats/4481336172_7f464f180d_b.jpg'
    ];
//sharks endpoint
app.get('/sharks', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    //set delay of 5 seconds to test loading message
    setTimeout(function() {res.send(JSON.stringify(sharksList))}, 5000)
    
})

//cats endpoint
app.get('/cats', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.send(JSON.stringify(catsList))
})

//endpoint to generate random cats and shark list every time it's called
app.get('/catsandsharks', (req, res) => {
    //deep copy of original cats and sharks array
    var newCatsList = catsList.map(cat => cat)
    var newSharksList = sharksList.map(shark => shark)
    
    var catsAndSharks = newCatsList.concat(newSharksList)
    var randomCatsAndSharks = []

    while (catsAndSharks.length > 0) {
        //generate a random number of 0 to length of catsAndSharks length
        let randInt = randomIntFromInterval(0, catsAndSharks.length - 1)
        //pull index of random number from catsAndSharks array
        let randomPicture = catsAndSharks[randInt]
        //populate random array
        randomCatsAndSharks.push(randomPicture)
        //remove item from catsAndSharks array
        catsAndSharks.splice(randInt, 1)
        
    }
    console.log(randomCatsAndSharks)
    console.log(catsAndSharks)
    res.set('Access-Control-Allow-Origin', '*');
    res.send(JSON.stringify(randomCatsAndSharks))
})

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

const PORT = process.env.port || 8080

app.listen(PORT, () => console.log(`started listening on port ${PORT}`))