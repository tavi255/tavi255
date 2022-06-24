//
// Created by Tavi on 29.05.2021.
//

#include "UndoRedoRepo.h"


UndoRedoRepo::~UndoRedoRepo() {

    while(undo.empty())
    {
        auto & vf=undo.top();
        delete vf;
        undo.pop();
    }

    while(redo.empty())
    {
        auto & vf=redo.top();
        delete vf;
        redo.pop();
    }

}



void UndoRedoRepo::undo_action() {

    auto &action=undo.top();
    action->undo();
    redo.push(action);
    undo.pop();


}

void UndoRedoRepo::redo_action() {

    auto &action=redo.top();
    action->redo();
    undo.push(action);
    redo.pop();

}

int UndoRedoRepo::size_undo() {
    return undo.size();
}

int UndoRedoRepo::size_redo() {
    return redo.size();
}

void UndoRedoRepo::push(Action *a) {

    undo.push(a);

    while(!redo.empty())
    {
        auto &action=redo.top();
        delete action;
        redo.pop();
    }

}
