//
// Created by Tavi on 21.03.2021.
//

#ifndef A45_TAVI255_VALIDATOR_H
#define A45_TAVI255_VALIDATOR_H
#include "../entity/Tutorial.h"
#include "../repository/Repo.h"
using namespace std;

class Validator
{
public:
    void validate(Tutorial t);
    //validates the tutorial t
    //throws an exception if the tutorial is not valid

    static int in_repo(Tutorial t,Repo *h);
    //checks if the tutorial is in the repo
    //returns the index of the elem if found,-1 else

    static int in_repo_l(string l,Repo *h);
    //checks if a tutorial in the repo using a link
    //returns the index of the elem if found,-1 else

};

#endif //A45_TAVI255_VALIDATOR_H
