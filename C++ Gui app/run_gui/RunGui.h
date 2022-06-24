//
// Created by Tavi on 16.05.2021.
//

#ifndef A45_TAVI255_RUNGUI_H
#define A45_TAVI255_RUNGUI_H


#include <QWindow>
#include "../validator/validator.h"
#include "../repository/FileRepo.h"
#include "../Ui/GuiAdmin.h"
#include "../services/UserServices.h"
#include "../Ui/GuiUser.h"
#include "../generator/generator.h"

using namespace std;

class RunGui: public QWindow {

public slots:

    explicit RunGui(QWindow *parent=0);

    static void run_admin();


    static void run_user();

};


#endif //A45_TAVI255_RUNGUI_H
