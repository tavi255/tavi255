//
// Created by Tavi on 25.03.2021.
//

#ifndef A45_TAVI255_UI_USER_H
#define A45_TAVI255_UI_USER_H

#include "../services/UserServices.h"

class ConsoleU
{
    protected:

    UserServices *user;
    void print_menu();
    void add_watch(Tutorial &t);
    void delete_tutorial();
    void print_watchlist();
    void print_tutorials();
    void tutorial_menu();
    void get_next(int &ind,int size);
    void save_watch();
    void print_watch();
    void watch_menu();

public:
    ConsoleU(UserServices *user);
    void run_console();
};

#endif //A45_TAVI255_UI_USER_H
