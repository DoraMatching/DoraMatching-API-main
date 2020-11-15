import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller()
export class AppController {

    @Get()
    getHello(@Res() res?: Response, @Req() req?: Request) {
        return res.redirect(`${req.headers.host}/docs`);
    }
}
