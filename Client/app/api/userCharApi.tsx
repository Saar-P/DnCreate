import { CharacterModel } from '../models/characterModel';
import client from './client';

const endpoint = '/user'

const saveChar = (character: CharacterModel) => {
    let formData: FormData = new FormData();
    formData.append("charInfo", JSON.stringify(character))
    return client.post(`${endpoint}/saveChar`, formData);
};


const getChars = (user_id: string) => client.get<CharacterModel[]>(`${endpoint}/getChars/${user_id}`);


const getChar = (_id: string) => client.get<CharacterModel>(`${endpoint}/getChar/${_id}`);


const validateCharName = (name: string, user_id: string) => client.get(`${endpoint}/validateChar/${name}/${user_id}`);


const deleteChar = (char_id: string) => client.delete(`${endpoint}/deleteChar/${char_id}`);


const updateChar = (character: CharacterModel) => {
    let formData: FormData = new FormData();
    formData.append("charInfo", JSON.stringify(character))
    return client.patch(`${endpoint}/updateCharacter`, formData);
};



export default {
    getChar,
    saveChar,
    getChars,
    deleteChar,
    validateCharName,
    updateChar,

}