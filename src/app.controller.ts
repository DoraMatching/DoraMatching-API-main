import { apiUrl } from '@/config';
import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {

    @Get()
    getHello(@Res() res?: Response) {
        return res.redirect(`${apiUrl}/docs`);
    }
}
