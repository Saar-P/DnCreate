import { CharacterModel } from "../models/characterModel";
import { clericDomainSpellsPicker } from "./clericDomainSpellsPicker";
import { druidCircleSpellsPicker } from "./druidCircleSpellsPicker";
import { paladinOathSpellsPicker } from "./paladinOathSpellsPicker";


const Barbarian = (level: number, character: CharacterModel) => {
    let paths: any[] = [{ name: "Path of the Berserker", description: "For some barbarians, rage is a means to an end – that end being violence. The Path of the Berserker is a path of untrammeled fury, slick with blood. As you enter the berserker's rage, you thrill in the chaos of battle, heedless of your own health or well-being." },
    { name: "Path of the Totem Warrior", description: "The Path of the Totem Warrior is a spiritual journey, as the barbarian accepts a spirit animal as guide, protector, and inspiration. In battle, your totem spirit fills you with supernatural might, adding magical fuel to your barbarian rage. Most barbarian tribes consider a totem animal to be kin to a particular clan. In such cases, it is unusual for an individual to have more than one totem animal spirit, though exceptions exist." }]
    let LevelUpFunction: any;
    switch (true) {
        case level === 1:
            LevelUpFunction = {
                operation: true, action: { rageAmount: 2, rageDamage: 2 }
            }
            break;
        case level === 2:
            LevelUpFunction = {
                operation: true, action: { rageAmount: 2, rageDamage: 2 }
            }
            break;
        case level === 3:
            LevelUpFunction = {
                operation: true, action: { pathFeature: true, pathSelector: paths, rageAmount: 3, rageDamage: 2 }
            }
            break;
        case level === 4:
            LevelUpFunction = {
                operation: true, action: { abilityPointIncrease: true, rageAmount: 3, rageDamage: 2 }
            }
            break;
        case level === 5:
            LevelUpFunction = {
                operation: true, action: { rageAmount: 3, rageDamage: 2 }
            }
            break;
        case level === 6:
            LevelUpFunction = {
                operation: true, action: { pathFeature: true, rageAmount: 4, rageDamage: 2 }
            }
            break;
        case level === 7:
            LevelUpFunction = {
                operation: true, action: { rageAmount: 4, rageDamage: 2 }
            }
            break;
        case level === 8:
            LevelUpFunction = {
                operation: true, action: { abilityPointIncrease: true, rageAmount: 4, rageDamage: 2 }
            }
            break;
        case level === 9:
            LevelUpFunction = {
                operation: true, action: { rageAmount: 4, rageDamage: 3 }
            }
            break;
        case level === 10:
            LevelUpFunction = {
                operation: true, action: { pathFeature: true, rageAmount: 4, rageDamage: 3 }
            }
            break;
        case level === 11:
            LevelUpFunction = {
                operation: true, action: { rageAmount: 4, rageDamage: 3 }
            }
            break;
        case level === 12:
            LevelUpFunction = {
                operation: true, action: { abilityPointIncrease: true, rageAmount: 5, rageDamage: 3 }
            }
            break;
        case level === 13:
            LevelUpFunction = {
                operation: true, action: { rageAmount: 5, rageDamage: 3 }
            }
            break;
        case level === 14:
            LevelUpFunction = {
                operation: true, action: { pathFeature: true, rageAmount: 5, rageDamage: 3 }
            }
            break;
        case level === 15:
            LevelUpFunction = {
                operation: true, action: { rageAmount: 5, rageDamage: 3 }
            }
            break;
        case level === 16:
            LevelUpFunction = {
                operation: true, action: { abilityPointIncrease: true, rageAmount: 5, rageDamage: 4 }
            }
        case level === 17:
            LevelUpFunction = {
                operation: true, action: { rageAmount: 6, rageDamage: 4 }
            }
            break;
        case level === 18:
            LevelUpFunction = {
                operation: true, action: { rageAmount: 6, rageDamage: 4 }
            }
            break;
        case level === 19:
            LevelUpFunction = {
                operation: true, action: { abilityPointIncrease: true, rageAmount: 6, rageDamage: 4 }
            }
        case level === 20:
            LevelUpFunction = {
                operation: true, action: { rageAmount: 99, rageDamage: 4 }
            }
            break;

    }
    return LevelUpFunction;
}


const Bard = (level: number, character: CharacterModel) => {
    let paths: any[] = [{ name: "College of Lore", description: "Bards of the College of Lore know something about most things, collecting bits of knowledge from sources as diverse as scholarly tomes and peasant tales. Whether singing folk ballads in taverns or elaborate compositions in royal courts, these bards use their gifts to hold audiences spellbound. The loyalty of these bards lies in the pursuit of beauty and truth, not in fealty to a monarch or following the tenets of a deity.The college's members gather in libraries and sometimes in actual colleges, complete with classrooms and dormitories, to share their lore with one another." },
    { name: "College of Valor", description: "Bards of the College of Valor are daring skalds whose tales keep alive the memory of the great heroes of the past, and thereby inspire a new generation of heroes. These bards gather in mead halls or around great bonfires to sing the deeds of the mighty, both past and present." }]
    let LevelUpFunction: any;
    switch (true) {
        case (level === 1):
            LevelUpFunction = {
                operation: true, action: { cantrips: 2, spells: [2, 0, 0, 0, 0, 0, 0, 0, 0], spellsKnown: 4 }
            }
            break;
        case (level === 2):
            LevelUpFunction = {
                operation: true, action: { cantrips: 2, spells: [3, 0, 0, 0, 0, 0, 0, 0, 0], spellsKnown: 5 }
            }
            break;
        case (level === 3):
            LevelUpFunction = {
                operation: true, action: { pathFeature: true, cantrips: 2, spells: [4, 2, 0, 0, 0, 0, 0, 0, 0], pathSelector: paths, expertise: 2, spellsKnown: 6 }
            }
            break;
        case (level === 4):
            LevelUpFunction = {
                operation: true, action: { cantrips: 3, spells: [4, 3, 0, 0, 0, 0, 0, 0, 0], abilityPointIncrease: true, spellsKnown: 7 }
            }
            break;
        case (level === 5):
            LevelUpFunction = {
                operation: true, action: { cantrips: 3, spells: [4, 3, 2, 0, 0, 0, 0, 0, 0], spellsKnown: 8 }
            }
            break;
        case (level === 6):
            LevelUpFunction = {
                operation: true, action: { cantrips: 3, spells: [4, 3, 3, 0, 0, 0, 0, 0, 0], pathFeature: true, spellsKnown: 9 }
            }
            break;
        case (level === 7):
            LevelUpFunction = {
                operation: true, action: { cantrips: 3, spells: [4, 3, 3, 1, 0, 0, 0, 0, 0], spellsKnown: 10 }
            }
            break;
        case (level === 8):
            LevelUpFunction = {
                operation: true, action: { cantrips: 3, spells: [4, 3, 3, 2, 0, 0, 0, 0, 0], abilityPointIncrease: true, spellsKnown: 11 }
            }
            break;
        case (level === 9):
            LevelUpFunction = {
                operation: true, action: { cantrips: 3, spells: [4, 3, 3, 3, 1, 0, 0, 0, 0], spellsKnown: 12 }
            }
            break;
        case (level === 10):
            LevelUpFunction = {
                operation: true, action: { cantrips: 4, spells: [4, 3, 3, 3, 2, 0, 0, 0, 0], expertise: 2, spellsKnown: 14 }
            }
            break;
        case (level === 11):
            LevelUpFunction = {
                operation: true, action: { cantrips: 4, spells: [4, 3, 3, 3, 2, 1, 0, 0, 0], spellsKnown: 15 }
            }
            break;
        case (level === 12):
            LevelUpFunction = {
                operation: true, action: { cantrips: 4, spells: [4, 3, 3, 3, 2, 1, 0, 0, 0], abilityPointIncrease: true, spellsKnown: 15 }
            }
            break;
        case (level === 13):
            LevelUpFunction = {
                operation: true, action: { cantrips: 4, spells: [4, 3, 3, 3, 2, 1, 1, 0, 0], spellsKnown: 16 }
            }
            break;
        case (level === 14):
            LevelUpFunction = {
                operation: true, action: { cantrips: 4, spells: [4, 3, 3, 3, 2, 1, 1, 0, 0], pathFeature: true, spellsKnown: 18 }
            }
            break;
        case (level === 15):
            LevelUpFunction = {
                operation: true, action: { cantrips: 4, spells: [4, 3, 3, 3, 2, 1, 1, 1, 0], spellsKnown: 19 }
            }
            break;
        case (level === 16):
            LevelUpFunction = {
                operation: true, action: { cantrips: 4, spells: [4, 3, 3, 3, 2, 1, 1, 1, 0], abilityPointIncrease: true, spellsKnown: 19 }
            }
            break;
        case (level === 17):
            LevelUpFunction = {
                operation: true, action: { cantrips: 4, spells: [4, 3, 3, 3, 2, 1, 1, 1, 1], spellsKnown: 20 }
            }
            break;
        case (level === 18):
            LevelUpFunction = {
                operation: true, action: { cantrips: 4, spells: [4, 3, 3, 3, 2, 1, 1, 1, 1], spellsKnown: 22 }
            }
            break;
        case (level === 19):
            LevelUpFunction = {
                operation: true, action: { cantrips: 4, spells: [4, 3, 3, 3, 2, 2, 1, 1, 1], abilityPointIncrease: true, spellsKnown: 22 }
            }
            break;
        case (level === 20):
            LevelUpFunction = {
                operation: true, action: { cantrips: 4, spells: [4, 3, 3, 3, 2, 2, 2, 1, 1], spellsKnown: 22 }
            }
            break;
    }
    return LevelUpFunction;
}


