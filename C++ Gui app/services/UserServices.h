//
// Created by Tavi on 25.03.2021.
//

#ifndef A45_TAVI255_USERSERVICES_H
#define A45_TAVI255_USERSERVICES_H
#include "../entity/Tutorial.h"
#include "../repository/Repo.h"
#include "administrator.h"

class UserServices {
private:

    Repo *r,*watch;
    Validator &validator;
    UndoRedoRepo &undo_redo;

    public:

    UserServices(Repo *r,Repo *watch,Validator &v,UndoRedoRepo & undo_redo);
    void add_watch(Tutorial &p);

    /*
     * adds a new tutorial in the watch list
     * param p:the tutorial (obj of type Tutorial)
     * return:-
     */

    void delete_watch(string link,char ans);

    /*
     * Deletes a watch from the list
     * param p:the tutorial(obj of type tutorial)
     * return:-
     *
     */

    vector <Tutorial> get_tutorials();
    /*
     * Returns the list with all the tutorials
     *
     */
    vector <Tutorial> get_watches();
    /*
     * returns the list with all watches
     */

    int size_watch();
    /*
     * returns the size of the watch list
     */

    int size_tutorials();
    /*
     * returns the size of the list of tutorials
     */

    void save_watch();
    /*
     * Saves the watch list
     */

    void undo();
    void redo();


};


#endif //A45_TAVI255_USERSERVICES_H
