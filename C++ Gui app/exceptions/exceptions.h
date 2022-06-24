//
// Created by Tavi on 09.04.2021.
//

#ifndef A45_TAVI255_EXCEPTIONS_H
#define A45_TAVI255_EXCEPTIONS_H

#include <stdexcept>

using namespace std;

class InvalidTutorial: public runtime_error
{
public:
    InvalidTutorial(string);
};

#endif //A45_TAVI255_EXCEPTIONS_H
