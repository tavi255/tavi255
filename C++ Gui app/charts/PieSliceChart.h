//
// Created by Tavi on 17.05.2021.
//

#ifndef A45_TAVI255_PIESLICECHART_H
#define A45_TAVI255_PIESLICECHART_H


#include "../repository/Repo.h"

class PieSliceChart {

   Repo &repo;
public:

    PieSliceChart(Repo &repo);
    void run_app();


};


#endif //A45_TAVI255_PIESLICECHART_H
