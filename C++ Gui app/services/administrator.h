//
// Created by Tavi on 21.03.2021.
//

#ifndef A45_TAVI255_ADMINISTRATOR_H
#define A45_TAVI255_ADMINISTRATOR_H
#include <string>
#include "../repository/Repo.h"
#include "../entity/Tutorial.h"
#include "../validator/validator.h"
#include "../repository/FileRepo.h"
#include "../repository/UndoRedoRepo.h"


using namespace std;

class administrator {

    Repo *repo;
    UndoRedoRepo &undo_redo;
    Validator &validator;

public:

    administrator(Repo *repo,Validator &v,UndoRedoRepo &undo_redo);


    void add_tutorial(string title,string presenter,string duration,int nr_likes,string link);
    //adds a new tutorial in the repo
    //param title:the tiltle of the tutorial
    //param presenter:the presenter
    //param duration:the duration of the tutorial(minutes:seconds)
    //int nr_likes the number of likes
    //param link:the link of the tutorial

    void update_tutorial(string title,string presenter,string duration,int nr_likes,string link);

    //updates a tutorial
    //param title:the tiltle of the tutorial
    //param presenter:the presenter
    //param duration:the duration of the tutorial(minutes:seconds)
    //int nr_likes the number of likes
    //param link:the link of the tutorial


    void delete_tutorial(string link);
    //deletes a tutorial
    //param link:the link of the tutorial that will be removed

    vector <Tutorial>get_all();
    //return a list containing all the tutorials

    int size();
    //returns the number of elems in the repo

    void undo();
    void redo();



};


#endif //A45_TAVI255_ADMINISTRATOR_H