const Fighter = (level: number, character: CharacterModel) => {
    let fightingStyle: any[] = [{ name: 'Archery', description: 'You gain a +2 bonus to attack rolls you make with ranged weapons.' }, { name: "Defence", description: "While you are wearing armor, you gain a +1 bonus to AC." }, { name: 'dueling', description: 'When you are wielding a melee weapon in one hand and no other weapons, you gain a +2 bonus to damage rolls with that weapon.' }, { name: 'Great Weapon Fighting', description: 'When you roll a 1 or 2 on a damage die for an attack you make with a melee weapon that you are wielding with two hands, you can reroll the die and must use the new roll, even if the new roll is a 1 or a 2. The weapon must have the two-handed or versatile property for you to gain this benefit.' },
    { name: 'Protection', description: 'When a creature you can see attacks a target other than you that is within 5 feet of you, you can use your reaction to impose disadvantage on the attack roll. You must be wielding a shield.' }, { name: 'Two-Weapon Fighting', description: 'When you engage in two-weapon fighting, you can add your ability modifier to the damage of the second attack.' }]
    let paths: any[] = [{ name: "Eldritch Knight", description: "The archetypal Eldritch Knight combines the martial mastery common to all fighters with a careful study of magic. Eldritch Knights use magical techniques similar to those practiced by wizards. These knights learn a comparatively small number of spells, committing them to memory instead of keeping them in a spellbook." },
    { name: "Champion", description: "The archetypal Champion focuses on the development of raw physical power honed to deadly perfection. Those who model themselves on this archetype combine rigorous training with physical excellence to deal devastating blows." },
    { name: "Battle Master", description: "Those who emulate the archetypal Battle Master employ martial techniques passed down through generations. To a Battle Master, combat is an academic field, sometimes including subjects beyond battle such as weaponsmithing and calligraphy. Not every fighter absorbs the lessons of history, theory, and artistry that are reflected in the Battle Master archetype, but those who do are well-rounded fighters of great skill and knowledge." }]
    let LevelUpFunction: any;
    switch (true) {
        case level === 1:
            LevelUpFunction = {
                operation: true, action: { pickFightingStyle: fightingStyle }
            }
            break;
        case level === 3:
            LevelUpFunction = {
                operation: true, action: { pathFeature: true, pathSelector: paths }
            }
            break;
        case level === 4:
            character.path.name !== 'Eldritch Knight' ? LevelUpFunction = { operation: true, action: { abilityPointIncrease: true } } : LevelUpFunction = { operation: true, action: { abilityPointIncrease: true, cantrips: 2, spells: [3, 0, 0, 0, 0, 0, 0, 0, 0], spellsKnown: 3 } }
            break;
        case level === 6:
            LevelUpFunction = {
                operation: true, action: { abilityPointIncrease: true }
            }
            break;
        case level === 7:
            character.path.name !== 'Eldritch Knight' ? LevelUpFunction = { operation: true, action: { pathFeature: true } } : LevelUpFunction = { operation: true, action: { pathFeature: true, cantrips: 2, spells: [4, 2, 0, 0, 0, 0, 0, 0, 0], spellsKnown: 5 } }
            break;
        case level === 8:
            character.path.name !== 'Eldritch Knight' ? LevelUpFunction = { operation: true, action: { abilityPointIncrease: true } } : LevelUpFunction = { operation: true, action: { abilityPointIncrease: true, cantrips: 2, spells: [4, 2, 0, 0, 0, 0, 0, 0, 0], spellsKnown: 6 } }
            break;
        case level === 10:
            character.path.name !== 'Eldritch Knight' ? LevelUpFunction = { operation: true, action: { pathFeature: true } } : LevelUpFunction = { operation: true, action: { pathFeature: true, cantrips: 3, spells: [4, 3, 0, 0, 0, 0, 0, 0, 0], spellsKnown: 7 } }
            break;
        case level === 11:
            character.path.name !== 'Eldritch Knight' ? LevelUpFunction = { operation: false } : LevelUpFunction = { operation: true, action: { cantrips: 3, spells: [4, 3, 0, 0, 0, 0, 0, 0, 0], spellsKnown: 8 } }
            break;
        case level === 12:
            LevelUpFunction = {
                operation: true, action: { abilityPointIncrease: true }
            }
            break;
        case level === 13:
            character.path.name !== 'Eldritch Knight' ? LevelUpFunction = { operation: false } : LevelUpFunction = { operation: true, action: { cantrips: 3, spells: [4, 3, 2, 0, 0, 0, 0, 0, 0], spellsKnown: 9 } }
            break;
        case level === 14:
            character.path.name !== 'Eldritch Knight' ? LevelUpFunction = { operation: true, action: { abilityPointIncrease: true } } : LevelUpFunction = { operation: true, action: { abilityPointIncrease: true, cantrips: 3, spells: [4, 3, 2, 0, 0, 0, 0, 0, 0], spellsKnown: 10 } }
            break;
        case level === 15:
            LevelUpFunction = {
                operation: true, action: { pathFeature: true }
            }
            break;
        case level === 16:
            character.path.name !== 'Eldritch Knight' ? LevelUpFunction = { operation: true, action: { abilityPointIncrease: true } } : LevelUpFunction = { operation: true, action: { abilityPointIncrease: true, cantrips: 3, spells: [4, 3, 3, 0, 0, 0, 0, 0, 0], spellsKnown: 11 } }
            break;
        case level === 18:
            LevelUpFunction = {
                operation: true, action: { pathFeature: true }
            }
        case level === 19:
            character.path.name !== 'Eldritch Knight' ? LevelUpFunction = { operation: true, action: { abilityPointIncrease: true } } : LevelUpFunction = { operation: true, action: { abilityPointIncrease: true, cantrips: 3, spells: [4, 3, 3, 1, 0, 0, 0, 0, 0], spellsKnown: 12 } }
            break;
        case level === 20:
            character.path.name !== 'Eldritch Knight' ? LevelUpFunction = { operation: false } : LevelUpFunction = { operation: true, action: { cantrips: 3, spells: [4, 3, 3, 1, 0, 0, 0, 0, 0], spellsKnown: 13 } }
            break;

    }
    return LevelUpFunction;
}

