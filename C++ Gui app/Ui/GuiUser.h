//
// Created by Tavi on 09.05.2021.
//

#ifndef A45_TAVI255_GUIUSER_H
#define A45_TAVI255_GUIUSER_H


#include <QObject>
#include <QLabel>
#include <QLineEdit>
#include "../services/UserServices.h"

class GuiUser: public QObject {
private:

    UserServices &ser;


public:

    explicit GuiUser(UserServices &ser,QObject *parent=NULL);

    void run();

private slots:


    void add_watch();
    void delete_tutorial();
    void print_watchlist();
    void print_tutorials();
    void tutorial_menu();
    void get_next();
    void save_watch();
    void print_watch();
    void open_html();
    void open_csv();
    void open_tutorial();
    void delete_tut();
    void undo();
    void redo();


private:

    QPushButton *bt;
    QWidget *wmain;
    QWidget *w;
    void connect_buttons();
    int ind;
    int size;
    Tutorial t;
    QLabel *current;
    vector<Tutorial>v;
    QLineEdit *ql;



};


#endif //A45_TAVI255_GUIUSER_H
