//
// Created by Tavi on 16.05.2021.
//

#include "RunGui.h"


void RunGui::run_admin()
{

    string s="Tutorial.txt";

    string store="";

    FileRepo r(s,store);
    generate(s,r);

    Validator v;
    UndoRedoRepo ur;

    administrator ser(&r,v,ur);
    GuiAdmin g(ser);
    g.run();

}

void RunGui::run_user()
{

    string s="Tutorial.txt";
    string store="";

    FileRepo r(s,store);
    generate(s,r);

    Validator v;
    UndoRedoRepo ur;

    store="watchlist.html";
    store="watchlist.csv";

    Repo watchlist(store);
    UserServices u(&r,&watchlist,v,ur);
    GuiUser gu(u);

    gu.run();
}

RunGui::RunGui(QWindow *parent) : QWindow(parent) {

}
