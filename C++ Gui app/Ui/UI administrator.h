//
// Created by Tavi on 21.03.2021.
//

#ifndef A45_TAVI255_UI_ADMINISTRATOR_H
#define A45_TAVI255_UI_ADMINISTRATOR_H

#include "../services/administrator.h"

class Console
{
protected:
    administrator *services;
    void add();
    void update();
    void remove();
    void print_all();
    void print_menu();


public:
    Console(administrator *services);
    void run_console();
};

#endif //A45_TAVI255_UI_ADMINISTRATOR_H
