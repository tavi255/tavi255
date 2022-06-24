//
// Created by Tavi on 09.05.2021.
//

#ifndef A45_TAVI255_GUIADMIN_H
#define A45_TAVI255_GUIADMIN_H


#include <QWidget>
#include <QPushButton>
#include <QLineEdit>
#include "../services/administrator.h"

//void add();
//void update();
//void remove();
//void print_all();
//void print_menu();

class GuiAdmin:public QWidget {



private:

    administrator ser;
    void connect_buttons();
    QWidget* create_box();
    QPushButton *buttons;
    QWidget *wmain,*w;

    QLineEdit *le;


private slots:

    void add();
    void update();
    void remove();
    void print_all();
    void add_tutorial();
    void update_tutorial();
    void remove_tutorial();
    void undo();
    void redo();


public:
    explicit GuiAdmin(administrator &ser,QWidget *parent=0);


    void run();




};


#endif //A45_TAVI255_GUIADMIN_H
