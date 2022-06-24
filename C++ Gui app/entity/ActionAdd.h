//
// Created by Tavi on 29.05.2021.
//

#ifndef A45_TAVI255_ACTIONADD_H
#define A45_TAVI255_ACTIONADD_H


#include "Action.h"
#include "../repository/Repo.h"

class ActionAdd: public Action{

private:
    Tutorial t;
    Repo *r;

public:

    ActionAdd(Tutorial &t,Repo *r);

    void undo() override;
    void redo() override;

};


#endif //A45_TAVI255_ACTIONADD_H