const Druid = (level: number, character: CharacterModel) => {
    let cantrips: number = 0;
    let spells: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let paths: any[] = [{ name: "Circle of the Moon", description: "Druids of the Circle of the Moon are fierce guardians of the wilds. Their order gathers under the full moon to share news and trade warnings. They haunt the deepest parts of the wilderness, where they might go for weeks on end before crossing paths with another humanoid creature, let alone another druid." },
    { name: "Circle of the Land", description: "The Circle of the Land is made up of mystics and sages who safeguard ancient knowledge and rites through a vast oral tradition. These druids meet within sacred circles of trees or standing stones to whisper primal secrets in Druidic. The circle's wisest members preside as the chief priests of communities that hold to the Old Faith and serve as advisors to the rulers of those folk. As a member of this circle, your magic is influenced by the land where you were initiated into the circle's mysterious rites." }]
    let LevelUpFunction: any;
    switch (true) {
        case level === 1:
            cantrips = 2;
            spells = [2, 0, 0, 0, 0, 0, 0, 0, 0];
            LevelUpFunction = {
                operation: true, action: { cantrips: cantrips, spells: spells }
            }
            break;
        case level === 2:
            cantrips = 2;
            spells = [3, 0, 0, 0, 0, 0, 0, 0, 0];
            LevelUpFunction = {
                operation: true, action: { cantrips: cantrips, spells: spells, pathSelector: paths, pathFeature: true }
            }
            break;
        case level === 3:
            cantrips = 2;
            spells = [4, 2, 0, 0, 0, 0, 0, 0, 0];
            character.path.name !== 'Circle of the Land' ? LevelUpFunction = { operation: true, action: { cantrips: cantrips, spells: spells } } : LevelUpFunction = { operation: true, action: { extraSpells: druidCircleSpellsPicker(character.level, character.charSpecials.druidCircle, character), cantrips: cantrips, spells: spells } }
            break;
        case level === 4:
            cantrips = 2;
            spells = [4, 3, 0, 0, 0, 0, 0, 0, 0];
            LevelUpFunction = {
                operation: true, action: { cantrips: cantrips, spells: spells, abilityPointIncrease: true }
            }
            break;
        case level === 5:
            cantrips = 3;
            spells = [4, 3, 2, 0, 0, 0, 0, 0, 0];
            character.path.name !== 'Circle of the Land' ? LevelUpFunction = { operation: true, action: { cantrips: cantrips, spells: spells } } : LevelUpFunction = { operation: true, action: { extraSpells: druidCircleSpellsPicker(character.level, character.charSpecials.druidCircle, character), cantrips: cantrips, spells: spells } }
            break;
        case level === 6:
            cantrips = 3;
            spells = [4, 3, 3, 0, 0, 0, 0, 0, 0];
            LevelUpFunction = {
                operation: true, action: { cantrips: cantrips, spells: spells, pathFeature: true }
            }
            break;
        case level === 7:
            cantrips = 3;
            spells = [4, 3, 3, 1, 0, 0, 0, 0, 0];
            character.path.name !== 'Circle of the Land' ? LevelUpFunction = { operation: true, action: { cantrips: cantrips, spells: spells } } : LevelUpFunction = { operation: true, action: { extraSpells: druidCircleSpellsPicker(character.level, character.charSpecials.druidCircle, character), cantrips: cantrips, spells: spells } }
            break;
        case level === 8:
            cantrips = 3;
            spells = [4, 3, 3, 2, 0, 0, 0, 0, 0];
            LevelUpFunction = {
                operation: true, action: { cantrips: cantrips, spells: spells, abilityPointIncrease: true }
            }
            break;
        case level === 9:
            cantrips = 3;
            spells = [4, 3, 3, 3, 1, 0, 0, 0, 0];
            character.path.name !== 'Circle of the Land' ? LevelUpFunction = { operation: true, action: { cantrips: cantrips, spells: spells } } : LevelUpFunction = { operation: true, action: { extraSpells: druidCircleSpellsPicker(character.level, character.charSpecials.druidCircle, character), cantrips: cantrips, spells: spells } }
            break;
        case level === 10:
            cantrips = 4;
            spells = [4, 3, 3, 3, 2, 0, 0, 0, 0];
            LevelUpFunction = {
                operation: true, action: { cantrips: cantrips, spells: spells, pathFeature: true }
            }
            break;
        case level === 11:
            cantrips = 4;
            spells = [4, 3, 3, 3, 2, 1, 0, 0, 0];
            LevelUpFunction = {
                operation: true, action: { cantrips: cantrips, spells: spells }
            }
            break;
        case level === 12:
            cantrips = 4;
            spells = [4, 3, 3, 3, 2, 1, 0, 0, 0];
            LevelUpFunction = {
                operation: true, action: { cantrips: cantrips, spells: spells, abilityPointIncrease: true }
            }
            break;
        case level === 13:
            cantrips = 4;
            spells = [4, 3, 3, 3, 2, 1, 1, 0, 0];
            LevelUpFunction = {
                operation: true, action: { cantrips: cantrips, spells: spells }
            }
            break;
        case level === 14:
            cantrips = 4;
            spells = [4, 3, 3, 3, 2, 1, 1, 0, 0];
            LevelUpFunction = {
                operation: true, action: { cantrips: cantrips, spells: spells, pathFeature: true }
            }
            break;
        case level === 15:
            cantrips = 4;
            spells = [4, 3, 3, 3, 2, 1, 1, 1, 0];
            LevelUpFunction = {
                operation: true, action: { cantrips: cantrips, spells: spells }
            }
            break;
        case level === 16:
            cantrips = 4;
            spells = [4, 3, 3, 3, 2, 1, 1, 1, 0];
            LevelUpFunction = {
                operation: true, action: { cantrips: cantrips, spells: spells, abilityPointIncrease: true }
            }
            break;
        case level === 17:
            cantrips = 4;
            spells = [4, 3, 3, 3, 2, 1, 1, 1, 1];
            LevelUpFunction = {
                operation: true, action: { cantrips: cantrips, spells: spells }
            }
            break;
        case level === 18:
            cantrips = 4;
            spells = [4, 3, 3, 3, 3, 1, 1, 1, 1];
            LevelUpFunction = {
                operation: true, action: { cantrips: cantrips, spells: spells }
            }
            break;
        case level === 19:
            cantrips = 4;
            spells = [4, 3, 3, 3, 3, 2, 1, 1, 1];
            LevelUpFunction = {
                operation: true, action: { cantrips: cantrips, spells: spells, abilityPointIncrease: true }
            }
            break;
        case level === 20:
            cantrips = 4;
            spells = [4, 3, 3, 3, 3, 2, 2, 1, 1];
            LevelUpFunction = {
                operation: true, action: { cantrips: cantrips, spells: spells }
            }
            break;
    }

    return LevelUpFunction;
}

