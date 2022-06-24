//
// Created by Tavi on 29.05.2021.
//

#ifndef A45_TAVI255_ACTIONUPDATE_H
#define A45_TAVI255_ACTIONUPDATE_H


#include "Action.h"
#include "Tutorial.h"
#include "../repository/Repo.h"

class ActionUpdate: public Action {

private:

    Tutorial oldt,newt;
    Repo *r;

public:
    ActionUpdate(Tutorial &oldt,Tutorial &newt,Repo *r);
    void undo () override;
    void redo () override;


};


#endif //A45_TAVI255_ACTIONUPDATE_H
