//
// Created by Tavi on 09.05.2021.
//

#include <iostream>
#include <QWidget>
#include <QGridLayout>
#include "GuiAdmin.h"
#include "TableView.h"
#include "Delegate.h"
#include <QPushButton>
#include <QLabel>
#include <QListWidget>
#include <QSize>
#include <QFont>
#include <QFormLayout>
#include <QLineEdit>
#include <QMessageBox>
#include <QShortcut>
#include <QTableView>

using namespace std;

//void add();
//void update();
//void remove();
//void print_all();
//void print_menu();


GuiAdmin::GuiAdmin(administrator &ser,QWidget *parent): QWidget(parent),ser(ser) {


}

QWidget *GuiAdmin::create_box() {

    QWidget *w=new QWidget{};
    QFormLayout *fl=new QFormLayout;
    le=new QLineEdit[5];
    QLabel *l=new QLabel[5];



    l[0].setText("Title:");
    l[0].setBuddy(le);

    l[1].setText("Presenter");
    l[1].setBuddy(le+1);

    l[2].setText("Duration");
    l[2].setBuddy(le+2);

    l[3].setText("nr_likes");
    l[3].setBuddy(le+3);

    l[4].setText("link:");
    l[4].setBuddy(le+4);

    fl->addRow(l,le);
    fl->addRow(l+1,le+1);
    fl->addRow(l+2,le+2);
    fl->addRow(l+3,le+3);
    fl->addRow(l+4,le+4);

    w->setLayout(fl);


    return w;

}

void GuiAdmin::add_tutorial() {

    QString title=le[0].text();
    QString presenter=le[1].text();
    QString duration=le[2].text();
    QString nr_likes=le[3].text();
    QString link=le[4].text();

    string titles=title.toStdString();
    string presenters=presenter.toStdString();
    string durations=duration.toStdString();
    string links=link.toStdString();

    string likes=nr_likes.toStdString();
    int nr_likesi= atoi(likes.c_str());

    bool exc=0;
    if(nr_likesi==0)
    {
        QMessageBox::critical(this,"Error","Invalid number of likes!");
    }

    try {
            ser.add_tutorial(titles,presenters,durations,nr_likesi,links);
    }

    catch (runtime_error &err)
    {
        exc=1;
        string error=err.what();
        QMessageBox::critical(this,"Error",QString::fromStdString(error));
    }

    if(!exc)
        QMessageBox::information(this,"Added!","Tutorial succesfully added");


    w->hide();
    wmain->show();

}

void GuiAdmin::add() {


    wmain->hide();

    QWidget * w=create_box();

    QPushButton *btn=new QPushButton("add");

    this->w=new QWidget;
    btn->setIconSize(QSize(80,80));
    btn->setFont(QFont("Calibri",10,-1,true));
    btn->setIcon(QIcon("../add.png"));

    QVBoxLayout *gl=new QVBoxLayout;

    gl->addWidget(w);
    gl->addWidget(btn);
    this->w->setLayout(gl);

    connect(btn,&QPushButton::clicked,this,&GuiAdmin::add_tutorial);

    this->w->show();



}

void GuiAdmin::update_tutorial() {

    QString title=le[0].text();
    QString presenter=le[1].text();
    QString duration=le[2].text();
    QString nr_likes=le[3].text();
    QString link=le[4].text();

    string titles=title.toStdString();
    string presenters=presenter.toStdString();
    string durations=duration.toStdString();
    string links=link.toStdString();

    string likes=nr_likes.toStdString();
    int nr_likesi= atoi(likes.c_str());

    bool exc=0;
    if(nr_likesi==0)
    {
        exc=1;
        QMessageBox::critical(this,"Error","Invalid number of likes!");
    }

    try {
        ser.update_tutorial(titles,presenters,durations,nr_likesi,links);
    }

    catch (runtime_error &err)
    {
        exc=1;
        string error=err.what();
        QMessageBox::critical(this,"Error",QString::fromStdString(error));
    }

    if(!exc)
        QMessageBox::information(this,"Updated!","Tutorial succesfully updated");

    w->hide();
    wmain->show();

}

void GuiAdmin::update() {

    wmain->hide();

    QWidget * w=create_box();

    QPushButton *btn=new QPushButton("update");

    this->w=new QWidget;
    btn->setIconSize(QSize(80,80));
    btn->setFont(QFont("Calibri",10,-1,true));
    btn->setIcon(QIcon("../update.png"));

    QVBoxLayout *gl=new QVBoxLayout;

    gl->addWidget(w);
    gl->addWidget(btn);
    this->w->setLayout(gl);

    connect(btn,&QPushButton::clicked,this,&GuiAdmin::update_tutorial);

    this->w->show();

}

