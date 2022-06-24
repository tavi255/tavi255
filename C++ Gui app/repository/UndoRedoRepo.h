//
// Created by Tavi on 29.05.2021.
//

#ifndef A45_TAVI255_UNDOREDOREPO_H
#define A45_TAVI255_UNDOREDOREPO_H


#include <stack>
#include "../entity/Action.h"

using namespace std;
class UndoRedoRepo {
public:

    ~UndoRedoRepo();

    int size_undo();
    int size_redo();
    void push(Action *a);
    void undo_action();
    void redo_action();

private:

    stack<Action*>undo;
    stack<Action*>redo;

};


#endif //A45_TAVI255_UNDOREDOREPO_H
