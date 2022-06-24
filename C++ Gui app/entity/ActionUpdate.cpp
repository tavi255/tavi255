//
// Created by Tavi on 29.05.2021.
//

#include "ActionUpdate.h"


void ActionUpdate::undo() {

    int poz=-1;

    for(int i=0;i<r->size();i++)
        if(r->operator[](i).to_string()==newt.to_string())
            poz=i;

    r->update(poz,oldt);

}

void ActionUpdate::redo() {

    int poz=-1;

    for(int i=0;i<r->size();i++)
        if(r->operator[](i).to_string()==oldt.to_string())
            poz=i;

    r->update(poz,newt);


}

ActionUpdate::ActionUpdate(Tutorial &oldt, Tutorial &newt, Repo *r):oldt(oldt),newt(newt),r(r) {

}
