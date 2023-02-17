const OpenAI = require('openai');
const { Configuration, OpenAIApi } = OpenAI;


const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 3001;
const dotenv = require('dotenv')

dotenv.config();

const configuration = new Configuration({
    organization: "org-cYKcpqtsZonxlg10R5i1QaC2",
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);



app.use(bodyParser.json());
app.use(cors());

app.post('/', async (req, res) => {
    const { message } = req.body;
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `És um cozinheiro de um restaurante popular, responde consoante o número de ingredientes que o utilizador fornece. 
        Deves também colocar a receita em esquema, passo a passo.
        Pessoa: ${message}
        Assistente:`,
        max_tokens: 300,
        temperature: 0.3,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        });
        console.log(response.data)
        if(response.data.choices[0].text){  
            res.json({message: response.data.choices[0].text})
        }
});

app.listen(port, () => {
    console.log('Example app listening at https://localhost:3000/');
});

