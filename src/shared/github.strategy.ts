import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-github";
import { githubCallback, githubClientId, githubClientSecret } from "src/config";
import { GithubStrategyConfig } from "./config";

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
    constructor() {
        const githubConfig: GithubStrategyConfig = {
            clientID: githubClientId,
            clientSecret: githubClientSecret,
            callbackURL: githubCallback,
            scope: ['email']
        };

        super(githubConfig);
    }

    async validate (accessToken: string, refreshToken: string, profile: any, done: any): Promise<any> {
        const { name, emails, photos } = profile
        const user = {
          email: emails[0].value,
          firstName: name.givenName,
          lastName: name.familyName,
          picture: photos[0].value,
          accessToken
        }
        console.log(user);
        done(null, user);
      }
}