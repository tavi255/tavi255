//
// Created by Tavi on 29.05.2021.
//

#ifndef A45_TAVI255_ACTION_H
#define A45_TAVI255_ACTION_H


class Action {

public:


    virtual void undo()=0;
    virtual void redo()=0;

};


#endif //A45_TAVI255_ACTION_H
