import express from 'express'
import ejs from 'ejs'
import cors from 'cors'
import mongoose, { Schema } from 'mongoose'


mongoose.connect(
  "mongodb+srv://user:user@cluster0.wzncpwk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

let gameData = new Schema({
  id: String,
  isActive: Boolean,
  player1: String,
  player2: String,
  historyMove: Array,
});

let Game = mongoose.model('game', gameData)

// await Game.deleteMany({})













const app = express()
app.use(express.static('./static'))
app.set('view engine', 'ejs')



app.get('/', async (req, res)=>{
  res.render('index.ejs')
})


app.get('/get-moves/:id', async (req, res)=>{
  let id = req.params.id
  const game = await Game.findOne({id: id})
  res.send({historyMove: game.historyMove})
})



app.get('/game/:id/:symbol', async (req, res)=>{ 
  let id = req.params.id
  let symbol = req.params.symbol;

  if (id.length < 6 || id.length > 10){
    res.redirect("/");
  } 

  

  if (symbol != 'x' && symbol != 'o') {
    return res.send({error: 'not valid symbol'})
  }

  if (symbol == 'x'){

  const foundGame = await Game.findOne({id: id})

  if (foundGame){
   return res.redirect('/')
  }






    let game = new Game({
  id: id,
  isActive: false,
  player1: 'Alex',
  player2: 'Bob',
  historyMove: ['', '', '', '', '', '', '', '', ''],
  
})

await game.save()
  }





  if (symbol == 'o'){
    const game = await Game.findOne({id: id})
     
    console.log(game)

    if (!game) {
      return res.redirect('/')
    }
    await Game.findOneAndUpdate({id: id}, {
      isActive: true,
    })
  }
    res.render('game.ejs', {symbol: symbol, id: id})
})

app.get("/cabinet", (req, res) => {
  res.send({money: 2222})
});

app.get('/records', (req, res) => {
  res.render('records.ejs')
})


app.get("/get-new-id-game", (req, res) => {
  let id = 10_000_000 + Math.floor(Math.random() * 90_000_000);
  res.send({id: id})
});

app.get("/new-move/:symbol/:i/:id", async (req, res) => {
  let symbol = req.params.symbol; // x
  let i = req.params.i; // 6
  let id = req.params.id; // 45687833
  const game = await Game.findOne({id: id})

  

  if (game.isActive) {

  

  game.historyMove[i] = symbol

  await game.save()

  res.send({message: 'ok'})
} else {
  res.send({ message: "error" });
}

});


console.log('http://localhost:3000')
app.listen(3000)