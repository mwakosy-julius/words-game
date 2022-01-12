const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const datamuse = require('datamuse');

app.set("view engine", "ejs");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let port = process.env.PORT || 3030

const temp = [];
app.use("/", async (req, res)=>{
  console.log("I love Games!");
  
  while (true){
    const words = req.body.word;
    const word = (/.$/).exec(words);
    if(temp.indexOf(words) !== -1){
      break;
    } else{
      temp.push(words);
      const best = await datamuse.request(`words?sp=${word}*&max=100`).then((result) => {
      for (let answer of result){
        if(temp.indexOf(answer.word) !== -1){
        } else{
          temp.push(answer.word);
          break;
        }
      };
    }); 
    }
  };
  
  const viewData = {
    temp: temp[temp.length - 1],
  }
  res.render('index.ejs', viewData);
});

app.listen(port,()=>{
  console.log("i just started eating code!.");
});