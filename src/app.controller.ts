import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { apiUrl } from '@/config';

@Controller()
export class AppController {

    @Get()
    getHello(@Res() res?: Response) {
        return res.redirect(`${apiUrl}/docs`);
    }
}
