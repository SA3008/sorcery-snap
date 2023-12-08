import express from "express";
import *  as dotenv from 'dotenv';
// import  OpenAI  from 'openai';
//old
import {Configuration, OpenAIApi} from 'openai';




dotenv.config();

const router = express.Router();

//old
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

var openai = new OpenAIApi(configuration);



// const openai = new OpenAI({
//     apiKey: process.env.OpenAI_API_KEY
// });

router.route('/').get((req, res) => {
    res.send("hello from DALL-E!12dfdsdfsdf23");
})

router.route('/').post(async (req, res) => {
    try {
      const { prompt } = req.body;
  
      const aiResponse = await openai.createImage({
        prompt,
        n: 1,
        size: '256x256',
        response_format: 'b64_json',
      });

      console.log("this is aiResponse");
      console.log(aiResponse);
      console.log("end of response");
  
      const image = aiResponse.data.data[0].b64_json;
      res.status(200).json({ photo: image });
    } catch (error) {
      console.log("this is the api error");
      console.error(error);
      res.status(500).send(error?.response.data.error.message || 'Something went wrong');
    }
  });

  


export default router;



