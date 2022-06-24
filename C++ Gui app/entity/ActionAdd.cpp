//
// Created by Tavi on 29.05.2021.
//

#include "ActionAdd.h"

ActionAdd::ActionAdd(Tutorial &t, Repo *r):t(t),r(r) {

}

void ActionAdd::undo() {

    r->remove(r->size()-1);

}

void ActionAdd::redo() {

    r->push(t);

}
