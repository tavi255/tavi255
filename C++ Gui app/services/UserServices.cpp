//
// Created by Tavi on 25.03.2021.
//

#include <stdexcept>
#include "UserServices.h"
#include "../entity/ActionAdd.h"
#include "../entity/ActionRemove.h"


UserServices::UserServices(Repo *r,Repo *watch,Validator &v,UndoRedoRepo &undo_redo):r{r},watch{watch},validator{v},undo_redo(undo_redo)
{

}
void UserServices::add_watch(Tutorial &p)
{
    if(Validator::in_repo(p,watch)!=-1)
        throw runtime_error("The tutorial is already in the repo!\n");

    ActionAdd *a=new ActionAdd(p,watch);
    undo_redo.push(a);
    this->watch->push(p);
}


void UserServices::delete_watch(string link,char ans)
{
    int ind=Validator::in_repo_l(link,watch);

    if(ind==-1)
        throw runtime_error("The tutorial is not in repo!\n");

    ActionRemove *a=new ActionRemove(watch->operator[](ind),watch,ind);
    undo_redo.push(a);

    if(ans=='Y')
    {
        Tutorial t=r->operator[](ind);
        t.set_likes(t.get_likes()+1);
        r->update(ind,t);
    }



    watch->remove(ind);
}



vector <Tutorial>  UserServices::get_tutorials()
{
    return r->get_all();
}

vector <Tutorial>  UserServices::get_watches()
{
    return watch->get_all();
}

int UserServices::size_watch()
{
    return watch->size();
}


int UserServices::size_tutorials()
{
    return r->size();
}

void UserServices::save_watch()
{
    watch->store();
}

void UserServices::undo() {

    if(undo_redo.size_undo()==0)
        throw runtime_error("No more undo's!\n");

    undo_redo.undo_action();

}

void UserServices::redo() {

    if(undo_redo.size_redo()==0)
        throw runtime_error("No more redo's!\n");

    undo_redo.redo_action();

}




