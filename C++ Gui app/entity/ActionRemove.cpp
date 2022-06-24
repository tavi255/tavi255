//
// Created by Tavi on 29.05.2021.
//

#include "ActionRemove.h"

void ActionRemove::undo() {

    r->push(t);

}

void ActionRemove::redo() {

    r->remove(r->size()-1);

}

ActionRemove::ActionRemove(Tutorial t, Repo *r,int ind):t(t),r(r),ind(ind) {

}
