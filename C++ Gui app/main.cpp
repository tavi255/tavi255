#include <iostream>
#include <QApplication>
#include <QPushButton>
#include <QHBoxLayout>
#include "tests/test.h"
#include "repository/Repo.h"
#include "generator/generator.h"
#include "entity/Tutorial.h"
#include "services/administrator.h"
#include "Ui/UI administrator.h"
#include "Ui/Ui user.h"
#include "validator/validator.h"
#include "repository/FileRepo.h"
#include "repository/SqlDatabase.h"
#include "Ui/GuiAdmin.h"
#include "Ui/GuiUser.h"
#include "run_gui/RunGui.h"
#include "charts/PieSliceChart.h"


//using namespace std;



int main(int nr,char *args[])
{


    int opt;
    cout<<"Chose mode\n";
    cout<<"1.Admin\n";
    cout<<"2.User\n";
    cout<<"3.Open chart\n";

    cin>>opt;

    if(opt>3 || opt <1)
    {
        cout<<"Invalid opt!\n";
        exit(0);
    }

    string s="Tutorial.txt";

    string store="";

    //SqlDatabase base(store,conn);

    FileRepo r(s,store);
    //generate(s,r);

    Validator v;


    if(opt==1)
    {
        QApplication a(nr,args);
        UndoRedoRepo ur;
        administrator ser(&r,v,ur);
        GuiAdmin g(ser);
        g.run();

        return a.exec();
   }

    else if(opt==2)
    {
        QApplication a(nr,args);
        cout<<"1:html\n";
        cout<<"2.csv\n";

        cin>>opt;

        if(opt==1)
            store="watchlist.html";
        else
            store="watchlist.csv";

        UndoRedoRepo ur;
        Repo watchlist(store);
        UserServices u(&r,&watchlist,v,ur);
        GuiUser gu(u);

        gu.run();

        return a.exec();

    }

    else
    {
            QApplication q(nr,args);
            PieSliceChart ch(r);
            ch.run_app();
            return q.exec();
    }

}

