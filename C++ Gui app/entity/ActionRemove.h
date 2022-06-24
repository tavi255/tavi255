//
// Created by Tavi on 29.05.2021.
//

#ifndef A45_TAVI255_ACTIONREMOVE_H
#define A45_TAVI255_ACTIONREMOVE_H


#include "Action.h"
#include "../repository/Repo.h"

class ActionRemove: public Action {

private:

    Tutorial t;
    Repo *r;
    int ind;

public:

    ActionRemove(Tutorial t,Repo *r,int ind);
    void undo() override;
    void redo() override;

};


#endif //A45_TAVI255_ACTIONREMOVE_H
