import { AdventureModel } from "../models/AdventureModel";
import { CharacterModel } from "../models/characterModel";
import { RaceModel } from "../models/raceModel";
import { UserModel } from "../models/userModel";

export class AppState {
    public nonUser: boolean;
    public beforeRegisterChar: CharacterModel
    public character: CharacterModel;
    public characters: CharacterModel[];
    public user: UserModel;
    public race: RaceModel;
    public participatingAdv: AdventureModel[];
    public leadingAdv: AdventureModel[];
    firstLoginAd: boolean
    public constructor() {
        this.nonUser = false;
        this.beforeRegisterChar = new CharacterModel();
        this.character = new CharacterModel();
        this.characters = [];
        this.firstLoginAd = true;
        this.user = new UserModel();
        this.race = new RaceModel();
        this.participatingAdv = []
        this.leadingAdv = []
    }
}