const Cleric = (level: number, character: CharacterModel) => {
    let cantrips: number = 0;
    let spells: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let paths: any[] = [{ name: "Knowledge Domain", description: "The gods of knowledge – including Oghma, Boccob, Gilean, Aureon, and Thoth – value learning and understanding above all. Some teach that knowledge is to be gathered and shared in libraries and universities, or promote the practical knowledge of craft and invention. Some deities hoard knowledge and keep its secrets to themselves. And some promise their followers that they will gain tremendous power if they unlock the secrets of the multiverse." },
    { name: "Life Domain", description: "The Life domain focuses on the vibrant positive energy – one of the fundamental forces of the universe – that sustains all life. The gods of life promote vitality and health through healing the sick and wounded, caring for those in need, and driving away the forces of death and undeath." },
    { name: "Light Domain", description: "Gods of light – including Helm, Lathander, Pholtus, Branchala, the Silver Flame, Belenus, Apollo, and Re-Horakhty – promote the ideals of rebirth and renewal, truth, vigilance, and beauty, often using the symbol of the sun. Some of these gods are portrayed as the sun itself or as a charioteer who guides the sun across the sky. Others are tireless sentinels whose eyes pierce every shadow and see through every deception." },
    { name: "Nature Domain", description: "Gods of nature are as varied as the natural world itself; from inscrutable gods of the deep forests (such as Silvanus, Obad-Hai, Chislev, Balinor, and Pan) to friendly deities associated with particular springs and groves (such as Eldath). many of these gods have clerics, champions who take a more active role in advancing the interests of a particular nature god." },
    { name: "Tempest Domain", description: "Gods whose portfolios include the Tempest domain – including Talos, Umberlee, Kord, Zeboim, the Devourer, Zeus, and Thor – govern storms, sea, and, sky. They include gods of lightning and thunder, gods of earthquakes, some fire gods, and certain gods of violence, physical strength, and courage. In some pantheons, a god of this domain rules over other deities and is known for swift justice delivered by thunderbolts." },
    { name: "Trickery Domain", description: "Gods of trickery – such as Tymora, Beshaba, Olidammara, the Traveler, Garl Glittergold, and Loki – are mischief-makers and instigators who stand as a constant challenge to the accepted order among both gods and mortals. They're patrons of thieves, scoundrels, gamblers, rebels, and liberators. Their clerics are a disruptive force in the world, puncturing pride, mocking tyrants, stealing from the rich, freeing captives, and flouting hollow traditions." },
    { name: "War Domain", description: "War has many manifestations. It can make heroes of ordinary people. It can be desperate and horrific, with acts of cruelty and cowardice eclipsing instances of excellence and courage. In either case, the gods of war watch over warriors and reward them for their great deeds. The clerics of such gods excel in battle, inspiring others to fight the good fight or offering acts of violence as prayers." }]
    let LevelUpFunction: any;
    switch (true) {
        case level === 1:
            cantrips = 3;
            spells = [2, 0, 0, 0, 0, 0, 0, 0, 0];
            LevelUpFunction = {
                operation: true, action: { pathFeature: true, cantrips: cantrips, spells: spells, pathSelector: paths }
            }
            break;
        case level === 2:
            cantrips = 3;
            spells = [3, 0, 0, 0, 0, 0, 0, 0, 0];
            LevelUpFunction = {
                operation: true, action: { cantrips: cantrips, spells: spells, pathFeature: true }
            }
            break;
        case level === 3:
            cantrips = 3;
            spells = [4, 2, 0, 0, 0, 0, 0, 0, 0];
            LevelUpFunction = {
                operation: true, action: { cantrips: cantrips, spells: spells, extraSpells: clericDomainSpellsPicker(character.level, character.path.name, character) }
            }
            break;
        case level === 4:
            cantrips = 4;
            spells = [4, 3, 0, 0, 0, 0, 0, 0, 0];
            LevelUpFunction = {
                operation: true, action: { cantrips: cantrips, spells: spells, abilityPointIncrease: true }
            }
            break;
        case level === 5:
            cantrips = 4;
            spells = [4, 3, 2, 0, 0, 0, 0, 0, 0];
            LevelUpFunction = {
                operation: true, action: { cantrips: cantrips, spells: spells, extraSpells: clericDomainSpellsPicker(character.level, character.path.name, character) }
            }
            break;
        case level === 6:
            cantrips = 4;
            spells = [4, 3, 3, 0, 0, 0, 0, 0, 0];
            LevelUpFunction = {
                operation: true, action: { cantrips: cantrips, spells: spells, pathFeature: true }
            }
            break;
        case level === 7:
            cantrips = 4;
            spells = [4, 3, 3, 1, 0, 0, 0, 0, 0];
            LevelUpFunction = {
                operation: true, action: { cantrips: cantrips, spells: spells, extraSpells: clericDomainSpellsPicker(character.level, character.path.name, character) }
            }
            break;
        case level === 8:
            cantrips = 4;
            spells = [4, 3, 3, 2, 0, 0, 0, 0, 0];
            LevelUpFunction = {
                operation: true, action: { cantrips: cantrips, spells: spells, pathFeature: true, abilityPointIncrease: true }
            }
            break;
        case level === 9:
            cantrips = 4;
            spells = [4, 3, 3, 3, 1, 0, 0, 0, 0];
            LevelUpFunction = {
                operation: true, action: { cantrips: cantrips, spells: spells, extraSpells: clericDomainSpellsPicker(character.level, character.path.name, character) }
            }
            break;
        case level === 10:
            cantrips = 5;
            spells = [4, 3, 3, 3, 2, 0, 0, 0, 0];
            LevelUpFunction = {
                operation: true, action: { cantrips: cantrips, spells: spells }
            }
            break;
        case level === 11:
            cantrips = 5;
            spells = [4, 3, 3, 3, 2, 1, 0, 0, 0];
            LevelUpFunction = {
                operation: true, action: { cantrips: cantrips, spells: spells }
            }
            break;
        case level === 12:
            cantrips = 5;
            spells = [4, 3, 3, 3, 2, 1, 0, 0, 0];
            LevelUpFunction = {
                operation: true, action: { cantrips: cantrips, spells: spells, abilityPointIncrease: true }
            }
            break;
        case level === 13:
            cantrips = 5;
            spells = [4, 3, 3, 3, 2, 1, 1, 0, 0];
            LevelUpFunction = {
                operation: true, action: { cantrips: cantrips, spells: spells }
            }
            break;
        case level === 14:
            cantrips = 5;
            spells = [4, 3, 3, 3, 2, 1, 1, 0, 0];
            LevelUpFunction = {
                operation: true, action: { cantrips: cantrips, spells: spells }
            }
            break;
        case level === 15:
            cantrips = 5;
            spells = [4, 3, 3, 3, 2, 1, 1, 1, 0];
            LevelUpFunction = {
                operation: true, action: { cantrips: cantrips, spells: spells }
            }
            break;
        case level === 16:
            cantrips = 5;
            spells = [4, 3, 3, 3, 2, 1, 1, 1, 0];
            LevelUpFunction = {
                operation: true, action: { cantrips: cantrips, spells: spells, abilityPointIncrease: true }
            }
            break;
        case level === 17:
            cantrips = 5;
            spells = [4, 3, 3, 3, 2, 1, 1, 1, 1];
            LevelUpFunction = {
                operation: true, action: { cantrips: cantrips, spells: spells, pathFeature: true }
            }
            break;
        case level === 18:
            cantrips = 5;
            spells = [4, 3, 3, 3, 3, 1, 1, 1, 1];
            LevelUpFunction = {
                operation: true, action: { cantrips: cantrips, spells: spells }
            }
            break;
        case level === 19:
            cantrips = 5;
            spells = [4, 3, 3, 3, 3, 2, 1, 1, 1];
            LevelUpFunction = {
                operation: true, action: { cantrips: cantrips, spells: spells, abilityPointIncrease: true }
            }
            break;
        case level === 20:
            cantrips = 5;
            spells = [4, 3, 3, 3, 3, 2, 2, 1, 1];
            LevelUpFunction = {
                operation: true, action: { cantrips: cantrips, spells: spells }
            }
            break;
    }

    return LevelUpFunction;
}
const Monk = (level: number, character: CharacterModel) => {
    let paths: any[] = [{ name: "Way of the Four Elements", description: "You follow a monastic tradition that teaches you to harness the elements. When you focus your ki, you can align yourself with the forces of creation and bend the four elements to your will, using them as an extension of your body. Some members of this tradition dedicate themselves to a single element, but others weave the elements together." },
    { name: "Way of the Open Hand", description: "Monks of the Way of the Open Hand are the ultimate masters of martial arts combat, whether armed or unarmed. They learn techniques to push and trip their opponents, manipulate ki to heal damage to their bodies, and practice advanced meditation that can protect them from harm." },
    { name: "Way of the Shadow", description: "Monks of the Way of Shadow follow a tradition that values stealth and subterfuge. These monks might be called ninjas or shadowdancers, and they serve as spies and assassins. Sometimes the members of a ninja monastery are family members, forming a clan sworn to secrecy about their arts and missions. Other monasteries are more like thieves' guilds, hiring out their services to nobles, rich merchants, or anyone else who can pay their fees." }]
    let LevelUpFunction: any;
    switch (true) {
        case level === 1:
            LevelUpFunction = {
                operation: true, action: { kiPoints: 0, monkMartialArts: 4 }
            }
            break;
        case level === 2:
            LevelUpFunction = {
                operation: true, action: { kiPoints: 2, monkMartialArts: 4 }
            }
            break;
        case level === 3:
            LevelUpFunction = {
                operation: true, action: { kiPoints: 3, monkMartialArts: 4, pathSelector: paths, pathFeature: true }
            }
            break;
        case level === 4:
            LevelUpFunction = {
                operation: true, action: { kiPoints: 4, monkMartialArts: 4, abilityPointIncrease: true }
            }
            break;
        case level === 5:
            LevelUpFunction = {
                operation: true, action: { kiPoints: 5, monkMartialArts: 6 }
            }
            break;
        case level === 6:
            LevelUpFunction = {
                operation: true, action: { kiPoints: 6, monkMartialArts: 6, pathFeature: true }
            }
            break;
        case level === 7:
            LevelUpFunction = {
                operation: true, action: { kiPoints: 7, monkMartialArts: 6 }
            }
            break;
        case level === 8:
            LevelUpFunction = {
                operation: true, action: { kiPoints: 8, monkMartialArts: 6, abilityPointIncrease: true }
            }
            break;
        case level === 9:
            LevelUpFunction = {
                operation: true, action: { kiPoints: 9, monkMartialArts: 6 }
            }
            break;
        case level === 10:
            LevelUpFunction = {
                operation: true, action: { kiPoints: 10, monkMartialArts: 6 }
            }
            break;
        case level === 11:
            LevelUpFunction = {
                operation: true, action: { kiPoints: 11, monkMartialArts: 8, pathFeature: true }
            }
            break;
        case level === 12:
            LevelUpFunction = {
                operation: true, action: { kiPoints: 12, monkMartialArts: 8, abilityPointIncrease: true }
            }
            break;
        case level === 13:
            LevelUpFunction = {
                operation: true, action: { kiPoints: 13, monkMartialArts: 8 }
            }
            break;
        case level === 14:
            LevelUpFunction = {
                operation: true, action: { kiPoints: 14, monkMartialArts: 8 }
            }
            break;
        case level === 15:
            LevelUpFunction = {
                operation: true, action: { kiPoints: 15, monkMartialArts: 8 }
            }
            break;
        case level === 16:
            LevelUpFunction = {
                operation: true, action: { kiPoints: 16, monkMartialArts: 8, abilityPointIncrease: true }
            }
            break;
        case level === 17:
            LevelUpFunction = {
                operation: true, action: { kiPoints: 17, monkMartialArts: 10, pathFeature: true }
            }
            break;
        case level === 18:
            LevelUpFunction = {
                operation: true, action: { kiPoints: 18, monkMartialArts: 10 }
            }
            break;
        case level === 19:
            LevelUpFunction = {
                operation: true, action: { kiPoints: 19, monkMartialArts: 10, abilityPointIncrease: true }
            }
            break;
        case level === 20:
            LevelUpFunction = {
                operation: true, action: { kiPoints: 20, monkMartialArts: 10 }
            }
            break;

    }
    return LevelUpFunction;
}
const Paladin = (level: number, character: CharacterModel) => {
    let fightingStyle: any[] = [{ name: 'Defense', description: 'While you are wearing armor, you gain a +1 bonus to AC.' }, { name: 'Great Weapon Fighting', description: 'When you roll a 1 or 2 on a damage die for an attack you make with a melee weapon that you are wielding with two hands, you can reroll the die and must use the new roll, even if the new roll is a 1 or a 2. The weapon must have the two-handed or versatile property for you to gain this benefit.' },
    { name: 'Protection', description: 'When a creature you can see attacks a target other than you that is within 5 feet of you, you can use your reaction to impose disadvantage on the attack roll. You must be wielding a shield.' }]
    let paths: any[] = [{ name: "Oath of Devotion", description: "The Oath of Devotion binds a paladin to the loftiest ideals of justice, virtue, and order. Sometimes called cavaliers, white knights, or holy warriors, these paladins meet the ideal of the knight in shining armor, acting with honor in pursuit of justice and the greater good." },
    { name: "Oath of Vengeance", description: "The Oath of Vengeance is a solemn commitment to punish those who have committed a grievous sin. When evil forces slaughter helpless villagers, when an entire people turns against the will of the gods, when a thieves' guild grows too violent and powerful, when a dragon rampages through the countryside – at times like these, paladins arise and swear an Oath of Vengeance to set right that which has gone wrong." },
    { name: "Oath of the Ancients", description: "The Oath of the Ancients is as old as the race of elves and the rituals of the druids. Sometimes called fey knights, green knights, or horned knights, paladins who swear this oath cast their lot with the side of the light in the cosmic struggle against darkness because they love the beautiful and life-giving things of the world, not necessarily because they believe in principles of honor, courage, and justice." }]
    let LevelUpFunction: any;
    switch (true) {
        case level === 1:
            LevelUpFunction = false;
            break;
        case level === 2:
            LevelUpFunction = {
                operation: true, action: { spells: [2, 0, 0, 0, 0, 0, 0, 0, 0], pickFightingStyle: fightingStyle }
            }
            break;
        case level === 3:
            LevelUpFunction = {
                operation: true, action: { spells: [3, 0, 0, 0, 0, 0, 0, 0, 0], pathSelector: paths, pathFeature: true }
            }
            break;
        case level === 4:
            LevelUpFunction = {
                operation: true, action: { spells: [3, 0, 0, 0, 0, 0, 0, 0, 0], abilityPointIncrease: true }
            }
            break;
        case level === 5:
            LevelUpFunction = {
                operation: true, action: { spells: [4, 2, 0, 0, 0, 0, 0, 0, 0], extraSpells: paladinOathSpellsPicker(character.level, character.path.name, character) }
            }
            break;
        case level === 6:
            LevelUpFunction = {
                operation: true, action: { spells: [4, 2, 0, 0, 0, 0, 0, 0, 0] }
            }
            break;
        case level === 7:
            LevelUpFunction = {
                operation: true, action: { spells: [4, 3, 0, 0, 0, 0, 0, 0, 0], pathFeature: true }
            }
            break;
        case level === 8:
            LevelUpFunction = {
                operation: true, action: { spells: [4, 3, 0, 0, 0, 0, 0, 0, 0], abilityPointIncrease: true }
            }
            break;
        case level === 9:
            LevelUpFunction = {
                operation: true, action: { spells: [4, 3, 2, 0, 0, 0, 0, 0, 0], extraSpells: paladinOathSpellsPicker(character.level, character.path.name, character) }
            }
            break;
        case level === 10:
            LevelUpFunction = {
                operation: true, action: { spells: [4, 3, 2, 0, 0, 0, 0, 0, 0] }
            }
            break;
        case level === 11:
            LevelUpFunction = {
                operation: true, action: { spells: [4, 3, 3, 0, 0, 0, 0, 0, 0] }
            }
            break;
        case level === 12:
            LevelUpFunction = {
                operation: true, action: { spells: [4, 3, 3, 0, 0, 0, 0, 0, 0], abilityPointIncrease: true }
            }
            break;
        case level === 13:
            LevelUpFunction = {
                operation: true, action: { spells: [4, 3, 3, 1, 0, 0, 0, 0, 0], extraSpells: paladinOathSpellsPicker(character.level, character.path.name, character) }
            }
            break;
        case level === 14:
            LevelUpFunction = {
                operation: true, action: { spells: [4, 3, 3, 1, 0, 0, 0, 0, 0] }
            }
            break;
        case level === 15:
            LevelUpFunction = {
                operation: true, action: { spells: [4, 3, 3, 2, 0, 0, 0, 0, 0], pathFeature: true }
            }
            break;
        case level === 16:
            LevelUpFunction = {
                operation: true, action: { spells: [4, 3, 3, 2, 0, 0, 0, 0, 0], abilityPointIncrease: true }
            }
            break;
        case level === 17:
            LevelUpFunction = {
                operation: true, action: { spells: [4, 3, 3, 3, 1, 0, 0, 0, 0], extraSpells: paladinOathSpellsPicker(character.level, character.path.name, character) }
            }
            break;
        case level === 18:
            LevelUpFunction = {
                operation: true, action: { spells: [4, 3, 3, 3, 1, 0, 0, 0, 0] }
            }
            break;
        case level === 19:
            LevelUpFunction = {
                operation: true, action: { spells: [4, 3, 3, 3, 2, 0, 0, 0, 0], abilityPointIncrease: true }
            }
            break;
        case level === 20:
            LevelUpFunction = {
                operation: true, action: { spells: [4, 3, 3, 3, 2, 0, 0, 0, 0], pathFeature: true }
            }
            break;
    }
    return LevelUpFunction;
}
const Ranger = (level: number, character: CharacterModel) => {
    let fightingStyle: any[] = [{ name: 'Defense', description: 'While you are wearing armor, you gain a +1 bonus to AC.' }, { name: 'Archery', description: 'You gain a +2 bonus to attack rolls you make with ranged weapons.' },
    { name: 'Dueling', description: 'When you are wielding a melee weapon in one hand and no other weapons, you gain a +2 bonus to damage rolls with that weapon.' }, { name: "Two-Weapon Fighting", description: "When you engage in two-weapon fighting, you can add your ability modifier to the damage of the second attack." }]
    let paths: any[] = [{ name: "Beast Master Conclave", description: "Many rangers are more at home in the wilds than in civilization, to the point where animals consider them kin. Rangers of the Beast Conclave develop a close bond with a beast, then further strengthen that bond through the use of magic." },
    { name: "Hunter Conclave", description: "Some rangers seek to master weapons to better protect civilization from the terrors of the wilderness. Members of the Hunter Conclave learn specialized fighting techniques for use against the most dire threats, from rampaging ogres and hordes of orcs to towering giants and terrifying dragons." }]
    let LevelUpFunction: any;
    switch (true) {
        case level === 1:
            LevelUpFunction = false;
            break;
        case level === 2:
            LevelUpFunction = {
                operation: true, action: { spellsKnown: 2, spells: [2, 0, 0, 0, 0, 0, 0, 0, 0], pickFightingStyle: fightingStyle }
            }
            break;
        case level === 3:
            LevelUpFunction = {
                operation: true, action: { spellsKnown: 3, spells: [3, 0, 0, 0, 0, 0, 0, 0, 0], pathSelector: paths, pathFeature: true }
            }
            break;
        case level === 4:
            LevelUpFunction = {
                operation: true, action: { spellsKnown: 3, spells: [3, 0, 0, 0, 0, 0, 0, 0, 0], abilityPointIncrease: true }
            }
            break;
        case level === 5:
            LevelUpFunction = {
                operation: true, action: { spellsKnown: 4, spells: [4, 2, 0, 0, 0, 0, 0, 0, 0], pathFeature: character.path.name === "Hunter Conclave" ? true : false }
            }
            break;
        case level === 6:
            LevelUpFunction = {
                operation: true, action: { spellsKnown: 4, spells: [4, 2, 0, 0, 0, 0, 0, 0, 0] }
            }
            break;
        case level === 7:
            LevelUpFunction = {
                operation: true, action: { spellsKnown: 5, spells: [4, 3, 0, 0, 0, 0, 0, 0, 0], pathFeature: true }
            }
            break;
        case level === 8:
            LevelUpFunction = {
                operation: true, action: { spellsKnown: 5, spells: [4, 3, 0, 0, 0, 0, 0, 0, 0], abilityPointIncrease: true }
            }
            break;
        case level === 9:
            LevelUpFunction = {
                operation: true, action: { spellsKnown: 6, spells: [4, 3, 2, 0, 0, 0, 0, 0, 0] }
            }
            break;
        case level === 10:
            LevelUpFunction = {
                operation: true, action: { spellsKnown: 6, spells: [4, 3, 2, 0, 0, 0, 0, 0, 0] }
            }
            break;
        case level === 11:
            LevelUpFunction = {
                operation: true, action: { spellsKnown: 7, spells: [4, 3, 3, 0, 0, 0, 0, 0, 0], pathFeature: true }
            }
            break;
        case level === 12:
            LevelUpFunction = {
                operation: true, action: { spellsKnown: 7, spells: [4, 3, 3, 0, 0, 0, 0, 0, 0], abilityPointIncrease: true }
            }
            break;
        case level === 13:
            LevelUpFunction = {
                operation: true, action: { spellsKnown: 8, spells: [4, 3, 3, 1, 0, 0, 0, 0, 0] }
            }
            break;
        case level === 14:
            LevelUpFunction = {
                operation: true, action: { spellsKnown: 8, spells: [4, 3, 3, 1, 0, 0, 0, 0, 0] }
            }
            break;
        case level === 15:
            LevelUpFunction = {
                operation: true, action: { spellsKnown: 9, spells: [4, 3, 3, 2, 0, 0, 0, 0, 0], pathFeature: true }
            }
            break;
        case level === 16:
            LevelUpFunction = {
                operation: true, action: { spellsKnown: 9, spells: [4, 3, 3, 2, 0, 0, 0, 0, 0], abilityPointIncrease: true }
            }
            break;
        case level === 17:
            LevelUpFunction = {
                operation: true, action: { spellsKnown: 10, spells: [4, 3, 3, 3, 1, 0, 0, 0, 0] }
            }
            break;
        case level === 18:
            LevelUpFunction = {
                operation: true, action: { spellsKnown: 10, spells: [4, 3, 3, 3, 1, 0, 0, 0, 0] }
            }
            break;
        case level === 19:
            LevelUpFunction = {
                operation: true, action: { spellsKnown: 11, spells: [4, 3, 3, 3, 2, 0, 0, 0, 0], abilityPointIncrease: true }
            }
            break;
        case level === 20:
            LevelUpFunction = {
                operation: true, action: { spellsKnown: 11, spells: [4, 3, 3, 3, 2, 0, 0, 0, 0] }
            }
            break;
    }
    return LevelUpFunction;
}

