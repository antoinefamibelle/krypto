import express, { Request, Response, Router } from "express";
import handler from 'express-async-handler';
import axios from 'axios';

/**
 * @description
 * Setup a ping route to test that the server is working correctly.
 **/
export const routerPing: Router = express.Router();

routerPing.get('/ping', handler(async (req: Request, res: Response) => {
    const response: any = await axios.get(
      'http://api.giphy.com/v1/gifs/search?q=pingpong&api_key=96pH922TIp1MhX6MuqzcaXn63E26CuZh&limit=100',
    );
    const i = Math.floor(Math.random() * 30) + 1;

    res.send(`
      <image src="${response.data.data[i].images?.original?.url}"  alt="pingpong"  width="100%" height="100%" />
    `);
  }),
);
