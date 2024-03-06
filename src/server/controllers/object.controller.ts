import {AObject} from "./interface.controller";

export class ElectionBallot extends AObject {
    public readonly timeCreated: Date;
    public readonly numberOfVotes: number;
    public isVoted: boolean;
    public trendId: number;
    constructor(ballot:any) {
        super();
        this.id = ballot.id;
        this.name = ballot.name;
        this.timeCreated = ballot.time_created;
        this.numberOfVotes = ballot.number_of_votes;
        this.isVoted = ballot.is_voted;
        this.trendId = ballot.trend_id;
    }
}

export class Trend extends AObject {
    public readonly description: string;
    public readonly timeCreated: Date;
    public readonly tags: string[];
    public readonly numberOfVotes: number;
    public readonly shortDescription: string;
    public readonly maxVotes: number;
    electionBallots: ElectionBallot[];
    constructor(trend:any) {
        super();
        this.id = trend.id;
        this.name = trend.name;
        this.description = trend.description;
        this.timeCreated = trend.time_created;
        this.tags = trend.tags;
        this.numberOfVotes = trend.number_of_votes;
        this.electionBallots = trend.election_ballots;
        this.shortDescription = trend.short_description;
        this.maxVotes = trend.max_votes;
    }
    public setElectionBallots(electionBallots: ElectionBallot[]): Trend {
        this.electionBallots = electionBallots;
        return this;
    }
}

export class User extends AObject {
    private gmail: string;
    private password: string;
    constructor(user:any) {
        super();
        this.id = user.id;
        this.name = user.name;
    }
    public login(gmail: string, password: string): boolean {
        return this.gmail === gmail && this.password === password;
    }
    public logout(): void {
        this.gmail = '';
        this.password = '';
    }

}
