const express = require('express');
const { Client } = require('@notionhq/client')
const cors = require('cors');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json()

const app =express();

app.use(cors());

const PORT = 4000;
const HOST = "localhost";

const notion = new Client({auth: "secret_HCpJWrNx2ZfnUn3SYynSWzNN996B7kPAAcIEPzpvO6n"});

const databaseId = "31b919b8687a447aa010f9fe0def0786";

app.post('/submitFormToNotion',jsonParser, async (req,res) => {
    const name = req.body.name;
    const content = req.body.content;

    try {
        const response = await notion.pages.create({
            parent: { database_id: databaseId},
            properties: {
                "Name": {
                    title: [
                        {
                            "text": {
                                "content": name
                            }
                        }
                    ]
                },
                "Content": {
                    rich_text: [
                        {
                            "text": {
                                "content": content
                            }
                        }
                    ]
                }
            }
        })
        console.log(response);
        console.log("Sucess");
    } catch(error) {
        console.log(error)
    }
})

app.listen(PORT,HOST,() => {
    console.log("Starting proxy at "+HOST+":"+PORT);
});