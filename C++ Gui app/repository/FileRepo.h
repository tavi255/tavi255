//
// Created by Tavi on 10.04.2021.
//

#ifndef A45_TAVI255_FILEREPO_H
#define A45_TAVI255_FILEREPO_H
#include "Repo.h"
#include <vector>

using namespace std;

class FileRepo:public Repo {

private:

    const string &file;


    void read_file();
    void append(Tutorial t);
    void write_file();

public:

    FileRepo(string &f,string &watchlist);



    int size() override;
    //returns the size of the dynamic array

    Tutorial operator [](int ind) override;

    void push(Tutorial elem) override;
    //adds an element in the array
    //param elem:an element of type T

    void update(int ind,Tutorial elem) override;
    //updates the number of likes of a Tutorial
    //param elem (current element)
    //param ind the index where the element will be inserted


    void remove(int ind) override;
    //removes an element from the array
    //param ind(the index if the elem)


    vector<Tutorial>get_all() override;
    //returns all the elements in the repo





};


#endif //A45_TAVI255_FILEREPO_H
