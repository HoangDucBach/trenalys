import {AObject} from "./interface.controller";

export class TrendItem extends AObject {
    private numberOfVotes: number;

    public increaseVote(): void {
        this.numberOfVotes++;
    }

    public decreaseVote(): void {
        this.numberOfVotes--;
    }
}

export class TrendTag extends AObject {

}

export class Trend extends AObject {
    private items: TrendItem[];
    private description: string;
    private timeCreated: Date;
    private trendTags: TrendTag[];
    private numberOfVotes: number;

    public addTrendItem(item: TrendItem): void {
        this.items.push(item);
    }

    public removeTrendItem(item: TrendItem): void {
        this.items = this.items.filter(i => i !== item);
    }

    public increaseVote(): void {
        this.numberOfVotes++;
    }

    public decreaseVote(): void {
        this.numberOfVotes--;
    }

}

export class User extends AObject {
    private gmail: string;
    private password: string;
    private trendsFollowed: Trend[];

    public followTrend(trend: Trend): void {
        this.trendsFollowed.push(trend);
    }

    public unfollowTrend(trend: Trend): void {
        this.trendsFollowed = this.trendsFollowed.filter(t => t !== trend);
    }

    public changePassword(password: string): void {
        this.password = password;
    }

    public changeGmail(gmail: string): void {
        this.gmail = gmail;
    }

    public login(gmail: string, password: string): boolean {
        return this.gmail === gmail && this.password === password;
    }

    public logout(): void {
        this.gmail = '';
        this.password = '';
    }

    public voteTrendItem(trendItem: TrendItem): void {
        trendItem.increaseVote();
    }

}
