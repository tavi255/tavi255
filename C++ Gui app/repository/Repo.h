//
// Created by Tavi on 20.03.2021.
//

#ifndef A45_TAVI255_REPO_H
#define A45_TAVI255_REPO_H

#include <algorithm>
#include "../entity/Tutorial.h"
#include <vector>

//using namespace std;


class Repo {

protected:

    std::vector <Tutorial>v;
    const std::string &watchlist;


public:



    Repo(const std::string&watchlist);

    virtual int size();
    //returns the size of the dynamic array

    virtual Tutorial operator [](int ind);

    virtual void push(Tutorial elem);
    //adds an element in the array
    //param elem:an element of type T

    virtual void update(int ind,Tutorial elem);
    //updates the number of likes of a Tutorial
    //param elem (current element)
    //param ind the index where the element will be inserted


    virtual void remove(int ind);
    //removes an element from the array
    //param ind(the index if the elem)


    virtual std::vector<Tutorial>get_all();
    //returns all the elements in the repo

    void store();
    //stores the watchlist in a file(csv/html)

    void store_csv();
    //stores the watchlist in a csv file

    void store_html();
    //stores the watchlist in a csv file

    virtual ~Repo();




};



#endif //A45_TAVI255_REPO_H