void GuiAdmin::remove_tutorial() {

    wmain->hide();

    QString link=le->text();

    bool exc=0;
    try {
        ser.delete_tutorial(link.toStdString());
    }

    catch(runtime_error &err)
    {
        exc=1;
        string error=err.what();
        QMessageBox::critical(this,"Error",QString::fromStdString(error));
    }
    if(!exc)
        QMessageBox::information(this,"Removed!","Tutorial succesfully removed!");



    w->hide();
    wmain->show();

}

void GuiAdmin::remove() {

    QWidget *q=new QWidget;
    QHBoxLayout *hl=new QHBoxLayout;
    QLabel *l=new QLabel("link");
    le=new QLineEdit;

    l->setBuddy(le);
    hl->addWidget(l);
    hl->addWidget(le);

    q->setLayout(hl);

    QPushButton *btn=new QPushButton("delete");

    this->w=new QWidget;
    btn->setIconSize(QSize(30,30));
    btn->setFont(QFont("Calibri",10,-1,true));
    btn->setIcon(QIcon("../delete.png"));

    QVBoxLayout *gl=new QVBoxLayout;

    gl->addWidget(q);
    gl->addWidget(btn);
    this->w->setLayout(gl);

    connect(btn,&QPushButton::clicked,this,&GuiAdmin::remove_tutorial);

    this->w->show();



}

void GuiAdmin::print_all() {

    vector<Tutorial>v=ser.get_all();

    TableView *tv=new TableView(v);

    QTableView *t=new QTableView;
    Delegate *d=new Delegate(v);

    t->setModel(tv);
    t->setItemDelegateForColumn(5,d);

    
    t->resize(1000,500);

    t->show();



}




void GuiAdmin::run() {

    wmain=new QWidget;
    QGridLayout *gl=new QGridLayout;
    buttons=new QPushButton[6];
    QListWidget *list=new QListWidget;

    list->addItem("1.Add a new tutorial");
    list->addItem("2.Update a tutorial");
    list->addItem("3.Remove a turorial");
    list->addItem("4.Print all tutorials");
    list->addItem("5.Undo");
    list->addItem("6.Redo");

    gl->addWidget(list,0,0,1,3);


    buttons[0].setText("add");
    buttons[0].setIcon(QIcon("../add.png"));

    buttons[1].setText("update");
    buttons[1].setIcon(QIcon("../update.png"));


    buttons[2].setText("remove");
    buttons[2].setIcon(QIcon("../delete.png"));

    buttons[3].setText("print_all");
    buttons[3].setIcon(QIcon("../print_all.png"));

    buttons[4].setText("undo");
    buttons[4].setIcon(QIcon("../undo.png"));

    buttons[5].setText("redo");
    buttons[5].setIcon(QIcon("../redo.png"));



   for(int i=0;i<6;i++)
   {
       buttons[i].setIconSize(QSize(80,80));
       buttons[i].setFont(QFont("Calibri",10,-1,true));
   }


    gl->addWidget(buttons,1,0);
    gl->addWidget(buttons+1,1,1);
    gl->addWidget(buttons+2,1,2);
    gl->addWidget(buttons+3,2,0);
    gl->addWidget(buttons+4,2,1);
    gl->addWidget(buttons+5,2,2);

    connect_buttons();

     wmain->setLayout(gl);

     wmain->show();

//    add();
//    update();
//    remove();
//    print_all();


}

void GuiAdmin::connect_buttons() {

    connect(buttons,&QPushButton::clicked,this,&GuiAdmin::add);
    connect(buttons+1,&QPushButton::clicked,this,&GuiAdmin::update);
    connect(buttons+2,&QPushButton::clicked,this,&GuiAdmin::remove);
    connect(buttons+3,&QPushButton::clicked,this,&GuiAdmin::print_all);
    connect(buttons+4,&QPushButton::clicked,this,&GuiAdmin::undo);
    connect(buttons+5,&QPushButton::clicked,this,&GuiAdmin::redo);
    QShortcut *undo_s = new QShortcut(QKeySequence("Ctrl+Z"), wmain);
    connect(undo_s,&QShortcut::activated,this,&GuiAdmin::undo);

    QShortcut *redo_s = new QShortcut(QKeySequence("Ctrl+Y"), wmain);
    connect(redo_s,&QShortcut::activated,this,&GuiAdmin::redo);

}

void GuiAdmin::undo() {

    try {
        ser.undo();
    }

    catch (runtime_error &err)
    {
        QMessageBox::critical(this,"Error",QString::fromStdString(err.what()));
    }

}

void GuiAdmin::redo() {

    try {
        ser.redo();
    }

    catch (runtime_error &err)
    {
        QMessageBox::critical(this,"Error",QString::fromStdString(err.what()));
    }

}









