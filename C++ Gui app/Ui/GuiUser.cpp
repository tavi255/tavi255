//
// Created by Tavi on 09.05.2021.
//

#include <QPushButton>
#include "GuiUser.h"
#include "TableView.h"
#include "Delegate.h"
#include <iostream>
#include <QListWidget>
#include <QGridLayout>
#include <QLabel>
#include <QLineEdit>
#include <QFormLayout>
#include <QTableView>
#include <QMessageBox>

using namespace std;


GuiUser::GuiUser(UserServices &ser, QObject *parent): QObject(parent),ser(ser),ind(0) {

    v=ser.get_tutorials();
    size=v.size();
    t=v[ind];

}



void GuiUser::add_watch() {

    ser.add_watch(t);


}

void GuiUser::delete_tutorial() {

    QLabel *l=new QLabel("link:");
    QWidget *w=new QWidget;
    QFormLayout *fl=new QFormLayout;
    ql=new QLineEdit;
    l->setBuddy(ql);

    fl->addRow(l,ql);

    QPushButton *bt=new QPushButton;
    w->setLayout(fl);
    QWidget *w2=new QWidget;
    QVBoxLayout *vl=new QVBoxLayout;
    bt->setText("OK!");
    vl->addWidget(w);
    vl->addWidget(bt);

    w2->setLayout(vl);

    connect(bt,&QPushButton::clicked,this,&GuiUser::delete_tut);

    w2->show();





}

void GuiUser::print_watchlist() {

    vector<Tutorial>v=ser.get_watches();

    TableView *tv=new TableView(v);

    QTableView *t=new QTableView;
    Delegate *d=new Delegate(v);
    t->setModel(tv);
    t->setItemDelegateForColumn(5,d);

    t->resize(1000,500);

    t->show();


}

void GuiUser::print_tutorials() {


    QWidget *q=new QWidget;
    current=new QLabel(QString::fromStdString(t.to_string()));
    QGridLayout *gr=new QGridLayout;
    QPushButton *add=new QPushButton("add");
    QPushButton *next=new QPushButton("next");
    QPushButton *open=new QPushButton("open tutorial");

    gr->addWidget(current,0,0);
    gr->addWidget(add,1,0);
    gr->addWidget(next,1,1);
    gr->addWidget(open,1,2);
    q->setLayout(gr);

    connect(add,&QPushButton::clicked,this,&GuiUser::add_watch);
    connect(next,&QPushButton::clicked,this,&GuiUser::get_next);
    connect(open,&QPushButton::clicked,this,&GuiUser::open_tutorial);


    q->show();


}

void GuiUser::tutorial_menu() {



    QWidget *w=new QWidget;
    QVBoxLayout *vl=new QVBoxLayout;
    QListWidget *lw=new QListWidget;

    lw->addItem("Add to watchlist");
    lw->addItem("Go to the next one");

    vl->addWidget(lw);

    QPushButton *add=new QPushButton("add");
    QPushButton *next=new QPushButton("next");
    vl->addWidget(add);
    vl->addWidget(next);

    w->setLayout(vl);

    w->show();



}

void GuiUser::get_next() {

    ind++;
    if(ind==size)
        ind=0;

    t=v[ind];
    current->setText(QString::fromStdString(t.to_string()));


}

void GuiUser::save_watch() {



    QListWidget *ql=new QListWidget;
    QWidget *w=new QWidget;
    ql->addItem("1.Add to watchlist");
    ql->addItem("2.Go to the next one");

    QPushButton *add=new QPushButton("add");
    QPushButton *next=new QPushButton("next");



    QVBoxLayout *vl=new QVBoxLayout;
    vl->addWidget(ql);
    vl->addWidget(add);
    vl->addWidget(next);
    w->setLayout(vl);

    w->show();



}

void GuiUser::print_watch() {

    QWidget *w=new QWidget;
    QHBoxLayout *hb=new QHBoxLayout;
    QPushButton *html=new QPushButton("html");
    QPushButton *csv=new QPushButton("csv");

    html->setFont(QFont("Calibri",30,-1,true));
    csv->setFont(QFont("Calibri",30,-1,true));
    hb->addWidget(html);
    hb->addWidget(csv);

    w->setLayout(hb);

    connect(html,&QPushButton::clicked,this,&GuiUser::open_html);
    connect(csv,&QPushButton::clicked,this,&GuiUser::open_csv);


    w->show();

}


void GuiUser::run() {


    //connect(btn1,&QPushButton::clicked,print_menu);



    wmain=new QWidget;
    QListWidget *lw=new QListWidget;
    QGridLayout *gl=new QGridLayout;

    lw->addItem("1.Print watch");
    lw->addItem("2.Print tutorials");
    lw->addItem("3.Delete a tutorial from the watchlist");
    lw->addItem("4.Open watchlist");

    gl->addWidget(lw,0,0);

    bt=new QPushButton[6];
    bt[0].setText("Print watch");
    bt[1].setText("Print tutorials");
    bt[2].setText("Delete a tutorial");
    bt[3].setText("Open watchlist");
    bt[4].setText("Undo");
    bt[5].setText("Redo");

    gl->addWidget(bt,1,0);
    gl->addWidget(bt+1,1,1);
    gl->addWidget(bt+2,1,2);
    gl->addWidget(bt+3,2,0);
    gl->addWidget(bt+4,2,1);
    gl->addWidget(bt+5,2,2);


    for(int i=0;i<6;i++)
    {
        bt[i].setFont(QFont("Times New Roman",30,-1,true));
        bt[i].resize(30,30);
    }

    connect_buttons();
    wmain->setLayout(gl);

    wmain->show();


}

void GuiUser::connect_buttons() {

    connect(bt,&QPushButton::clicked,this,&GuiUser::print_watchlist);
    connect(bt+1,&QPushButton::clicked,this,&GuiUser::print_tutorials);
    connect(bt+2,&QPushButton::clicked,this,&GuiUser::delete_tutorial);
    connect(bt+3,&QPushButton::clicked,this,&GuiUser::print_watch);
    connect(bt+4,&QPushButton::clicked,this,&GuiUser::undo);
    connect(bt+5,&QPushButton::clicked,this,&GuiUser::redo);


}

void GuiUser::open_html() {

    system("start msedge.exe "
           "D:/github/a67-tavi255/cmake-build-debug/watchlist.html");


}

void GuiUser::open_csv() {

    system("start excel.exe D:/github/a67-tavi255/cmake-build-debug/watchlist.csv");

}

void GuiUser::open_tutorial() {

    string path="start msedge.exe ";
    path+=t.get_link();
    system(path.c_str());

}

void GuiUser::delete_tut() {

    QString s=ql->text();
    string ans="No";
    string link=s.toStdString();
    ser.delete_watch(link,'n');

}

void GuiUser::undo() {

    try
    {
        ser.undo();
    }

    catch (runtime_error &err)
    {
        QMessageBox::critical(0,"Error",QString::fromStdString(err.what()));
    }

}

void GuiUser::redo() {

    try
    {
        ser.redo();
    }

    catch (runtime_error &err)
    {
        QMessageBox::critical(0,"Error",QString::fromStdString(err.what()));
    }

}