const Rogue = (level: number, character: CharacterModel) => {
    let paths: any[] = [{ name: "Arcane Trickster", description: "Some rogues enhance their fine-honed skills of stealth and agility with magic, learning tricks of enchantment and illusion. These rogues include pickpockets and burglars, but also pranksters, mischief-makers, and a significant number of adventurers." },
    { name: "Assassin", description: "You focus your training on the grim art of death. Those who adhere to this archetype are diverse: hired killers, spies, bounty hunters, and even specially anointed priests trained to exterminate the enemies of their deity. Stealth, poison, and disguise help you eliminate your foes with deadly efficiency." },
    { name: "Thief", description: "You hone your skills in the larcenous arts. Burglars, bandits, cutpurses, and other criminals typically follow this archetype, but so do rogues who prefer to think of themselves as professional treasure seekers, explorers, delvers, and investigators. In addition to improving your agility and stealth, you learn skills useful for delving into ancient ruins, reading unfamiliar languages, and using magic items you normally couldn't employ." }]
    let LevelUpFunction: any;
    switch (true) {
        case (level === 1):
            LevelUpFunction = {
                operation: true, action: { sneakAttackDie: 1, expertise: 2 }
            }
            break;
        case (level === 2):
            LevelUpFunction = {
                operation: true, action: { sneakAttackDie: 1 }
            }
            break;
        case (level === 3):
            LevelUpFunction = {
                operation: true, action: { sneakAttackDie: 2, pathSelector: paths, pathFeature: true }
            }
            break;
        case (level === 4):
            character.path.name !== 'Arcane Trickster' ? LevelUpFunction = { operation: true, action: { sneakAttackDie: 2, abilityPointIncrease: true } }
                : LevelUpFunction = { operation: true, action: { sneakAttackDie: 2, abilityPointIncrease: true, cantrips: 2, spells: [3, 0, 0, 0, 0, 0, 0, 0, 0], spellsKnown: 4 } }
            break;
        case (level === 5):
            LevelUpFunction = {
                operation: true, action: { sneakAttackDie: 3 }
            }
            break;
        case (level === 6):
            LevelUpFunction = {
                operation: true, action: { sneakAttackDie: 3, expertise: 2 }
            }
            break;
        case (level === 7):
            character.path.name !== 'Arcane Trickster' ? LevelUpFunction = { operation: true, action: { sneakAttackDie: 4 } }
                : LevelUpFunction = { operation: true, action: { sneakAttackDie: 4, cantrips: 2, spells: [4, 2, 0, 0, 0, 0, 0, 0, 0], spellsKnown: 5 } }
            break;
        case (level === 8):
            character.path.name !== 'Arcane Trickster' ? LevelUpFunction = { operation: true, action: { sneakAttackDie: 4, abilityPointIncrease: true } }
                : LevelUpFunction = { operation: true, action: { sneakAttackDie: 4, abilityPointIncrease: true, cantrips: 2, spells: [4, 2, 0, 0, 0, 0, 0, 0, 0], spellsKnown: 6 } }
            break;
        case (level === 9):
            LevelUpFunction = {
                operation: true, action: { sneakAttackDie: 5, pathFeature: true }
            }
            break;
        case (level === 10):
            character.path.name !== 'Arcane Trickster' ? LevelUpFunction = { operation: true, action: { sneakAttackDie: 5, abilityPointIncrease: true } }
                : LevelUpFunction = { operation: true, action: { sneakAttackDie: 5, abilityPointIncrease: true, cantrips: 3, spells: [4, 3, 0, 0, 0, 0, 0, 0, 0], spellsKnown: 7 } }
            break;
        case (level === 11):
            character.path.name !== 'Arcane Trickster' ? LevelUpFunction = { operation: true, action: { sneakAttackDie: 6 } }
                : LevelUpFunction = { operation: true, action: { sneakAttackDie: 6, cantrips: 3, spells: [4, 3, 0, 0, 0, 0, 0, 0, 0], spellsKnown: 8 } }
            break;
        case (level === 12):
            LevelUpFunction = {
                operation: true, action: { sneakAttackDie: 6, abilityPointIncrease: true }
            }
            break;
        case (level === 13):
            character.path.name !== 'Arcane Trickster' ? LevelUpFunction = { operation: true, action: { sneakAttackDie: 7, pathFeature: true } }
                : LevelUpFunction = { operation: true, action: { pathFeature: true, sneakAttackDie: 7, cantrips: 3, spells: [4, 3, 2, 0, 0, 0, 0, 0, 0], spellsKnown: 9 } }
            break;
        case (level === 14):
            character.path.name !== 'Arcane Trickster' ? LevelUpFunction = { operation: true, action: { sneakAttackDie: 7 } }
                : LevelUpFunction = { operation: true, action: { sneakAttackDie: 7, cantrips: 3, spells: [4, 3, 2, 0, 0, 0, 0, 0, 0], spellsKnown: 10 } }
            break;
        case (level === 15):
            LevelUpFunction = {
                operation: true, action: { sneakAttackDie: 8 }
            }
            break;
        case (level === 16):
            character.path.name !== 'Arcane Trickster' ? LevelUpFunction = { operation: true, action: { sneakAttackDie: 8, abilityPointIncrease: true } }
                : LevelUpFunction = { operation: true, action: { sneakAttackDie: 8, abilityPointIncrease: true, cantrips: 3, spells: [4, 3, 3, 0, 0, 0, 0, 0, 0], spellsKnown: 11 } }
            break;
        case (level === 17):
            LevelUpFunction = {
                operation: true, action: { sneakAttackDie: 9, pathFeature: true }
            }
            break;
        case (level === 18):
            LevelUpFunction = {
                operation: true, action: { sneakAttackDie: 9 }
            }
            break;
        case (level === 19):
            character.path.name !== 'Arcane Trickster' ? LevelUpFunction = { operation: true, action: { sneakAttackDie: 10, abilityPointIncrease: true } }
                : LevelUpFunction = { operation: true, action: { sneakAttackDie: 10, abilityPointIncrease: true, cantrips: 3, spells: [4, 3, 3, 1, 0, 0, 0, 0, 0], spellsKnown: 12 } }
            break;
        case (level === 20):
            character.path.name !== 'Arcane Trickster' ? LevelUpFunction = { operation: true, action: { sneakAttackDie: 10 } }
                : LevelUpFunction = { operation: true, action: { sneakAttackDie: 10, cantrips: 3, spells: [4, 3, 3, 1, 0, 0, 0, 0, 0], spellsKnown: 13 } }
            LevelUpFunction = {
                operation: true, action: { sneakAttackDie: 10 }
            }
            break;
    }
    return LevelUpFunction;
}
const Sorcerer = (level: number, character: CharacterModel) => {
    let paths: any[] = [{ name: "Draconic Bloodline", description: "Your innate magic comes from draconic magic that was mingled with your blood or that of your ancestors. Most often, sorcerers with this origin trace their descent back to a mighty sorcerer of ancient times who made a bargain with a dragon or who might even have claimed a dragon parent." },
    { name: "Wild Magic", description: "Your innate magic comes from the wild forces of chaos that underlie the order of creation. You might have endured exposure to some form of raw magic, perhaps through a planar portal leading to Limbo, the Elemental Planes, or the mysterious Far Realm. Perhaps you were blessed by a powerful fey creature or marked by a demon." }]
    let metamagic: any[] = [{ name: "Careful Spell", description: "When you cast a spell that forces other creatures to make a saving throw, you can protect some of those creatures from the spell’s full force. To do so, you spend 1 sorcery point and choose a number of those creatures up to your Charisma modifier (minimum of one creature). A chosen creature automatically succeeds on its saving throw against the spell." },
    { name: "Distant Spell", description: "When you cast a spell that has a range of 5 feet or greater, you can spend 1 sorcery point to double the range of the spell. When you cast a spell that has a range of touch, you can spend 1 sorcery point to make the range of the spell 30 feet." },
    { name: "Empowered Spell", description: "When you roll damage for a spell, you can spend 1 sorcery point to reroll a number of the damage dice up to your Charisma modifier (minimum of one). You must use the new rolls. You can use Empowered Spell even if you have already used a different Metamagic option during the casting of the spell." },
    { name: "Extended Spell", description: "When you cast a spell that has a duration of 1 minute or longer, you can spend 1 sorcery point to double its duration, to a maximum duration of 24 hours." },
    { name: "Heightened Spell", description: "When you cast a spell that forces a creature to make a saving throw to resist its effects, you can spend 3 sorcery points to give one target of the spell disadvantage on its first saving throw made against the spell." },
    { name: "Quickened Spell", description: "When you cast a spell that has a casting time of 1 action, you can spend 2 sorcery points to change the casting time to 1 bonus action for this casting." },
    { name: "Subtle Spell", description: "When you cast a spell, you can spend 1 sorcery point to cast it without any somatic or verbal components." },
    { name: "Twinned Spell", description: "When you cast a spell that targets only one creature and doesn’t have a range of self, you can spend a number of sorcery points equal to the spell’s level to target a second creature in range with the same spell (1 sorcery point if the spell is a cantrip). To be eligible, a spell must be incapable of targeting more than one creature at the spell’s current level. For example, magic missile and scorching ray aren’t eligible, but ray of frost and chromatic orb are." }]
    let LevelUpFunction: any;
    switch (true) {
        case (level === 1):
            LevelUpFunction = {
                operation: true, action: { cantrips: 4, spellsKnown: 2, spells: [2, 0, 0, 0, 0, 0, 0, 0, 0], pathSelector: paths, pathFeature: true }
            }
            break;
        case (level === 2):
            LevelUpFunction = {
                operation: true, action: { cantrips: 4, spellsKnown: 3, spells: [3, 0, 0, 0, 0, 0, 0, 0, 0], sorceryPoints: 2 }
            }
            break;
        case (level === 3):
            LevelUpFunction = {
                operation: true, action: { cantrips: 4, spellsKnown: 4, spells: [4, 2, 0, 0, 0, 0, 0, 0, 0], sorceryPoints: 3, metamagic: { value: metamagic, amount: 2 } }
            }
            break;
        case (level === 4):
            LevelUpFunction = {
                operation: true, action: { cantrips: 5, spellsKnown: 5, spells: [4, 3, 0, 0, 0, 0, 0, 0, 0], sorceryPoints: 4, abilityPointIncrease: true }
            }
            break;
        case (level === 5):
            LevelUpFunction = {
                operation: true, action: { cantrips: 5, spellsKnown: 6, spells: [4, 3, 2, 0, 0, 0, 0, 0, 0], sorceryPoints: 5 }
            }
            break;
        case (level === 6):
            LevelUpFunction = {
                operation: true, action: { cantrips: 5, spellsKnown: 7, spells: [4, 3, 3, 0, 0, 0, 0, 0, 0], sorceryPoints: 6, pathFeature: true }
            }
            break;
        case (level === 7):
            LevelUpFunction = {
                operation: true, action: { cantrips: 5, spellsKnown: 8, spells: [4, 3, 3, 1, 0, 0, 0, 0, 0], sorceryPoints: 7 }
            }
            break;
        case (level === 8):
            LevelUpFunction = {
                operation: true, action: { cantrips: 5, spellsKnown: 9, spells: [4, 3, 3, 2, 0, 0, 0, 0, 0], sorceryPoints: 8, abilityPointIncrease: true }
            }
            break;
        case (level === 9):
            LevelUpFunction = {
                operation: true, action: { cantrips: 5, spellsKnown: 10, spells: [4, 3, 3, 3, 1, 0, 0, 0, 0], sorceryPoints: 9 }
            }
            break;
        case (level === 10):
            LevelUpFunction = {
                operation: true, action: { cantrips: 6, spellsKnown: 11, spells: [4, 3, 3, 3, 2, 0, 0, 0, 0], sorceryPoints: 10, metamagic: { value: metamagic, amount: 1 } }
            }
            break;
        case (level === 11):
            LevelUpFunction = {
                operation: true, action: { cantrips: 6, spellsKnown: 12, spells: [4, 3, 3, 3, 2, 1, 0, 0, 0], sorceryPoints: 11 }
            }
            break;
        case (level === 12):
            LevelUpFunction = {
                operation: true, action: { cantrips: 6, spellsKnown: 12, spells: [4, 3, 3, 3, 2, 1, 0, 0, 0], sorceryPoints: 12, abilityPointIncrease: true }
            }
            break;
        case (level === 13):
            LevelUpFunction = {
                operation: true, action: { cantrips: 6, spellsKnown: 13, spells: [4, 3, 3, 3, 2, 1, 1, 0, 0], sorceryPoints: 13 }
            }
            break;
        case (level === 14):
            LevelUpFunction = {
                operation: true, action: { cantrips: 6, spellsKnown: 13, spells: [4, 3, 3, 3, 2, 1, 1, 0, 0], sorceryPoints: 14, pathFeature: true }
            }
            break;
        case (level === 15):
            LevelUpFunction = {
                operation: true, action: { cantrips: 6, spellsKnown: 14, spells: [4, 3, 3, 3, 2, 1, 1, 1, 0], sorceryPoints: 15 }
            }
            break;
        case (level === 16):
            LevelUpFunction = {
                operation: true, action: { cantrips: 6, spellsKnown: 14, spells: [4, 3, 3, 3, 2, 1, 1, 1, 0], sorceryPoints: 16, abilityPointIncrease: true }
            }
            break;
        case (level === 17):
            LevelUpFunction = {
                operation: true, action: { cantrips: 6, spellsKnown: 15, spells: [4, 3, 3, 3, 2, 1, 1, 1, 1], sorceryPoints: 17, metamagic: { value: metamagic, amount: 1 } }
            }
            break;
        case (level === 18):
            LevelUpFunction = {
                operation: true, action: { cantrips: 6, spellsKnown: 15, spells: [4, 3, 3, 3, 3, 1, 1, 1, 1], sorceryPoints: 18, pathFeature: true }
            }
            break;
        case (level === 19):
            LevelUpFunction = {
                operation: true, action: { cantrips: 6, spellsKnown: 15, spells: [4, 3, 3, 3, 3, 2, 1, 1, 1], sorceryPoints: 19, abilityPointIncrease: true }
            }
            break;
        case (level === 20):
            LevelUpFunction = {
                operation: true, action: { cantrips: 6, spellsKnown: 15, spells: [4, 3, 3, 3, 3, 2, 2, 1, 1], sorceryPoints: 20 }
            }
            break;
    }
    return LevelUpFunction;
}
const Warlock = (level: number, character: CharacterModel) => {
    let patrons: any[] = [{ name: "The Great Old One", description: "Your patron is a mysterious entity whose nature is utterly foreign to the fabric of reality. It might come from the Far Realm, the space beyond reality, or it could be one of the elder gods known only in legends. Its motives are incomprehensible to mortals, and its knowledge so immense and ancient that even the greatest libraries pale in comparison to the vast secrets it holds. The Great Old One might be unaware of your existence or entirely indifferent to you, but the secrets you have learned allow you to draw your magic from it." },
    { name: "The Archfey", description: "Your patron is a lord or lady of the fey, a creature of legend who holds secrets that were forgotten before the mortal races were born. This being's motivations are often inscrutable, and sometimes whimsical, and might involve a striving for greater magical power or the settling of age-old grudges. Beings of this sort include the Prince of Frost; the Queen of Air and Darkness, ruler of the Gloaming Court; Titania of the Summer Court; her consort Oberon, the Green Lord; Hyrsam, the Prince of Fools; and ancient hags." },
    { name: "The Fiend", description: "You have made a pact with a fiend from the lower planes of existence, a being whose aims are evil, even if you strive against those aims. Such beings desire the corruption or destruction of all things, ultimately including you. Fiends powerful enough to forge a pact include demon lords such as Demogorgon, Orcus, Fraz'Urb-luu, and Baphomet; archdevils such as Asmodeus, Dispater, Mephistopheles, and Belial; pit fiends and balors that are especially mighty; and ultroloths and other lords of the yugoloths." }]
    let pacts: any[] = [{ name: "Blade", description: "You can use your action to create a pact weapon in your empty hand. You can choose the form that this melee weapon takes each time you create it You are proficient with it while you wield it. This weapon counts as magical for the purpose of overcoming resistance and immunity to nonmagical attacks and damage. Your pact weapon disappears if it is more than 5 feet away from you for 1 minute or more. It also disappears if you use this feature again, if you dismiss the weapon (no action required), or if you die. You can transform one magic weapon into your pact weapon by performing a special ritual while you hold the weapon. You perform the ritual over the course of 1 hour, which can be done during a short rest. You can then dismiss the weapon, shunting it into an extradimensional space, and it appears whenever you create your pact weapon thereafter. You can’t affect an artifact or a sentient weapon in this way. The weapon ceases being your pact weapon if you die, if you perform the 1-hour ritual on a different weapon, or if you use a 1-hour ritual to break your bond to it. The weapon appears at your feet if it is in the extradimensional space when the bond breaks." },
    { name: "Chain", description: "You learn the find familiar spell and can cast it as a ritual. The spell doesn’t count against your number of spells known. When you cast the spell, you can choose one of the normal forms for your familiar or one of the following special forms: imp, pseudodragon, quasit, or sprite. Additionally, when you take the Attack action, you can forgo one of your own attacks to allow your familiar to make one attack with its reaction." },
    { name: "Tome", description: "Your patron gives you a grimoire called a Book of Shadows. When you gain this feature, choose three cantrips from any class’s spell list (the three needn’t be from the same list). While the book is on your person, you can cast those cantrips at will. They don’t count against your number of cantrips known. If they don’t appear on the warlock spell list, they are nonetheless warlock spells for you. If you lose your Book of Shadows, you can perform a 1-hour ceremony to receive a replacement from your patron. This ceremony can be performed during a short or long rest, and it destroys the previous book. The book turns to ash when you die." }]
    let LevelUpFunction: any;
    switch (true) {
        case (level === 1):
            LevelUpFunction = {
                operation: true, action: { spellSlots: 1, cantrips: 2, spellsKnown: 2, spellSlotLevel: '1st', pathSelector: patrons, pathFeature: true }
            }
            break;
        case (level === 2):
            LevelUpFunction = {
                operation: true, action: { spellSlots: 2, cantrips: 3, spellsKnown: 3, spellSlotLevel: '2nd', eldritchInvocations: 2 }
            }
            break;
        case (level === 3):
            LevelUpFunction = {
                operation: true, action: { spellSlots: 2, cantrips: 3, spellsKnown: 4, spellSlotLevel: '2nd', eldritchInvocations: 2, pactSelector: pacts }
            }
            break;
        case (level === 4):
            LevelUpFunction = {
                operation: true, action: { spellSlots: 2, cantrips: 3, spellsKnown: 5, spellSlotLevel: '2nd', eldritchInvocations: 2, abilityPointIncrease: true }
            }
            break;
        case (level === 5):
            LevelUpFunction = {
                operation: true, action: { spellSlots: 2, cantrips: 3, spellsKnown: 6, spellSlotLevel: '3rd', eldritchInvocations: 3 }
            }
            break;
        case (level === 6):
            LevelUpFunction = {
                operation: true, action: { spellSlots: 2, cantrips: 3, spellsKnown: 7, spellSlotLevel: '3rd', eldritchInvocations: 3, pathFeature: true }
            }
            break;
        case (level === 7):
            LevelUpFunction = {
                operation: true, action: { spellSlots: 2, cantrips: 3, spellsKnown: 8, spellSlotLevel: '4th', eldritchInvocations: 4 }
            }
            break;
        case (level === 8):
            LevelUpFunction = {
                operation: true, action: { spellSlots: 2, cantrips: 3, spellsKnown: 9, spellSlotLevel: '4th', eldritchInvocations: 4, abilityPointIncrease: true }
            }
            break;
        case (level === 9):
            LevelUpFunction = {
                operation: true, action: { spellSlots: 2, cantrips: 3, spellsKnown: 10, spellSlotLevel: '5th', eldritchInvocations: 5 }
            }
            break;
        case (level === 10):
            LevelUpFunction = {
                operation: true, action: { spellSlots: 2, cantrips: 4, spellsKnown: 10, spellSlotLevel: '5th', eldritchInvocations: 5, pathFeature: true }
            }
            break;
        case (level === 11):
            LevelUpFunction = {
                operation: true, action: { spellSlots: 3, cantrips: 4, spellsKnown: 11, spellSlotLevel: '6th', eldritchInvocations: 5 }
            }
            break;
        case (level === 12):
            LevelUpFunction = {
                operation: true, action: { spellSlots: 3, cantrips: 4, spellsKnown: 11, spellSlotLevel: '5th', eldritchInvocations: 6, abilityPointIncrease: true }
            }
            break;
        case (level === 13):
            LevelUpFunction = {
                operation: true, action: { spellSlots: 3, cantrips: 4, spellsKnown: 12, spellSlotLevel: '7th', eldritchInvocations: 6 }
            }
            break;
        case (level === 14):
            LevelUpFunction = {
                operation: true, action: { spellSlots: 3, cantrips: 4, spellsKnown: 12, spellSlotLevel: '5th', eldritchInvocations: 6, pathFeature: true }
            }
            break;
        case (level === 15):
            LevelUpFunction = {
                operation: true, action: { spellSlots: 3, cantrips: 4, spellsKnown: 13, spellSlotLevel: '8th', eldritchInvocations: 7 }
            }
            break;
        case (level === 16):
            LevelUpFunction = {
                operation: true, action: { spellSlots: 3, cantrips: 4, spellsKnown: 13, spellSlotLevel: '5th', eldritchInvocations: 7, abilityPointIncrease: true }
            }
            break;
        case (level === 17):
            LevelUpFunction = {
                operation: true, action: { spellSlots: 4, cantrips: 4, spellsKnown: 14, spellSlotLevel: '9th', eldritchInvocations: 7 }
            }
            break;
        case (level === 18):
            LevelUpFunction = {
                operation: true, action: { spellSlots: 4, cantrips: 4, spellsKnown: 14, spellSlotLevel: '5th', eldritchInvocations: 8 }
            }
            break;
        case (level === 19):
            LevelUpFunction = {
                operation: true, action: { spellSlots: 4, cantrips: 4, spellsKnown: 15, spellSlotLevel: '5th', eldritchInvocations: 8, abilityPointIncrease: true }
            }
            break;
        case (level === 20):
            LevelUpFunction = {
                operation: true, action: { spellSlots: 4, cantrips: 4, spellsKnown: 15, spellSlotLevel: '5th', eldritchInvocations: 8 }
            }
            break;


    }
    return LevelUpFunction;
}
const Wizard = (level: number, character: CharacterModel) => {
    let paths: any[] = [{ name: "School of Conjuration", description: "As a conjurer, you favor spells that produce objects and creatures out of thin air. You can conjure billowing clouds of killing fog or summon creatures from elsewhere to fight on your behalf. As your mastery grows, you learn spells of transportation and can teleport yourself across vast distances, even to other planes of existence, in an instant." },
    { name: "School of Divination", description: "The counsel of a diviner is sought by royalty and commoners alike, for all seek a clearer understanding of the past, present, and future. As a diviner, you strive to part the veils of space, time, and consciousness so that you can see clearly. You work to master spells of discernment, remote viewing, supernatural knowledge, and foresight." },
    { name: "School of Enchantment", description: "As a member of the School of Enchantment, you have honed your ability to magically entrance and beguile other people and monsters. Some enchanters are peacemakers who bewitch the violent to lay down their arms and charm the cruel into showing mercy. Others are tyrants who magically bind the unwilling into their service. Most enchanters fall somewhere in between." },
    { name: "School of Evocation", description: "You focus your study on magic that creates powerful elemental effects such as bitter cold, searing flame, rolling thunder, crackling lightning, and burning acid. Some evokers find employment in military forces, serving as artillery to blast enemy armies from afar. Others use their spectacular power to protect the weak, while some seek their own gain as bandits, adventurers, or aspiring tyrants." },
    { name: "School of Illusion", description: "You focus your studies on magic that dazzles the senses, befuddles the mind, and tricks even the wisest folk. Your magic is subtle, but the illusions crafted by your keen mind make the impossible seem real. Some illusionists – including many gnome wizards – are benign tricksters who use their spells to entertain. Others are more sinister masters of deception, using their illusions to frighten and fool others for their personal gain." },
    { name: "School of Necromancy", description: "The School of Necromancy explores the cosmic forces of life, death, and undeath. As you focus your studies in this tradition, you learn to manipulate the energy that animates all living things. As you progress, you learn to sap the life force from a creature as your magic destroys its body, transforming that vital energy into magical power you can manipulate. Most people see necromancers as menacing, or even villainous, due to the close association with death. Not all necromancers are evil, but the forces they manipulate are considered taboo by many societies." },
    { name: "School of Transmutation", description: "You are a student of spells that modify energy and matter. To you, the world is not a fixed thing, but eminently mutable, and you delight in being an agent of change. You wield the raw stuff of creation and learn to alter both physical forms and mental qualities. Your magic gives you the tools to become a smith on reality's forge. Some transmuters are tinkerers and pranksters, turning people into toads and transforming copper into silver for fun and occasional profit. Others pursue their magical studies with deadly seriousness, seeking the power of the gods to make and destroy worlds." }]
    let LevelUpFunction: any;
    switch (true) {
        case (level === 1):
            LevelUpFunction = {
                operation: true, action: { cantrips: 3, spells: [2, 0, 0, 0, 0, 0, 0, 0, 0] }
            }
            break;
        case (level === 2):
            LevelUpFunction = {
                operation: true, action: { cantrips: 3, spells: [3, 0, 0, 0, 0, 0, 0, 0, 0], pathSelector: paths, pathFeature: true }
            }
            break;
        case (level === 3):
            LevelUpFunction = {
                operation: true, action: { cantrips: 3, spells: [4, 2, 0, 0, 0, 0, 0, 0, 0] }
            }
            break;
        case (level === 4):
            LevelUpFunction = {
                operation: true, action: { cantrips: 4, spells: [4, 3, 0, 0, 0, 0, 0, 0, 0], abilityPointIncrease: true }
            }
            break;
        case (level === 5):
            LevelUpFunction = {
                operation: true, action: { cantrips: 4, spells: [4, 3, 2, 0, 0, 0, 0, 0, 0] }
            }
            break;
        case (level === 6):
            LevelUpFunction = {
                operation: true, action: { cantrips: 4, spells: [4, 3, 3, 0, 0, 0, 0, 0, 0], pathFeature: true }
            }
            break;
        case (level === 7):
            LevelUpFunction = {
                operation: true, action: { cantrips: 4, spells: [4, 3, 3, 1, 0, 0, 0, 0, 0] }
            }
            break;
        case (level === 8):
            LevelUpFunction = {
                operation: true, action: { cantrips: 4, spells: [4, 3, 3, 2, 0, 0, 0, 0, 0], abilityPointIncrease: true }
            }
            break;
        case (level === 9):
            LevelUpFunction = {
                operation: true, action: { cantrips: 4, spells: [4, 3, 3, 3, 1, 0, 0, 0, 0] }
            }
            break;
        case (level === 10):
            LevelUpFunction = {
                operation: true, action: { cantrips: 5, spells: [4, 3, 3, 3, 2, 0, 0, 0, 0] }
            }
            break;
        case (level === 11):
            LevelUpFunction = {
                operation: true, action: { cantrips: 5, spells: [4, 3, 3, 3, 2, 1, 0, 0, 0] }
            }
            break;
        case (level === 12):
            LevelUpFunction = {
                operation: true, action: { cantrips: 5, spells: [4, 3, 3, 3, 2, 1, 0, 0, 0], abilityPointIncrease: true }
            }
            break;
        case (level === 13):
            LevelUpFunction = {
                operation: true, action: { cantrips: 5, spells: [4, 3, 3, 3, 2, 1, 1, 0, 0] }
            }
            break;
        case (level === 14):
            LevelUpFunction = {
                operation: true, action: { cantrips: 5, spells: [4, 3, 3, 3, 2, 1, 1, 0, 0], pathFeature: true }
            }
            break;
        case (level === 15):
            LevelUpFunction = {
                operation: true, action: { cantrips: 5, spells: [4, 3, 3, 3, 2, 1, 1, 1, 0] }
            }
            break;
        case (level === 16):
            LevelUpFunction = {
                operation: true, action: { cantrips: 5, spells: [4, 3, 3, 3, 2, 1, 1, 1, 0], abilityPointIncrease: true }
            }
            break;
        case (level === 17):
            LevelUpFunction = {
                operation: true, action: { cantrips: 5, spells: [4, 3, 3, 3, 2, 1, 1, 1, 1] }
            }
            break;
        case (level === 18):
            LevelUpFunction = {
                operation: true, action: { cantrips: 5, spells: [4, 3, 3, 3, 2, 1, 1, 1, 1] }
            }
            break;
        case (level === 19):
            LevelUpFunction = {
                operation: true, action: { cantrips: 5, spells: [4, 3, 3, 3, 2, 2, 1, 1, 1], abilityPointIncrease: true }
            }
            break;
        case (level === 20):
            LevelUpFunction = {
                operation: true, action: { cantrips: 5, spells: [4, 3, 3, 3, 2, 2, 2, 1, 1] }
            }
            break;


    }
    return LevelUpFunction;
}

export { Barbarian, Bard, Fighter, Druid, Cleric, Monk, Paladin, Ranger, Rogue, Sorcerer, Warlock, Wizard };