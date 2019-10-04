import {Pipe, PipeTransform} from '@angular/core';
import { User } from '../interfaces/user';


@Pipe({
    name: 'search'
})

export class SearchPipe implements PipeTransform{
    public transform(friends:User[], searchString:string){
        if(!friends){
            return;
        }
        if(!searchString){
            //Se retorna el array completo en el caso que no digite nada en el buscador
            return friends;
        }
        searchString = searchString.toLowerCase();
        return friends.filter((item)=>{
            //el includes coge el texto transformado de cada item y lo compara con la palabra ingresada (searchString)
            return JSON.stringify(item).toLowerCase().includes(searchString);
        })
    }
}