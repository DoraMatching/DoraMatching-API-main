import { Injectable } from "@nestjs/common";
import { use } from "passport";
import { Strategy } from "passport-github";
import { githubCallback, githubClientId, githubClientSecret } from "src/config";
import { GithubStrategyConfig } from "./config";

@Injectable()
export class GithubStrategy {
    constructor() {
        this.init();
    }

    init() {
        const githubConfig: GithubStrategyConfig = {
            clientID: githubClientId,
            clientSecret: githubClientSecret,
            callbackURL: `https://api.dev.doramatching.tk/auth/github`,
            scope: ['user:email']
        }

        console.log(githubConfig);

        const githubStrategy = new Strategy(githubConfig, async (accessToken: string, refreshToken: string, profile: any, done: any) => {
            console.log({ accessToken, refreshToken, profile });
            done(null, profile);
        });

        use('github', githubStrategy);
    }
}