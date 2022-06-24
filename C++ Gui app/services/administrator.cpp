//
// Created by Tavi on 21.03.2021.
//

#include "administrator.h"
#include "../entity/Tutorial.h"
#include "../validator/validator.h"
#include "../entity/ActionAdd.h"
#include "../entity/ActionUpdate.h"
#include "../entity/ActionRemove.h"
#include <stdexcept>


administrator::administrator(Repo *repo,Validator &v,UndoRedoRepo &undo_redo):validator{v},repo{repo},undo_redo(undo_redo) {




}
void administrator::add_tutorial(string title, string presenter, string duration, int nr_likes, string link)
{
        Tutorial t(title,presenter,duration,nr_likes,link);
        validator.validate(t);

        if(Validator::in_repo(t,repo)==-1)
        {
            repo->push(t);
            ActionAdd *a=new ActionAdd(t,repo);
            undo_redo.push(a);

        }

        else
            throw runtime_error("Element is already in repo!\n");


}
void administrator::update_tutorial(string title, string presenter, string duration, int nr_likes, string link)
{
    Tutorial t(title,presenter,duration,nr_likes,link);
    validator.validate(t);

    int ind=Validator::in_repo(t,repo);

    if(ind!=-1)
    {
        Tutorial k=repo->operator[](ind);
        repo->update(ind,t);
        ActionUpdate *a=new ActionUpdate(k,t,repo);
        undo_redo.push(a);
    }


    else
    {
        throw runtime_error("The element is not in repo!\n");
    }


}



void administrator::delete_tutorial(string link)
{
    int poz=Validator::in_repo_l(link,repo);

    if(poz!=-1)
    {
        Tutorial k=repo->operator[](poz);
        ActionRemove *a=new ActionRemove(k,repo,poz);
        undo_redo.push(a);
        repo->remove(poz);
    }



    else
        throw runtime_error("Invalid tutorial!\n");
}

int administrator::size()
{
    return repo->size();
}


vector <Tutorial>  administrator::get_all()
{
    return repo->get_all();
}

void administrator::undo() {

    if(undo_redo.size_undo()==0)
        throw runtime_error("No more undo's!");

    undo_redo.undo_action();

}

void administrator::redo() {

    if(undo_redo.size_redo()==0)
        throw runtime_error("No more redo's!");

    undo_redo.redo_action();

}

